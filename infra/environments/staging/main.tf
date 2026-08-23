resource "aws_acm_certificate" "staging" {
  domain_name       = var.staging_domain
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
  tags = merge(var.tags, { Name = var.staging_domain })
}

module "network" {
  source              = "../../modules/network"
  name                = var.name
  vpc_cidr            = var.vpc_cidr
  azs                 = var.azs
  public_subnet_cidrs = ["10.42.0.0/24", "10.42.1.0/24"]
  app_subnet_cidrs    = ["10.42.10.0/24", "10.42.11.0/24"]
  db_subnet_cidrs     = ["10.42.20.0/24", "10.42.21.0/24"]
  tags                = var.tags
}

module "security" {
  source   = "../../modules/security"
  name     = var.name
  vpc_id   = module.network.vpc_id
  vpc_cidr = module.network.vpc_cidr
  tags     = var.tags
}

module "alb" {
  source            = "../../modules/alb"
  name              = var.name
  subnet_ids        = module.network.public_subnet_ids
  security_group_id = module.security.alb_security_group_id
  vpc_id            = module.network.vpc_id
  certificate_arn   = var.certificate_arn
  tags              = var.tags
}

module "database" {
  source            = "../../modules/database"
  name              = var.name
  subnet_ids        = module.network.db_subnet_ids
  security_group_id = module.security.db_security_group_id
  kms_key_id        = module.security.kms_key_arn
  tags              = var.tags
}

module "storage" {
  source      = "../../modules/storage"
  name        = var.name
  kms_key_arn = module.security.kms_key_arn
  tags        = var.tags
}

module "ecs" {
  source            = "../../modules/ecs"
  name              = var.name
  subnet_ids        = module.network.app_subnet_ids
  security_group_id = module.security.app_security_group_id
  target_group_arn  = module.alb.target_group_arn
  create_service    = var.create_service
  image_tag         = var.image_tag
  tags              = var.tags
}

module "github_oidc" {
  source                    = "../../modules/ci-oidc"
  name                      = "${var.name}-github-deploy"
  github_repository         = var.github_repository
  github_repository_subject = "Premojin@316004841/rejuvonix@1343163474"
  github_environment        = "staging"
  tags                      = var.tags
}

data "aws_iam_policy_document" "github_deploy" {
  statement {
    sid       = "EcrAuth"
    actions   = ["ecr:GetAuthorizationToken"]
    resources = ["*"]
  }

  statement {
    sid = "EcrRepositoryPush"
    actions = [
      "ecr:BatchCheckLayerAvailability",
      "ecr:CompleteLayerUpload",
      "ecr:InitiateLayerUpload",
      "ecr:PutImage",
      "ecr:UploadLayerPart",
    ]
    resources = [module.ecs.repository_arn]
  }

  statement {
    sid       = "EcsReadClusterAndService"
    actions   = ["ecs:DescribeClusters", "ecs:DescribeServices", "ecs:UpdateService"]
    resources = var.create_service ? [module.ecs.cluster_arn, module.ecs.service_arn] : [module.ecs.cluster_arn]
  }

  statement {
    sid       = "EcsRegisterTaskDefinition"
    actions   = ["ecs:DescribeTaskDefinition", "ecs:RegisterTaskDefinition"]
    resources = ["*"]
  }

  statement {
    sid       = "PassTaskRoles"
    actions   = ["iam:PassRole"]
    resources = [module.ecs.task_role_arn, module.ecs.execution_role_arn]
  }
}

resource "aws_iam_role_policy" "github_deploy" {
  name   = "${var.name}-github-deploy"
  role   = module.github_oidc.role_name
  policy = data.aws_iam_policy_document.github_deploy.json
}

resource "aws_budgets_budget" "staging" {
  name         = "${var.name}-monthly"
  budget_type  = "COST"
  limit_amount = tostring(var.monthly_budget_usd)
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  cost_filter {
    name   = "TagKeyValue"
    values = ["user:Environment$staging"]
  }

  dynamic "notification" {
    for_each = var.budget_notification_email == "" ? [] : [
      { threshold = 50, type = "FORECASTED" },
      { threshold = 80, type = "ACTUAL" },
      { threshold = 100, type = "ACTUAL" },
      { threshold = 120, type = "ACTUAL" },
    ]
    content {
      comparison_operator        = "GREATER_THAN"
      threshold                  = notification.value.threshold
      threshold_type             = "PERCENTAGE"
      notification_type          = notification.value.type
      subscriber_email_addresses = [var.budget_notification_email]
    }
  }
}

resource "aws_wafv2_web_acl" "staging" {
  name  = var.name
  scope = "REGIONAL"
  default_action {
    allow {}
  }
  rule {
    name     = "common-rules"
    priority = 1
    override_action {
      none {}
    }
    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${var.name}-waf"
      sampled_requests_enabled   = true
    }
  }
  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${var.name}-waf"
    sampled_requests_enabled   = true
  }
  tags = var.tags
}

resource "aws_wafv2_web_acl_association" "staging" {
  resource_arn = module.alb.load_balancer_arn
  web_acl_arn  = aws_wafv2_web_acl.staging.arn
}

locals {
  alb_dimension = regex("loadbalancer/(.*)", module.alb.load_balancer_arn)[0]
  tg_dimension  = regex("targetgroup/(.*)", module.alb.target_group_arn)[0]
}

resource "aws_cloudwatch_metric_alarm" "ecs_running_tasks_low" {
  count               = var.create_service ? 1 : 0
  alarm_name          = "${var.name}-ecs-running-tasks-low"
  alarm_description   = "Staging ECS running tasks below desired capacity"
  namespace           = "ECS/ContainerInsights"
  metric_name         = "RunningTaskCount"
  statistic           = "Minimum"
  period              = 60
  evaluation_periods  = 2
  comparison_operator = "LessThanThreshold"
  threshold           = var.create_service ? 1 : 0
  treat_missing_data  = "breaching"
  dimensions = {
    ClusterName = module.ecs.cluster_name
    ServiceName = module.ecs.service_name
  }
}

resource "aws_cloudwatch_metric_alarm" "alb_unhealthy_targets" {
  count               = var.create_service ? 1 : 0
  alarm_name          = "${var.name}-alb-unhealthy-targets"
  alarm_description   = "Staging ALB has unhealthy targets"
  namespace           = "AWS/ApplicationELB"
  metric_name         = "UnHealthyHostCount"
  statistic           = "Maximum"
  period              = 60
  evaluation_periods  = 2
  comparison_operator = "GreaterThanThreshold"
  threshold           = 0
  treat_missing_data  = "breaching"
  dimensions = {
    LoadBalancer = local.alb_dimension
    TargetGroup  = local.tg_dimension
  }
}

resource "aws_cloudwatch_metric_alarm" "alb_5xx" {
  count               = var.create_service ? 1 : 0
  alarm_name          = "${var.name}-alb-5xx"
  alarm_description   = "Staging ALB is returning elevated 5xx responses"
  namespace           = "AWS/ApplicationELB"
  metric_name         = "HTTPCode_ELB_5XX_Count"
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 1
  comparison_operator = "GreaterThanThreshold"
  threshold           = 5
  treat_missing_data  = "notBreaching"
  dimensions          = { LoadBalancer = local.alb_dimension }
}

resource "aws_cloudwatch_metric_alarm" "ecs_cpu_high" {
  count               = var.create_service ? 1 : 0
  alarm_name          = "${var.name}-ecs-cpu-high"
  alarm_description   = "Staging ECS service CPU is elevated"
  namespace           = "AWS/ECS"
  metric_name         = "CPUUtilization"
  statistic           = "Average"
  period              = 300
  evaluation_periods  = 2
  comparison_operator = "GreaterThanThreshold"
  threshold           = 80
  treat_missing_data  = "notBreaching"
  dimensions          = { ClusterName = module.ecs.cluster_name, ServiceName = module.ecs.service_name }
}

resource "aws_cloudwatch_metric_alarm" "ecs_memory_high" {
  count               = var.create_service ? 1 : 0
  alarm_name          = "${var.name}-ecs-memory-high"
  alarm_description   = "Staging ECS service memory is elevated"
  namespace           = "AWS/ECS"
  metric_name         = "MemoryUtilization"
  statistic           = "Average"
  period              = 300
  evaluation_periods  = 2
  comparison_operator = "GreaterThanThreshold"
  threshold           = 80
  treat_missing_data  = "notBreaching"
  dimensions          = { ClusterName = module.ecs.cluster_name, ServiceName = module.ecs.service_name }
}

resource "aws_cloudwatch_metric_alarm" "rds_storage_low" {
  alarm_name          = "${var.name}-rds-storage-low"
  alarm_description   = "Staging RDS free storage is below 5 GiB"
  namespace           = "AWS/RDS"
  metric_name         = "FreeStorageSpace"
  statistic           = "Minimum"
  period              = 300
  evaluation_periods  = 2
  comparison_operator = "LessThanThreshold"
  threshold           = 5368709120
  treat_missing_data  = "breaching"
  dimensions          = { DBInstanceIdentifier = module.database.identifier }
}

resource "aws_cloudwatch_metric_alarm" "rds_cpu_high" {
  alarm_name          = "${var.name}-rds-cpu-high"
  alarm_description   = "Staging RDS CPU is elevated"
  namespace           = "AWS/RDS"
  metric_name         = "CPUUtilization"
  statistic           = "Average"
  period              = 300
  evaluation_periods  = 2
  comparison_operator = "GreaterThanThreshold"
  threshold           = 80
  treat_missing_data  = "notBreaching"
  dimensions          = { DBInstanceIdentifier = module.database.identifier }
}

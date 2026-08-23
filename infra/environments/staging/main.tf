module "network" {
  source = "../../modules/network"
  name = var.name
  vpc_cidr = var.vpc_cidr
  azs = var.azs
  public_subnet_cidrs = ["10.42.0.0/24", "10.42.1.0/24"]
  app_subnet_cidrs = ["10.42.10.0/24", "10.42.11.0/24"]
  db_subnet_cidrs = ["10.42.20.0/24", "10.42.21.0/24"]
  tags = var.tags
}

module "security" {
  source = "../../modules/security"
  name = var.name
  vpc_id = module.network.vpc_id
  vpc_cidr = module.network.vpc_cidr
  tags = var.tags
}

module "alb" {
  source = "../../modules/alb"
  name = var.name
  subnet_ids = module.network.public_subnet_ids
  security_group_id = module.security.alb_security_group_id
  vpc_id = module.network.vpc_id
  tags = var.tags
}

module "database" {
  source = "../../modules/database"
  name = var.name
  subnet_ids = module.network.db_subnet_ids
  security_group_id = module.security.db_security_group_id
  kms_key_id = module.security.kms_key_arn
  tags = var.tags
}

module "storage" {
  source = "../../modules/storage"
  name = var.name
  kms_key_arn = module.security.kms_key_arn
  tags = var.tags
}

module "ecs" {
  source = "../../modules/ecs"
  name = var.name
  subnet_ids = module.network.app_subnet_ids
  security_group_id = module.security.app_security_group_id
  target_group_arn = module.alb.target_group_arn
  tags = var.tags
}

resource "aws_wafv2_web_acl" "staging" {
  name = var.name
  scope = "REGIONAL"
  default_action { allow {} }
  rule {
    name = "common-rules"
    priority = 1
    override_action { none {} }
    statement { managed_rule_group_statement { name = "AWSManagedRulesCommonRuleSet" vendor_name = "AWS" } }
    visibility_config { cloudwatch_metrics_enabled = true metric_name = "${var.name}-waf" sampled_requests_enabled = true }
  }
  visibility_config { cloudwatch_metrics_enabled = true metric_name = "${var.name}-waf" sampled_requests_enabled = true }
  tags = var.tags
}

resource "aws_wafv2_web_acl_association" "staging" {
  resource_arn = module.alb.load_balancer_arn
  web_acl_arn = aws_wafv2_web_acl.staging.arn
}

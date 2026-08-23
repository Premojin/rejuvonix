locals { common_tags = merge(var.tags, { Environment = var.name }) }

resource "aws_ecr_repository" "app" {
  name = var.name
  image_tag_mutability = "IMMUTABLE"
  image_scanning_configuration { scan_on_push = true }
  encryption_configuration { encryption_type = "KMS" }
  tags = local.common_tags
}

resource "aws_cloudwatch_log_group" "app" {
  name = "/rejuvonix/${var.name}/application"
  retention_in_days = 30
  tags = local.common_tags
}

data "aws_iam_policy_document" "ecs_assume" {
  statement { actions = ["sts:AssumeRole"] principals { type = "Service" identifiers = ["ecs-tasks.amazonaws.com"] } }
}

resource "aws_iam_role" "execution" {
  name = "${var.name}-ecs-execution"
  assume_role_policy = data.aws_iam_policy_document.ecs_assume.json
  tags = local.common_tags
}

resource "aws_iam_role_policy_attachment" "execution" {
  role = aws_iam_role.execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role" "task" {
  name = "${var.name}-ecs-task"
  assume_role_policy = data.aws_iam_policy_document.ecs_assume.json
  tags = local.common_tags
}

resource "aws_ecs_cluster" "this" {
  name = var.name
  setting { name = "containerInsights" value = "enabled" }
  tags = local.common_tags
}

resource "aws_ecs_task_definition" "app" {
  family = var.name
  cpu = var.cpu
  memory = var.memory
  network_mode = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn = aws_iam_role.execution.arn
  task_role_arn = aws_iam_role.task.arn
  container_definitions = jsonencode([{
    name = "rejuvonix"
    image = "${aws_ecr_repository.app.repository_url}:${var.image_tag}"
    essential = true
    portMappings = [{ containerPort = 3000 hostPort = 3000 protocol = "tcp" }]
    environment = [{ name = "APP_ENV" value = "staging" }]
    logConfiguration = { logDriver = "awslogs" options = { awslogs-group = aws_cloudwatch_log_group.app.name awslogs-region = data.aws_region.current.name awslogs-stream-prefix = "app" } }
    healthCheck = { command = ["CMD-SHELL", "node -e \"fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))\""], interval = 30, timeout = 5, retries = 3, startPeriod = 20 }
  }])
  tags = local.common_tags
}

data "aws_region" "current" {}

resource "aws_ecs_service" "app" {
  name = var.name
  cluster = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count = var.desired_count
  launch_type = "FARGATE"
  enable_execute_command = false
  network_configuration { subnets = var.subnet_ids security_groups = [var.security_group_id] assign_public_ip = false }
  load_balancer { target_group_arn = var.target_group_arn container_name = "rejuvonix" container_port = 3000 }
  depends_on = [aws_iam_role_policy_attachment.execution]
  tags = local.common_tags
}

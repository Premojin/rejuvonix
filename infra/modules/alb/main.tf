locals { common_tags = merge(var.tags, { Environment = var.name }) }

resource "aws_lb" "this" {
  name = var.name
  internal = false
  load_balancer_type = "application"
  security_groups = [var.security_group_id]
  subnets = var.subnet_ids
  drop_invalid_header_fields = true
  enable_deletion_protection = false
  tags = local.common_tags
}

resource "aws_lb_target_group" "this" {
  name = "${var.name}-tg"
  port = var.target_port
  protocol = "HTTP"
  target_type = "ip"
  vpc_id = var.vpc_id
  health_check { path = "/api/health" matcher = "200" interval = 30 timeout = 5 healthy_threshold = 2 unhealthy_threshold = 3 }
  tags = local.common_tags
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.this.arn
  port = 80
  protocol = "HTTP"
  default_action { type = "forward" target_group_arn = aws_lb_target_group.this.arn }
}

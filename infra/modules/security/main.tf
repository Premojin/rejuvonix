locals { common_tags = merge(var.tags, { Environment = var.name }) }

resource "aws_security_group" "alb" {
  name        = "${var.name}-alb"
  description = "Public web ingress to the staging ALB"
  vpc_id      = var.vpc_id
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = merge(local.common_tags, { Name = "${var.name}-alb-sg" })
}

resource "aws_security_group" "app" {
  name        = "${var.name}-app"
  description = "Private ECS application tasks"
  vpc_id      = var.vpc_id
  ingress {
    from_port       = var.app_port
    to_port         = var.app_port
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }
  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    # ECS requires outbound access through the staging NAT for image pulls
    # and external providers. Keep this exception reviewed and bounded at the
    # subnet/NAT layer; production should prefer service endpoints.
    # trivy:ignore:AWS-0104 -- outbound NAT is required for this task design.
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = merge(local.common_tags, { Name = "${var.name}-app-sg" })
}

resource "aws_security_group" "db" {
  name        = "${var.name}-db"
  description = "Private PostgreSQL access from ECS only"
  vpc_id      = var.vpc_id
  ingress {
    from_port       = var.db_port
    to_port         = var.db_port
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.vpc_cidr]
  }
  tags = merge(local.common_tags, { Name = "${var.name}-db-sg" })
}

resource "aws_kms_key" "this" {
  description             = "KMS key for ${var.name} staging data and secrets"
  enable_key_rotation     = true
  deletion_window_in_days = 30
  tags                    = local.common_tags
}

resource "aws_kms_alias" "this" {
  name          = "alias/${var.name}-data"
  target_key_id = aws_kms_key.this.key_id
}

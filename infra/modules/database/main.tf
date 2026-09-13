locals { common_tags = merge(var.tags, { Environment = var.name }) }

resource "aws_db_subnet_group" "this" {
  name       = "${var.name}-db-subnets"
  subnet_ids = var.subnet_ids
  tags       = merge(local.common_tags, { Name = "${var.name}-db-subnets" })
}

resource "aws_db_instance" "this" {
  identifier                      = "${var.name}-postgres"
  engine                          = "postgres"
  engine_version                  = var.engine_version
  instance_class                  = var.instance_class
  allocated_storage               = 20
  max_allocated_storage           = 100
  storage_type                    = "gp3"
  storage_encrypted               = true
  kms_key_id                      = var.kms_key_id
  db_name                         = "rejuvonix"
  username                        = "rejuvonix_app"
  manage_master_user_password     = true
  master_user_secret_kms_key_id   = var.kms_key_id
  db_subnet_group_name            = aws_db_subnet_group.this.name
  vpc_security_group_ids          = [var.security_group_id]
  publicly_accessible             = false
  multi_az                        = false
  backup_retention_period         = var.backup_retention_days
  copy_tags_to_snapshot           = true
  deletion_protection             = var.deletion_protection
  skip_final_snapshot             = true
  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]
  tags                            = merge(local.common_tags, { Name = "${var.name}-postgres" })
}

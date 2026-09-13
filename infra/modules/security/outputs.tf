output "alb_security_group_id" { value = aws_security_group.alb.id }
output "app_security_group_id" { value = aws_security_group.app.id }
output "db_security_group_id" { value = aws_security_group.db.id }
output "kms_key_arn" { value = aws_kms_key.this.arn }

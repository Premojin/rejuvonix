output "user_pool_id" { value = aws_cognito_user_pool.this.id }
output "user_pool_arn" { value = aws_cognito_user_pool.this.arn }
output "app_client_id" { value = aws_cognito_user_pool_client.this.id }
output "domain" { value = "${var.domain_prefix}.auth.${data.aws_region.current.name}.amazoncognito.com" }

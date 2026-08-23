output "alb_dns_name" {
  value = module.alb.load_balancer_dns_name
}

output "ecr_repository_url" {
  value = module.ecs.repository_url
}

output "rds_endpoint" {
  value = module.database.endpoint
}

output "documents_bucket" {
  value = module.storage.bucket_name
}

output "acm_certificate_arn" {
  value = aws_acm_certificate.staging.arn
}

output "acm_dns_validation_records" {
  value = [
    for option in aws_acm_certificate.staging.domain_validation_options : {
      name  = option.resource_record_name
      type  = option.resource_record_type
      value = option.resource_record_value
    }
  ]
}

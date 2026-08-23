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

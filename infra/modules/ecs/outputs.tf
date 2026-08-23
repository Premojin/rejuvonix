output "repository_url" { value = aws_ecr_repository.app.repository_url }
output "repository_arn" { value = aws_ecr_repository.app.arn }
output "cluster_name" { value = aws_ecs_cluster.this.name }
output "service_name" { value = try(aws_ecs_service.app[0].name, null) }
output "service_arn" { value = try(aws_ecs_service.app[0].id, null) }
output "cluster_arn" { value = aws_ecs_cluster.this.arn }
output "task_role_arn" { value = aws_iam_role.task.arn }
output "execution_role_arn" { value = aws_iam_role.execution.arn }

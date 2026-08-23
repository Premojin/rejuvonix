# Staging Observability

Terraform now defines low-volume, detection-only CloudWatch alarms for:

- ECS running tasks below desired capacity
- ALB unhealthy targets
- ALB 5xx responses
- ECS CPU and memory
- RDS free storage and CPU

The alarms intentionally have no notification action until an owner-approved
destination exists. They do not auto-scale beyond the existing ECS maximum of
two tasks and do not auto-rollback infrastructure. ECS Container Insights,
ALB health checks, WAF association, RDS PostgreSQL/upgrade logs, and the
application log group remain the primary operational signals.

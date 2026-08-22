# Staging IaC boundary

This folder is reserved for the first executable Terraform environment. It is
not yet safe to apply: the application has no clinical persistence contract,
runtime authentication decision, health-check contract, or approved AWS
account/network/cost ownership.

Before implementation, approve:

- AWS account and region, DNS zone, ACM certificate, and staging hostname
- VPC CIDR, two-AZ subnet plan, NAT versus VPC endpoint cost choice
- RDS engine/version, backup retention, restore test cadence, and RTO/RPO
- ECS task sizing, autoscaling, image registry policy, and deployment strategy
- KMS key ownership, Secrets Manager paths, log/audit retention, and access roles
- synthetic-data policy and a hard guard preventing production database access

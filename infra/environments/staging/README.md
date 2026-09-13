# Staging IaC boundary

The selected planning region is `us-east-1`. The intended hostname is
`staging.rejuvonix.com`, but no authoritative `rejuvonix.com` Route 53 zone was
discoverable in the current account, so this configuration does not create DNS
records. Terraform requests the ACM certificate and outputs its DNS validation
CNAME. The application listener is intentionally not created until the
certificate is issued; an ALB DNS name alone is not treated as a secure staging
endpoint. The owner must add the CNAME at the authoritative external DNS
provider, then provide the issued ARN through an uncommitted tfvars file as
`certificate_arn`.

The GitHub OIDC subject uses the repository's immutable GitHub organization and
repository IDs observed in CloudTrail, rather than only the display name.

The first staging shape is deliberately small: one ECS task, a maximum of two
tasks, a single NAT gateway, and a Single-AZ small RDS instance inside a
two-AZ network. The NAT and database choices reduce startup cost and are not
production resilience decisions.

The ECS service is intentionally disabled until both prerequisites exist: an
issued ACM certificate ARN (so the target group has a TLS listener) and an
immutable ECR image tag. Enable it with `create_service = true` only after the
image has been pushed and the certificate is issued.

The staging budget default is USD 250/month. Notification delivery is disabled
until an owner-approved notification address is supplied through an uncommitted
tfvars file or CI secret. The budget remains scoped to `Environment=staging`.

The authoritative shared state must be bootstrapped separately from
`infra/bootstrap`; this environment must not be initialized against a remote
bucket until that bootstrap has been reviewed and applied.

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

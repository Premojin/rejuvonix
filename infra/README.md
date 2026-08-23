# Rejuvonix infrastructure foundation

This directory is an intentionally non-provisioning foundation for the target
AWS architecture. No AWS resources were created by this assessment. Terraform
implementation should begin only after account, region, DNS, certificate,
network CIDR, RTO/RPO, BAA/vendor, and cost-owner decisions are approved.

Planned layout:

```text
infra/
  modules/                 reusable network, data, compute, security modules
  environments/
    staging/               first executable environment
    production/            reserved; do not apply during staging work
```

The staging stack should use separate AWS account or OU controls where
possible, a two-AZ VPC, public ALB only, private ECS tasks, private RDS
PostgreSQL, encrypted S3, KMS, Secrets Manager, CloudWatch, CloudTrail, WAF,
ECR, AWS Backup, and VPC endpoints. Production must use separate state,
accounts/resources, secrets, buckets, and keys.

The current staging skeleton includes network, security/KMS, ALB, ECS/ECR,
RDS, S3, WAF, and GitHub OIDC modules. CloudTrail, Config, GuardDuty, Security
Hub, Inspector, Backup, DNS/ACM, alarms, and central log archival require
account/ownership choices documented in [SECURITY_SERVICES.md](SECURITY_SERVICES.md)
before wiring and applying them.

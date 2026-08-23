# AWS staging cost and operations gate

Status: plan-only preparation. No AWS resources were created by this run.

## Account and region

The available credentials resolve to an existing, shared AWS account rather
than a Rejuvonix-dedicated staging account. The selected planning region is
`us-east-1`, based on repository defaults and the absence of a documented
data-residency or latency requirement. Staging should move to a dedicated
account before PHI or production-like sensitive data is authorized.

No authoritative `rejuvonix.com` hosted zone was found. DNS and ACM changes
are therefore deferred; the Terraform configuration does not create an
application listener until an approved ACM certificate ARN is supplied.

## Initial operating targets

These are staging-only defaults and are not production approvals:

- RTO: 4 hours.
- RPO: 24 hours.
- RDS automated backup retention: 7 days.
- Application and operational CloudWatch logs: 30 days.
- Security-relevant logs: 90 days where enabled and justified.
- ECS desired count: 1; autoscaling maximum: 2.
- RDS: small Single-AZ instance with encrypted storage and conservative
  storage autoscaling.
- Data: synthetic or properly de-identified data only; no PHI.

## Cost model

The initial target is USD 150–350/month. A reasonable planning range for the
current small architecture is approximately USD 120–220/month before unusual
traffic, large log volume, data transfer, or optional security-service usage.
AWS pricing varies by account, region, usage, support plan, and security
configuration; refresh this estimate with the AWS Pricing Calculator before
apply.

| Service | Cost classification | Control |
| --- | --- | --- |
| ECS/Fargate | usage-driven baseline | 1 task, 2-task cap, small task size |
| RDS PostgreSQL | recurring baseline | small Single-AZ class, 20 GB gp3, 7-day backups |
| NAT Gateway | recurring baseline | one NAT for staging; production must reassess |
| ALB | recurring baseline | one internet-facing ALB |
| WAF | recurring plus request-driven | one regional ACL with managed common rules |
| CloudWatch | usage-driven | 30/90-day retention, no sensitive payload logging |
| S3/ECR | usage-driven | encryption, lifecycle expiration, 10-image ECR retention |
| KMS | low recurring/request cost | one environment data key plus one state key |
| Backups | storage/usage-driven | 7-day RDS retention; restore testing required |
| Route 53/ACM | optional | deferred until DNS ownership is verified |
| GuardDuty/Config/Security Hub/Inspector | optional or account-wide | enable only after cost and account scope review |

A single NAT is an accepted staging resilience tradeoff. VPC endpoints for
ECR, S3, CloudWatch Logs, Secrets Manager, and STS can reduce NAT dependence,
but endpoint charges and operational complexity should be compared before
adding them. Production should use stronger AZ independence.

## Cost controls

Terraform defines a staging budget with 50%, 80%, 100%, and 120% thresholds.
Notifications are parameterized and remain inactive until an owner-approved
notification address is supplied. All stack resources carry `Project`,
`Environment`, `ManagedBy`, `CostCenter`, `Owner`, and `DataClassification`
tags. Cost Anomaly Detection is not wired yet because its notification
destination and account scope require owner approval.

## Apply gate

Do not apply from shared administrator-user credentials. First approve an
isolated staging account or an explicit shared-account exception, bootstrap the
encrypted remote state, configure the notification destination, review the
plan and current pricing, and establish a short-lived GitHub OIDC deployment
role. Only then should staging be provisioned.

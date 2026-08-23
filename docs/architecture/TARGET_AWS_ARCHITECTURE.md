# Target AWS Architecture

## Environment boundary

Use separate staging and production AWS accounts or tightly isolated OUs,
separate Terraform state, VPCs, databases, S3 buckets, Secrets Manager paths,
KMS keys, ECR repositories, domains, and IAM roles. Staging must have an
explicit deny path preventing production database/network access.

```text
Internet -> Route 53 -> CloudFront -> WAF -> public ALB (two AZs)
                                      |
                         private ECS Fargate tasks (two AZs)
                                      |
                      private RDS PostgreSQL (private subnet group)
                                      |
               KMS + Secrets Manager + S3 (Block Public Access)
```

ECS tasks should have no public IPs. RDS must not be publicly reachable. Use
security groups with least-privilege paths, VPC endpoints where cost-effective,
TLS at every boundary, encrypted EBS/RDS/S3, CloudWatch metrics/logs, CloudTrail,
Config, GuardDuty, Security Hub, ECR image scanning, and AWS Backup.

## Application and data decisions

PostgreSQL is the recommended transactional store for users, patients,
clinicians, roles, permissions, appointments, encounters, consultations,
prescriptions, treatments, orders, consents, documents, communications,
`audit_events`, and `access_events`. These are a recommended domain boundary,
not an instruction to create speculative clinical tables now.

Use S3 for clinical documents only when required, with Block Public Access,
SSE-KMS, restrictive bucket policies, short-lived presigned URLs, access logs,
lifecycle rules, malware scanning/quarantine, and separate buckets per
environment.

Evaluate Cognito for patient/clinician identity only after documenting the
current Workspace identity constraints, MFA/recovery needs, provider licensing
workflow, federation needs, and authorization model. Do not migrate identity
as part of this assessment.

## Resilience and operations

Define RTO/RPO and retention with the owner and counsel; do not infer them from
defaults. Test RDS restore, backup recovery, ECS rollback, key rotation,
incident response, and audit-log retrieval before clinical pilot use.

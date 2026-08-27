# AWS Staging Architecture Assessment

**Assessment date:** 2026-08-27
**Environment:** `rejuvonix-staging` / `us-east-1`
**Account:** `235494780327`
**Status:** CONDITIONALLY READY FOR OWNER-APPROVED STAGING MIGRATION

## Decision

The deployed AWS architecture is structurally suitable for the next staging
PostgreSQL implementation step. A temporary private inspector has now verified
the empty database state read-only. RDS is private, encrypted, backed up, and
reachable only from the ECS application security group. ECS tasks are private,
the ALB is the only public application ingress, HTTPS is active, HTTP redirects
to HTTPS, and WAF is attached.

This is not approval for PHI, production, or migration execution from the
developer workstation. The database migration state is verified as empty from
an application perspective. The fresh non-PHI baseline is prepared locally but
has not been applied; a separate owner-approved migration gate remains
required.

## Governance basis

The assessment follows the applicable v1.0.0 baselines:

- `RAI-GOV-000`, `RAI-SAF-001`, `RAI-SEC-001`, `RAI-SEC-002`, `RAI-AUD-001`, `RAI-TST-001`
- `RIX-GOV-000`, `RIX-API-001`, `RIX-API-002`, `RIX-SEC-001`, `RIX-OBS-001`, `RIX-TST-001`, `RIX-OPS-001`
- `RIX-ARC-001` Platform Integration Architecture
- `TARGET_AWS_ARCHITECTURE.md`
- `POSTGRES_RUNTIME.md`

## Observed architecture

```text
Internet
  -> public ALB (80 redirect, 443 HTTPS)
  -> WAF
  -> private ECS Fargate task(s), no public IP
  -> private RDS PostgreSQL 16.4
  -> RDS-managed Secrets Manager secret + KMS
```

### Network and security

- VPC: `10.42.0.0/16`, with public, application, and database subnets across
  two Availability Zones.
- ECS uses private application subnets and `assignPublicIp = DISABLED`.
- RDS uses a private DB subnet group and `PubliclyAccessible = false`.
- ALB accepts public TCP 80/443 only.
- ECS ingress is limited to ALB security-group traffic on port 3000.
- RDS ingress is limited to the ECS application security group on port 5432.
- ECS egress currently allows `0.0.0.0/0` through a single NAT gateway. This is
  acceptable for this small staging shape but should be reduced with VPC
  endpoints or reviewed egress controls before production.
- RDS egress is restricted to the VPC CIDR.
- WAF is attached to the ALB.

### Data, secrets, and backups

- RDS: PostgreSQL 16.4, `db.t4g.micro`, encrypted, Single-AZ, 20 GiB gp3,
  7-day automated backup retention.
- Available encrypted automated RDS snapshots were observed on 2026-08-24.
- RDS-managed secret contains only `username` and `password`.
- ECS receives `DB_USER` and `DB_PASSWORD` from Secrets Manager.
- `DB_HOST`, `DB_PORT`, and `DB_NAME` are runtime metadata, as required.
- ECS execution-role access is limited to `secretsmanager:GetSecretValue` for
  the RDS secret and `kms:Decrypt` for the environment KMS key.
- Terraform state uses a versioned S3 bucket with SSE-KMS and bucket keys.
- S3 document storage has public access blocked, versioning, SSE-KMS, and
  lifecycle controls.

### Application edge and runtime

- ECS service is healthy at desired/running/pending `1/1/0`.
- ALB target is healthy.
- ECR image scanning is enabled, tags are immutable, and repository encryption
  uses KMS.
- Application logs are retained for 30 days.
- ECS Exec is disabled.
- The live image is the older marketing/staging image, not the local clinical
  runtime implementation. The clinical application is therefore not deployed.

## Readiness evaluation

| Area | Status | Assessment |
| --- | --- | --- |
| Private RDS boundary | Ready | Private subnets and no public reachability |
| ECS-to-RDS path | Ready | Security-group-only port 5432 ingress |
| Secret contract | Ready | Username/password secret plus runtime metadata |
| TLS configuration | Ready in code | Runtime requires TLS in staging; connection must be verified in-network |
| Backups | Staging-ready | 7-day retention and available encrypted snapshots |
| Application health | Ready for current image | Current image is healthy but does not contain clinical runtime |
| Migration inspection | Complete | Temporary private read-only Fargate inspector verified the empty state |
| Migration execution | Blocked | Fresh baseline requires owner approval and restore-test evidence or risk acceptance |
| Production/PHI readiness | Not ready | Shared account, Single-AZ RDS, limited operational validation |

## Known drift and out-of-scope items

An unrelated uncommitted `infra/environments/staging/network-cost-investigation.tf`
file is also present in the worktree. AWS inspection found its investigation S3
bucket and Athena workgroup, but no active VPC Flow Logs for the staging VPC.
This is partial investigation state, not a PostgreSQL prerequisite, and was
neither applied nor changed during this assessment. It requires separate
ownership and reconciliation before any future Terraform apply.

Terraform state is reconciled for the core deployed architecture. A
non-applying plan showed seven CloudWatch alarm resources as additions:

- ECS running-task alarm
- ALB unhealthy-target alarm
- ALB 5xx alarm
- ECS CPU alarm
- ECS memory alarm
- RDS CPU alarm
- RDS storage alarm

These are pre-existing Terraform state drift and are not part of PostgreSQL
implementation. They must not be applied merely to make the plan clean.

## Required gates before PostgreSQL migration

1. Preserve the private RDS boundary.
2. Provide an approved in-network read-only inspection path, such as ECS Exec
   enabled through a reviewed task-definition/service change or a dedicated
   one-off inspection image/task with the existing private subnets, security
   group, secret references, and no ALB registration.
3. Confirm the Drizzle migration journal, expected clinical tables, and role /
   permission seed state using metadata-only queries.
4. Apply only missing additive migrations after the state classification is
   known.
5. Verify the migration journal again from inside the VPC.
6. Deploy the clinical application image only after the database state is
   understood and the image is immutable and identified by Git SHA.

## Risks and recommended follow-up

- The AWS account is shared and uses a long-lived IAM user in the current
  inspection context. Use the approved GitHub OIDC deployment role and obtain
  the required account-ownership exception before broader promotion.
- RDS is Single-AZ and ECS desired capacity is one task. This is acceptable for
  synthetic staging, not a production resilience posture.
- ECS Exec is disabled, leaving no current operational path to inspect the
  private database. Resolve this deliberately; do not open RDS to the public
  internet.
- NAT-backed unrestricted ECS egress should be revisited with VPC endpoints or
  explicit egress policy before production.
- Backup restore, migration rollback, alert delivery, and audit retrieval still
  require tested evidence.

## Final assessment

The AWS build is **conditionally okay for synthetic staging PostgreSQL
implementation**, but it is **not yet ready for migration execution** until the
fresh non-PHI baseline receives owner approval and the restore/recovery gate is
closed. No networking broadening, public RDS exposure, or unrelated alarm
application is warranted.

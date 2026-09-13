# Staging Database State

**Inspection date:** 2026-08-27
**Environment:** `rejuvonix-staging` / `us-east-1`
**Classification:** C — CLINICAL/NON-PHI SCHEMA MIGRATION MISSING

## Method

A temporary immutable Node 22 + `pg` Fargate task ran once in the existing
private ECS application subnets using the existing application security group.
The task used TLS with the Amazon RDS CA bundle, began a transaction with
`SET TRANSACTION READ ONLY`, issued only structural `SELECT`/`SHOW` queries,
rolled back, and exited successfully. No application service or Terraform
configuration was changed.

## Observed database state

- PostgreSQL: 16.4
- Database: `rejuvonix`
- Non-system schemas: `public`
- Migration journal: no migration-tracking table found
- Baseline `0000_lively_edwin_jarvis.sql`: NOT APPLIED
- Role seed `0001_seed_clinical_roles.sql`: NOT APPLIED

### Expected table presence

| Table | State |
|---|---|
| `users` | ABSENT |
| `roles` | ABSENT |
| `permissions` | ABSENT |
| `user_roles` | ABSENT |
| `role_permissions` | ABSENT |
| `patients` | ABSENT |
| `appointments` | ABSENT |
| `consents` | ABSENT |
| `encounters` | ABSENT |
| `treatment_plans` | ABSENT |

Expected role names (`Patient`, `Clinician`, `Administrator`, `Operations`,
`Support`, `Service`) were all ABSENT because the roles table is absent.

## Recovery state

- Automated backup retention: 7 days
- Latest restorable time observed: `2026-08-27T03:52:41Z`
- Latest automated snapshot observed: available, `2026-08-26`
- Database restore tested: NO

## Data boundary

The inspection retrieved no application rows, clinical content, summaries,
notes, patient values, clinician values, or secrets. `encounters` and
`treatment_plans` remain EmberFlow-owned legacy Rejuvonix schema and have no
new PHI-write authorization.

The fresh non-PHI baseline is prepared locally at
`drizzle/postgres-baseline/0000_rejuvonix_non_phi_baseline.sql`; it has not been
applied to staging. Migration execution remains a separate owner-approved gate.

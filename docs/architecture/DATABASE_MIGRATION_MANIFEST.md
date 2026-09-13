# Database Migration Manifest

No migration is executed by this reconciliation.

| Migration | Order | Scope | Status | Future staging execution |
|---|---:|---|---|---|
| `drizzle/postgres/0000_lively_edwin_jarvis.sql` | historical | Identity, RBAC, account, scheduling, audit, plus legacy clinical-shaped tables | HISTORICAL — DO NOT APPLY TO FRESH ENVIRONMENTS; SUPERSEDED BY CURRENT BASELINE | Never in fresh staging |
| `drizzle/postgres/0001_seed_clinical_roles.sql` | historical | Role/permission seed data | SUPERSEDED BY CURRENT AUTH SEED | Never in fresh staging |
| `drizzle/postgres-baseline/0000_rejuvonix_non_phi_baseline.sql` | 0 | Current non-PHI application schema and least-privilege RBAC seed | Current fresh-environment baseline; locally validated | Separate owner-approved staging gate |

The existing runner is explicit (`npm run db:migrate:postgres`) and is not part
of application startup. The historical migration directory must not be used
for a fresh environment. The current runner defaults to
`./drizzle/postgres-baseline`; its journal is independent of the historical
stream. Applied migration history must never be rewritten. A future staging
change requires a new reviewed additive migration and live journal verification.

As a safety guard, the runner now requires the explicit environment confirmation
`REJUVONIX_MIGRATION_CONFIRMATION=APPROVED_NON_PROD_MIGRATION` in addition to a
database URL. This is a stop-gap execution gate, not approval to run the
historical baseline or any staging migration.

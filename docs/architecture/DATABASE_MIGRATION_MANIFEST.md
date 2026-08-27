# Database Migration Manifest

No migration is executed by this reconciliation.

| Migration | Order | Scope | Status | Future staging execution |
|---|---:|---|---|---|
| `0000_lively_edwin_jarvis.sql` | 0 | Identity, RBAC, account, scheduling, audit, plus legacy clinical-shaped tables | Historical baseline; contains owner-review clinical entities | NO until disposition is approved |
| `0001_seed_clinical_roles.sql` | 1 | Role/permission seed data | Historical seed migration | NO automatic execution |

The existing runner is explicit (`npm run db:migrate:postgres`) and is not part
of application startup. The migration directory must not be treated as a safe
future execution manifest while the baseline includes legacy clinical-shaped
tables. Applied migration history must never be rewritten. A future staging
change requires a new reviewed additive migration and live journal verification.

As a safety guard, the runner now requires the explicit environment confirmation
`REJUVONIX_MIGRATION_CONFIRMATION=APPROVED_NON_PROD_MIGRATION` in addition to a
database URL. This is a stop-gap execution gate, not approval to run the
historical baseline or any staging migration.

# V152 Owner-Gate Decisions

**Assessment status:** Read-only classification; no staging, AWS, database, or
GitHub action performed.

## A. Remaining dirty-file inventory

| Path | Category | Purpose | Decision |
|---|---|---|---|
| `app/clinical/authentication.ts` | AUTH / IDENTITY | Cognito claim normalization and identity result | KEEP; safe to commit with runtime group |
| `app/clinical/authorization.ts` | API / AUTHORIZATION | Principal identity/scopes and object authorization types | KEEP WITH MODIFICATION; clinical resource types need boundary review |
| `app/sign-in/page.tsx` | AUTH / IDENTITY | Cognito authorization-code entry UI | KEEP; safe to commit with auth runtime |
| `db/postgres.ts` | POSTGRESQL / DB | PostgreSQL URL, TLS, pool, and Drizzle runtime | KEEP; safe to commit after credential/config review |
| `app/api/v1/_lib/*` | API / AUTHORIZATION | Authenticated API helpers, CSRF, safe errors, correlation IDs | KEEP; safe to commit after endpoint review |
| `app/api/v1/auth/*` | AUTH / IDENTITY | OAuth callback/config/me/signout | KEEP WITH MODIFICATION; integration-test and cookie review required |
| `app/api/v1/patients/*` | API / AUTHORIZATION | Patient own-resource API | KEEP; safe with authorization tests |
| `app/api/v1/consents/*` | API / AUTHORIZATION | Versioned consent metadata API | KEEP; verify no clinical payload fields |
| `app/api/v1/appointments/*` | API / AUTHORIZATION | Appointment reference API | KEEP WITH MODIFICATION; external ownership remains provisional |
| `app/api/v1/clinician/*` | API / AUTHORIZATION | Assigned-workforce patient metadata API | OWNER REVIEW REQUIRED; must not expose EmberFlow clinical records |
| `app/auth/callback/page.tsx` | AUTH / IDENTITY | Browser callback handoff | KEEP; safe with auth runtime |
| `app/clinical/runtime.ts` | AUTH / IDENTITY | Cognito subject to local principal/RBAC mapping | KEEP; safe to commit with auth group |
| `app/clinical/events.ts` | API / AUTHORIZATION | Audit/access/security persistence helpers | KEEP; safe with DB group |
| `tests/clinical-runtime.test.mjs` | TEST | RBAC/object-authorization tests | KEEP; safe with runtime group |
| `docs/architecture/CLINICAL_FOUNDATION.md` | GOVERNANCE | Runtime architecture notes | KEEP; update to EmberFlow boundary before commit |
| `docs/architecture/POSTGRES_RUNTIME.md` | GOVERNANCE | Database runtime notes | KEEP; update non-PHI scope before commit |
| `docs/security/AUTHENTICATION_IMPLEMENTATION.md` | GOVERNANCE | Auth implementation record | KEEP; update/test claims before commit |
| `docs/security/RBAC_ENFORCEMENT.md` | GOVERNANCE | RBAC enforcement record | KEEP; review clinical-resource language |
| `docs/testing/STAGING_VALIDATION.md` | GOVERNANCE | Validation handoff | KEEP; no deployment implied |
| `docs/architecture/AWS_STAGING_ARCHITECTURE_ASSESSMENT.md` | GOVERNANCE | AWS architecture assessment | KEEP; separate documentation commit or owner review |
| `docs/engineering/*` | GOVERNANCE | Workstream/deployment coordination | KEEP; separate governance commit |
| `drizzle/postgres/meta/_journal.json` | MIGRATION | Adds seed journal entry | DEFER; applied DB state is unknown; do not commit yet |
| `drizzle/postgres/0001_seed_clinical_roles.sql` | MIGRATION | Idempotent RBAC/permission seed | OWNER REVIEW REQUIRED; verify journal and staging state first |
| `infra/environments/staging/main.tf` | TERRAFORM / AWS | Cognito/ECS DB-secret/runtime wiring | OWNER REVIEW REQUIRED; AWS state/import alignment required |
| `infra/environments/staging/outputs.tf` | TERRAFORM / AWS | Cognito/secret outputs | OWNER REVIEW REQUIRED; avoid exposing sensitive outputs |
| `infra/environments/staging/variables.tf` | TERRAFORM / AWS | Staging tags | KEEP but unrelated to runtime; separate review |
| `infra/modules/ecs/main.tf` | TERRAFORM / AWS | ECS secret/IAM/environment wiring | OWNER REVIEW REQUIRED; deployment-impacting |
| `infra/modules/ecs/variables.tf` | TERRAFORM / AWS | ECS runtime inputs | OWNER REVIEW REQUIRED; deployment-impacting |
| `infra/environments/staging/network-cost-investigation.tf` | TERRAFORM / AWS | Temporary VPC flow-log/S3/Athena investigation | DEFER; unrelated network-flow investigation, no apply |
| `infra/modules/cognito/*` | TERRAFORM / AWS | Cognito pool/client/domain/groups | OWNER REVIEW REQUIRED; likely already represented in AWS; never recreate blindly |

## B. Auth/runtime disposition

The Cognito verifier uses access-token verification, maps recognized Cognito
groups, and then maps the external subject to a local active user and roles.
This is valid and should be kept. The sign-in and callback UI align with the
OAuth authorization-code direction. The code is not independently ready for
remote integration until cookie/CSRF behavior, environment contracts, and
database availability are reviewed together.

The v152 sessionStorage account flow remains preview-only and is not replaced
by these server APIs. It must not be described as production authentication.

## C. Database and PHI disposition

`users`, RBAC tables, non-PHI patient/profile metadata, consent
metadata, appointments/reference state, clinician assignment metadata, and
audit/access/security events are valid candidates. The current schema also
defines `encounters` and `treatment_plans`; their `summary` fields are
potentially clinical content and cannot be treated as approved non-PHI storage.

## D. `encounters`

**Disposition: EMBERFLOW-OWNED / LEGACY SCHEMA — NO NEW PHI WRITES.** Historical columns:
`id`, `patient_id`, `clinician_id`, `appointment_id`, `status`, `summary`,
`created_at`, and `updated_at`. It is defined in the baseline SQL and Drizzle
schema but has no active API route or runtime query in the dirty work. The
`summary` field is PHI-risk-bearing. The fresh non-PHI baseline intentionally
does not create this table. Rejuvonix must not use this table as a
clinical record store or populate `summary` or any other clinical-content field.
Do not narrow or drop the historical schema without an applied-state check and
an approved migration plan.

## E. `treatment_plans`

**Disposition: EMBERFLOW-OWNED / LEGACY SCHEMA — NO NEW PHI WRITES.** Historical columns:
`id`, `patient_id`, `clinician_id`, `status`, `summary`, `created_at`, and
`updated_at`. It is defined in the baseline SQL and Drizzle schema but has no
active API route or runtime query in the dirty work. The `summary` field can
contain treatment decisions or clinical notes. The fresh non-PHI baseline
intentionally does not create this table. Rejuvonix must not use this
table as a treatment record store or populate `summary` or other clinical
treatment content. Do not narrow or drop the historical schema during this
gate.

## F. Clinician APIs

**Disposition: NON-PHI METADATA ONLY.** Clinician-facing Rejuvonix APIs may retain clinician application identity, assignment references, external patient references where appropriate, appointment/workflow identifiers, workflow status, and operational metadata. They must not become APIs for locally persisted clinical notes, diagnoses, treatment decisions, or encounter content.

## G. Preview account UX

**Disposition: PRESERVE UI — CONNECT TO COGNITO IN GOVERNED AUTH WORKSTREAM.** The v152 sign-up/sign-in/account experience remains intact. Its sessionStorage/preview authentication is local demo behavior only; governed Cognito integration is a later auth workstream.

## H. Network investigation

**Disposition: DEFERRED / OUT OF SCOPE.** `network-cost-investigation.tf` is not part of application or runtime integration and must not be applied here.

## I. Migration disposition

`0000_lively_edwin_jarvis.sql` is historical and creates legacy
clinical-shaped tables; it is superseded and must not be applied to fresh
environments. `0001_seed_clinical_roles.sql` is also superseded by the current
non-PHI authorization seed and must not be reused unchanged.

The fresh environment uses
`drizzle/postgres-baseline/0000_rejuvonix_non_phi_baseline.sql` with an
independent Drizzle journal. It contains only the current non-PHI application
schema and least-privilege authorization seed.

The migration runner is explicit rather than startup-triggered, and the local
approval-confirmation guard is present in the committed reconciliation. No
migration was run here. There is no safe basis to claim the staging journal
matches the local journal.

**Current inspection classification: C. CLINICAL/NON-PHI SCHEMA MIGRATION
MISSING.** A temporary private Fargate inspector completed a TLS-verified,
read-only transaction inside the existing staging network. PostgreSQL 16.4
reported only the `public` schema, no migration-tracking table, no expected
application tables, and no expected role names. The baseline and role seed were
not executed during this inspection.

## J. Terraform disposition

The Cognito and ECS changes are deployment-impacting and require owner review,
state reconciliation, and a fresh non-apply plan. They must not be bundled into
an application commit. `network-cost-investigation.tf` is explicitly separate
from v152 runtime work and remains deferred; it must not be applied as part of
this integration.

Read-only inspection confirms the Cognito pool, app client, domain, six groups,
ECS task/execution roles, and the RDS-managed secret wiring already exist in
AWS/state. The live ECS service is on revision 13 while the refreshed Terraform
state/config plan would select revision 11, so this is an owner-review
configuration reconciliation gate. The non-applying plan also contains seven
CloudWatch alarm additions and a staging tag update; the alarms are
pre-existing Terraform state drift and remain out of scope.

The active task definition confirms the RDS secret is used only for
`DB_USER`/`DB_PASSWORD`; `DB_HOST`, `DB_PORT`, and `DB_NAME` are supplied as
separate runtime environment values.

RDS read-only metadata shows 7-day automated backup retention, an available
automated snapshot dated 2026-08-26, and latest restorable time
2026-08-27T03:52:41Z. A restore has not been tested.

## K. Recommended future commit groups

1. **Auth/runtime controls:** `app/clinical/authentication.ts`,
   `app/clinical/authorization.ts`, `app/clinical/runtime.ts`,
   `app/api/v1/_lib/`, `app/api/v1/auth/`, `app/auth/`, `app/sign-in/page.tsx`,
   and their focused tests/docs.
2. **Non-PHI API/database runtime:** `db/postgres.ts`, patient/consent/
   appointment APIs, `app/clinical/events.ts`, with explicit exclusion of
   `encounters` and `treatment_plans` as EmberFlow-owned legacy tables.
3. **Migration seed:** `0001_seed_clinical_roles.sql` and journal only after
   staging applied-state verification and owner approval.
4. **Governance documentation:** architecture/security/testing/engineering docs
   after claims are aligned with the PHI boundary.
5. **Terraform/AWS:** all `infra/` changes in a separate owner-controlled
   change, excluding or separately approving the network investigation.

## L. Resolved owner decisions

- `encounters`: EmberFlow-owned legacy Rejuvonix schema; no new PHI writes.
- `treatment_plans`: EmberFlow-owned legacy Rejuvonix schema; no new PHI writes.
- Clinician APIs: non-PHI metadata only.
- Preview account UX: preserve the UI; connect to Cognito in the governed auth
  workstream; current preview/sessionStorage auth is local demo only.
- Network investigation: deferred and out of scope.

The role-seed migration remains a separate owner-approved migration gate. The
Terraform reconciliation remains a separate infrastructure gate.

## M. Staging readiness impact

**CONDITIONALLY READY — DATABASE MIGRATION AND TERRAFORM GATES REMAIN.** Local application gates
passed on the prior scoped reconciliation commit, and the owner decisions for
legacy clinical-shaped tables, clinician API scope, preview UX, and network
investigation are recorded. The staging database requires the separately
approved baseline and role-seed migration plan; Terraform/AWS reconciliation
also remains pending.

**AI IMPLEMENTATION PAUSED.** No AI implementation was modified or resumed.

# Staging Database Baseline Plan

**Plan date:** 2026-08-27
**Environment:** `rejuvonix-staging` / `us-east-1`
**Status:** PLAN ONLY — NO STAGING MUTATION

## A. Verified starting state

Read-only inspection found PostgreSQL 16.4 with database `rejuvonix`, only the
`public` schema, no migration journal, no expected application tables, no
expected roles, and no application rows. The database classification is C:
clinical/non-PHI schema migration missing. The restore test status is NO.

## B. Historical migration disposition

`drizzle/postgres/0000_lively_edwin_jarvis.sql` is **HISTORICAL — DO NOT APPLY
TO FRESH ENVIRONMENTS; SUPERSEDED BY CURRENT BASELINE**. It creates the
legacy `encounters` and `treatment_plans` tables and is retained unchanged as
repository history.

`drizzle/postgres/0001_seed_clinical_roles.sql` is **SUPERSEDED BY CURRENT AUTH
SEED**. Its authorization content is represented in the new baseline with the
same narrow role/permission set; the historical file is retained unchanged.

## C. Fresh baseline and journal strategy

The fresh stream is isolated at
`drizzle/postgres-baseline/0000_rejuvonix_non_phi_baseline.sql`, with local
journal metadata at `drizzle/postgres-baseline/meta/_journal.json`. When the
runner initializes a database, Drizzle records the applied entry in
`drizzle.__drizzle_migrations`. This is strategy B:
formally superseded historical migrations plus a new current-state baseline.
The separate folder is required because Drizzle applies migration files in
folder order; placing a new file after historical `0000` would apply the
superseded clinical schema to an empty database.

The migration runner defaults to the new baseline folder and rejects the
historical folder. It still requires
`REJUVONIX_MIGRATION_CONFIRMATION=APPROVED_NON_PROD_MIGRATION`. No startup
auto-migration is introduced.

## D. Tables included

The baseline creates exactly:

- `users`
- `roles`
- `permissions`
- `user_roles`
- `role_permissions`
- `patients`
- `patient_profiles`
- `clinicians`
- `appointments`
- `consents`
- `audit_events`
- `access_events`
- `security_events`

`clinicians` is retained because current clinician APIs use a dedicated
application assignment entity. No workflow/integration-reference table is
created because current runtime code has no database dependency for one; the
workflow route returns an external-provider contract reference only.

## E. Tables excluded

- `encounters`: created NO; EmberFlow-owned legacy clinical schema.
- `treatment_plans`: created NO; EmberFlow-owned legacy clinical schema.
- `sessions`: created NO; current runtime does not use local sessions.
- Workflow/integration reference table: created NO; no current runtime need.

## F. Identity and patient boundary

`users` contains `id`, `external_subject`, `email`, `status`, `tenant_id`,
`created_at`, and `updated_at`. It stores no passwords, Cognito tokens, or
clinical data.

`patients` contains `id`, `user_id`, `status`, `created_at`, and `updated_at`.
`patient_profiles` contains `id`, `patient_id`, `display_name`,
`preferred_contact_method`, `created_at`, and `updated_at`. These are account
and application metadata only. Patient APIs must resolve the patient by the
authenticated server-side user identity and enforce own-record authorization.

## G. Appointment, consent, and clinician models

`appointments`: `id`, `patient_id`, nullable `clinician_id`, `status`,
`scheduled_at`, `created_at`, `updated_at`. These are scheduling and assignment
references only; there is no clinical reason, diagnosis, note, or treatment
field.

`consents`: `id`, `patient_id`, `consent_type`, `version`, `status`, `source`,
`granted_at`, `revoked_at`, `created_at`, `updated_at`. Consent records contain
metadata/evidence provenance only and never clinical form answers.

`clinicians`: `id`, `user_id`, `status`, `created_at`, `updated_at`. This is
workforce/application assignment metadata only.

## H. Workflow and EmberFlow references

No workflow table is included in this baseline. Current workflow integration is
an application-owned provider abstraction using opaque in-memory references;
future persistence may add only reviewed opaque fields such as
`external_provider`, `external_reference_id`, `workflow_status`,
`handoff_timestamp`, and `last_sync_status`. Clinical payloads remain in
EmberFlow and are not eligible for this database.

## I. Audit, security, and authorization seed

`audit_events`, `access_events`, and `security_events` contain actor/resource
identifiers, actions, outcomes, request/correlation identifiers, reasons, safe
metadata, and timestamps. They do not store request bodies or clinical payloads.

Roles and scopes:

| Role | Scope |
|---|---|
| Patient | `own` |
| Clinician | `assigned-patient` |
| Administrator | `administrative` |
| Operations | `administrative` |
| Support | `support-limited` |
| Service | `system` |

Permissions are exactly: `patient:read-own`, `patient:update-own`,
`consent:manage-own`, `appointment:request-own`, `patient:read-assigned`,
`appointment:manage`, and `administration:manage`.

Mappings are Patient → first four patient/consent/appointment permissions;
Clinician → `patient:read-assigned` and `appointment:manage`;
Administrator → `administration:manage`; Operations → `appointment:manage`;
Support and Service → no seeded application permissions.

## J. Migration execution prerequisites

Before staging execution, obtain owner approval for the final SQL and the
fresh migration stream, confirm the target remains empty or reconcile any
unexpected state, and use an intentional command containing the approval
confirmation and baseline folder. Execute through the approved private path,
then verify the journal and table/role metadata read-only. Do not run the
historical migration stream.

## K. Rollback and recovery

Preferred option 1: perform a controlled restore test from the latest
automated snapshot into a temporary isolated RDS instance before the first
schema migration, then validate restore and rollback evidence.

Option 2: an owner explicitly accepts the risk of proceeding with a 7-day
backup but untested restore. This plan does not choose that option silently.

The baseline is additive and should be applied in one transaction where the
approved migration runner permits. If execution fails before commit, stop and
inspect. If rollback is required after commit, use the approved database
restore/recovery procedure; do not improvise destructive `DROP` operations.

## L. Validation plan

Validate from an empty ephemeral PostgreSQL database: migration succeeds,
`__drizzle_migrations` contains the fresh baseline entry, all included tables
exist, excluded clinical tables do not exist, prohibited clinical-bearing
columns are absent, and exact role/permission mappings are present. Run the
static schema and authorization contract tests plus the application gates.

## M. Restore-test gap

`DATABASE RESTORE TESTED: NO`. Backup retention and an automated snapshot are
not evidence of a tested rollback. Staging migration remains blocked pending
option 1 or explicit owner risk acceptance under option 2.

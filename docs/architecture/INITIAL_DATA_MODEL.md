# Initial PostgreSQL Domain Model

This is a logical model only. No clinical tables or patient data are added by
this run; the current Drizzle schema remains empty and D1-specific until the
PostgreSQL adapter and clinical ownership decisions are approved.

## Initial domains

- Identity: `users`, `roles`, `permissions`, `user_roles`, `sessions`
- Patient: `patients`, `patient_profiles`, `consents`
- Clinical: `clinicians`, `appointments`, `encounters`, `treatment_plans`
- Security: `audit_events`, `access_events`, `security_events`

Use UUID/UUIDv7-style identifiers, `created_at`, `updated_at`, lifecycle state,
and explicit actor/tenant ownership. Use foreign keys, unique constraints,
check constraints for state transitions, and indexes for actor/resource/time,
assignment, and appointment queries. Store only the minimum necessary clinical
data in each table. Keep secrets, tokens, and full clinical payloads out of logs.

## Boundary rules

Patients may access only their own records. Clinicians require an active care
assignment or approved encounter scope. Administrative/support roles do not gain
clinical access implicitly. Service accounts receive narrow permissions and no
interactive sessions. Audit and access events are append-only to application
roles and exported to protected operational storage.

## Retention and migration

Retention, legal hold, correction, and deletion rules require owner/counsel
decisions before schema finalization. Clinical records should use controlled
status transitions rather than destructive deletes. Migrations must be additive,
backward-compatible, reviewed, reversible where practical, and run only against
the intended environment. Staging fixtures must be generated synthetic data;
production snapshots must never be copied into staging without approved
de-identification.

Future modules—prescriptions, pharmacy, payments, documents, labs, video,
notifications, and orders—remain outside this first model until their data
controller, retention, vendor, and access requirements are defined.

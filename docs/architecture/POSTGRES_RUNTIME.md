# PostgreSQL Runtime

The AWS runtime database boundary is PostgreSQL through Drizzle and
`db/postgres.ts`. The application must receive `DATABASE_URL` from a secure
runtime mechanism; it must never be committed, printed, or returned by a
health endpoint. The adapter uses a bounded pool (`DB_POOL_MAX`, default 5),
connection and idle timeouts, and TLS verification in production.

The approved Rejuvonix PostgreSQL schema is generated from
`db/postgres-schema.ts` with:

```bash
npm run db:generate:postgres
```

Apply it only to the intended synthetic staging database with:

```bash
DATABASE_URL='[injected securely]' npm run db:migrate:postgres
```

Migrations are a separate operational step, not application startup behavior.
The active schema is limited to identity, non-PHI account/profile metadata,
workflow and external-reference state, consent metadata, scheduling
references, and audit/access/security metadata. It does not make Rejuvonix a
clinical record system of record. Medical history, symptoms, allergies,
medications, diagnoses, clinical notes, assessments, treatment decisions,
prescriptions, laboratory data, and clinical intake answers belong to the
designated external regulated provider boundary and are not active Rejuvonix
tables.

The historical `encounters` and `treatment_plans` definitions are retained in
older migration history for traceability and are classified in
`V82_D1_TO_TARGET_MAPPING.md`; they are not part of the active exported schema.
The reconciliation migration `0001_non_phi_workflow_references.sql` is
additive and has not been applied to any staging or production database.

Before ECS wiring, Terraform must provide a Secrets Manager-backed runtime
secret and the ECS task role must have only the required secret read action.

# PostgreSQL Runtime

The AWS runtime database boundary is PostgreSQL through Drizzle and
`db/postgres.ts`. The application must receive `DATABASE_URL` or the database
connection components from a secure runtime mechanism; it must never be
committed, printed, or returned by a health endpoint. ECS injects the existing
RDS-managed secret fields at runtime. The adapter uses a bounded pool
(`DB_POOL_MAX`, default 5), query/connection/idle timeouts, and TLS
verification in staging and production.

The current fresh-environment baseline is maintained in
`drizzle/postgres-baseline/0000_rejuvonix_non_phi_baseline.sql` and is aligned
with `db/postgres-schema.ts`. It can be regenerated with:

```bash
npm run db:generate:postgres
```

Apply it only to the intended synthetic staging database with:

```bash
REJUVONIX_MIGRATION_CONFIRMATION=APPROVED_NON_PROD_MIGRATION \
REJUVONIX_MIGRATIONS_FOLDER=./drizzle/postgres-baseline \
DATABASE_URL='[injected securely]' npm run db:migrate:postgres
```

Migrations are a separate operational step, not application startup behavior.
The fresh baseline creates identity, patient metadata, consent metadata,
appointments, clinician assignment metadata, RBAC, and audit/security tables.
It does not create `encounters`, `treatment_plans`, passwords, or patient
fixtures.

Terraform provides the RDS-managed Secrets Manager secret ARN to ECS and the
execution role has only the required secret read/decrypt actions.

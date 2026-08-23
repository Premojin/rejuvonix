# PostgreSQL Runtime

The AWS runtime database boundary is PostgreSQL through Drizzle and
`db/postgres.ts`. The application must receive `DATABASE_URL` from a secure
runtime mechanism; it must never be committed, printed, or returned by a
health endpoint. The adapter uses a bounded pool (`DB_POOL_MAX`, default 5),
connection and idle timeouts, and TLS verification in production.

The first migration is generated from `db/postgres-schema.ts` with:

```bash
npm run db:generate:postgres
```

Apply it only to the intended synthetic staging database with:

```bash
DATABASE_URL='[injected securely]' npm run db:migrate:postgres
```

Migrations are a separate operational step, not application startup behavior.
The initial migration is additive and creates identity, patient, consent,
clinical, and security tables only. No password columns or patient fixtures
are included.

Before ECS wiring, Terraform must provide a Secrets Manager-backed runtime
secret and the ECS task role must have only the required secret read action.

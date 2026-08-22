# Environment Model

Supported targets are `local`, `staging`, and `production`.

- Local: synthetic fixtures only; developer-scoped secrets in an ignored
  `.env.local`; no production endpoints.
- Staging: separate AWS account/OU resources, database, buckets, keys, secrets,
  domain, logs, and CI role; synthetic/de-identified data only.
- Production: separate account/resources and approvals; no staging credentials,
  state, data, or network routes.

Use `.env.example` as the committed contract. Keep `.env.local`, `.env.staging`,
and `.env.production` untracked; inject staging/production values at runtime
from AWS Secrets Manager/SSM and CI environment protection. Validate `APP_ENV`
and environment-specific resource identifiers at startup, and fail closed if a
staging process receives a production database, bucket, or key identifier.

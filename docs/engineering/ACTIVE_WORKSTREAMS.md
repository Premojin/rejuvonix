# Active Rejuvonix Workstreams

Rejuvonix is one project and one application architecture. Workstreams are
separate for coordination, not separate products.

## DEV1

- Branch: `codex/clinical-runtime-and-auth` (local recovery worktree)
- Owner: Primary developer / primary Codex workflow
- Scope: Clinical authentication, Cognito integration, PostgreSQL runtime,
  RBAC, protected APIs, consent, audit/access/security events, and staging
  infrastructure configuration
- Status: Active, uncommitted local implementation; PR not yet opened
- Dependencies: Latest `origin/staging`, confirmed staging database state,
  owner-approved deployment workflow
- Shared files: `package.json`, `db/`, `drizzle/`, `app/api/`,
  `app/clinical/`, `infra/`, `.github/workflows/`
- AWS impact: Owner/Dev1 only; no deployment authorized by this registry
- Migration impact: Pending migration-state verification; collisions must be
  checked before merge

## DEV2

- Branch: No active Dev2 branch currently identified
- Owner: Dev2
- Scope: STUDY / AWAITING ASSIGNMENT
- Status: The latest identified Dev2 work was merged as PR #12
  (`developer-2/image-performance-optimization`); no new assignment is
  invented here
- Dependencies: Owner-assigned scope and `origin/staging`
- Shared files: Must be declared in the PR template before work begins
- AWS impact: None without explicit owner/Dev1 request and handoff
- Migration impact: None currently assigned

## Rules

- New work branches from `origin/staging`.
- Normal feature branches use `dev1/*` or `dev2/*`; existing `codex/*`
  branches are retained as historical names until safely retired.
- PRs target `staging` for integration.
- No implementation overlap by default.
- Shared contracts may be coordinated explicitly.
- Dev2 does not deploy AWS or merge deployment-triggering changes.
- Owner/Dev1 controls Terraform, AWS changes, staging deployment, and
  production promotion.
- Database migration collisions must be detected before merge.
- Terraform collisions must be detected before merge.

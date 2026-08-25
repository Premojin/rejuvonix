# Active Rejuvonix Workstreams

Rejuvonix is one project and one application architecture. Workstreams are separate for coordination, not separate products.

## DEV1

- Branch: `codex/clinical-runtime-and-auth` (protected recovery worktree)
- Owner: Primary developer / primary Codex workflow
- Scope: Cognito, PostgreSQL runtime, RBAC, protected APIs, consent, audit/access/security events, and staging infrastructure configuration
- Status: Active, uncommitted local implementation; no PR opened
- Dependencies: PHI boundary disposition, official EmberFlow documentation, migration-state review
- Shared files: `package.json`, `db/`, `drizzle/`, `app/api/`, `app/clinical/`, `infra/`
- AWS impact: Owner/Dev1 only; no deployment authorized here
- Migration impact: Clinical-table disposition and collision review required

## DEV2

- Branch: No active Dev2 branch currently identified
- Owner: Dev2
- Scope: STUDY / AWAITING ASSIGNMENT
- Status: Latest identified Dev2 work was merged as PR #12; no scope invented here
- AWS impact: None without explicit owner/Dev1 request
- Migration impact: None currently assigned

## TROY / V82

- Branch: `codex/rejuvonix-v82-sync`
- Owner: Troy / incoming product experience workstream
- Scope: Public site, patient-facing UX, goals/services/treatments, eligibility preview, and local fixtures
- Status: Reconciled locally only; no merge or deployment
- Dependencies: PHI boundary, Cognito/runtime replacement, official EmberFlow contract
- AWS impact: None in this run
- Migration impact: D1/SQLite intake direction rejected as canonical; PostgreSQL target requires new review

## Integration

- Branch: `integration/troy-codebase-reconciliation`
- Owner: Primary Codex / owner review
- Scope: Local architecture reconciliation and documentation
- Status: Active local review; stop before staging merge
- AWS impact: None
- Migration impact: Documentation/disposition only; no migration applied

## Rules

- New work branches from `origin/staging`.
- No silent implementation overlap.
- PRs target `staging`.
- Dev2 does not deploy AWS or merge deployment-triggering changes.
- Owner/Dev1 controls Terraform, AWS changes, staging deployment, and production promotion.
- Migration collisions must be reported before implementation.
- AI implementation is paused pending explicit owner authorization.

# Rejuvonix Development Operating Model

## Roles

### Owner

The owner approves scope, resolves workstream conflicts, controls production
promotion, and authorizes exceptions to the normal branch and deployment model.

### DEV1

The primary developer / primary Codex workflow owns owner-assigned platform,
backend, security, integration, clinical foundation, and deployment work. DEV1
performs authorized staging integration and is the only normal developer
workflow permitted to cause AWS deployment.

### DEV2

Dev2 is a collaborator on the same Rejuvonix application. Dev2 develops only
an explicitly assigned scope, works from `staging`, opens PRs, responds to CI
and review, and stops at PR-ready unless the owner authorizes integration.
Dev2 does not need AWS credentials for ordinary development.

## Branch model

```text
main       <- production-ready release path; protected
  ^
staging    <- integration branch; protected and deployment-controlled
  ^
  +-- dev1/<domain>-<feature>
  +-- dev2/<domain>-<feature>
  +-- ops/<purpose>
  +-- hotfix/<purpose>
```

Existing `codex/*` branches are historical names and are not renamed
automatically.

## Pull requests and deployment

All normal changes return through a PR into `staging`. A merge to `staging`
may trigger the staging deployment workflow, so merge authority is deployment
authority. Dev2 PRs require owner/Dev1 review and authorized integration.

Production promotion requires a separately approved release path from validated
staging to `main`; no feature branch should target `main` directly.

## Coordination boundaries

Before changing a shared file, inspect active branches and PRs. High-risk shared
files include:

- `package.json`, lockfiles, and `AGENTS.md`
- database schemas and migration directories
- Terraform and GitHub Actions
- global types, auth middleware, API contracts, and environment configuration
- global CSS/layout

For migrations, fetch latest staging, inspect migration history, check open
PRs and both workstreams, confirm sequence/name uniqueness, and check for
overlapping table mutations. Report any conflict as **DATABASE WORKSTREAM
COLLISION**; do not silently repair another workstream.

Terraform is owner/Dev1 controlled. Dev2 may inspect and submit an
**AWS INFRASTRUCTURE CHANGE REQUEST**, but may not apply Terraform, manipulate
shared state, or provision AWS without explicit authorization.

## Handoffs

Every handoff identifies scope, dependencies, shared files, database impact,
AWS impact, deployment authority, tests, rollback, and unresolved risks.

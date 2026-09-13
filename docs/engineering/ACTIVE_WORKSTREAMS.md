# Active Workstreams

| Workstream | Owner | Status | Scope |
| --- | --- | --- | --- |
| `codex/clinical-runtime-and-auth` | Primary Codex workflow | Active | Clinical runtime, Cognito/MFA, server-side identity, RBAC, object authorization, consent, audit/access/security events, and minimum authenticated APIs |
| Dev2 | Dev2 | Unknown assignment | No Dev2 feature assignment was visible during this coordination check |

## Coordination rules

- Work is isolated by focused feature branch and integrates through `staging`.
- No overlapping implementation is assumed without explicit owner direction.
- The primary Codex workflow controls AWS deployment authority.
- Dev2 stops at the PR/integration-ready boundary unless separately authorized.
- Synthetic/de-identified data only; no credentials or PHI belong in source control.

## This workstream's dependencies

The runtime depends on the existing staging PostgreSQL schema and RDS-managed
secret. Cognito resources and ECS secret references are additive Terraform
changes owned by the primary deployment workflow.

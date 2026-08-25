# Rejuvonix Development Operating Model

Rejuvonix is one application with coordinated developer workstreams.

## Roles

- Owner: approves scope, resolves conflicts, controls production promotion, and authorizes exceptions.
- DEV1: primary platform/backend/security/integration/deployment workflow; controls authorized staging integration and AWS changes.
- DEV2: works only on explicitly assigned scope, opens PRs, responds to review, and stops at PR-ready unless the owner authorizes integration.
- Troy/V82: incoming product/UI workstream; reconciliation occurs through a dedicated integration branch.

## Architecture boundary

Rejuvonix owns application identity, RBAC, non-PHI workflow/application state, references, and metadata-only audit/security events. EmberFlow owns PHI and regulated clinical records. No developer may infer an EmberFlow API contract.

## Coordination

Before changing `package.json`, schemas, migrations, auth, API contracts, infrastructure, or global UI, inspect active branches and PRs. Migration conflicts are reported as **DATABASE WORKSTREAM COLLISION**. Terraform/AWS requests use the infrastructure change request and remain owner/Dev1 controlled.

## AI freeze

AI implementation is paused. Existing governance documentation may remain, but no AI runtime, agent, model, retrieval, embedding, tool, or provider implementation is in scope without explicit owner authorization.

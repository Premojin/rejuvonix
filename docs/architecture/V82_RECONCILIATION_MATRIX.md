# V82 Reconciliation Matrix

## Decision context

Rejuvonix is the application, identity, workflow, and integration layer. EmberFlow is the designated regulated external platform for PHI and clinical records. EmberFlow API documentation, credentials, webhook documentation, authentication scheme, and payload contracts are not yet available.

No EmberFlow contract is inferred by this matrix.

| Domain | V82 state | Staging state | DEV1 state | Target state | Action | Rationale |
|---|---|---|---|---|---|---|
| Homepage | New visual experience | Governed public site | No material dependency | V82 public experience | KEEP V82 | Preserve approved product/UI work. |
| Navigation | Goals, services, account entry | Existing public navigation | Protected runtime is separate | Patient-facing public navigation | MERGE | Keep patient entry; exclude workforce access. |
| Treatments | Expanded treatment/product presentation | Existing treatment routes | No material dependency | Public education only | KEEP V82 | Content is not a clinical record. |
| Goals/services | New route families and discovery | Limited route set | No material dependency | Public discovery and eligibility entry | KEEP V82 | Preserve product experience. |
| Eligibility | Interactive local preview | Existing start/get-started flow | Clinical API boundary exists | Non-PHI workflow followed by provider handoff | MODIFY | Intake initiation may remain; PHI must not persist locally. |
| Sign-in | Simulated account flow | Anonymous/public baseline | Cognito/JWT design | Cognito-backed patient sign-in | REBUILD | Demo auth cannot represent production identity. |
| Sign-up | Simulated account creation | No governed public auth | Cognito patient identity planned | Public patient Cognito signup | REBUILD | Preserve UX while replacing simulation. |
| Account/patient portal | Simulated dashboard | No full portal | Protected patient API primitives | Non-PHI patient workflow portal | MERGE | Portal owns account/workflow references, not clinical records. |
| Consent | V82 preview only | No runtime consent | Consent metadata primitive | Versioned consent metadata and evidence references | MERGE | Consent evidence can remain in Rejuvonix without PHI payloads. |
| Intake | D1/SQLite intake schema and local preview | PostgreSQL clinical direction | Local clinical persistence proposed | Mock provider handoff; EmberFlow owns PHI intake | REBUILD | Prevent duplicate PHI system of record. |
| Appointment | Public claims/content only | PostgreSQL appointment table | Appointment API direction | Provisional non-PHI scheduling reference model | MODIFY | External ownership remains unknown pending docs. |
| Practitioner/workforce | Not present | Not public | Cognito/MFA/RBAC direction | Invitation-only protected workforce boundary | KEEP DEV1 | Do not build a large workforce UI here. |
| Authentication | Demo/browser state | Anonymous baseline | Cognito verifier and mapping | Cognito + server-side principal mapping | KEEP DEV1 | Governed identity remains valid. |
| Authorization | No runtime enforcement in V82 | Protected API primitives | RBAC/object authorization | Deny-by-default server-side authorization | KEEP DEV1 | UI visibility is not authorization. |
| APIs | Health only | `/api/v1` clinical APIs | Auth/patient API primitives | Non-PHI APIs plus provider boundary | MERGE | Expose references/status, not raw PHI rows. |
| PostgreSQL | Not canonical in V82 | PostgreSQL runtime/schema | PostgreSQL adapter and identity/RBAC | Rejuvonix non-PHI application store | MODIFY | Retain operational ownership while removing PHI duplication. |
| D1 | SQLite/D1 schema and migration | Not authoritative | PostgreSQL | No production authority | REMOVE | D1 must not become the canonical store. |
| Drizzle | D1 schema | PostgreSQL schema | PostgreSQL Drizzle runtime | Drizzle + PostgreSQL for approved non-PHI models | MODIFY | Preserve ORM, re-scope models. |
| Migrations | D1 intake migration | PostgreSQL clinical migration | PostgreSQL seed/runtime migrations | New additive non-PHI migration plan | DEFER | Do not mechanically migrate PHI tables. |
| Audit | V82 fixtures/docs | Audit primitives | Audit/access/security event builders | Metadata-only audit and security events | KEEP DEV1 | No PHI payloads in ordinary events. |
| Security | Incomplete/demo auth | Governance baseline | JWT, RBAC, CSRF/security direction | Governed security boundary | KEEP DEV1 | Required for patient/workforce access. |
| Build scripts | Missing typecheck/governance scripts; GNU timeout dependency | Full governed scripts | Full scripts | Portable, truthful validation | REBUILD | Restore gates without masking errors. |
| Dependencies | Removed `pg` and `aws-jwt-verify` | Present | Required | Restore approved runtime dependencies | MERGE | Runtime architecture requires them. |
| Governance | Indexes/security/architecture present; engineering docs absent | Governance baseline | Engineering docs in local work | Preserve and extend governance | MERGE | Reconciliation is governed work. |
| AI | Existing governance and architecture docs | AI governance baseline | No requested AI scope | Deferred; no implementation | DEFER | Explicit owner freeze. |

## Collision assessment

- DEV1 overlap: YES in shared authentication, PostgreSQL, API, migration, and infrastructure files; handled by classification and boundary changes, without editing the Dev1 worktree.
- DEV2 overlap: NO active Dev2 branch or open PR identified; PR #12 is already merged.
- Database collision: YES, the existing Dev1 PostgreSQL clinical schema overlaps the new PHI ownership boundary. This is a disposition issue, not an automatic deletion or migration.
- Migration collision: YES, existing PostgreSQL clinical migration state must not be extended blindly. New non-PHI migrations require a separately reviewed additive sequence.
- API contract collision: YES, existing clinical API names need re-scoping to non-PHI application/reference APIs until EmberFlow contracts arrive.

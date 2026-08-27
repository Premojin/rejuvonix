# Rejuvonix v152 Reconciliation Matrix

Local assessment for bundle `5fd0cff536f56519566e50b0ffd96af16924ad24`.
Remote integration is limited to owner-reviewed pull-request preparation;
deployment and staging mutation remain out of scope.

| Area | Current local state | V152 state | Target state | Action | Rationale |
|---|---|---|---|---|---|
| Homepage | Governed product shell with local Dev1 changes | Expanded cinematic/product experience | Preserve governed shell plus approved product improvements | MERGE | High-value UI, but shared entrypoint requires review. |
| Treatments | Existing governed routes | Expanded product cards and dynamic pages | Keep valid product discovery and route contracts | MERGE | Preserve UX without weakening APIs/auth. |
| Your Goals | Three approved visible choices | Redesigned/expanded goal experience | Exactly three approved visible choices | REBUILD | Prevent taxonomy regression. |
| Compounded Care | Fixed `$199` baseline | Restored price and imagery refinements | Fixed `$199`, no variable qualifier | MERGE | Preserve owner-approved behavior. |
| Membership | Existing baseline | New membership experience and imagery | Keep product UX, validate claims/content | MERGE | Product value with content review. |
| Connected Health/Jin | Governed boundary and retained routes | New Jin experience | Local/product preview only until auth/integration review | KEEP V152 | UI can be reviewed without activating integration. |
| Eligibility | Existing route/API safeguards | Full assessment flow and new assets | Preserve route safety and non-PHI boundary | MERGE | Import UI selectively. |
| Patient account | Governed identity direction | Simulated member journey | Cognito-backed production identity; demo local only | REBUILD | Preview auth cannot become production authority. |
| Workforce access | Protected/invitation-only direction | No accepted replacement authority | Cognito + MFA + RBAC + deny-by-default | KEEP CURRENT | Security architecture wins. |
| Authentication | Cognito/JWT/RBAC runtime work is uncommitted | ChatGPT/sessionStorage preview helpers | Governed server auth | KEEP CURRENT | Do not overwrite Dev1 work. |
| APIs | `/api/v1` governed baseline | Preview/export additions | DTO/service boundaries and safe errors | KEEP CURRENT | Requires endpoint-level review. |
| PostgreSQL | Non-PHI application database work in progress | Divergent D1/schema shape | PostgreSQL + Drizzle for non-PHI data | KEEP CURRENT | Avoid database replacement. |
| D1/SQLite | Non-canonical references only | Export/D1 examples | Local/traceability only | DEFER | No production activation. |
| Clinical/PHI models | EmberFlow owns regulated PHI | Clinical drafts/fixtures | Mock/UI only; no Rejuvonix PHI persistence | REBUILD | Enforce boundary. |
| EmberFlow | Provider placeholder only | Configuration-shaped concepts | Official-docs-driven adapter later | DEFER | Documentation and credentials pending. |
| Migrations | Governed PostgreSQL history/worktree changes | Divergent Drizzle files | Reviewed additive migrations only | DO NOT IMPORT | Never rewrite or run migrations during intake. |
| Build/runtime | Node 22/Vinext runtime safeguards | Node 22, Vinext `0.0.50` devDependency | Compatible production packaging | REBUILD | Current staging runs `vinext start` with omitted dev deps. |
| Governance | Current staging governance retained | No authoritative governance tree | Current governance remains authoritative | KEEP CURRENT | Prevent downgrade. |
| Tests | Clinical/security tests present locally | Additional export/UI tests | Combined governed suite | MERGE | Selective, non-duplicative import. |
| AWS/Terraform | Existing staging architecture | Not accepted for intake | No infrastructure changes | REMOVE | Out of scope. |
| AI | Explicitly paused | No approved AI implementation | Paused | KEEP CURRENT | Owner authorization required. |

## Gate

V152 is suitable for local product review, not for blind branch merge or deployment. Selective UI import can proceed only after preserving the current dirty worktree and leaving auth, database, PHI, EmberFlow, governance, infrastructure, and AI boundaries under current authority.

## Selective import recorded

The current branch now contains the v152 public/product UI, routes, components, styles, assets, and clearly labeled fictional account preview. The current branch’s dirty clinical/runtime, auth, PostgreSQL, migration, Terraform, and governance work was preserved. V152 package/runtime, database, provider, ChatGPT-auth, and governance replacements were not imported. This remains a local review state requiring owner reconciliation before any remote integration.

## Formal reconciliation status

| Area | Current reconciled state | Decision |
|---|---|---|
| Authentication | Cognito/JWT/RBAC runtime; v152 account remains a labeled preview | KEEP CURRENT; DEMO AUTH ONLY |
| API | Governed `/api/v1` routes plus guarded workflow boundary | KEEP CURRENT; MERGE SAFE BOUNDARY |
| Provider | Internal `ClinicalDataProvider`; local mock only by explicit local/test selection | MERGE |
| PHI | Clinical payload keys rejected; no Rejuvonix clinical persistence | REBUILD/ENFORCE |
| PostgreSQL | Drizzle + `pg` for identity, RBAC, profile, consent, references, and events | KEEP CURRENT |
| Legacy clinical tables | `encounters`, `treatment_plans` retained for classification only | EMBERFLOW-OWNED / OWNER REVIEW |
| Migrations | Historical baseline superseded; fresh non-PHI baseline prepared and locally validated; no staging execution | KEEP HISTORY; OWNER MIGRATION GATE |
| Runtime | Node 22 and Vinext production dependency remain required | KEEP CURRENT |
| Tests | Built worker reused per file so suite exits reliably | MERGE |
| AI | No implementation | KEEP PAUSED |

## Integration readiness

The branch is reviewable for GitHub PR preparation after local validation. The
staging database migration remains unapplied and requires owner approval plus
restore-test evidence or explicit acceptance of the untested-restore risk.
Terraform/AWS reconciliation remains a separate non-apply gate. No real
EmberFlow adapter or AI backend is included.

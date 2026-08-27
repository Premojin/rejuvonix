# Rejuvonix v152 Import Assessment

Status: local assessment only; no GitHub or AWS changes performed.

## Source

- Bundle: `~/Downloads/Rejuvonix_Telehealth_v152_5fd0cff.bundle`
- Bundle ref: `refs/heads/main`
- Source head: `5fd0cff536f56519566e50b0ffd96af16924ad24`
- Source history: complete bundle, 118 commits unique from the current governed branches
- Common base with current branches: `e80c731d417382ebfe26d3262afd4fbf42270d0a`
- Current working branch: `codex/clinical-runtime-and-auth`
- Current working branch head: `7cc5d8fd9c7e06b9c19d38b44d0e59934accbcc8`
- Current worktree: contains uncommitted Dev1 clinical-runtime, security, Terraform, and related work. A binary patch and untracked-file archive were recorded under `/private/tmp` before integration.

## Lineage assessment

V152 is a divergent, complete-history product/UI branch descended from the old `e80c731` base. It is not a clean descendant of current staging, the clinical-runtime branch, or v127. It contains a long sequence of Troy/product commits, including the v82-era experience and later refinements.

Relative to `codex/clinical-runtime-and-auth`, v152 has 118 unique commits. The current branch has 15 unique commits from that common base, including the governed clinical/runtime and staging foundation work. A whole-branch merge would therefore risk overwriting current security, infrastructure, migration, and governance work.

## Sensitive-content intake

No credential, key, token, certificate, database dump, or PHI file was identified by the filename/content scan. Clinical-looking files are treated as UI/mock or boundary-review candidates, not as permission to activate persistence. Secret values were not printed.

## Domain assessment

| Area | Classification | Assessment |
|---|---|---|
| UI/UX, imagery, treatment presentation | SAFE TO IMPORT | Product experience and visual refinements are the primary value of v152, subject to current baseline checks. |
| Homepage, cards, carousels, membership, Connected Health/Jin | SAFE TO IMPORT / REQUIRES RECONCILIATION | Strong product additions; import selectively because homepage and shared styles overlap current work. |
| Your Goals and Compounded Care | REQUIRES RECONCILIATION | Verify the three approved goals, fixed `$199`, and sharp/localized imagery before accepting. |
| Patient portal/account/demo journey | REQUIRES RECONCILIATION | v152 contains simulated account/clinical journey behavior; retain only as preview UX. |
| Workforce portal | OWNER REVIEW REQUIRED | No governed workforce expansion is accepted from this bundle without review. |
| Auth, ChatGPT helper, session/demo auth | DO NOT IMPORT AS AUTHORITY | Preview/demo mechanisms must not replace Cognito, JWT, RBAC, or object authorization. |
| API changes | REQUIRES RECONCILIATION | Preserve `/api/v1` governed services; do not import raw or preview-only clinical APIs blindly. |
| PostgreSQL/Drizzle/schema/migrations | DO NOT IMPORT WHOLESALE | V152 removes/replaces baseline DB files and adds a divergent D1-oriented schema shape. Current governed non-PHI PostgreSQL work is protected. |
| D1/SQLite/examples | DO NOT IMPORT AS PRODUCTION | Retain only for traceability or local preview review; D1 is not canonical. |
| PHI/clinical drafts and fixtures | REQUIRES RECONCILIATION | Mock/UI fixtures may remain local; no clinical answers may become Rejuvonix persistence. |
| EmberFlow | DO NOT IMPORT AS REAL INTEGRATION | No official contract is established; no URL, auth, webhook, or payload may be activated. |
| Node/Vinext/build | REQUIRES RECONCILIATION | v152 uses Node 22 and Vinext `0.0.50` as a devDependency while invoking `vinext start`; this conflicts with the staging runtime packaging model. |
| Governance/security docs | DO NOT DOWNGRADE | The bundle has no current governance tree; staging governance remains authoritative. |
| Tests | SAFE TO IMPORT SELECTIVELY | v152 adds intake/rendering coverage, but tests must be reconciled with governed security tests. |
| AWS/Terraform | DO NOT IMPORT | No infrastructure changes are authorized in this local intake. |
| AI | DO NOT IMPORT | AI implementation remains paused. |

## Current approved UI baseline

- Your Goals must remain exactly Weight Loss, Longevity & Skin, and Rejuvonix Care.
- Compounded Care must retain the fixed `$199` representation without variable-price qualifiers.
- Homepage images must remain sharp, readable, localized behind text, and undistorted.

V152 contains relevant product refinements, including the `$199` restoration and image-quality commits, but those files overlap existing local work and require selective integration rather than blind replacement.

## Architecture collisions requiring reconciliation

- `app/chatgpt-auth.ts` and simulated session storage are export/preview auth only.
- V152 clinical draft/intake types and fictional fixtures must remain local/mock and cannot create PHI persistence.
- V152 EmberFlow configuration-shaped concepts are unverified and cannot become a real adapter.
- V152's D1/SQLite-oriented files cannot replace governed PostgreSQL for non-PHI application data.
- V152 package metadata removes current validation/runtime dependencies and must not replace the governed package surface without review.

## Import disposition

Import is intentionally selective. Product assets and non-conflicting UI additions may be copied from the bundle into the current branch. Overlapping app entrypoints, package metadata, auth, database, migrations, governance, infrastructure, and provider-boundary files remain protected or require explicit reconciliation. No staging migrations, AWS actions, or external integration are part of this intake.

## Local selective-import result

Imported locally: v152 homepage/product presentation, public product and wellness routes, Connected Health/Jin and Membership preview pages, goal/eligibility presentation, shared UI components/styles, image assets, and the explicitly fictional sign-up/account preview flow. The account flow is labeled simulation-only, accepts only `@example.com` addresses, stores a browser-tab session, and does not create or transmit an account.

Not imported: v152 package/lockfile, Vite/build/runtime configuration, database/schema/Drizzle files, migrations, EmberFlow/provider library files, ChatGPT auth helper, infrastructure, governance documentation, and tests that would replace current governed coverage. Existing dirty Dev1 clinical/auth/Terraform files were not overwritten.

The current governed sign-in page and server `/api/v1` auth/RBAC routes remain in place. The v152 page and styles are now present for local review, while the preview account flow remains a reconciliation item before any staging use.

## Post-import status

- Clean install is not yet re-run after the selective source import; existing Node 22 dependencies remain available locally.
- TypeScript and the initial build passed after the import; the full test command must be rechecked after the preview routes were added.
- Local checks: `/`, `/api/health`, `/treatments`, `/compounded`, `/eligibility`, `/get-started`, `/sign-in`, `/sign-up`, `/account`, `/membership`, `/connected-health`, `/support`, `/faq`, and approved goal pages are expected to be verified on port 5177.
- The v152 title change was not accepted; the current governed `Rejuvonix | Online Weight Care` metadata and homepage phrase were restored so existing contract tests remain authoritative.

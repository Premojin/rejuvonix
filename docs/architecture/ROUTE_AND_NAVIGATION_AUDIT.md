# Rejuvonix Route and Navigation Audit

Audit baseline: `b3eceabdc14708b0ebc77a9a6b7253f79362a257`  
Audit branch: `codex/platform-route-audit-and-flow-cleanup`

This audit covers the application route tree, rendered internal links, CTAs,
product routes, public navigation, and current clinical boundary. It does not
claim that the future authenticated clinical runtime exists.

## Canonical routes

| Route | Purpose | Boundary | Status | Action |
| --- | --- | --- | --- | --- |
| `/` | Public marketing homepage | Public | 200 | Canonical |
| `/treatments` | Treatment collection | Public | 200 | Canonical |
| `/treatments/glp-1-injections` | Compounded injectable education | Public | 200 | Canonical |
| `/treatments/glp-1-tablets` | Compounded tablet education | Public | 200 | Canonical |
| `/treatments/wegovy-pill` | Branded treatment education | Public | 200 | Canonical |
| `/treatments/wegovy-injection` | Branded treatment experience | Public | 200 | Canonical |
| `/treatments/zepbound-injection` | Branded treatment education | Public | 200 | Canonical |
| `/compounded` | Compounded-care education | Public | 200 | Canonical |
| `/get-started` | Informational eligibility questionnaire | Public | 200 | Canonical |
| `/sign-in` | Patient account entry boundary | Public shell | 200 | Authentication unavailable in preview |
| `/how-it-works` | Process education | Public | 200 | Canonical |
| `/support` | Program/support education and contact | Public | 200 | Canonical |
| `/faq` | Frequently asked questions | Public | 200 | Canonical |
| `/safety` | Safety and role information | Public | 200 | Canonical |
| `/api/health` | Minimal service health response | Public API | 200 | Contract route |

There are 11 route patterns in the application: 10 public page patterns
(including the dynamic treatment pattern) and one API route. The dynamic
treatment pattern currently exposes five concrete product paths listed above.

## Redirected legacy routes

No legacy application aliases were present, so no app-level redirects were
added. Infrastructure remains responsible for HTTP-to-HTTPS redirection.
There are no known `/start`, `/eligibility`, `/quiz`, `/login`, `/patient`,
`/clinician`, `/admin`, or `/operations` route implementations to preserve.

## Removed duplicate routes

None. No duplicate route files or multi-hop redirect chains were found.

## Link and CTA findings

The audit checked rendered internal links from every canonical public route,
including header, footer, treatment cards, product comparison cards, anchors,
and CTA destinations.

The following inconsistencies were corrected:

- Both compounded cards previously linked to the same compounded injectable
  detail path, including tirzepatide. Both now use the shared eligibility entry
  path because there is no dedicated compounded tirzepatide detail route.
- The homepage quiz result button previously only closed its modal. It now
  links to `/get-started` and clearly states that clinical intake is not wired
  in this preview.
- `/get-started` previously used a `mailto:` link labeled as secure assessment
  continuation. It now links to the patient sign-in boundary and discloses that
  authentication and clinical intake are unavailable in this preview.
- The patient sign-in button was a silent no-op. It is now visibly disabled
  with an honest preview-state message; support access remains a working email
  link.
- Detail-page navigation was hidden on responsive layouts without a replacement
  control. A keyboard-accessible mobile menu now mirrors the intentional desktop
  links.
- The homepage brand link now uses `/` instead of an anchor-only home link.
- The compounded education page now uses the current compounded vial assets.

No `href="#"`, empty href, `javascript:void(0)`, localhost URL, preview URL,
or malformed internal route was found. External prescribing-information links
remain HTTPS and use `rel="noreferrer"`.

## Protected and future routes

No patient, clinician, admin, operations, or portal route is currently exposed
by the application. The clinical modules provide authorization, consent, audit,
and authentication primitives, but they are not mounted as public web routes.
The next runtime phase must add server-authorized routes rather than relying on
hidden links or client-side route secrecy.

## API routes

| Route | Boundary | Contract |
| --- | --- | --- |
| `/api/health` | Public health | `{ "status": "ok" }` only |

No database, AWS, credential, environment, or clinical record data is returned
by the health endpoint. No other `/api/*` route exists in this branch.

## Validation

`tests/route-links.test.mjs` renders all canonical public routes, checks the
five concrete treatment paths, verifies invalid treatment slugs return 404,
resolves rendered internal links and same-page anchors, checks the health
contract, and confirms future portal paths are not accidentally public.

Known future gaps are documented in `USER_JOURNEY_MODEL.md`; they are not
represented as fake links or implied working clinical functionality.

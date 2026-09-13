# EmberFlow CRM Capability Inventory

**Assessment status:** Contract-pending discovery; read-only assessment
**Assessment date:** 2026-08-27
**Evidence limitation:** The authenticated in-app browser was unavailable. The
owner-provided URL could not be inspected past the unauthenticated boundary.
No CRM capability below is marked verified unless supported by the repository
or owner-provided context.

## Public evidence

EmberFlow's public materials describe a CRM for generated leads and new client
bookings, text/email automation, dedicated client sub-accounts, calendar
connections, and follow-up by phone, text, and email. A public EmberFlow page
also links to `app.gohighlevel.com`. This makes a HighLevel-based or
HighLevel-linked implementation **POSSIBLE**, not verified. It does not prove
the account's enabled modules, API contract, tenant model, or white-label
configuration. See the [public terms](https://www.emberflowai.com/terms) and
[public EmberFlow page](https://www.emberflowai.com/homeold).

| Capability | Available | Rejuvonix use case | Data classification | PHI risk | API available? | Webhook available? | Current Rejuvonix equivalent | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Contacts | PUBLICLY DESCRIBED; ACCOUNT UNKNOWN | Create/link a CRM contact after approved lifecycle trigger | Identity/CRM | Potentially PHI | UNKNOWN | UNKNOWN | Cognito user + local patient | Confirm fields, matching, deduplication and consent |
| Contact custom fields | UNKNOWN | Source, program interest, normalized workflow metadata | CRM metadata | Potentially PHI | UNKNOWN | UNKNOWN | Local profile/workflow metadata | Use allowlist; never send clinical answers |
| Tags | UNKNOWN | Non-clinical segmentation if required | CRM metadata | Low/Potential | UNKNOWN | UNKNOWN | None | Avoid as source of truth |
| Opportunities | UNKNOWN | Lifecycle reference/status | CRM metadata | Potentially PHI | UNKNOWN | UNKNOWN | Workflow status concept | Retain opaque ID/status only if needed |
| Pipelines/stages | UNKNOWN | Map CRM lifecycle to normalized application status | Operational metadata | Potentially PHI | UNKNOWN | UNKNOWN | No authoritative pipeline | Do not encode stages before inventory |
| Conversations | UNKNOWN | Support/contact history | Communications | Potentially PHI | UNKNOWN | UNKNOWN | `mailto:` support preview | Keep clinical conversations out of Rejuvonix |
| SMS | PUBLICLY DESCRIBED; ACCOUNT UNKNOWN | Transactional reminders/follow-up | Communications | Consent-sensitive | UNKNOWN | UNKNOWN | None active | Confirm A2P, opt-in, STOP and sender ownership |
| Email | PUBLICLY DESCRIBED; ACCOUNT UNKNOWN | Transactional/marketing communication | Communications | Consent-sensitive | UNKNOWN | UNKNOWN | `mailto:` only | Separate marketing from care communications |
| Calls/voicemail | PUBLICLY DESCRIBED; ACCOUNT UNKNOWN | Support or scheduling | Communications | Potentially PHI | UNKNOWN | UNKNOWN | None active | Treat recordings/transcripts as PHI until proven otherwise |
| Calendar/appointments | PUBLICLY DESCRIBED; ACCOUNT UNKNOWN | Booking, confirmation, cancellation, reminders | Scheduling | Potentially PHI | UNKNOWN | UNKNOWN | `/api/v1/appointments` and local table | Decide CRM-authoritative vs reference-only |
| Forms | UNKNOWN | Non-clinical lead capture or handoff | CRM intake | Potentially PHI | UNKNOWN | UNKNOWN | In-memory React forms | Do not submit production test data |
| Surveys | UNKNOWN | Non-clinical feedback | Intake/CRM | Potentially PHI | UNKNOWN | UNKNOWN | None | Exclude clinical questions unless contract permits |
| Funnels/websites | Owner URL and public materials indicate funnels/websites; account capability UNKNOWN | Hosted onboarding or redirect target | Product/CRM | Potentially PHI | UNKNOWN | UNKNOWN | Native Rejuvonix pages | Compare hosted, embedded and API-first options |
| Workflows/automations | UNKNOWN | Lead routing, handoff, reminders | Operational workflow | Potentially PHI | UNKNOWN | UNKNOWN | Local workflow boundary only | Inventory read-only; do not edit |
| Triggers | UNKNOWN | Start automations from contact/form/stage events | Operational workflow | Potentially PHI | UNKNOWN | UNKNOWN | None | Require event and idempotency semantics |
| Campaigns | UNKNOWN | Nurture/marketing | Communications | Consent-sensitive | UNKNOWN | UNKNOWN | None | Keep outside clinical consent |
| Tasks | UNKNOWN | Internal follow-up | Operational metadata | Potentially PHI | UNKNOWN | UNKNOWN | None | Use only minimum necessary metadata |
| Payments/products | PUBLIC MATERIALS MENTION PAYMENT PROCESSING; ACCOUNT UNKNOWN | Checkout or payment status | Financial metadata | Sensitive | UNKNOWN | UNKNOWN | Not active in inspected routes | Do not move payment authority without decision |
| Memberships | PUBLIC MATERIALS MENTION MEMBERSHIP-LIKE SERVICES; ACCOUNT UNKNOWN | Subscription/lifecycle status | Account metadata | Sensitive | UNKNOWN | UNKNOWN | `/membership` marketing experience | Keep Rejuvonix experience until contract comparison |
| Documents | UNKNOWN | Non-clinical documents or links | Sensitive documents | High | UNKNOWN | UNKNOWN | None | Clinical documents remain EMR-bound |
| Custom objects | UNKNOWN | Structured domain extension | Unknown | Unknown | UNKNOWN | UNKNOWN | PostgreSQL domain tables | Avoid until ownership and retention are known |
| Notes | UNKNOWN | Internal operational notes | Sensitive text | Potentially PHI | UNKNOWN | UNKNOWN | None | Prohibit clinical notes in CRM integration payloads |
| Users/teams | UNKNOWN | Assignment/routing | Workforce identity | Sensitive | UNKNOWN | UNKNOWN | Local RBAC/clinician metadata | Cognito remains Rejuvonix auth authority |
| Reporting | UNKNOWN | Funnel/operations metrics | Operational analytics | Potentially PHI | UNKNOWN | UNKNOWN | None | Use aggregate/non-PHI metrics only |
| API/developer settings | UNKNOWN | Future adapter contract | Credentials/config | High | UNKNOWN | UNKNOWN | No CRM config | Obtain official docs before implementation |
| Webhooks | UNKNOWN | Status/event synchronization | Event metadata/payload | Potentially PHI | UNKNOWN | UNKNOWN | No receiver | Require signature, replay and dedupe design |
| OAuth/apps/integrations | UNKNOWN | Provider authorization | Secrets/tokens | High | UNKNOWN | UNKNOWN | Cognito only | Do not change auth until verified |
| EMR/clinical handoff | UNKNOWN | Start or observe downstream clinical workflow | Clinical workflow | Very high | UNKNOWN | UNKNOWN | `ClinicalDataProvider` placeholder | Treat as unknown; do not assume FHIR |

## Tenancy

The owner-provided URL contains a location-scoped route. That is evidence of a
location-shaped URL, not proof of the platform's tenancy model. Organization,
agency, location, sub-account, and tenant semantics remain UNKNOWN. The opaque
location identifier is intentionally not reproduced in this document.

## Discovery disposition

The inventory is a safe implementation checklist, not a claim about what the
account contains. Account inspection requires an authenticated, read-only
browser session or official EmberFlow documentation/API material.

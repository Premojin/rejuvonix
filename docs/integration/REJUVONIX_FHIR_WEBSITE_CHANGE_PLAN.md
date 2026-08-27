# Rejuvonix FHIR Website Change Plan

**Status:** Assessment only; no website changes made

## P0 — required before EmberFlow activation

| Path/component | Current behavior | Required behavior | Reason | FHIR/SMART relation | PHI implication | Dependency |
| --- | --- | --- | --- | --- | --- | --- |
| `app/components/EligibilityFlow.tsx` and `WeightLossClinicalDraft.tsx` | Clinical-looking answers are in React state only and explicitly not submitted | Replace preview handoff with approved external workflow entry; never silently persist locally | Prevent a second clinical record | Questionnaire/QuestionnaireResponse hypothesis | Answers are PHI | EmberFlow intake contract |
| Sign-up/sign-in | Cognito-backed API primitives exist; public preview warns auth is unavailable | Ensure production signup yields stable local user/patient IDs and audited provider linkage | Safe identity mapping | Patient reference is distinct from Cognito sub | Identity is sensitive | Production auth gate + provider matching |
| Account/workflow state | Simulated dashboard and minimal workflow status | Show normalized provider state and safe next action, not FHIR payloads | Vendor isolation | Internal DTO over external resources | Avoid payload exposure | Provider status contract |
| Consent entry | Local metadata model exists; telehealth consent is disabled in preview | Capture approved local policy/version/evidence metadata and link to provider consent when required | Prevent conflicting consent records | FHIR Consent may remain EmberFlow-owned | Consent is sensitive | Legal/provider policy |

## P1 — required after API contract

| Path/component | Required behavior | FHIR/SMART relation | PHI implication | Dependency |
| --- | --- | --- | --- | --- |
| `/api/v1/workflow` | Call provider adapter, return normalized `ExternalWorkflowReference`, safe errors, correlation ID | FHIR/Task/Questionnaire mapping is internal | No raw resource body | Operation contract |
| `/api/v1/appointments` | Read/write only allowed scheduling actions; retain external ID/status/times minimally | Appointment/Schedule/Slot | Scheduling metadata can be PHI in context | Scheduling contract |
| account UI | Add integration-state component and failure/retry/handoff messaging | Capability/status abstraction | No clinical details | Status/error contract |
| auth callback/return | Add provider return route only if SMART or hosted workflow requires it; validate state/PKCE | SMART authorization code/launch | Tokens stay server-side where possible | Auth/discovery contract |
| webhook ingress | Add `/api/v1/webhooks/{provider}` with signature, replay, schema, dedupe and async processing | Subscription or proprietary event | Do not retain raw PHI payload by default | Event contract |
| provider status | Add normalized provider-status endpoint if UI needs it | Capability/health abstraction | Return status/reference only | Operational contract |

## P2 — optional/enhancement

- capability diagnostics for operators;
- bounded provider sync for explicitly approved resources;
- user-visible appointment deep link if EmberFlow supports one;
- resource/profile validation in CI using synthetic fixtures;
- launch-context-aware clinician experience if EmberFlow offers it.

## NO CHANGE in this assessment

Do not change Cognito, public marketing routes, Connected Health marketing
content, database schema, AWS infrastructure, AI surfaces, or clinical UI
behavior until the contract and governance gates exist. The current disclosure
that the preview is non-submitting is correct and should remain.

## Route findings

The current `/api/v1/auth/me`, `/api/v1/patients/me`, `/api/v1/workflow`,
appointments, and consents routes establish the right API layering, but they
are not FHIR endpoints. No current route should directly expose FHIR types.
Callback routes may be needed for SMART/hosted workflows, but neither route
shape nor OAuth issuer should be invented now.

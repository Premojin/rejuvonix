# Rejuvonix FHIR Readiness Matrix

**Assessment date:** 2026-08-27

| Area | Current state | FHIR/SMART requirement | Gap | Change required | Can build now? | Wait for EmberFlow? | Risk | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Identity | Cognito -> local user -> RBAC principal | Separate app identity from provider identity/context | External mapping absent | Document mapping and ownership | Yes | Mapping fields/claims | Duplicate/wrong patient | Keep IDs separate |
| Patient mapping | Local patient UUID linked to user | Provider-controlled `Patient.id`/`Identifier` matching | No external mapping contract | Add only after match rules | No | Yes | Misidentification | Reference-only design |
| Clinical workflow | `ClinicalDataProvider.beginClinicalIntake` returns status/reference | Internal DTO behind adapter | DTO is minimal but not capability-aware | Later add normalized capabilities/status | Small generic refinement later | Provider operations | Contract leakage | Preserve boundary |
| Eligibility | Public UI includes in-memory clinical draft; no submit/save | Clinical answers should enter approved clinical system | Handoff not connected | Route approved intake to provider | No | Yes | PHI diversion | Keep preview disabled |
| Consent | Local type/version/status/source/timestamps | FHIR Consent may exist at clinical authority | Duplication boundary unresolved | Store local evidence/reference only | Yes | External artifact rules | Conflicting consent | Reference, do not mirror |
| Appointments | Local reference metadata API/DB | Appointment/Schedule/Slot interactions and statuses | Provider ownership unknown | Normalize external refs/status | No | Yes | Duplicate schedule | EmberFlow owns clinical booking |
| Webhook/eventing | Governance defines ingress/outbox patterns; no provider receiver | Subscription/rest-hook or proprietary webhook | Signature/event schema unknown | Generic receipt/event model after contract | Generic docs only | Yes | Spoof/replay/duplicates | Fail closed, async process |
| OAuth | Cognito protects Rejuvonix APIs; auth callback exists for local identity | SMART discovery, code flow, PKCE/backend services as applicable | Provider auth unknown | Add provider auth only after docs | No | Yes | Token/authority mismatch | Do not alter Cognito now |
| Secrets | AWS architecture recommends Secrets Manager | Tokens/keys confidential and rotated | No provider secret/config | Add secret/config only with approval | No | Yes | Secret leakage | Recommend Secrets Manager |
| Logging | Correlation IDs and safe errors exist | No token/PHI/resource body logging | FHIR-specific redaction absent | Add adapter redaction tests later | Generic tests yes | Provider payload shape | PHI exposure | Log metadata only |
| Audit | App/security audit primitives exist | Provider clinical audit/provenance distinct | Cross-system audit correlation TBD | Audit request/outcome/reference | Yes, design | Correlation fields | Non-repudiation gap | Do not duplicate clinical trail |
| API | `/api/v1`, server auth, safe errors, patients/workflow/appointments/consents | UI must not call FHIR directly | Provider status/callback routes absent | Add normalized endpoints after contract | Generic API contract yes | Exact routes/status | Contract churn | Keep FHIR behind service |
| Database | PostgreSQL non-PHI baseline | Store references/status, not clinical resources | External reference schema not finalized | Add only approved minimal columns | No migration now | Provider identifiers/retention | PHI creep | No DB change in this run |
| Frontend | Public routes and simulated dashboard; preview disclosure | Show workflow state, not FHIR payloads | Integration-state/handoff UI not wired | Add status/return UX after contract | No | Yes | Misleading clinical UX | Current disclosure is correct |
| Connected Health | Marketing/product preview; no clinical exchange | Device/clinical ownership needs explicit model | Not a FHIR implementation | Clarify boundaries later | Documentation only | Possibly | Implied PHI collection | No change now |

## Current compatibility estimate

**Architecturally aligned: approximately 75% (directional, not a conformance
score).** The estimate reflects strong alignment in identity separation,
server-side auth/RBAC, non-PHI persistence, provider abstraction, safe errors,
correlation/audit primitives, and explicit clinical ownership. The remaining
readiness work is contract-specific: patient matching, capabilities, auth,
resource interactions, scheduling, intake handoff, event verification, and
operational tests. It is not evidence that Rejuvonix is FHIR-conformant or that
EmberFlow uses R4/SMART/US Core.

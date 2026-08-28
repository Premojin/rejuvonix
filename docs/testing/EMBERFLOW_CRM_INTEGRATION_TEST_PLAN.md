# EmberFlow CRM Integration Test Plan

**Status:** Planned only; no CRM calls or production tests performed

## Test environments

Sandbox, test location, synthetic contacts, and developer credentials are
**EMBERFLOW CONFIRMATION REQUIRED**. Production CRM must not be used for
destructive or duplicate-matching experiments.

## Test categories

| Category | Required cases |
| --- | --- |
| Unit | Contact DTO validation; prohibited clinical-key rejection; identifier separation; status normalization; safe OperationOutcome/provider-error mapping |
| Contract | Official OpenAPI/examples; API version; auth claims/scopes; contact fields; opportunity/pipeline stages; appointment schema; webhook schema |
| Contact lifecycle | Create after approved trigger; find/match; duplicate response; idempotent retry; update allowlisted fields; unauthorized field rejection |
| Workflow | Start onboarding; transition/status read; unknown stage; provider rejection; stale status; no clinical payload crossing boundary |
| Forms/funnels | Embed/redirect/API behavior in sandbox only; hidden source field; redirect; submission event; no live contact without explicit test approval |
| Appointments | Create/read/update/cancel/reschedule if supported; time zone; duplicate request; provider-authoritative status |
| Webhooks | Valid/invalid signature; replay; duplicate event; malformed body; provider retry; out-of-order status; queue failure; raw payload redaction |
| Auth | Missing token; expired token; wrong audience; wrong location; insufficient scope; credential rotation; provider outage |
| Resilience | Timeout; 429/Retry-After; 5xx; bounded retry; circuit/fail-closed behavior; idempotency after retry |
| Security | Cross-user and cross-tenant isolation; secret leakage; token logging; PHI/PII logging; free-text rejection; object authorization |
| Audit | Initiated actor, provider reference, correlation ID, outcome, latency and failure category recorded without CRM/clinical payload |
| Negative PHI | Symptoms, diagnoses, allergies, medications, prescriptions, notes, clinical answers, encounter data rejected and never persisted/logged |

## Evidence required for release

- synthetic test report;
- provider contract and version;
- field/data-flow map;
- auth and secret review;
- webhook signature/replay evidence;
- retry/idempotency behavior;
- audit/log redaction evidence;
- rollback and disablement plan;
- owner/security/legal approval.

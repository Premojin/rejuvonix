# EmberFlow CRM Contract Acceptance Checklist

**Status:** Required gate before activating `EmberFlowCrmProvider`

The owner and EmberFlow must provide written, versioned confirmation for every
item below before real CRM calls are implemented:

- platform/vendor and white-label status;
- API version, base URL, official documentation and SDK/OpenAPI;
- agency/location/sub-account/tenant semantics;
- authentication mode, token scope, expiry, rotation and revocation;
- contact create, lookup, update, matching and deduplication;
- approved source identifier and custom fields;
- prohibited fields and PHI restrictions;
- opportunity model, pipelines and actual stage identifiers;
- forms/funnels, embed/redirect/API behavior and submission triggers;
- workflow/automation triggers and side effects;
- appointment/calendar ownership, booking, cancellation and rescheduling;
- SMS/email/phone capabilities and transactional/marketing separation;
- A2P, opt-in, STOP, unsubscribe and consent evidence;
- webhook event names, payloads, signing, retries, ordering and replay rules;
- idempotency, rate limits, timeout and outage behavior;
- error schema and safe error mapping;
- sandbox/test location, synthetic contacts and reset process;
- CRM-to-EMR handoff mechanism and downstream status visibility;
- BAA/data processing, retention, deletion, audit and incident responsibilities;
- production onboarding, disablement and rollback procedure.

Acceptance also requires passing the focused test plan, security review, owner
approval, and a reviewed data-flow/field allowlist. Absence of any required
answer keeps the provider in `not_configured` mode.

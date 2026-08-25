# PHI System Boundary

## Decision

Rejuvonix is **not** the regulated PHI system of record. EmberFlow is the designated regulated external platform for PHI and clinical record data.

This document records an architecture decision. It does not claim legal, regulatory, certification, or contractual compliance.

## Rejuvonix owns

- Public website and patient-facing UX.
- Application identity, Cognito integration, sessions, and principal mapping.
- Server-side RBAC, object authorization, patient isolation, and security controls.
- Non-PHI account metadata and profile preferences.
- Workflow state and eligibility progress that does not contain clinical answers.
- Consent metadata, document/version references, status, timestamps, and capture channel.
- Appointment and scheduling references where the data is non-PHI and ownership is approved.
- EmberFlow external identifiers, workflow/reference identifiers, integration status, and retry/idempotency metadata.
- Notifications, operational status, and metadata-only audit/access/security events.

## EmberFlow owns

- PHI collection and regulated clinical intake.
- Medical history, symptoms, allergies, medication lists, diagnoses, and laboratory data.
- Clinical assessments, clinician notes, encounter narratives, treatment decisions, and prescriptions.
- Other regulated clinical record data defined by the approved EmberFlow contract.

## Shared references

Rejuvonix may retain minimum necessary references such as an opaque external patient reference, workflow/reference ID, status, timestamps, and correlation/idempotency identifiers. These are references, not a mirrored clinical record.

## Prohibited Rejuvonix storage

Unless a future owner-approved architecture and contract expressly changes this boundary, Rejuvonix must not persist:

- medical history;
- symptoms, allergies, or medication history;
- diagnoses or clinical assessments;
- clinician notes or encounter narratives;
- treatment decisions or prescriptions;
- laboratory results;
- raw clinical intake answers or uploaded clinical documents.

Synthetic/de-identified fixtures are allowed in tests and local mock adapters only. They must not define the production-oriented Rejuvonix schema.

## Unknown until API documentation

The following are intentionally unknown and must not be invented:

- EmberFlow endpoint paths and base URL;
- authentication, authorization, or token exchange scheme;
- request/response payloads;
- webhook paths, signatures, replay controls, and retry behavior;
- appointment ownership and scheduling contract;
- external patient provisioning semantics;
- error, rate-limit, and idempotency contract.

## Future review required

When official EmberFlow documentation and credentials arrive, create a dedicated integration workstream. Review the contract, data minimization, authorization, webhook security, audit behavior, retry/idempotency, synthetic test plan, rollback, and deployment approval before implementing a real adapter.

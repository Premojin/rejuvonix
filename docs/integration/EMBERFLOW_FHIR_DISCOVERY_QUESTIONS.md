# EmberFlow FHIR Discovery Questions

**Purpose:** Contract questionnaire; every answer should identify environment,
version, authority, examples, and whether synthetic data is supported.

1. Which FHIR release is supported: R4, R4B, R5, or another version? What exact patch/package version?
2. What is the FHIR base URL for sandbox and production, and are tenant/region paths part of it?
3. Is `GET [base]/metadata` available without a user session, and which resources/interactions/search parameters does it advertise?
4. Is `CapabilityStatement` authoritative per tenant, and can it change at runtime or by release?
5. Is `/.well-known/smart-configuration` available? What authorization, token, registration, revocation, introspection, and JWKS endpoints are used?
6. Which auth patterns are supported: SMART authorization code, PKCE, confidential client, backend services/client credentials, mTLS, or proprietary signing?
7. Which client authentication method and token audience/issuer/claims are required? What are access-token and refresh-token lifetimes and rotation rules?
8. Which scopes and launch context parameters are supported, including patient/user/encounter context and granular resource permissions?
9. Which profiles and implementation guides are required or returned, including US Core version and any EmberFlow profiles? Provide canonical URLs/packages.
10. Who creates and owns Patient resources? Is Rejuvonix allowed to create, search, read, or only reference a Patient?
11. What identifier systems, demographics, conditional-create rules, matching confidence, duplicate behavior, and consent prerequisites apply to Patient matching?
12. Is intake represented by Questionnaire/QuestionnaireResponse, Task, a proprietary workflow, hosted UI, embed, redirect, or a combination? Where does the answer payload remain?
13. What are the supported operations for Appointment, Schedule, Slot, Encounter, Consent, Task, and workflow status, and which system is authoritative for each?
14. Are clinical resources such as Condition, AllergyIntolerance, MedicationRequest, CarePlan, Observation, DocumentReference, Provenance, and AuditEvent readable? Which must never be copied?
15. Are events delivered using FHIR Subscription/rest-hook, proprietary webhooks, polling, or an event API? What event ID, resource reference, status, timestamp, signature, replay, retry, and ordering rules apply?
16. What sandbox URL, client-registration process, synthetic patients, test credentials, reset behavior, and negative test cases are available?
17. Are errors returned as OperationOutcome? Provide examples for validation, auth, forbidden, not found, conflict, rate limit, and provider failure.
18. What are quotas, burst limits, retry-after behavior, idempotency keys, timeout expectations, and maintenance/availability semantics?
19. How are conditional interactions, ETags/version-aware updates, transaction/batch Bundles, pagination links, and partial results handled?
20. What is the API lifecycle, deprecation policy, backward-compatibility promise, profile change process, and advance-notice period?
21. What consent, BAA, data-processing, retention, deletion, break-glass, patient-isolation, and audit responsibilities belong to each party?
22. What is the minimum necessary payload for workflow initiation, and may Rejuvonix send application IDs or only provider-issued identifiers?

Until answers are received, all provider URLs, auth values, profiles, resource
write operations, webhook signatures, and payloads remain unknown. No question
above is an assumption about EmberFlow.

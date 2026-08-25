# Patient identity and clinical intake selection

## Architecture decision

EmberFlow / Clinic Accelerator has been selected as the clinical-intake destination. Rejuvonix still uses vendor-neutral interfaces so the assessment UI does not call EmberFlow, a database or an identity vendor directly.

## Patient identity minimum requirements

The selected system must provide:

- Public patient accounts without requiring a ChatGPT account
- Verified email and, if the medical group requires it, stronger identity verification
- Server-verifiable sessions and stable patient identifiers
- Multi-factor authentication capability
- Secure account recovery and session revocation
- Role separation for patients, clinicians and support staff
- Audit logs, access reports and configurable retention
- Written confirmation of HIPAA/BAA coverage for the exact purchased service and configuration
- Documented breach-notification and incident-response responsibilities

## Clinical intake minimum requirements

The selected EHR, EMR or intake platform must provide:

- A supported HTTPS API or hosted handoff; raw database access is not acceptable
- Patient and assessment creation with idempotency
- Provider-review queues and status updates
- Versioned questionnaires and consent records
- State, licensure and service-availability controls
- Secure webhook signing and replay protection
- Full audit history and least-privilege staff access
- Export, correction, retention and deletion workflows
- Pharmacy or e-prescribing handoff appropriate to the medical group
- Written confirmation of HIPAA/BAA coverage for every enabled module

## Evaluation evidence to collect

For each candidate, retain the executed BAA, security documentation, current subprocessor list, data locations, retention terms, API documentation, authentication model, incident history provided by the vendor, pricing, implementation owner and termination/export process.

## Connection boundary

- `patient-identity-provider.ts` owns patient authentication.
- `clinical-intake-provider.ts` owns EHR/intake draft creation and handoff.
- Both implementations remain disabled until approvals are documented.
- Assessment components must depend on these interfaces rather than vendor SDKs.

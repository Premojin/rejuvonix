# EmberFlow Integration Readiness

## Known

EmberFlow is the designated regulated PHI and clinical-record platform.
Rejuvonix has an internal `ClinicalDataProvider` boundary and a local-only
mock/unconfigured implementation. Rejuvonix may retain opaque external
references and workflow status after an approved contract exists.

## Unknown / pending documentation

The official base URL, endpoint paths, authentication scheme, tenant model,
payloads, webhook signing, retries, idempotency, error semantics, retention,
authorization responsibilities, and minimum returned data are unknown. No
credentials have been supplied.

## Internal contract

The current internal concept is limited to beginning a clinical workflow with a
Rejuvonix patient reference and correlation ID, returning status/reference
metadata. These names are internal abstractions and are not claims about an
EmberFlow API.

## Security and data-minimization questions

Before implementation, confirm BAA/contract scope, least-privilege access,
patient matching, audit responsibilities, PHI minimization, transport and
secret management, webhook authenticity, replay protection, and deletion/error
handling.

## Status

**REAL INTEGRATION: NOT IMPLEMENTED — AWAITING OFFICIAL EMBERFLOW DOCUMENTATION
AND CREDENTIALS.** No fake production integration or webhook handler is
present.

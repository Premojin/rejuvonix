# ADR-FHIR-001: Interoperability Boundary

**Status:** RETAINED AS DOWNSTREAM INTEROPERABILITY REFERENCE; DIRECT FHIR/EMBERFLOW PATH DEMOTED
**Date:** 2026-08-27

> **Amendment 2026-08-27:** Owner clarification establishes EmberFlow CRM as
> the current Rejuvonix boundary. This ADR is not the active primary integration
> plan. It remains reference architecture for a possible downstream
> EmberFlow/EMR environment. See `ADR-CRM-001-EMBERFLOW-CRM-BOUNDARY.md`.

## Context

Rejuvonix needs to prepare for a likely FHIR-compatible EmberFlow integration
without coupling routes, UI, or application persistence to an unconfirmed
vendor contract. FHIR resources can contain regulated clinical PHI; provider
authority, identity context, consent, and clinical audit must remain explicit.

## Decision

Rejuvonix will remain vendor-neutral at application and service boundaries. A
future `FhirClinicalProvider` adapter may implement the existing
`ClinicalDataProvider` contract and contain FHIR transport, CapabilityStatement
discovery, SMART/OAuth handling, profiles, resource mapping, pagination,
OperationOutcome translation, retries, and provider events. EmberFlow-specific
configuration remains inside that adapter/configuration layer.

Preferred flow:

```text
UI -> Rejuvonix API -> workflow/service -> ClinicalDataProvider
   -> future FhirClinicalProvider -> EmberFlow
```

Application code receives small canonical DTOs such as
`ExternalWorkflowReference { provider, patientReference, workflowReference,
status, nextAction }`, not raw FHIR resources. Rejuvonix stores local identity,
workflow, consent metadata/evidence references, appointment metadata, and audit
references only. EmberFlow remains authoritative for clinical PHI and clinical
records unless a later signed contract changes that boundary.

## Capability-driven initialization

1. Load secure, environment-specific configuration.
2. Fetch and validate `CapabilityStatement`.
3. Fetch SMART discovery metadata when applicable.
4. Verify required resources, interactions, formats, profiles, and auth claims.
5. Fail closed if capabilities are insufficient or ambiguous.
6. Expose normalized provider capabilities to the workflow service.

These are standards-based future steps, not EmberFlow endpoint assumptions.

## Alternatives considered

- **Expose FHIR throughout the app:** rejected; creates PHI leakage, vendor
  coupling, and UI contract churn.
- **Persist mirrored FHIR resources locally:** rejected by the current PHI
  boundary and unnecessary duplication of EmberFlow clinical authority.
- **Implement a fake EmberFlow client now:** rejected; no URL, auth, profile,
  resource, webhook, or SDK contract is available.
- **Make Rejuvonix a US Core server:** rejected; consuming compatible data and
  serving US Core profiles are different responsibilities.

## Consequences

Positive: narrow adapter, replaceable provider, capability discovery, minimal
PHI footprint, safe UI contracts, and independent application identity.

Cost: mapping and contract tests are required; some UI actions remain pending;
provider-specific exceptions must be isolated rather than leaked into domain
logic.

## Security and PHI

Use TLS, least-privilege OAuth scopes, server-side token handling where
possible, Secrets Manager, rotation, correlation IDs, safe error categories,
and structured logs containing provider/resource metadata only. Never log
access tokens, QuestionnaireResponse bodies, clinical notes, medication data,
diagnoses, or full Patient resources. Provider webhook receipts require
signature verification, replay protection, schema validation, deduplication,
and asynchronous processing.

Rejuvonix application/security audit records integration initiation, authorized
actor, provider reference, outcome, timestamp, and correlation ID. FHIR
`AuditEvent` and `Provenance` remain EmberFlow clinical audit/provenance; do not
duplicate their clinical content.

## Open dependencies

FHIR version, CapabilityStatement, SMART configuration, scopes, profiles,
Patient matching/creation, intake hosting, scheduling ownership, resource
permissions, event protocol, OperationOutcome examples, rate limits, versioning,
retention/deletion, sandbox, and contractual/BAA controls all require official
EmberFlow documentation.

# Interoperability Standards Baseline

**Status:** Rejuvonix preparation baseline; pending EmberFlow contract confirmation
**Reviewed:** 2026-08-27

## Standards reviewed

| Standard | Baseline reviewed | Status / use |
| --- | --- | --- |
| HL7 FHIR | R4 v4.0.1 (Release 4, Technical Correction #1) | Core resource, REST, JSON, search, operations, conformance, security, terminology |
| SMART App Launch | v2.2.0, STU 2.2, R4-compatible | OAuth 2.0, OIDC where used, authorization-code/PKCE, launch context, backend services patterns |
| US Core | v9.0.0, STU 9, based on FHIR 4.0.1 | Current US profile and interaction baseline; not an assertion that Rejuvonix is a US Core server |

## Primary sources

- https://hl7.org/fhir/R4/
- https://hl7.org/fhir/R4/http.html
- https://hl7.org/fhir/R4/capabilitystatement.html
- https://hl7.org/fhir/R4/security.html
- https://build.fhir.org/ig/HL7/smart-app-launch/
- https://build.fhir.org/ig/HL7/smart-app-launch/app-launch.html
- https://www.hl7.org/fhir/us/core/
- https://www.hl7.org/fhir/us/core/guidance.html
- https://hl7.org/fhir/R4/terminologies.html

## Interpretation

FHIR R4 is the implementation reference for this assessment, not an EmberFlow
version decision. SMART App Launch v2.2.0 is the current published guide used
for preparation and is compatible with R4; EmberFlow may use a different SMART
release or a proprietary OAuth profile. US Core v9.0.0 is the current published
US Core guide and is based on R4. US Core profiles and minimum interactions are
constraints on data exchange, not a requirement that Rejuvonix become a US Core
server.

FHIR conformance is capability-driven. A future adapter should retrieve
`GET [FHIR base]/metadata`, inspect `CapabilityStatement.fhirVersion`, formats,
resources, interactions, search parameters, versioning and operations, and
retrieve SMART discovery metadata when applicable. It should fail closed when
required capability is absent or unverified. This sequence is a standards-based
design recommendation, not an EmberFlow endpoint claim.

## Core implementation notes

FHIR resources are typed JSON objects with a common `resourceType`, logical
`id`, metadata, identifiers, references, extensions, and profile declarations.
FHIR REST uses type and instance URLs for read, create, update, patch, delete,
history, and search; servers declare the supported subset. Search returns a
`Bundle` with `type=searchset` and may provide a server-controlled `link` with
`relation=next`; the adapter must follow only bounded, explicitly requested
pages. Batch and transaction Bundles are distinct interactions and must not be
assumed available.

Use `application/fhir+json` and content negotiation where the provider supports
it. Preserve resource references as opaque, provider-scoped references rather
than converting them into local primary keys. For writes, use conditional
interactions or idempotency controls only when the provider documents them;
FHIR conditional create is not a license to guess matching semantics.

`CapabilityStatement` is the discovery contract for FHIR version, formats,
resource types, interactions, search parameters, operations, and versioning.
`OperationOutcome` is the provider error envelope and must be converted to
Rejuvonix categories (`AUTH_FAILED`, `RESOURCE_NOT_FOUND`,
`VALIDATION_FAILED`, `RATE_LIMITED`, `INTEGRATION_NOT_CONFIGURED`,
`PROVIDER_UNAVAILABLE`, `PROVIDER_REJECTED`) without exposing raw details to
the UI.

FHIR terminology uses `Coding`, `CodeableConcept`, `CodeSystem`, `ValueSet`, and
`ConceptMap`. SNOMED CT, LOINC, RxNorm, and ICD mappings should remain provider
side unless a display or explicit mapping requirement is approved. Rejuvonix
should not import a clinical terminology database for this integration.

FHIR security guidance does not itself choose an authentication method. The
future adapter must enforce HTTPS, least privilege, token confidentiality,
scope/context checks, audit correlation, safe logging, and patient isolation.
SMART adds OAuth 2.0 discovery and token flows: authorization code with PKCE
for public/browser clients, confidential client patterns where a server can
protect credentials, and backend-services/client-credentials patterns where a
provider supports them. Cognito remains Rejuvonix identity authority; SMART
authorization, if used, is a separate provider authorization context.

Validation should use the HL7 FHIR Validator and profile packages in a controlled
local/CI environment, with synthetic fixtures. Inferno is relevant when a
specific ONC/US Core conformance test scope is confirmed. Never send real
patient data to public validators or public test servers.

## Governance basis

This assessment follows RIX-GOV-000 v1.0.0 and the in-scope standards listed in
the handoff: RIX-ARC-001, RIX-API-001/002, RIX-SEC-001, RIX-WHK-001,
RIX-EVT-001/002/003/004, RIX-INT-001/002, RIX-OBS-001, RIX-TST-001, and
RIX-OPS-001, all v1.0.0. AI implementation remains paused under the current AI
governance baseline; no AI code or data flow is changed here.

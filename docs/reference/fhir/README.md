# Rejuvonix FHIR Reference Pack

**Status:** Preparation reference; not an EmberFlow contract
**Reviewed:** 2026-08-27

This directory is intentionally a link-and-notes pack, not a copy of the HL7
specification. The reviewed material is authoritative at the URLs below; the
integration documents in `docs/integration/` contain Rejuvonix-specific
interpretation and open questions.

## Pinned primary sources

| Subject | Version / status | Link |
| --- | --- | --- |
| HL7 FHIR | R4, v4.0.1, mixed Normative/STU | [FHIR R4 home](https://hl7.org/fhir/R4/) |
| FHIR REST API | R4 v4.0.1, Normative | [RESTful API](https://hl7.org/fhir/R4/http.html) |
| CapabilityStatement | R4 v4.0.1 | [CapabilityStatement](https://hl7.org/fhir/R4/capabilitystatement.html) |
| Security and privacy | R4 v4.0.1 | [Security](https://hl7.org/fhir/R4/security.html) |
| SMART App Launch | v2.2.0, STU 2.2, R4-compatible; published guide | [SMART App Launch](https://build.fhir.org/ig/HL7/smart-app-launch/) |
| US Core | v9.0.0, STU 9, R4 / FHIR 4.0.1 | [US Core](https://www.hl7.org/fhir/us/core/), [US Core guidance](https://www.hl7.org/fhir/us/core/guidance.html) |
| Terminology | R4 v4.0.1 | [Terminologies](https://hl7.org/fhir/R4/terminologies.html) |
| Consent | R4 v4.0.1 | [Consent](https://hl7.org/fhir/R4/consent.html) |
| Subscription | R4 v4.0.1 | [Subscription](https://hl7.org/fhir/R4/subscription.html) |
| OperationOutcome | R4 v4.0.1 | [OperationOutcome](https://hl7.org/fhir/R4/operationoutcome.html) |
| Bundle | R4 v4.0.1 | [Bundle](https://hl7.org/fhir/R4/bundle.html) |

## Resource pages studied

The R4 home page links to the canonical pages for Patient, Practitioner,
PractitionerRole, Organization, Appointment, Schedule, Slot, Encounter,
Questionnaire, QuestionnaireResponse, ServiceRequest, Task, CarePlan,
Medication, MedicationRequest, MedicationStatement, Observation, Condition,
AllergyIntolerance, DocumentReference, Provenance, AuditEvent, and the other
workflow and clinical resources assessed in the ownership matrix.

## Tooling references

- [HL7 FHIR Validator wrapper](https://github.com/hapifhir/org.hl7.fhir.validator-wrapper)
- [FHIR client JS / SMART App Launch client](https://github.com/smart-on-fhir/client-js)
- [FHIRKit Client](https://www.npmjs.com/package/fhir-kit-client)
- [Inferno](https://inferno.healthit.gov/)

Use only synthetic or de-identified data in validators, sandboxes, and tests
until an approved PHI-processing path exists. URLs and versions are preparation
references; they do not assert that EmberFlow implements any particular release.

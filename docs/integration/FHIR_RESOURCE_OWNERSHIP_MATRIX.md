# FHIR Resource Ownership Matrix

**Status:** Proposed preparation mapping; EmberFlow confirmation required

| FHIR resource | Resource purpose | Clinical/PHI risk | Authoritative system | Rejuvonix stores full resource? | Rejuvonix stores reference? | Expected interaction | Owner decision | EmberFlow confirmation required |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Patient | Person receiving care | High | EMBERFLOW | No | Yes | Read/match; create only if agreed | EMBERFLOW | Yes |
| Practitioner | Care professional | High | EMBERFLOW | No | Yes | Read/reference | EMBERFLOW | Yes |
| PractitionerRole | Practitioner in organization/service role | High | EMBERFLOW | No | Yes | Read/reference | EMBERFLOW | Yes |
| Organization | Care organization | Medium | EMBERFLOW | No | Yes | Read/reference | EMBERFLOW | Yes |
| Appointment | Planned healthcare meeting | High | EMBERFLOW | No | Yes | Read/request/status; write only if contract allows | EMBERFLOW | Yes |
| Schedule | Availability container | High | EMBERFLOW | No | Maybe | Read/search for scheduling only | EMBERFLOW | Yes |
| Slot | Bookable time interval | High | EMBERFLOW | No | Maybe | Read/search; reserve only if allowed | EMBERFLOW | Yes |
| Encounter | Actual care interaction | High | EMBERFLOW | No | Yes | Read status/reference only | EMBERFLOW | Yes |
| Consent | Permission and policy decision | High | SPLIT | No clinical copy | Yes | Rejuvonix records local consent metadata; reference external artifact | SPLIT | Yes |
| Questionnaire | Structured question definition | Medium/High | EMBERFLOW | No | Yes | Read/start workflow | EMBERFLOW | Yes |
| QuestionnaireResponse | Answers to a questionnaire | Very high | EMBERFLOW | No | Yes, opaque only | Provider-side create/read; no local payload | EMBERFLOW | Yes |
| ServiceRequest | Request for service/procedure | Very high | EMBERFLOW | No | Yes | Status/reference only | EMBERFLOW | Yes |
| Task | Work item tracking execution | High | EMBERFLOW | No | Yes | Read/status; update only if assigned | EMBERFLOW | Yes |
| CarePlan | Clinical plan and activities | Very high | EMBERFLOW | No | Yes | Status/reference only | EMBERFLOW | Yes |
| Medication | Medication definition/product | High | EMBERFLOW | No | Yes | Reference/display only if explicitly needed | EMBERFLOW | Yes |
| MedicationRequest | Prescription/order | Very high | EMBERFLOW | No | Yes | No local clinical persistence; status/reference only | EMBERFLOW | Yes |
| MedicationStatement | Patient medication history/use | Very high | EMBERFLOW | No | Yes | No local clinical persistence | EMBERFLOW | Yes |
| Observation | Measurement or assertion | High | EMBERFLOW | No | Yes | Read only for explicitly approved display; default opaque reference | EMBERFLOW | Yes |
| Condition | Diagnosis/problem | Very high | EMBERFLOW | No | Yes | No local clinical persistence | EMBERFLOW | Yes |
| AllergyIntolerance | Allergy/intolerance record | Very high | EMBERFLOW | No | Yes | No local clinical persistence | EMBERFLOW | Yes |
| DocumentReference | Reference to clinical document | Very high | EMBERFLOW | No | Yes | Read metadata/reference only; no document copy by default | EMBERFLOW | Yes |
| Provenance | Origin and activity lineage | High | EMBERFLOW | No | Yes | Do not duplicate; correlate provider operation | EMBERFLOW | Yes |
| AuditEvent | Clinical system access/use audit | High | EMBERFLOW | No | Yes | Do not duplicate; local integration audit separately | EMBERFLOW | Yes |
| Subscription | Server-side event subscription | High | SPLIT | No | Subscription ID/status only | Create/read only if provider supports it | EXTERNAL | Yes |
| Bundle | Searchset, transaction, batch, document container | Depends on entries | EXTERNAL | No | No, retain receipt/hash only if needed | Parse bounded responses; no broad crawl | EXTERNAL | Yes |
| OperationOutcome | Machine-readable issue details | May contain sensitive detail | EXTERNAL | No | No; map safe category | Read transiently and map | EXTERNAL | Yes |

## Identity rule

`Resource.id` is the provider's logical resource identity. `Identifier` is a
business identifier and may be scoped by a system URI. A FHIR reference such as
`Patient/123` is not a Cognito subject. Keep Cognito `sub`, Rejuvonix user ID,
Rejuvonix patient application ID, and external FHIR Patient reference in
separate fields with explicit provenance and tenant scope.

## Patient matching decision

If permitted, the safest future sequence is provider-defined identifier search,
then a provider-controlled match decision, then conditional create only when
the provider documents the supported identifier, match semantics, required
demographics, duplicate handling, and authorization. Rejuvonix must not use
`Cognito.sub` as a FHIR Patient id or submit a minimal shell without contract
approval; even demographics are PHI in context.

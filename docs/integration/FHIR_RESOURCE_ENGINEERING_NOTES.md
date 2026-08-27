# FHIR Resource Engineering Notes

**Status:** Standards-derived notes; not an EmberFlow payload specification

| Resource | Purpose | PHI risk | Likely EmberFlow owner | Likely Rejuvonix usage | Interaction posture | Open question |
| --- | --- | --- | --- | --- | --- | --- |
| Patient | Person receiving care | High | Yes | External reference and matching key | Read/reference; conditional create only if approved | Who matches and creates? |
| Practitioner | Individual care professional | High | Yes | Display/reference | Read/reference | Are workforce records exposed? |
| PractitionerRole | Role at an organization/service | High | Yes | Assignment/reference | Read/reference | Is role context returned? |
| Organization | Care entity | Medium | Yes | Provider display/reference | Read/reference | Tenant/org model? |
| Appointment | Planned meeting | High | Yes | Local workflow mirror of ID/status/time only | Read/request/status | Who is scheduling authority? |
| Schedule | Availability grouping | High | Yes | No local copy; bounded availability read | Read/search | Is availability exposed? |
| Slot | Bookable interval | High | Yes | No local copy; selected slot reference | Read/search/reserve if allowed | Reservation atomicity? |
| Encounter | Actual care interaction | Very high | Yes | Opaque ID/status/workflow state | Read/reference | May any summary be returned? |
| Consent | Permission/policy decision | High | Shared | Policy/version/evidence metadata | Local metadata plus external reference | Which consent is legally authoritative? |
| Questionnaire | Structured questions | Medium/High | Yes | Start/reference/version | Read/reference | Hosted UI or API? |
| QuestionnaireResponse | Answers | Very high | Yes | Opaque workflow/reference only | Provider-side create/read | Can answers ever cross boundary? |
| ServiceRequest | Requested clinical service | Very high | Yes | Status/reference | Read/reference | Is workflow initiated this way? |
| Task | Assignment/work tracking | High | Yes | Normalized status/next action | Read/update only if authorized | Is Task the workflow handle? |
| CarePlan | Clinical plan | Very high | Yes | No clinical copy; optional status/reference | Read/reference | Any patient-safe status? |
| Medication | Medication/product definition | High | Yes | Display only if explicitly approved | Read/reference | Is RxNorm coding returned? |
| MedicationRequest | Prescription/order | Very high | Yes | No persistence; opaque status/reference at most | Read/reference | Are prescriptions intentionally inaccessible? |
| MedicationStatement | Medication use/history | Very high | Yes | No persistence | None/reference only | Is medication history needed in UI? |
| Observation | Measurement/assertion | High | Yes | No persistence; explicit approved display only | Read/reference | Which observations, if any? |
| Condition | Diagnosis/problem | Very high | Yes | No persistence | None/reference only | Access scope and purpose? |
| AllergyIntolerance | Allergy/intolerance | Very high | Yes | No persistence | None/reference only | Access scope and purpose? |
| DocumentReference | Clinical document metadata | Very high | Yes | Opaque reference; no document copy | Read metadata/reference | Are links safe and time-limited? |
| Provenance | Resource origin/activity | High | Yes | Correlate, do not mirror | Reference/audit correlation | Provider audit export? |
| AuditEvent | Clinical access/use audit | High | Yes | Local integration audit only | None/reference | What audit evidence is available? |
| Subscription | Event subscription | High | External/provider | Subscription ID/status only | Create/read if supported | Rest-hook or proprietary webhook? |
| Bundle | Searchset/transaction/batch/document container | Varies | External | Parse bounded result; no crawl | Read/transient | Bundle limits and transaction support? |
| OperationOutcome | Error/issues/warnings | Varies | External | Translate and redact | Read/transient | Codes and retry hints? |

`CREATE`, `READ`, `REFERENCE`, and `NONE` in this table describe the intended
Rejuvonix adapter posture, not provider capability. Full resource bodies are not
an approved local persistence format.

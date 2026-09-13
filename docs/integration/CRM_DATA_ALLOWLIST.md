# CRM Data Allowlist

**Status:** Implemented validation policy; contract and consent still required

## Field policy

| Field | Disposition | Note |
| --- | --- | --- |
| `localUserId` | ALLOWED | Rejuvonix application identifier |
| `localPatientId` | ALLOWED | Rejuvonix opaque application identifier |
| `firstName`, `lastName` | REQUIRES_CONSENT | Identity data; purpose and consent required |
| `email`, `phone` | REQUIRES_CONSENT | Communication identity; consent required |
| `leadSource`, `localApplicationReference` | ALLOWED | Operational attribution/reference |
| `programInterest` | REQUIRES_CONSENT | May be health-related in context |
| `communicationConsent` | ALLOWED | Nested consent object is separately validated |
| `tags` | UNKNOWN | Rejected until an explicit contract allowlists semantics |
| `symptoms`, `medicalHistory`, `diagnoses`, `medications`, `allergies` | PROHIBITED | Clinical/PHI data |
| `clinicalNotes`, `prescriptions`, `treatmentPlans`, `clinicalIntakeAnswers` | PROHIBITED | EMR-bound data |
| Any other field | UNKNOWN | Rejected closed by default |

Marketing consent, transactional communication consent, privacy/terms consent,
and clinical consent references are distinct types. Clinical consent is not a
CRM contact field in this scaffold.

The runtime validator rejects unknown top-level and consent keys and rejects
prohibited keys recursively. This is a boundary guard, not a legal or vendor
contract determination.

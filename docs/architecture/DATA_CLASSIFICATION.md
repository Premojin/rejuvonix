# Rejuvonix Data Classification

| Classification | Examples | Rule |
|---|---|---|
| PUBLIC | Product copy, imagery, goals, support content | May be rendered publicly after content review. |
| IDENTITY | Cognito subject, local user ID, email | Minimize, protect, and authorize server-side. |
| SENSITIVE NON-PHI | Preferences, workflow status, appointment/reference metadata | Store only for approved application purpose. |
| EXTERNAL REFERENCE | Opaque provider/workflow IDs, correlation IDs | Store only after an approved provider contract. |
| AUDIT | Access, authorization, security outcomes | Append-oriented, redacted, retained per policy. |
| SECURITY | Token/session metadata and security events | Never log raw tokens or secrets. |
| PHI-PROHIBITED | Clinical answers, symptoms, diagnoses, notes, prescriptions, assessments | Do not persist in Rejuvonix; EmberFlow owns these records. |

Consent records contain type, version, status, timestamps, capture source, and
evidence/reference metadata only. They must not contain clinical answers.

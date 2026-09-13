# Rejuvonix PostgreSQL Database Design

**Status:** Canonical non-PHI application model for local reconciliation.

| Table/domain | Purpose | PHI risk | EmberFlow reference | Disposition |
|---|---|---:|---:|---|
| `users` | Local application identity mapping | Sensitive identity | No | Active |
| `roles`, `permissions`, `user_roles`, `role_permissions` | RBAC | Security | No | Active |
| `sessions` | Server session metadata if enabled | Security | No | Active, review lifecycle |
| `patients`, `patient_profiles` | Non-PHI account/profile metadata | Sensitive non-PHI | No | Active, minimize fields |
| `consents` | Versioned consent metadata and evidence reference | Sensitive/audit | Optional | Active, no clinical payload |
| `appointments` | Scheduling/reference metadata | Sensitive non-PHI | Optional | Active/provisional |
| `clinicians` | Workforce identity/assignment metadata | Sensitive identity | No | Active, invitation-only |
| `audit_events` | Governed audit trail | Audit | No | Active |
| `access_events` | Patient resource access outcomes | Audit | Optional | Active |
| `security_events` | Authentication/security outcomes | Security | No | Active |

## Explicitly prohibited as active Rejuvonix record storage

Clinical answers, symptoms, medical history, allergies, medication history,
diagnoses, notes, assessments, prescriptions, treatment decisions, lab data,
and encounter narratives belong to EmberFlow. Legacy `encounters` and
`treatment_plans` definitions remain historical/owner-review items and are not
an approval to expose or populate clinical records.

## Constraints and lifecycle

Primary keys are UUIDs. Identity and relationship foreign keys preserve tenant
and ownership boundaries. Sensitive fields require minimization, documented
retention, access logging, and synthetic-only local testing. No schema mutation
or migration execution is part of this local reconciliation.

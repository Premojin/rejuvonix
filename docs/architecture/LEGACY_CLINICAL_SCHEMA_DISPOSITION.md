# Legacy Clinical Schema Disposition

This is a classification record, not a migration or deletion instruction.

| Entity | Classification | Reason |
|---|---|---|
| `encounters` | EMBERFLOW-OWNED / LEGACY SCHEMA — EXCLUDED FROM FRESH BASELINE | Clinical encounter narratives must not be Rejuvonix records. |
| `treatment_plans` | EMBERFLOW-OWNED / LEGACY SCHEMA — EXCLUDED FROM FRESH BASELINE | Treatment decisions belong to the regulated provider system. |
| `patients` | KEEP NON-PHI ONLY | Retain account linkage and status, not a clinical chart. |
| `patient_profiles` | KEEP NON-PHI ONLY | Retain only approved account preferences/metadata. |
| `appointments` | KEEP NON-PHI ONLY | Scheduling/reference fields only; provider ownership remains open. |
| `consents` | KEEP NON-PHI ONLY | Versioned metadata and evidence/reference, never clinical answers. |
| `clinicians` | KEEP NON-PHI ONLY | Workforce identity and assignment metadata only. |
| `audit_events`, `access_events`, `security_events` | KEEP | Governance and security metadata, minimized and redacted. |

No legacy table is dropped or rewritten here. Any staging cleanup requires
schema inspection, applied-journal verification, backup/recovery review, and an
owner-approved additive migration plan.

# V82 D1 to Target Mapping

V82 contains a D1/SQLite-oriented schema. D1 is not the canonical Rejuvonix production system of record.

| V82 model | Classification | Target disposition |
|---|---|---|
| `intake_sessions` | EmberFlow-owned PHI concept with a small Rejuvonix workflow-reference subset | Do not migrate the table as-is. Retain only non-PHI workflow/reference state in a future PostgreSQL model. |
| `intake_answers` | EmberFlow-owned PHI concept | Remove from Rejuvonix production schema; fictional fixture use only. |
| `consent_records` | Rejuvonix PostgreSQL candidate, but only metadata/evidence references | Rebuild as versioned non-PHI consent metadata with no intake-answer payload. |
| `intake_audit_events` | Mixed: audit concept is Rejuvonix-owned; metadata may contain PHI risk | Replace with metadata-only Rejuvonix audit/security events; do not persist clinical payloads. |
| `valueCiphertext` fields | Local PHI persistence assumption | Remove from the production-oriented Rejuvonix model; encryption does not change system-of-record ownership. |
| D1 binding / `db/index.ts` | Infrastructure/runtime direction | Do not use as the canonical runtime. PostgreSQL remains the Rejuvonix application database. |

No D1 migration is executed in this reconciliation. No D1 model is mechanically copied into PostgreSQL.

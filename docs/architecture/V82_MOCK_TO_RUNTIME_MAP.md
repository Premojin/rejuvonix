# V82 Mock to Runtime Map

| V82 content | Classification | Runtime rule |
|---|---|---|
| Homepage, treatment, goal, and service content | KEEP AS PUBLIC CONTENT | Public product education; no PHI. |
| Eligibility questions and visual progress | UI STATE ONLY | May run locally and hold transient values; do not persist clinical answers in Rejuvonix. |
| Simulated account session | TEST FIXTURE | Replace with Cognito-backed identity in runtime; retain only for local demo tests. |
| Simulated account dashboard | REJUVONIX APP DATA | Replace demo state with non-PHI workflow/reference state. |
| `emberflow-sandbox-fixture` fictional intake | TEST FIXTURE | Keep clearly fictional and isolated to tests/local mock provider. |
| Intake answer ciphertext schema | EMBERFLOW PHI CONCEPT | Do not use as the Rejuvonix production model. |
| Consent metadata | REJUVONIX APP DATA | Persist version/status/evidence metadata only. |
| Provider/pharmacy/fulfillment wording | KEEP AS PUBLIC CONTENT | Must remain clearly non-operational until approved integration exists. |
| Clinical handoff result | DEFER | Mock opaque reference/status only until official EmberFlow contract exists. |
| Appointment UI/workflow | DEFER | Model only approved non-PHI reference state; ownership remains provisional. |

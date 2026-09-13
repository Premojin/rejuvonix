# AI Clinical Safety & Human Oversight Policy

**Document ID:** RAI-SAF-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Clinical Governance  
**Effective Date:** 2026-08-24

## 1. Safety Objective

Ensure AI augments care delivery while preserving licensed human judgment and preventing unsafe autonomous clinical behavior.

## 2. Core Rule

For consequential clinical actions:

```text
AI proposes -> Qualified human reviews -> Human accepts/modifies/rejects -> System records outcome
```

## 3. Consequential Actions

At minimum:

- diagnosis;
- prescribing;
- dosage changes;
- medication discontinuation;
- treatment initiation;
- treatment termination;
- emergency disposition;
- invasive procedure recommendation;
- high-risk contraindication override;
- formal medical certification.

These MUST NOT be executed autonomously by the AI in the initial governed architecture.

## 4. Required Escalation

The AI must escalate when:

- confidence is insufficient;
- retrieved sources conflict;
- no approved source supports the answer;
- potential emergency symptoms are present;
- adverse drug reaction is suspected;
- contraindication is plausible;
- pregnancy / lactation introduces uncertainty;
- complex drug interactions require clinician/pharmacist review;
- the user requests a diagnosis or prescription beyond approved scope;
- identity or authorization is uncertain.

## 5. Uncertainty Language

The AI MUST prefer explicit uncertainty over fabrication.

Approved pattern:

```text
I do not have enough verified information to answer that safely.
```

## 6. Patient-Facing Boundary

Patient-facing AI may educate and navigate.

It may not present itself as the final clinical authority.

## 7. Practitioner-Facing Boundary

Practitioner-facing AI may perform deeper analysis but must:

- disclose source basis;
- distinguish source fact from model inference;
- allow review;
- avoid silent action;
- record reviewer disposition for material recommendations.

## 8. Safety Cases

Each high-risk workflow requires tests for:

- correct escalation;
- unsafe request refusal;
- conflicting-source handling;
- missing-context handling;
- cross-role isolation;
- fabricated citation detection.

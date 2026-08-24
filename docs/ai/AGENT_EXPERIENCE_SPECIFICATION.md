# Rejuvonix Agent Experience Specification

**Document ID:** RAI-UX-002  
**Version:** 1.0.0  
**Status:** APPROVED EXPERIENCE BASELINE  
**Owner:** Rejuvonix Product / Clinical Governance  
**Effective Date:** 2026-08-24

This Markdown version is the machine-readable companion to the retained
presentation artifact `docs/Rejuvonix_Agent_Experience_Specification_v1.0.0.docx`.
The DOCX and the design reference image are retained for presentation review;
this file is the implementation-facing representation.

## Experience vision

The Rejuvonix Intelligence Layer is one governed intelligence foundation
expressed through multiple role-specific experiences:

- Visitor and Patient Guide: calm, guided, supportive, non-diagnostic care navigation.
- Practitioner Copilot: concise, evidence-aware, patient-contextual, and reviewable.
- Pharmacist and Medication Support: medication-aware, source-grounded, and escalation-oriented.
- Operations Assistant: efficient, organized, and limited to non-clinical workflow support.

All experiences share knowledge, authorization, audit, and safety foundations.
AI authority must never exceed the authenticated human user's authority.

## Shared interaction contract

- Healthcare presentation comes first; AI branding remains restrained.
- Guided choices, task chips, structured cards, statuses, sources, and review controls precede blank chat.
- The active mode must be visible: Patient Guide, Clinical Copilot, Medication Support, or Operations Assistant.
- General education, personalized context, approved guidance, AI consideration, and clinician review must be distinguishable.
- Grounded clinical, medication, policy, and Rejuvonix-specific responses expose role-appropriate provenance.
- Insufficient grounding, uncertainty, conflict, or risk produces a helpful escalation path.
- Persistent memory is explicit, reviewable, permissioned, and separate from the clinical record.
- Desktop uses a contextual rail or side panel; mobile uses a dismissible bottom sheet or full-height panel.

## Role boundaries

| Role | Data scope | Allowed support | Prohibited or restricted behavior |
| --- | --- | --- | --- |
| Visitor | Public information | Education and navigation | Personal context, diagnosis, prescribing |
| Patient | Own authorized data | Care-context explanation and workflow guidance | Autonomous diagnosis or treatment decisions |
| Clinician | Assigned/authorized patients | Summaries, approved guidance, drafts, considerations | Independent diagnosis, prescribing, dose changes, final treatment decisions |
| Pharmacist | Authorized medication/patient context | Medication education and escalation | Independent prescription or dosage modification |
| Operations/Support | Minimum necessary operational data | Scheduling, coordination, notifications, support | Unrestricted clinical reasoning or encounter access |

## Interaction levels

1. **Inform** — explain, find, educate, and navigate.
2. **Assist** — summarize, prepare, compare, guide, and identify missing information.
3. **Act** — request, save, submit, or schedule through an authorized tool.

Level 3 actions follow:

```text
AI proposes -> user confirms where required -> authorized tool executes
-> result is shown -> audit/event is written
```

No consequential clinical action is autonomous.

## Context and continuity

Every protected experience must visibly and server-side resolve the actor,
role, permissions, resource scope, patient/encounter context where authorized,
page/workflow context, correlation ID, jurisdiction, knowledge policy, and mode.

Session context, user preferences, clinical records, institutional knowledge,
and workflow state remain distinct. Agent continuity never becomes the
authoritative patient or clinical record, and stale patient context must not
bleed into another patient record.

## Safety and handoff

Escalate potential emergencies, adverse events, contraindications, pregnancy or
lactation uncertainty, complex medication interactions, conflicting sources,
insufficient context, diagnosis requests, prescribing requests, and dosage
change requests. Use explicit uncertainty rather than fabrication and provide
the appropriate care-team, pharmacist, clinician, or support handoff.

## Acceptance criteria

- Users can identify the next logical step without inventing a prompt.
- Patient users can distinguish general education from personalized information.
- Clinicians can see the active patient and workflow context.
- Record facts, approved guidance, and AI considerations are visibly separate.
- High-risk or uncertain questions provide safe escalation.
- Level 3 actions are authorized, confirmable where required, and auditable.
- No AI role exceeds platform permissions.
- Source provenance is available where governed knowledge is used.
- Desktop and mobile experiences preserve navigation and workflow state.

Changes to role behavior, authority presentation, clinical review controls,
escalation, memory, or action confirmation require a semantic version update
and changelog entry for this document.

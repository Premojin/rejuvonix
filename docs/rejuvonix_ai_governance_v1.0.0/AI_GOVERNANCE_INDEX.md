# Rejuvonix AI Governance Index

**Document ID:** RAI-GOV-000  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Rejuvonix Platform Governance  
**Effective Date:** 2026-08-24  
**Review Cadence:** Quarterly or upon material architectural / regulatory change

## 1. Purpose

This document is the mandatory entry point for all Rejuvonix artificial-intelligence engineering work.

Any Codex, human engineer, contractor, or automated build process working on Rejuvonix AI capabilities MUST read and comply with the documents referenced here before modifying AI, clinical decision-support, knowledge-retrieval, agent-tooling, patient-facing AI, clinician-facing AI, or AI audit components.

These documents govern implementation. They are not aspirational product notes.

## 2. Binding Document Set

| Priority | Document | ID | Current Version | Authority |
|---|---|---:|---:|---|
| 1 | AI Governance Index | RAI-GOV-000 | 1.0.0 | Root authority |
| 2 | Rejuvonix Intelligence Layer Architecture | RAI-ARC-001 | 1.0.0 | System architecture |
| 3 | AI Clinical Safety & Human Oversight Policy | RAI-SAF-001 | 1.0.0 | Safety |
| 4 | AI Knowledge Governance Standard | RAI-KNO-001 | 1.0.0 | Knowledge authority |
| 5 | AI Source Hierarchy & Grounding Policy | RAI-KNO-002 | 1.0.0 | Retrieval / sourcing |
| 6 | AI Identity, RBAC & Tool Authorization Standard | RAI-SEC-001 | 1.0.0 | Authorization |
| 7 | AI Data, Privacy & PHI Handling Standard | RAI-SEC-002 | 1.0.0 | Privacy / sensitive data |
| 8 | AI Auditability & Provenance Standard | RAI-AUD-001 | 1.0.0 | Audit |
| 9 | AI Evaluation & Clinical Benchmark Standard | RAI-TST-001 | 1.0.0 | Quality / validation |
| 10 | AI Model & Provider Abstraction Standard | RAI-ARC-002 | 1.0.0 | Portability |
| 11 | AI Release & Change-Control Standard | RAI-OPS-001 | 1.0.0 | Deployment governance |
| 12 | Premojin Knowledge Ingestion Standard | RAI-KNO-003 | 1.0.0 | Premojin source governance |
| 13 | Agent Experience & Role Contract | RAI-UX-001 | 1.0.0 | Stakeholder behavior |
| 14 | AI Incident Response Runbook | RAI-OPS-002 | 1.0.0 | Incident handling |
| 15 | AI Build Checklist for Codex | RAI-ENG-001 | 1.0.0 | Engineering execution |

## 3. Precedence

If documents conflict, use this precedence order:

1. Applicable law / regulatory obligation / signed contractual requirement
2. `RAI-GOV-000`
3. `RAI-SAF-001`
4. `RAI-SEC-001` and `RAI-SEC-002`
5. `RAI-KNO-*`
6. `RAI-AUD-001`
7. `RAI-TST-001`
8. Architecture and UX documents
9. Implementation notes

A lower-priority document MUST NOT weaken a higher-priority control.

## 4. Mandatory Build Rule

Before implementing any AI feature, Codex MUST:

1. Identify the impacted governance documents.
2. State the currently applicable versions.
3. Describe the intended change.
4. Identify any safety, authorization, privacy, knowledge, audit, or evaluation impact.
5. Implement only within the approved boundaries.
6. Add or update tests.
7. Update documentation where system behavior changes.
8. Refuse or stop if a requested implementation violates a binding governance control.

## 5. Versioning Standard

All AI governance documents use semantic versioning:

`MAJOR.MINOR.PATCH`

- **MAJOR** — changes authority, safety boundary, role permissions, data handling, clinical scope, or architecture contract.
- **MINOR** — adds a new governed capability without invalidating existing compliant implementations.
- **PATCH** — clarification, typo, non-behavioral wording, or implementation note.

Every material change requires a changelog entry.

## 6. Git Governance

Recommended location:

```text
/docs/ai/
/docs/security/
/docs/architecture/
/docs/testing/
/docs/operations/
```

AI implementation PRs MUST reference the relevant document IDs and versions.

Example:

```text
Governed by:
- RAI-SAF-001 v1.0.0
- RAI-KNO-001 v1.0.0
- RAI-SEC-001 v1.0.0
```

## 7. Current Strategic Boundary

The Rejuvonix AI is a governed intelligence layer.

It is NOT:

- an autonomous medical practitioner;
- a replacement for licensed clinical judgment;
- an unrestricted database agent;
- an ungoverned general chatbot;
- a system permitted to invent clinical policy;
- a system permitted to expand its own permissions.

Patient-facing and clinician-facing experiences may share the same intelligence foundation, but MUST have distinct role contracts and access controls.

## 8. Production Gate

No AI capability may receive real PHI or make consequential clinical recommendations in production until:

- identity and RBAC are enforced;
- source governance is operational;
- clinical safety controls are tested;
- auditability is active;
- model/provider configuration is approved;
- benchmark thresholds are met;
- escalation behavior is validated;
- privacy/security review is complete;
- production deployment is explicitly authorized.

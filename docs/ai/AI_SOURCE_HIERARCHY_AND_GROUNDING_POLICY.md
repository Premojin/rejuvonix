# AI Source Hierarchy & Grounding Policy

**Document ID:** RAI-KNO-002  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Knowledge Governance  
**Effective Date:** 2026-08-24

## 1. Source Hierarchy

### Tier 1 — Rejuvonix / Premojin Approved Policy
Approved internal clinical, pharmacy, operational, and patient-education material.

### Tier 2 — Current Authoritative Clinical Guidance
Relevant regulator, ministry, recognized professional body, or specialty guideline.

### Tier 3 — Official Product / Drug Information
Approved labeling, manufacturer prescribing information, regulatory monographs.

### Tier 4 — Peer-Reviewed / Trusted Clinical Reference
High-quality secondary or primary references approved for use.

### Tier 5 — Foundation Model General Knowledge
May support language/reasoning but must not override higher authority.

## 2. Grounding Rule

For clinical, medication, policy, eligibility, or patient-specific decision-support questions, the system SHOULD retrieve approved sources before generating a substantive answer.

## 3. Citation Rule

Clinician-facing decision support SHOULD expose source provenance.

Patient-facing educational answers SHOULD expose understandable source references when useful.

## 4. Conflict Rule

When sources conflict:

1. Do not silently choose.
2. Identify the conflict.
3. Prefer higher authority only if jurisdiction/context matches.
4. Escalate consequential decisions.

## 5. Freshness

Each source must carry review / effective dates.

Expired or superseded knowledge must not be retrieved as current authority unless historical context is explicitly requested.

# AI Knowledge Governance Standard

**Document ID:** RAI-KNO-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Knowledge Governance  
**Effective Date:** 2026-08-24

## 1. Purpose

Define what Rejuvonix AI is allowed to treat as authoritative knowledge.

## 2. Knowledge Lifecycle

```text
DRAFT
  -> CLINICAL / DOMAIN REVIEW
  -> APPROVED
  -> PUBLISHED
  -> SUPERSEDED
  -> ARCHIVED
```

Only APPROVED or PUBLISHED material may be used as authoritative retrieval content.

## 3. Required Metadata

Every governed knowledge item MUST include:

- `knowledge_id`
- title
- owner
- author / originating organization
- reviewer
- version
- effective date
- review date
- jurisdiction
- audience
- source authority tier
- approval status
- supersedes / superseded-by relationship
- allowed AI use
- sensitivity classification

## 4. Institutional Knowledge

Premojin and Rejuvonix expertise should be converted into durable institutional artifacts:

- clinical playbooks;
- pharmacist-reviewed medication guidance;
- product knowledge;
- patient education;
- care escalation rules;
- practitioner guides;
- operational procedures;
- FAQs;
- treatment pathway guidance.

Do not encode experience only as a model persona.

## 5. Knowledge Change Control

A knowledge update that changes clinical advice must:

- create a new version;
- preserve prior version history;
- identify reviewer;
- trigger relevant benchmark/regression tests;
- identify affected workflows.

## 6. Model General Knowledge

Foundation-model latent knowledge is never the highest authority for Rejuvonix-specific clinical guidance.

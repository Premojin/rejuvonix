# Premojin Knowledge Ingestion Standard

**Document ID:** RAI-KNO-003  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Premojin / Rejuvonix Knowledge Governance  
**Effective Date:** 2026-08-24

## 1. Purpose

Define how `premojin.com` and Premojin institutional expertise become governed AI knowledge.

## 2. Source-of-Truth Position

`premojin.com` is an approved institutional source input, but the live website itself is not automatically authoritative for every clinical statement.

The ingestion process must:

1. capture source content;
2. classify it;
3. assign ownership;
4. review it;
5. version it;
6. approve it;
7. publish it to the governed knowledge repository.

## 3. Knowledge Domains

Capture Premojin expertise across:

- medical representative experience;
- pharmacy practice;
- medication education;
- medication handling / fulfillment workflows;
- general care;
- specialty care;
- patient counseling;
- treatment support;
- adherence;
- adverse-event escalation;
- practitioner support;
- product / therapy education.

## 4. Ingestion Workflow

```text
Premojin source
   -> extraction
   -> normalization
   -> duplication check
   -> clinical/domain review
   -> metadata
   -> approval
   -> chunking/indexing
   -> retrieval validation
   -> publish
```

## 5. Website Content

The ingestion process must record:

- source URL/path;
- capture date;
- content checksum;
- source version if available;
- reviewer;
- approval status.

A future site change does NOT silently overwrite the approved AI knowledge version.

## 6. Expert Experience Capture

Tacit expert knowledge should be converted to structured artifacts through:

- interviews;
- case-pattern workshops;
- medication FAQs;
- decision trees;
- escalation rules;
- practitioner notes;
- patient counseling guides.

Every artifact must have named ownership and review.

## 7. Prohibited Practice

Do not instruct the model to behave as if it personally possesses years of regulated professional experience.

Institutional experience must be represented as governed sources.

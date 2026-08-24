# AI Auditability & Provenance Standard

**Document ID:** RAI-AUD-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Security / Clinical Governance  
**Effective Date:** 2026-08-24

## 1. Purpose

Enable reconstruction of significant AI-assisted events without unnecessarily retaining sensitive conversational content.

## 2. Required Interaction Metadata

For governed AI interactions record as appropriate:

- interaction ID;
- timestamp;
- actor ID;
- actor role;
- patient/resource ID when applicable;
- task / intent;
- model provider;
- model ID/version;
- policy bundle version;
- knowledge source IDs + versions;
- tools invoked;
- authorization result;
- response outcome;
- escalation;
- human reviewer action;
- correlation/request ID.

## 3. Clinical Decision Support

Material practitioner-facing recommendations should record:

```text
AI recommendation
-> clinician accepted / modified / rejected
-> final human action
```

## 4. Audit Separation

Differentiate:

- security audit events;
- clinical access events;
- AI interaction metadata;
- application business events.

## 5. Tamper Resistance

Audit records should be append-oriented and not directly editable by ordinary application users.

Do not claim immutable/WORM behavior until technically implemented.

# AI Tool Contract Standard

**Document ID:** RIX-AIT-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** AI / Integration Architecture  
**Effective Date:** 2026-08-24

## 1. Relationship to AI Governance

This standard is subordinate to the Rejuvonix AI Governance Pack.

Core rule:

```text
AI authority <= human user authority
```

## 2. Tool Registry

Each tool must define:

- tool name;
- version;
- purpose;
- allowed roles;
- required permission;
- resource scope;
- input schema;
- output schema;
- risk level;
- requires human confirmation;
- audit level;
- rate limit.

## 3. Examples

Low risk:

```text
search_public_knowledge
```

Medium risk:

```text
read_assigned_patient_intake
```

High risk:

```text
draft_treatment_plan
```

Prohibited autonomous action:

```text
submit_prescription
```

unless governance is explicitly changed.

## 4. Database Access

AI tools must not expose arbitrary SQL or unrestricted datastore access.

Use:

```text
AI -> Tool Gateway -> Authorization -> Domain API -> Database
```

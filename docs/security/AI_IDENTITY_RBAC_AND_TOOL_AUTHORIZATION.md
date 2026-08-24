# AI Identity, RBAC & Tool Authorization Standard

**Document ID:** RAI-SEC-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Security Architecture  
**Effective Date:** 2026-08-24

## 1. Core Authorization Rule

```text
AI authority <= authenticated human authority
```

The AI MUST NOT obtain permissions the initiating principal does not possess.

## 2. Required Context

Every protected AI request must resolve:

- principal;
- role;
- tenant/context if applicable;
- allowed actions;
- resource scope;
- patient relationship;
- requested tool;
- audit correlation ID.

## 3. Tool Authorization

The AI must call narrow application tools.

Forbidden:

- arbitrary SQL;
- unrestricted database consoles;
- unrestricted filesystem;
- unrestricted AWS credentials;
- unrestricted cross-patient search;
- arbitrary privileged HTTP calls.

## 4. Tool Contract

Each AI tool must define:

- tool name;
- purpose;
- allowed roles;
- required permission;
- resource scope;
- input schema;
- output schema;
- sensitivity;
- audit requirements;
- rate limit;
- human approval requirement.

## 5. Patient Isolation

Patient A's AI context MUST NOT include Patient B's data.

## 6. Clinician Scope

Clinicians may access only assigned / otherwise authorized patients.

## 7. Support Scope

Support roles must not receive clinical content merely because the AI can retrieve it.

## 8. Break-Glass

Emergency/break-glass access must require explicit reason, elevated audit, identity, timestamp, patient/resource, and post-event review.

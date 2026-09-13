# API Versioning & Compatibility Standard

**Document ID:** RIX-API-002  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** API Architecture  
**Effective Date:** 2026-08-24

## 1. Versioning Rule

Use:

```text
/api/v1/
```

Breaking public contract changes require a new major API version.

Internal implementation refactors do not.

## 2. Breaking Changes

Examples:

- removed field;
- changed field meaning;
- incompatible type change;
- removed endpoint;
- changed authentication requirement;
- altered error semantics that clients depend on.

## 3. Backward-Compatible Changes

Examples:

- additive optional fields;
- new endpoints;
- new optional query parameters;
- new event types.

## 4. Deprecation

Deprecated APIs must have:

- replacement;
- deprecation notice;
- sunset date where relevant;
- migration guidance.

Avoid long redirect/deprecation chains.

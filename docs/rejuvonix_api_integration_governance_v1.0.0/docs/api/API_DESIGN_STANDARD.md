# Rejuvonix API Design Standard

**Document ID:** RIX-API-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** API Architecture  
**Effective Date:** 2026-08-24

## 1. API Style

REST is the default API style.

Base path:

```text
/api/v1/
```

## 2. Resource Conventions

Examples:

```text
GET    /api/v1/patients/me
PATCH  /api/v1/patients/me
GET    /api/v1/appointments
POST   /api/v1/appointments
GET    /api/v1/consents
POST   /api/v1/consents
POST   /api/v1/encounters
```

Prefer nouns over verbs in route names.

## 3. Request Validation

All request data must be validated server-side.

Reject:

- malformed identifiers;
- invalid enums;
- invalid state transitions;
- oversized payloads;
- unauthorized resource references;
- unsupported content types.

## 4. Response Standard

Success responses SHOULD be consistent.

Errors SHOULD include:

```json
{
  "error": {
    "code": "APPOINTMENT_NOT_FOUND",
    "message": "The requested appointment was not found.",
    "correlationId": "..."
  }
}
```

Do not expose stack traces, SQL, secrets, AWS internals, or PHI in error responses.

## 5. Pagination

Collection endpoints should support consistent pagination.

Recommended:

```text
limit
cursor
```

Avoid offset pagination for very large mutable collections where cursor pagination is more appropriate.

## 6. Idempotency

State-changing endpoints that may be retried should support idempotency where appropriate.

Example:

```text
Idempotency-Key
```

## 7. Authentication

Protected APIs require verified identity and server-side authorization.

## 8. Documentation

Public/partner APIs should have OpenAPI documentation.

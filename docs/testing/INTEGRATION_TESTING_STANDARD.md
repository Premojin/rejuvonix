# Integration Testing Standard

**Document ID:** RIX-TST-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Quality Engineering  
**Effective Date:** 2026-08-24

## 1. Required Test Categories

### API
- success;
- unauthorized;
- forbidden;
- invalid input;
- idempotency;
- not found;
- version compatibility.

### Webhook
- valid signature;
- invalid signature;
- replay;
- duplicate event;
- malformed payload;
- provider retry;
- queue failure.

### Events
- schema validity;
- version handling;
- duplicate delivery;
- consumer idempotency.

### Outbox
- domain commit + outbox commit;
- publication retry;
- duplicate publish safety.

### Adapters
- provider success;
- timeout;
- rate limit;
- malformed provider response;
- provider unavailable.

### Security
- cross-user access;
- cross-patient isolation;
- privilege escalation;
- secret leakage.

## 2. Synthetic Data

Staging integration tests must use synthetic/de-identified data until explicitly authorized otherwise.

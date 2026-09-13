# Correlation, Audit & Observability Standard

**Document ID:** RIX-OBS-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Platform Operations  
**Effective Date:** 2026-08-24

## 1. Correlation ID

Every request should have a correlation identifier.

Recommended header:

```text
X-Correlation-Id
```

Generate one if absent.

## 2. Propagation

Propagate correlation IDs through:

- API;
- database audit;
- outbox;
- EventBridge;
- SQS;
- workers;
- external integration requests;
- webhook receipts;
- AI tool calls.

## 3. Logging

Structured logs should include:

- timestamp;
- level;
- correlationId;
- service/module;
- event/action;
- safe resource identifiers;
- outcome.

## 4. Sensitive Data

Never log secrets, tokens, cookies, or unnecessary PHI.

## 5. Metrics

Track integration health:

- webhook receipt rate;
- signature failures;
- duplicate events;
- processing failures;
- queue depth;
- oldest message age;
- DLQ count;
- external API latency/error rate;
- event publication failures.

# Transactional Outbox Standard

**Document ID:** RIX-EVT-004  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Data / Event Architecture  
**Effective Date:** 2026-08-24

## 1. Purpose

Prevent domain data from committing successfully while its required event is lost.

## 2. Pattern

```text
Database transaction:
  domain state change
  +
  outbox row
COMMIT

Publisher:
  read unpublished outbox
  publish event
  mark published
```

## 3. Suggested Fields

```text
event_outbox
- id
- event_id
- event_type
- event_version
- aggregate_type
- aggregate_id
- payload
- correlation_id
- created_at
- published_at
- attempt_count
- last_error
```

## 4. Delivery Semantics

Assume at-least-once publication.

Consumers must be idempotent.

## 5. Cleanup

Published events require retention/cleanup policy.

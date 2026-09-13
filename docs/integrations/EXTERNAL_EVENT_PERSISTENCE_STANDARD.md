# External Event Persistence Standard

**Document ID:** RIX-INT-002  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Integration Architecture  
**Effective Date:** 2026-08-24

## 1. Suggested Entity

```text
external_events
- id
- provider
- external_event_id
- event_type
- received_at
- processed_at
- status
- attempt_count
- payload_hash
- correlation_id
- last_error
```

## 2. Unique Constraint

Recommended:

```text
(provider, external_event_id)
```

## 3. Status

Suggested:

- RECEIVED
- QUEUED
- PROCESSING
- PROCESSED
- FAILED
- IGNORED

## 4. Sensitive Payloads

Do not retain raw provider payloads longer than necessary.

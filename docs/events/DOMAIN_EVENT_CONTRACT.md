# Domain Event Contract

**Document ID:** RIX-EVT-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Event Architecture  
**Effective Date:** 2026-08-24

## 1. Canonical Envelope

```json
{
  "eventId": "uuid",
  "eventType": "appointment.requested",
  "eventVersion": "1.0",
  "occurredAt": "ISO-8601",
  "producer": "appointments",
  "actor": {
    "type": "patient",
    "id": "..."
  },
  "resource": {
    "type": "appointment",
    "id": "..."
  },
  "correlationId": "...",
  "data": {}
}
```

## 2. Required Fields

- eventId
- eventType
- eventVersion
- occurredAt
- producer
- correlationId

## 3. PHI Rule

Event payloads should use minimum necessary data.

Prefer identifiers over full patient/clinical content.

## 4. Evolution

Breaking event changes require a new `eventVersion`.

Consumers must not assume undocumented fields.

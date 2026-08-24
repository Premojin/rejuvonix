# EventBridge & Queue Usage Standard

**Document ID:** RIX-EVT-003  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Platform Architecture  
**Effective Date:** 2026-08-24

## 1. Rule of Thumb

EventBridge:

```text
Something happened.
```

SQS:

```text
Something needs processing.
```

## 2. EventBridge

Use for domain facts and fan-out.

Examples:

- appointment.completed
- payment.succeeded
- consent.revoked

## 3. SQS

Use for retryable work.

Examples:

- process-webhook
- send-notification
- generate-document
- sync-pharmacy-order
- process-ai-summary

## 4. DLQ

Critical queues must have dead-letter queues.

Document:

- retry count;
- visibility timeout;
- DLQ retention;
- redrive procedure.

## 5. Ordering

Do not use FIFO unless ordering is a real business requirement.

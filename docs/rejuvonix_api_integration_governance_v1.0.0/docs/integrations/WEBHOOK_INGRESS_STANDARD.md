# Webhook Ingress Standard

**Document ID:** RIX-WHK-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Integration Architecture  
**Effective Date:** 2026-08-24

## 1. Canonical Route

Incoming webhook endpoints should use:

```text
POST /api/v1/webhooks/{provider}
```

## 2. Processing Sequence

```text
Request
 -> provider resolution
 -> signature verification
 -> timestamp/replay validation
 -> schema validation
 -> external-event deduplication
 -> persist receipt
 -> return successful receipt quickly
 -> enqueue async processing
```

## 3. No Heavy Processing Inline

Do not perform expensive or failure-prone domain processing during the webhook HTTP request unless required by provider protocol.

## 4. Signature Verification

Each provider adapter must implement explicit signature verification.

Never trust IP address alone.

## 5. Replay Protection

Where supported, verify provider timestamps and reject unacceptable replay windows.

## 6. Idempotency

The same provider event must not create duplicate domain actions.

Recommended unique key:

```text
(provider, external_event_id)
```

## 7. Payload Storage

Store only what is operationally necessary.

Sensitive payloads require encryption and retention controls.

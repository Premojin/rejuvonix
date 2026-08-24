# Outbound Webhook Standard

**Document ID:** RIX-WHK-002  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Integration Architecture  
**Effective Date:** 2026-08-24

## 1. Purpose

Define how Rejuvonix may send event notifications to partner systems.

## 2. Subscription Model

Suggested entity:

```text
webhook_subscriptions
- id
- partner_id
- endpoint
- secret_reference
- event_types
- enabled
- created_at
```

## 3. Security

Sign outbound payloads using HMAC or approved equivalent.

Include:

- event ID;
- timestamp;
- signature;
- event type;
- event version.

## 4. Delivery

Use asynchronous dispatch.

Support:

- retries;
- exponential backoff;
- delivery history;
- DLQ;
- manual redrive.

## 5. Data Minimization

Do not send PHI by default.

Partner contracts must explicitly define permitted data.

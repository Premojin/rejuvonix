# Notification Integration Standard

**Document ID:** RIX-INT-003  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Platform / Communications Architecture  
**Effective Date:** 2026-08-24

## 1. Abstraction

Use:

```text
NotificationService
  -> EmailProvider
  -> SMSProvider
  -> PushProvider
```

Domain modules must not call vendor SDKs directly.

## 2. Trigger

Notifications should usually originate from domain events.

Example:

```text
appointment.scheduled
 -> notification policy
 -> send email/SMS/push as permitted
```

## 3. Preferences

Respect:

- user preferences;
- consent;
- quiet-hour policy;
- jurisdictional requirements.

## 4. Sensitive Content

Avoid PHI in SMS/email bodies unless explicitly approved.

Prefer secure portal notification for sensitive information.

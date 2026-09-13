# Integration Adapter Contract

**Document ID:** RIX-INT-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Integration Architecture  
**Effective Date:** 2026-08-24

## 1. Goal

Prevent business logic from depending directly on external vendors.

## 2. Adapter Categories

Examples:

- PaymentProvider
- PharmacyProvider
- LabProvider
- VideoProvider
- MessagingProvider
- IdentityProvider
- AIProvider

## 3. Domain Dependency Rule

Domain code depends on provider interfaces, not vendor SDKs.

Bad:

```text
AppointmentService -> Twilio SDK
```

Preferred:

```text
AppointmentService -> NotificationService -> MessagingProvider
```

## 4. Adapter Requirements

Each adapter must define:

- supported operations;
- input/output schema;
- error mapping;
- timeouts;
- retries;
- idempotency behavior;
- audit requirements;
- secrets used;
- webhook mapping;
- data sensitivity.

## 5. Vendor Replacement

Replacing a vendor should primarily require a new adapter, not rewriting domain services.

# Rejuvonix Platform Integration Architecture

**Document ID:** RIX-ARC-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Platform Architecture  
**Effective Date:** 2026-08-24

## 1. Goal

Define the scalable integration architecture for Rejuvonix without prematurely introducing distributed-system complexity.

## 2. Default Architecture

```text
Web / Mobile
    |
    v
Application / API Layer
    |
    +--------------------------+
    |                          |
    v                          v
Domain Modules               AI Gateway
    |
    v
PostgreSQL
    |
    +-> Transactional Outbox
              |
              v
         Event Publisher
              |
              v
         EventBridge
          /       \
         v         v
       SQS       Subscribers
         |
         v
       Worker
         |
         v
Integration Adapter
         |
         v
External Provider
```

## 3. Domain Modules

Recommended logical modules:

- identity
- patient
- clinician
- appointments
- encounters
- consent
- eligibility
- treatment
- medication
- pharmacy
- payments
- notifications
- documents
- audit
- ai
- integrations
- webhooks

Modules own their domain logic.

Cross-module access should occur through explicit module interfaces, not direct cross-module database access.

## 4. Modular Monolith Rule

A module may become a service only when justified by:

- independent scaling;
- security isolation;
- different availability requirement;
- independent release cadence;
- expensive async processing;
- partner integration complexity;
- regulatory boundary;
- operational ownership.

## 5. Synchronous vs Asynchronous

Use synchronous API calls when the caller requires an immediate result.

Use events/queues when work can proceed independently or requires retries.

## 6. PHI Minimization

Events and integration payloads should carry identifiers and minimum necessary fields, not full clinical records by default.

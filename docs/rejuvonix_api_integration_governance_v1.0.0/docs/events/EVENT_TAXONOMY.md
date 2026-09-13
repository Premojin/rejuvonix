# Rejuvonix Event Taxonomy

**Document ID:** RIX-EVT-002  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Event Architecture  
**Effective Date:** 2026-08-24

## 1. Naming

Use:

```text
domain.event
```

Past-tense fact preferred.

Examples:

```text
identity.user_created
identity.mfa_enabled

patient.created
patient.profile_completed

consent.granted
consent.revoked

eligibility.completed

appointment.requested
appointment.scheduled
appointment.cancelled
appointment.completed

clinician.patient_assigned

encounter.started
encounter.completed

treatment.recommended
treatment.approved

prescription.created
prescription.sent
prescription.fulfilled

payment.authorized
payment.succeeded
payment.failed

document.uploaded
document.reviewed

notification.requested
notification.delivered
notification.failed

ai.interaction_completed
ai.escalation_requested
ai.clinician_review_required
```

## 2. Ownership

Each event type must have exactly one owning producer domain.

Consumers may not redefine producer semantics.

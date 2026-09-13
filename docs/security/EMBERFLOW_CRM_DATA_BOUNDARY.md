# EmberFlow CRM Data Boundary

**Status:** Proposed safety boundary; EmberFlow contract required

## Current conclusion

The CRM's account-specific PHI posture is **UNKNOWN**. Public EmberFlow terms
state that the company may need to collect/process PHI and describes HIPAA
compliance safeguards, while public service descriptions emphasize CRM leads,
bookings, messaging and calendar operations. This is evidence that PHI handling
may be contemplated, not proof that this CRM location is configured or
contracted as a clinical/PHI system. The BAA, retention, field controls and
downstream EMR boundary still require owner/EmberFlow confirmation.

Until those controls are confirmed, Rejuvonix must treat CRM data as
potentially sensitive and must not send clinical content. Source: [public
EmberFlow terms](https://www.emberflowai.com/terms).

| Data class | Examples | Rejuvonix disposition |
| --- | --- | --- |
| NON-PHI CRM DATA | Application user ID, source attribution, non-clinical lifecycle status, opaque CRM IDs | May be sent/stored only after field allowlist and contract approval |
| POTENTIALLY PHI | Name, email, phone, appointment details, health-related program interest, free-text notes, contact conversations | Minimize; send only for documented purpose and approved consent |
| EMR-BOUND ONLY | Symptoms, medical history, allergies, medications, diagnoses, clinical notes, treatment plans, prescriptions, clinical encounters, QuestionnaireResponse contents | Must not originate in or be persisted by Rejuvonix CRM integration |
| DO NOT SEND | Access tokens, passwords, Cognito secrets, raw clinical forms, full medical histories, unbounded free text, raw EMR/FHIR resources | Hard prohibition |
| UNKNOWN / CONFIRMATION REQUIRED | Custom fields, pipeline labels, tags, workflows, automation payloads, recordings/transcripts, document contents, CRM-to-EMR fields | Default deny until documented |

## Consent separation

These are separate controls and must not be collapsed:

1. Website terms/privacy acknowledgment — Rejuvonix.
2. CRM communication consent — CRM/Rejuvonix coordinated, with explicit source.
3. Marketing email/SMS consent — applicable messaging system and Rejuvonix record.
4. Clinical treatment consent — clinical/EMR authority.
5. EMR clinical intake authorization — EmberFlow/EMR workflow.

`STOP`, email unsubscribe, and communication opt-out must not be treated as
clinical-consent revocation, and clinical consent must not opt a person into
marketing.

## Recommended boundary

```text
Rejuvonix: identity + minimum CRM metadata + workflow references
CRM: contact/lifecycle/communication workflow, if contract permits
EMR: clinical intake and regulated clinical record
```

Do not infer that the CRM is HIPAA-ready, a Business Associate, or a clinical
system without explicit EmberFlow/legal evidence.

# EmberFlow CRM Data Ownership Matrix

**Status:** Proposed; account and contract confirmation required

| Data | Rejuvonix | EmberFlow CRM | EMR | Source of truth | Rejuvonix may store? | PHI? | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Authentication identity | Owns | Reference only | Separate | Rejuvonix/Cognito | Yes | Sensitive | Cognito remains login authority |
| Application user | Owns | Optional linkage | No | Rejuvonix | Yes | Sensitive | Stable local ID |
| CRM contact ID | Reference | Owns | Maybe indirect | CRM | Yes, opaque | Usually non-PHI metadata | Proposed `emberflow_contact_id` |
| Phone/email | Collected/controlled by Rejuvonix if required | May mirror | May receive | Contract-dependent | Minimize | Potentially | Consent and purpose required |
| Lead source | Owns attribution | May mirror | No | Rejuvonix/CRM | Yes | Usually no | Allowlist values |
| Program interest | Owns product intent | May mirror | Maybe workflow input | Contract-dependent | Yes, minimized | Potentially | Avoid diagnostic meaning |
| Eligibility status | Normalized reference | May process | Clinical decision downstream | Contract-dependent | Status only | Potentially | Never imply approval |
| Appointment | Reference/UX | Possible scheduler | Clinical appointment authority | TBD | ID/status/time only | Potentially | No full clinical record |
| Payment status | TBD | Possible CRM/payment | Separate | Contract-dependent | Status only | Financial sensitive | Do not move authority now |
| Membership status | Product experience | Possible subscription | No | TBD | Normalized status | Sensitive | Compare before migration |
| Communication status | Consent metadata/audit | Sends/records messages | No | Channel system + Rejuvonix consent | Yes | Consent-sensitive | STOP/unsubscribe separate |
| Clinical intake | No | Handoff only if documented | Owns | EMR | No | Yes | No clinical answers in Rejuvonix |
| Medical history | No | No by default | Owns | EMR | No | Yes | EMR-bound |
| Symptoms | No | No by default | Owns | EMR | No | Yes | EMR-bound |
| Medications | No | No by default | Owns | EMR | No | Yes | EMR-bound |
| Diagnosis | No | No by default | Owns | EMR | No | Yes | EMR-bound |
| Treatment plan | No | No by default | Owns | EMR | No | Yes | EMR-bound |
| Prescription | No | No by default | Owns | EMR | No | Yes | EMR-bound |
| Clinical encounter | No | No by default | Owns | EMR | No | Yes | EMR-bound |

## Identity mapping

```text
Cognito sub
  -> Rejuvonix user ID
  -> Rejuvonix patient/application ID
  -> EmberFlow CRM contact ID
  -> downstream EMR identity (opaque/indirect, if exposed)
```

These identifiers must remain separate. No CRM or EMR identifier should be
derived from or substituted for a Cognito subject.

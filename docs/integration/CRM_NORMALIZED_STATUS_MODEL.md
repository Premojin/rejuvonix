# CRM Normalized Status Model

**Status:** Implemented internal vocabulary; not mapped to EmberFlow stages

| Status | Meaning |
| --- | --- |
| `NEW` | No CRM contact/workflow reference is linked |
| `CONTACT_LINKED` | A CRM contact reference is linked |
| `ONBOARDING_STARTED` | Provider-confirmed onboarding started |
| `ONBOARDING_COMPLETE` | Provider-confirmed onboarding completed |
| `HANDOFF_REQUIRED` | A downstream clinical/EMR handoff is required |
| `HANDOFF_IN_PROGRESS` | Downstream handoff is reported in progress |
| `ACTIVE` | Provider-confirmed active lifecycle |
| `FOLLOW_UP` | Provider-confirmed follow-up state |
| `CLOSED` | Provider-confirmed closed state |
| `FAILED` | Normalized failed state |
| `UNKNOWN` | No safe normalized interpretation available |

These values are internal application statuses. They must not be mapped to
assumed CRM pipeline stages until EmberFlow provides actual stage identifiers,
transition rules, ownership, and event semantics.

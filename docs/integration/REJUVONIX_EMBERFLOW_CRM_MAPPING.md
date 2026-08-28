# Rejuvonix to EmberFlow CRM Mapping

**Status:** Assessment mapping; CRM capabilities remain account-UNKNOWN

| Rejuvonix feature | Current behavior | EmberFlow CRM capability | Duplication | Integration needed | Source of truth | Data flow | Change required | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Public marketing | Funnels/websites/contacts UNKNOWN | Possible | No immediate call | Rejuvonix content | Browser -> Rejuvonix | Keep | NO CHANGE |
| `/treatments`, `/compounded` | Public education | Program/source attribution UNKNOWN | Possible | Optional lead attribution | Rejuvonix | Browser -> Rejuvonix | Define allowlisted source data | P2 |
| `/eligibility` | Program selector and preview | Forms/funnels UNKNOWN | High if duplicated | Decide native UX vs hosted/API handoff | Pending contract | Browser -> Rejuvonix -> CRM | No change now | P1 |
| `/get-started` | Routes to eligibility | Funnel entry UNKNOWN | Possible | Add approved CRM continuation only later | Rejuvonix navigation | Browser -> Rejuvonix | Keep preview | P1 |
| `/sign-up` | Preview/Cognito path; production identity path under development | Contact creation UNKNOWN | Identity/contact overlap | Link after verified lifecycle trigger | Cognito/Rejuvonix identity | Cognito -> Rejuvonix -> CRM | Add adapter later | P1 |
| `/sign-in` | Rejuvonix login boundary | CRM login UNKNOWN | Undesired | None unless contract mandates SSO | Cognito | Browser -> Cognito -> Rejuvonix | Keep Cognito | NO CHANGE |
| `/account` | Simulated dashboard | Contact/opportunity/appointment status UNKNOWN | High | Normalize status, never expose CRM objects | Rejuvonix UI; CRM references | CRM -> service -> UI | Add status adapter later | P1 |
| `/membership` | Product/membership experience | Membership/payment UNKNOWN | Possible | Compare only after inventory | Currently Rejuvonix | TBD | Do not replace | P2 |
| `/connected-health` | Marketing/product preview | Clinical/device workflow UNKNOWN | Unclear | No CRM call | Rejuvonix content | Browser -> Rejuvonix | Keep | NO CHANGE |
| `/support` | Support education/mail link | Conversations/SMS/email UNKNOWN | Possible | Consider CRM only for approved operational support | TBD | TBD | No change now | P2 |
| `/api/v1/auth/me` | Returns authenticated local identity/roles | CRM user identity UNKNOWN | None intended | No direct CRM exposure | Cognito/Rejuvonix | Cognito -> Rejuvonix | Keep | NO CHANGE |
| `/api/v1/patients/me` | Non-PHI local patient/profile | Contact UNKNOWN | Contact mapping | Add opaque CRM reference later | Rejuvonix identity; CRM contact | Service -> CRM | Contract-dependent field | P1 |
| `/api/v1/workflow` | Calls local provider boundary; rejects clinical keys | CRM workflow UNKNOWN | Workflow overlap | Replace provider call with CRM service only after contract | Normalized Rejuvonix status | API -> CRM adapter | Rename/re-scope service internally | P1 |
| `/api/v1/appointments` | Local appointment rows | CRM calendar UNKNOWN | High | Decide CRM-authoritative/reference-only | Pending contract | API -> CRM or local | No migration now | P1 |
| `/api/v1/consents` | Local versioned consent metadata | CRM messaging/clinical consent UNKNOWN | Consent overlap | Separate communication and clinical consent | Rejuvonix policy metadata; EMR clinical consent | Rejuvonix -> CRM only if needed | Clarify contract | P1 |

## Recommendation

Keep the native Rejuvonix UX for public education, authentication, and
non-clinical product experience. Use CRM API or hosted funnel only for the
approved onboarding/lead handoff after field, consent, contact, and EMR-handoff
semantics are known. Do not duplicate clinical intake in either Rejuvonix or
CRM without explicit EmberFlow authorization.

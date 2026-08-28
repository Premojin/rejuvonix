# Rejuvonix CRM Website Change Plan

**Status:** Assessment plus provider-neutral scaffold; no website behavior changed

## P0 — required before production CRM activation

- Define an approved contact lifecycle trigger, preferably after verified
  signup/email verification or explicit onboarding start, rather than on a
  marketing page view.
- Define an allowlisted non-clinical payload and consent language.
- Keep Cognito/Rejuvonix sign-in independent from CRM login unless documented
  SSO is explicitly required.
- Preserve the current preview disclosure and do not send the in-memory
  clinical draft to CRM.

## P1 — contract-dependent

| Area | Current state | Future behavior | Dependency |
| --- | --- | --- | --- |
| Sign-up | Preview plus Cognito architecture | Link local identity to one CRM contact idempotently | Contact API/matching |
| Eligibility | Native multi-step UI, clinical draft remains in memory | Keep native non-clinical UX or use approved CRM form/funnel; clinical handoff exits to EmberFlow | Form/funnel/handoff contract |
| Get Started | Entry navigation | Route to approved onboarding boundary | CRM entry mechanism |
| Account | Simulated dashboard | Display normalized status, appointment and membership state | Status APIs/events |
| Appointments | Local API/table | CRM-authoritative or reference-only model | Calendar contract |
| Contact forms | Support mailto/public content | Use CRM form only for approved non-clinical support/lead data | Form and consent contract |
| Communications | No CRM messaging active | Show consent/status only; CRM may send if approved | Messaging/A2P contract |

The inactive `GET /api/v1/patients/me/status` contract is now available as an
application-oriented seam. It requires the existing Cognito boundary and
returns normalized status only; the current frontend does not consume it.

## P2 — optional

- CRM-backed abandoned onboarding reminders;
- normalized appointment deep links;
- aggregate lifecycle analytics;
- support conversation status;
- membership renewal reminders.

## NO CHANGE

Keep public treatments, programs, Connected Health marketing, safety content,
and AI surfaces unchanged. Do not embed or redirect to the provided CRM URL
until owner approves the experience and the exact form/funnel behavior is
documented.

## Decision

**Rejuvonix requires PARTIAL modification eventually, but not in this run.**
The safest default is native Rejuvonix UX for education and non-clinical
eligibility context, followed by a server-mediated CRM handoff. Hosted CRM
forms/funnels remain viable alternatives but are UNKNOWN until inspected.

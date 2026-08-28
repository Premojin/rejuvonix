# EmberFlow CRM Discovery Questions

**Status:** Owner/EmberFlow contract questionnaire

## Platform and tenancy

1. What CRM platform is EmberFlow using?
2. Public EmberFlow pages link to `app.gohighlevel.com`; is HighLevel the underlying platform, a linked tool, or neither for this account?
3. Is it white-labelled, customized, or directly vendor-branded?
4. Does the account model use agency, organization, location, sub-account, or tenant scopes?
5. What is the supported API base URL and API version?
6. Is the supplied location a production tenant, sandbox, or test location?

## API and authentication

7. Where is the official developer/API documentation?
8. Is authentication OAuth 2.0, private integration token, API key, location token, mTLS, or another model?
9. Are credentials location-scoped? What scopes, claims, expiry, rotation, revocation, and rate limits apply?
10. Is there an official SDK, OpenAPI document, webhook API, or developer portal?
11. What API lifecycle and versioning policy applies?

## Contacts and lifecycle

11. How are contacts created, searched, matched, updated, and deduplicated?
12. What is the authoritative deduplication key: email, phone, external ID, or provider logic?
13. How should Rejuvonix identify itself as a source?
14. Which custom fields, tags, notes, source values, and consent fields are approved?
15. Which fields are prohibited, PHI-bearing, or EMR-bound?
16. What contact-created/updated events exist and are they idempotent?

## Pipelines and workflows

17. Which pipeline represents the Rejuvonix patient/customer lifecycle?
18. What actual opportunity stages exist, and which are editable by an integration?
19. Does an opportunity belong to a contact, location, team, or campaign?
20. Which workflows/automations are relevant to onboarding, appointments, payments, fulfillment, support, or follow-up?
21. What are their triggers, high-level actions, and side effects? Can Rejuvonix invoke them safely?

## Funnels and forms

22. Is the Funnels/Websites area intended for Rejuvonix onboarding?
23. Can forms be embedded by iframe or JavaScript, linked by redirect, or submitted through API?
24. What fields, hidden source fields, redirects, submission events, and workflow triggers are supported?
25. Is there a non-production test form or sandbox? May it be used without creating live contacts?

## CRM-to-EMR handoff

26. How does CRM initiate clinical intake: workflow action, hosted clinical page, redirect, embedded UI, API trigger, or pipeline transition?
27. Is the CRM-to-EMR handoff verified, partially documented, or internal-only?
28. Does Rejuvonix receive any downstream status, and through which CRM object/event?
29. Is the downstream EMR FHIR-based, and is that contract exposed to Rejuvonix? If not, should all FHIR assumptions remain downstream only?

## Scheduling, payments, and communications

30. What calendars, providers, appointment types, booking URLs, cancellation/reschedule APIs, and events exist?
31. Is CRM or another system authoritative for appointments?
32. Are products, checkout, subscriptions, invoices, or memberships enabled?
33. Which channels are enabled: SMS, email, calls, voicemail, WhatsApp?
34. How are transactional and marketing messages separated?
35. Is A2P 10DLC/toll-free registration already handled? What opt-in, STOP, and unsubscribe evidence is required?

## Events, security, and operations

36. Which verified webhook events exist and what are their payloads?
37. How are webhooks signed, replay-protected, retried, ordered, and versioned?
38. What are quotas, Retry-After semantics, idempotency keys, and outage behavior?
39. What sandbox, synthetic contacts, test credentials, reset controls, and developer logs exist?
40. What BAA/data-processing, retention, deletion, audit, incident, and production go-live obligations apply?

Until these questions are answered, no CRM endpoint, token, field, pipeline,
workflow, webhook, or EMR handoff may be implemented or encoded as fact.

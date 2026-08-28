# EmberFlow CRM Integration Security Assessment

**Status:** Assessment only; no credentials or CRM calls used

## Evidence state

Authentication, API base URL, token type, scopes, location/tenant isolation,
webhook signatures, rate limits, retention, and breach/BAA terms are UNKNOWN
because the authenticated CRM session was unavailable.

Public EmberFlow terms describe a dedicated CRM sub-account, lead/bookings
management, texting/emailing, calendar connections, and possible PHI handling.
They also contain broad marketing/communication language. These public claims
do not establish the security properties of the supplied location or the
technical contract; obtain the account configuration, API documentation, and
signed contractual evidence before sending any data.

## Required controls before implementation

| Control | Assessment | Future requirement |
| --- | --- | --- |
| Credential storage | No CRM credentials present in repository | Store secrets in approved Secrets Manager path; never `.env` tracked or logs |
| Token lifecycle | UNKNOWN | Confirm expiry, rotation, revocation, audience, scope and refresh behavior |
| Least privilege | UNKNOWN | Request only contact/workflow/appointment capabilities required |
| Tenant isolation | Location-shaped URL only; semantics UNKNOWN | Bind provider config and every object reference to approved tenant/location |
| Outbound TLS | Rejuvonix standard requires HTTPS | Enforce certificate validation and bounded timeouts |
| Webhook authentication | UNKNOWN | Verify signature and timestamp; reject replay; deduplicate `(provider,eventId)` |
| Logging | Rejuvonix correlation logging exists | Log provider, correlation ID, object type/opaque ID, status, latency and category only |
| PII/PHI | CRM boundary UNKNOWN | Allowlist fields; reject clinical keys and unbounded free text |
| Audit | Application audit primitives exist | Record actor, operation, provider reference, outcome and timestamp without payload |
| Rate limiting | UNKNOWN | Honor documented quota/Retry-After; bounded retries with jitter |
| Error safety | Rejuvonix safe-error contract exists | Map provider errors to internal categories; do not expose raw CRM payloads |
| Browser exposure | Current UI should not call CRM directly | Keep tokens and CRM payloads server-side |

## Future event flow

```text
CRM webhook
  -> authenticated Rejuvonix ingress
  -> signature/replay/schema validation
  -> idempotent receipt
  -> queue/worker
  -> normalized status
  -> minimal PostgreSQL update + audit
```

This is a recommendation only. No endpoint, queue, WAF rule, or AWS resource is
implemented by this assessment.

## Security unknowns for EmberFlow

Confirm whether CRM fields, notes, messages, call recordings, appointment
metadata, custom fields, workflow payloads, and EMR handoff tokens may contain
PHI; whether a BAA applies; who owns deletion/retention; and whether CRM users,
Rejuvonix users, and EMR users have distinct authorization domains.

# Codex Integration Build Checklist

**Document ID:** RIX-ENG-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Engineering Governance  
**Effective Date:** 2026-08-24

## Mandatory Pre-Build

Before API/integration/event/webhook work, Codex MUST read:

1. `/INTEGRATION_GOVERNANCE_INDEX.md`
2. all relevant referenced standards
3. `/AI_GOVERNANCE_INDEX.md` if AI tools/agents are involved

Then report loaded document IDs and versions.

## Checklist

### Domain
- Which module owns the business action?
- Is module ownership clear?

### API
- Is `/api/v1` used?
- Is server validation present?
- Is authorization server-side?
- Is idempotency needed?

### Webhooks
- Signature verified?
- Replay protected?
- Deduplicated?
- Persisted?
- Async processing used?

### Events
- Event envelope valid?
- Event version assigned?
- Producer owns event?
- PHI minimized?

### Queue
- Retry policy?
- DLQ?
- Redrive procedure?
- Idempotent consumer?

### Outbox
- Is reliable publication required?
- Does domain + outbox commit atomically?

### Adapter
- Is vendor SDK hidden behind interface?
- Are timeout/error mappings defined?

### Security
- Secrets managed?
- Minimum necessary data?
- Cross-patient authorization tested?

### Observability
- Correlation ID propagated?
- Metrics/logging in place?
- No sensitive logging?

### Testing
- unit
- API
- webhook
- event
- queue
- adapter
- authorization
- regression

## Stop Conditions

Stop and report if:

- integration bypasses domain authorization;
- webhook cannot be authenticated;
- PHI would be sent to an unapproved provider;
- tool privileges exceed initiating user;
- destructive migration is required without approval;
- Terraform proposes unrelated/destructive changes;
- critical tests fail.

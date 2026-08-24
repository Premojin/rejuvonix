# AI Build Checklist for Codex

**Document ID:** RAI-ENG-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Engineering Governance  
**Effective Date:** 2026-08-24

## Mandatory Pre-Build Step

Before writing AI-related code, Codex MUST read:

1. `/AI_GOVERNANCE_INDEX.md`
2. all governance documents identified by the index as relevant to the requested feature.

Then report:

```text
Governance documents loaded:
- <ID> <version>
...
```

## Build Checklist

### Scope
- What stakeholder role is affected?
- Is this public, patient, clinician, pharmacist, support, operations, or service?
- Does it involve clinical decision support?
- Does it involve PHI?
- Does it invoke tools?
- Does it persist memory?

### Knowledge
- Which source tiers are allowed?
- Is retrieval required?
- Are source versions recorded?
- Are stale/superseded sources excluded?

### Security
- Is identity resolved?
- Is authorization server-side?
- Does AI authority remain <= user authority?
- Are cross-patient tests present?
- Is tool scope narrow?

### Safety
- Is human review required?
- Are escalation rules implemented?
- Is uncertainty handled?
- Are prohibited autonomous actions prevented?

### Audit
- Is interaction correlation present?
- Are model/policy/source versions recorded?
- Are tool calls audited?
- Is clinical reviewer disposition captured when required?

### Privacy
- Is minimum necessary data used?
- Are secrets/tokens excluded?
- Are logs redacted?
- Is synthetic-only enforced in non-authorized environments?

### Testing
- Unit tests
- authorization tests
- retrieval tests
- source-conflict tests
- hallucination traps
- safety/escalation tests
- benchmark suite
- cost/latency sanity

### Release
- feature branch
- PR
- staging
- synthetic validation
- no production without explicit authorization

## Stop Conditions

Codex MUST stop and report if:

- a request violates a binding governance document;
- PHI would be sent to an unapproved service;
- authorization cannot be enforced;
- source authority is ambiguous for a consequential clinical answer;
- a requested tool grants broader privileges than the human user;
- a change would bypass required human oversight;
- a benchmark critical safety test fails.

# Rejuvonix Engineering Instructions

## Governance loading

Before modifying AI, agent, clinical decision-support, knowledge-retrieval,
agent-tool, API, event, webhook, queue, provider-integration, or AI-audit
code, read the applicable repository indexes completely:

- `docs/AI_GOVERNANCE_INDEX.md` (`RAI-GOV-000`)
- `docs/INTEGRATION_GOVERNANCE_INDEX.md` (`RIX-GOV-000`)

Then read every referenced standard relevant to the requested change. Agent
experience work also requires `docs/ai/AGENT_EXPERIENCE_SPECIFICATION.md`
(`RAI-UX-002`) and the retained DOCX/design reference when visual behavior is
affected.

Report document IDs and versions before implementation. Higher-authority
safety, privacy, authorization, clinical, and contractual controls prevail.

## Build boundaries

- Use a modular monolith with explicit domain-module interfaces and event-driven seams.
- Keep AI authority less than or equal to the initiating human user's authority.
- Use server-side identity, RBAC, object-level authorization, and patient isolation.
- Use synthetic or de-identified data until regulated PHI processing is explicitly approved.
- Keep provider SDKs behind application-owned abstractions and AI tools behind narrow contracts.
- Never add arbitrary SQL, unrestricted network/AWS access, or autonomous consequential clinical actions.
- Validate APIs server-side, use `/api/v1/` for new versioned APIs, and apply correlation IDs and safe errors.
- Do not weaken governance or security tests to make a build pass.

## Workflow

Use focused feature branches from `staging`, validate locally, and use PRs into
`staging`. Do not modify `main` directly, force push, or deploy production
without explicit authorization. Record governance IDs, tests, migration/
rollback impact, and deployment scope in implementation handoffs.

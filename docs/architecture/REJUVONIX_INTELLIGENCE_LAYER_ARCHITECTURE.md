# Rejuvonix Intelligence Layer Architecture

**Document ID:** RAI-ARC-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Rejuvonix Architecture  
**Effective Date:** 2026-08-24

## 1. Objective

Define a scalable, model-agnostic, governed architecture for AI capabilities across Rejuvonix.

## 2. Architecture Principle

Rejuvonix SHALL implement one shared intelligence layer with multiple governed role experiences.

```text
Visitors / Patients / Clinicians / Pharmacists / Operations
                         |
                         v
              Rejuvonix Application Layer
                         |
                         v
                 AI Gateway / Orchestrator
                         |
          +--------------+---------------+
          |              |               |
          v              v               v
      Retrieval      Authorized Tools   Guardrails
          |              |               |
          v              v               v
   Governed Knowledge  Rejuvonix APIs  Safety Policies
          |
          v
     Model Provider Layer
```

## 3. Core Components

### 3.1 Application Boundary
The application authenticates the user, resolves role and scope, and creates the allowed AI context.

### 3.2 AI Gateway
All AI calls MUST pass through an application-owned abstraction.

Responsibilities:

- model selection;
- policy injection;
- retrieval orchestration;
- tool authorization;
- structured outputs;
- trace correlation;
- redaction;
- fallback handling;
- model/provider portability.

Application code MUST NOT scatter direct provider SDK calls throughout domain features.

### 3.3 Retrieval Layer
Uses approved, versioned sources only.

### 3.4 Tool Layer
Tools expose narrow business capabilities, never unrestricted data-store access.

### 3.5 Safety Layer
Applies role policies, scope restrictions, content controls, escalation rules, and clinical human-oversight requirements.

### 3.6 Audit Layer
Records AI interaction metadata, source provenance, tool use, outcome, and reviewer action where applicable.

## 4. Role Surfaces

### Visitor / Patient Guide
May:
- explain approved public information;
- navigate services;
- explain treatments in approved educational language;
- assist with eligibility / onboarding flow;
- collect non-diagnostic information;
- escalate to human care.

May not:
- independently diagnose;
- prescribe;
- change dosage;
- direct discontinuation of prescribed medication;
- claim certainty where not grounded;
- access another user's data.

### Practitioner Copilot
May:
- summarize authorized patient context;
- retrieve approved clinical knowledge;
- prepare draft documentation;
- surface treatment considerations;
- identify conflicts or missing information;
- support clinician workflow.

Must:
- label recommendations as decision support;
- provide source provenance;
- preserve clinician accountability;
- log consequential interactions.

May not independently execute high-risk clinical actions.

### Operations / Support
May use AI only within the permissions of the underlying human role.

## 5. Model Independence

The architecture MUST support changing model providers without rewriting business workflows.

Interfaces should resemble:

```ts
interface AIService {
  generate(input: GenerateInput): Promise<GenerateResult>
  retrieve(query: RetrievalQuery): Promise<RetrievedContext>
  invokeTool(request: ToolRequest): Promise<ToolResult>
}
```

Provider-specific details belong behind adapters.

## 6. AWS Alignment

Current preferred staging direction:

- ECS/Fargate application boundary;
- RDS PostgreSQL for application/audit metadata;
- S3 for governed knowledge artifacts where appropriate;
- KMS encryption;
- Secrets Manager;
- CloudWatch / CloudTrail;
- Amazon Bedrock / AgentCore evaluated as managed AI runtime;
- Bedrock Knowledge Bases or equivalent retrieval service;
- Guardrails as an additional safety control.

Rejuvonix MUST retain application-owned orchestration even when using managed agent services.

## 7. State & Memory

Agent continuity MUST distinguish:

- session context;
- persistent user preferences;
- clinical record data;
- institutional knowledge;
- workflow state.

The model's conversational memory MUST NOT become the authoritative clinical record.

Persistent memory must be explicit, permissioned, auditable, and stored in Rejuvonix-owned systems.

## 8. Scalability

The architecture must support:

- multiple jurisdictions;
- multiple knowledge collections;
- specialty-specific policy packs;
- role-specific agents;
- provider/model replacement;
- additional tools;
- horizontally scaled application workloads;
- asynchronous workflows later without changing the core authorization model.

## 9. Non-Goals for Initial Release

Initial release will not include:

- autonomous diagnosis;
- autonomous prescribing;
- autonomous medication changes;
- unrestricted browsing as a clinical source;
- autonomous cross-patient reasoning;
- self-modifying permissions;
- self-publishing knowledge.

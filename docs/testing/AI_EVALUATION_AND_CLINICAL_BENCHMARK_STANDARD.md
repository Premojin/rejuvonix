# AI Evaluation & Clinical Benchmark Standard

**Document ID:** RAI-TST-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** AI Quality / Clinical Governance  
**Effective Date:** 2026-08-24

## 1. Requirement

No material model, prompt, retrieval, policy, or knowledge release may be promoted without evaluation.

## 2. Benchmark Domains

Build a synthetic benchmark covering:

- medication education;
- contraindications;
- drug interactions;
- treatment eligibility;
- adverse events;
- emergency escalation;
- pregnancy/lactation uncertainty;
- chronic conditions;
- patient navigation;
- clinician summaries;
- source-conflict scenarios;
- hallucination traps;
- unauthorized access attempts;
- cross-patient isolation;
- support-role restrictions;
- out-of-scope requests.

## 3. Metrics

Track:

- groundedness;
- clinical correctness;
- citation correctness;
- safety;
- escalation correctness;
- hallucination rate;
- unauthorized disclosure rate;
- tool authorization failures;
- patient isolation;
- latency;
- cost;
- structured-output validity.

## 4. Release Gate

Critical failures are blocking.

Examples:

- unsafe medical advice;
- unauthorized PHI disclosure;
- fabricated source presented as authoritative;
- bypassed human review;
- cross-patient data access.

## 5. Regression

Every approved knowledge or prompt-policy change must re-run affected benchmark suites.

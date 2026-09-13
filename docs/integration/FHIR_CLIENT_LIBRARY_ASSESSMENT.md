# FHIR Client Library Assessment

**Status:** Research only; no dependency installed
**Reviewed:** 2026-08-27

## Candidates

| Candidate | Strengths | Concerns / fit |
| --- | --- | --- |
| `fhir-kit-client` 2.0.3 | TypeScript-first Node client; R4; REST interactions; search, Bundle pagination, transactions, capability checking, bearer/custom signer hooks | Community package; debug logging must be disabled or scrubbed; SMART support is useful but EmberFlow contract still controls |
| `fhirclient` (`smart-on-fhir/client-js`) | Mature SMART App Launch browser/server library; authorization-code launch and FHIR client behavior; Apache-2.0 | Primarily SMART launch oriented; browser storage and token behavior require careful review; not a reason to expose FHIR in the UI |
| Direct `fetch` plus narrow local types | No dependency cost; exact control over headers, timeouts, redaction, error mapping, and capability gates | More code; must implement search pagination, content negotiation, and safe error parsing correctly |

## Recommendation

Build the first adapter behind the existing `ClinicalDataProvider` and use a
small provider-neutral transport boundary. Prefer a maintained client only
after EmberFlow confirms FHIR version, interaction profile, auth model, and
resource subset. For a server-to-server adapter, `fhir-kit-client` is the
strongest initial proof-of-concept candidate because the current runtime is
Node 22, it supports R4 and TypeScript, and it exposes search/pagination and
capability helpers. Do not install it during this assessment.

For a browser-based SMART launch, evaluate `fhirclient` only after EmberFlow
confirms that direct app launch is intended. Rejuvonix should still keep vendor
and FHIR calls server-side where the workflow permits, so access tokens and
clinical payloads do not enter ordinary UI state or logs.

## Required acceptance checks before adoption

- maintained release and license review;
- R4/R4B/R5 behavior explicitly tested against the confirmed contract;
- no default URL, body, token, or PHI logging;
- timeout, retry, rate-limit, and cancellation controls;
- OperationOutcome/error extraction mapped to internal safe categories;
- bounded search and `Bundle.link[next]` traversal;
- capability validation before resource calls;
- synthetic contract tests and malformed-response tests;
- dependency and transitive-dependency security review.

Primary references: [FHIRKit Client](https://www.npmjs.com/package/fhir-kit-client),
[SMART App Launch client](https://github.com/smart-on-fhir/client-js), and the
[HL7 FHIR Validator wrapper](https://github.com/hapifhir/org.hl7.fhir.validator-wrapper).

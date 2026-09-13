# ADR-CRM-001: EmberFlow CRM Boundary

**Status:** PROPOSED / PENDING OWNER AND EMBERFLOW CONTRACT CONFIRMATION
**Date:** 2026-08-27

## Context

Owner clarification changes the integration hypothesis. EmberFlow provides the
CRM layer, and EmberFlow manages downstream communication with the EMR that
holds clinical PHI. Rejuvonix therefore must not assume a direct EMR or direct
FHIR integration.

## Decision proposal

The active Rejuvonix integration boundary will be CRM-first:

```text
User Browser
  -> Rejuvonix UI
  -> Cognito + Rejuvonix API
  -> Application service
  -> generic CrmProvider
  -> future EmberFlowCrmProvider
  -> EmberFlow CRM
  -> EmberFlow-managed clinical/EMR handoff
  -> EMR / clinical PHI system
```

CRM communications, automations, appointments, and lifecycle workflows remain
inside EmberFlow where the contract assigns them. Rejuvonix consumes normalized
status and retains opaque references only. Clinical intake and clinical records
remain outside Rejuvonix unless an explicit approved contract changes the PHI
boundary.

## Proposed interface boundary

```text
CrmProvider
  getCapabilities()
  createContact(input)
  findContact(criteria)
  updateContact(id, patch)
  getContact(id)
  getWorkflowStatus(reference)
  getAppointment(reference)
  healthCheck()

EmberFlowCrmProvider implements CrmProvider
```

Exact method names, payloads, auth, events, and objects remain subject to the
official contract. `ClinicalDataProvider` should not be called directly by UI
routes; it may remain as dormant downstream clinical architecture knowledge or
be re-scoped when the EMR boundary is formally documented.

## FHIR ADR disposition

`ADR-FHIR-001-INTEROPERABILITY-BOUNDARY.md` is **RETAINED AS DOWNSTREAM
REFERENCE**, not superseded. Its direct EmberFlow/FHIR framing is no longer the
active primary integration plan. Its FHIR resource ownership, non-PHI boundary,
capability-driven principles, and clinical-system reference remain useful for
the possible EmberFlow-to-EMR environment.

## Consequences

Positive: smaller active integration, no invented FHIR or EMR contract, vendor
isolation, simpler PHI boundary, and clear CRM lifecycle ownership.

Cost: CRM semantics must be mapped; downstream clinical status may be indirect;
hosted funnel versus API decisions remain pending; contact and appointment
references require idempotency and retention rules.

## Security and trust boundaries

Cognito authenticates Rejuvonix users. Rejuvonix authorizes application access.
CRM credentials are server-side secrets. CRM is a separate external trust
boundary. EMR is a separate clinical trust boundary. No browser receives CRM
tokens or raw clinical payloads. Events require authenticated ingress,
deduplication, redaction, and audit correlation.

## Open dependencies

CRM platform identity, white-label status, tenancy, API/auth model, contact
schema, pipelines, forms/funnels, workflows, communications consent,
appointments, webhook support, CRM-to-EMR handoff, PHI posture, sandbox,
retention, rate limits, and legal/BAA obligations require owner/EmberFlow
confirmation.

# Provider-Neutral CRM Scaffold Design

**Status:** Implemented inactive scaffold; EmberFlow contract required

## Boundary

```text
Browser -> Cognito -> Rejuvonix API -> application service -> CrmProvider
        -> future EmberFlow CRM adapter -> EmberFlow EMR handoff -> EMR
```

`CrmProvider` is separate from `ClinicalDataProvider`. The former represents
the active CRM boundary; the latter remains dormant downstream clinical
interoperability architecture. No provider URL, tenant, location, token,
endpoint, or payload is encoded.

## Provider modes

| Mode | Behavior | Environment |
| --- | --- | --- |
| `not_configured` | Inactive provider; capability states unknown; operations fail closed | Default everywhere |
| `mock` | Deterministic synthetic IDs and statuses | Explicit local/test only |
| `crm` | Validates generic config, then uses inactive `EmberFlowCrmProvider` skeleton | No network behavior until contract implementation |

Configuration reads only generic `CRM_*` environment names and contains no
credential value fields. Real secrets are intentionally not part of this
scaffold.

## Service boundary

Routes should call application services such as `linkCrmContact`,
`getPatientLifecycleStatus`, and `getCrmAppointment`; services call the
provider. React components never receive raw CRM objects. The status route
returns normalized application status and fails closed with
`INTEGRATION_NOT_CONFIGURED`.

## Safe lifecycle

1. Validate the application DTO against the CRM allowlist.
2. Resolve an existing contact using approved matching rules.
3. Create/update only after an EmberFlow contract and consent decision exist.
4. Store opaque references and normalized status only.
5. Process future events with provider/event-id idempotency.
6. Log metadata, never tokens, payloads, messages, or clinical values.

The scaffold does not choose the signup trigger, pipeline stage mapping,
appointment authority, form/funnel mechanism, communications channel, or
CRM-to-EMR handoff. Those remain `WAITING FOR EMBERFLOW`.

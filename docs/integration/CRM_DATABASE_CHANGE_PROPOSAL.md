# CRM Database Change Proposal

**Status:** Proposal only; no schema change or migration performed

| Field | Disposition | Rationale |
| --- | --- | --- |
| `crm_provider` | REQUIRED if integration is activated | Identifies provider namespace |
| `crm_contact_id` | REQUIRED if contact linking is activated | Opaque external reference |
| `crm_opportunity_id` | OPTIONAL / WAIT FOR CONTRACT | Only if opportunity status is required |
| `crm_pipeline_id` | WAIT FOR CONTRACT | Actual pipeline ownership unknown |
| `crm_stage_id` | WAIT FOR CONTRACT | Do not store assumed stages |
| `crm_sync_status` | REQUIRED if async synchronization is activated | Normalized operational state |
| `crm_last_sync_at` | OPTIONAL | Operational observability |
| `external_appointment_id` | WAIT FOR CONTRACT | Scheduling authority unknown |

Any eventual columns must remain non-clinical, tenant-scoped, access-controlled,
audited, and retention-reviewed. Do not store raw CRM JSON, message bodies,
notes, clinical fields, tokens, or unbounded payloads. A separate external-event
receipt table may be required if EmberFlow webhooks are confirmed, subject to
the existing integration governance and migration approval.

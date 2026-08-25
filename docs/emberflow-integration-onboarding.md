# EmberFlow / Clinic Accelerator integration onboarding

## Selected clinical destination

EmberFlow / Clinic Accelerator is the designated destination for Rejuvonix clinical intake. The connection is not active.

## Information required from EmberFlow

Request one complete technical package containing:

1. Whether Rejuvonix should use an EmberFlow-hosted intake link or a server-to-server API.
2. Sandbox and production base URLs.
3. Authentication method and credential-rotation procedure.
4. Rejuvonix account, organization, location or tenant identifier.
5. Patient-create and patient-match behavior, including duplicate handling.
6. Assessment or form identifiers for Weight Loss, Performance, Sexual Health, Hair Restoration and Skin Restoration.
7. Supported field names, types, validation, required fields and allowed values.
8. Consent-document and consent-acceptance capabilities.
9. Provider-review status model.
10. Webhook event list, payload examples, signing method, timestamp tolerance and retry policy.
11. Hosted return, cancellation and error URLs, if applicable.
12. File-upload capabilities and restrictions, if applicable.
13. Rate limits, idempotency support and outage behavior.
14. Data retention, deletion, export and correction procedures.
15. Current security documentation and subprocessor list.
16. Written confirmation that the exact EmberFlow services used by Rejuvonix are included in an executed BAA.

## Safe implementation sequence

1. Receive and archive the approved technical package.
2. Map each Rejuvonix field to an EmberFlow field; do not send unrecognized fields.
3. Confirm the five program identifiers with the prescribing medical group.
4. Configure sandbox credentials through hosted secret management, never source code.
5. Implement server-side authentication, field validation and idempotent patient/assessment creation.
6. Verify signed webhooks and reject unsigned, stale or replayed events.
7. Test exclusively with fictional records.
8. Complete clinical, privacy and security sign-off.
9. Configure production credentials and repeat a non-PHI connectivity check.
10. Enable patient handoff only after all readiness checks are true.

## Information Rejuvonix must provide EmberFlow

- Legal entity name and authorized integration contact
- Production and sandbox callback domains
- Five program names and requested workflows
- Prescribing medical group and pharmacy relationships
- Approved consent versions
- State availability rules
- Support and security escalation contacts
- Requested provider-review and fulfillment statuses

## Current system behavior

The Rejuvonix assessment gathers only temporary, non-submitted answers in the browser. It does not create patients, transmit answers, upload files, store PHI or call EmberFlow.

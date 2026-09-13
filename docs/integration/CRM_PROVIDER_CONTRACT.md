# CRM Provider Contract

**Status:** Implemented provider-neutral contract; EmberFlow implementation pending

The application-owned contract currently includes:

- `getCapabilities()`;
- `createContact()`;
- `findContact()`;
- `updateContact()`;
- `getContact()`;
- `getWorkflowStatus()`;
- `getAppointment()`;
- `healthCheck()`.

Opportunity and pipeline DTOs exist as opaque references but are not forced into
the provider interface because their availability and interaction semantics are
undocumented. No method sends an HTTP request in the current implementation.

Implementations must validate input, map provider errors to normalized CRM
categories, preserve correlation context at the application boundary, enforce
timeouts/retries when network behavior is eventually added, and never return
raw provider payloads to frontend code.

`EmberFlowCrmProvider` is an inactive skeleton that reports unknown capabilities
and raises `INTEGRATION_NOT_CONFIGURED`. `MockCrmProvider` is synthetic and is
available only in local/test mode.

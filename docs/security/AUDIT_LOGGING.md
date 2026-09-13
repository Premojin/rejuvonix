# Audit and Access Logging

`app/clinical/audit.ts` provides append-oriented event construction for audit,
clinical access, and security events. Events contain actor, action, resource,
outcome, request correlation ID, scope/reason when applicable, and timestamp.

Clinical payloads, tokens, cookies, authorization headers, passwords, and full
patient profiles must not be placed in event metadata or application logs.
Persistence must be append-only to ordinary application roles; stronger WORM
or export controls remain a future operational decision.

Break-glass events must be separate, reason-required, elevated, and reviewable.

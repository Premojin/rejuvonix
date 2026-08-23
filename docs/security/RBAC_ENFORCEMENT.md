# RBAC Enforcement

The first authorization primitive lives in `app/clinical/authorization.ts`.
It is deny-by-default and evaluates the principal, role, action, resource,
relationship, tenant boundary, and scope. It is deliberately independent of
the marketing UI and must be called from every future protected route.

The current rules enforce:

- Patient access only to owned resources.
- Clinician access only to assigned clinical resources.
- Support access only to limited user/appointment metadata.
- Administrator access to administrative resources, not clinical content by
  implication.
- Service access only with explicit system scope.
- Break-glass access only for a privileged role with a recorded reason.

This is a policy primitive, not a substitute for a Cognito JWT verifier or
database relationship query. Protected APIs must combine verified identity,
database assignment checks, and this decision layer before reading or writing
objects. Cross-user denial tests are required for every clinical resource.

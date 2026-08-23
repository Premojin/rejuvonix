# Authentication Implementation Status

The existing identity architecture recommends Amazon Cognito as the
application identity authority, with workforce SSO/IAM Identity Center for
administrator and operations access. This feature branch does not yet claim a
live Cognito pool, user migration, or clinical login flow.

The safe implementation boundary is:

- Cognito-issued short-lived JWTs are the only future patient/clinician API
  identity source.
- Browser sessions use Secure, HttpOnly, SameSite cookies with CSRF protection
  for state-changing requests, or a documented bearer-token API model.
- Clinician, administrator, operations, and support accounts require MFA and a
  documented recovery/suspension path.
- Synthetic staging accounts only: `patient.test.*`, `clinician.test.*`, and
  `admin.test.*`.

The current public marketing site remains anonymous. Cognito resources and
protected routes must be added in a separate reviewed infrastructure/API
milestone rather than silently treating ChatGPT workspace headers as clinical
identity.

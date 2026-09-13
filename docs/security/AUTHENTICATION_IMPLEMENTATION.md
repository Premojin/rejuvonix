# Authentication Implementation Status

The staging clinical runtime uses Amazon Cognito as the external identity
authority, with workforce SSO/IAM Identity Center remaining the direction for
administrator and operations access. Cognito-issued access tokens are verified
server-side and mapped to an application user in PostgreSQL by immutable
external subject. Cognito owns credentials, recovery, and MFA; PostgreSQL owns
application identity and relationships. Production identity remains out of
scope.

The safe implementation boundary is:

- Cognito-issued short-lived access JWTs are the only patient/clinician API
  identity source; invalid, expired, wrong-audience, or wrong-token-use tokens
  are rejected.
- Browser sessions use Secure, HttpOnly, SameSite cookies with CSRF protection
  for state-changing requests, or a documented bearer-token API model.
- Clinician, administrator, operations, and support accounts require MFA and a
  documented recovery/suspension path.
- Synthetic staging accounts only: `patient.test.*`, `clinician.test.*`, and
  `admin.test.*`.

The public marketing site remains anonymous. Protected clinical APIs are
versioned under `/api/v1/` and require a verified bearer token plus a local
PostgreSQL application-user mapping. Credentials are never stored by the app
or committed to the repository.

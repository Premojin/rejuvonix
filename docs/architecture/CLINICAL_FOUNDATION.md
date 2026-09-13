# Clinical Foundation Status

This run establishes the first policy, audit, consent, validation, and public
regression contracts without introducing patient data or changing the live
marketing experience. The initial domain model remains the approved logical
boundary: identity, patient, clinical, consent, and security records only.

The first authenticated synthetic non-PHI application API surface is exposed under
`/api/v1/`: `auth/me`, `patients/me`, `consents`, `appointments`, and
`clinician/patients`. It requires a reviewed Cognito verifier, PostgreSQL
runtime adapter, the reviewed non-PHI baseline migration, Secrets Manager integration,
and server-side object authorization. The public marketing site remains
anonymous.

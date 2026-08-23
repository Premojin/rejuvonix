# Clinical Foundation Status

This run establishes the first policy, audit, consent, validation, and public
regression contracts without introducing patient data or changing the live
marketing experience. The initial domain model remains the approved logical
boundary: identity, patient, clinical, consent, and security records only.

The synthetic clinical journey is not yet exposed as a public API. Before it is
enabled, the application needs a reviewed Cognito verifier, PostgreSQL runtime
adapter, migrations applied to staging, Secrets Manager integration, and
server-side object authorization. This explicit boundary prevents a UI-only or
in-memory prototype from being mistaken for a clinical system.

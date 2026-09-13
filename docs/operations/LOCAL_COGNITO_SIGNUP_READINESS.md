# Local Cognito Signup Readiness

Status: feature implementation on `feature/cognito-signup-readiness`; not deployed.

## Change scope

The former `/sign-up` browser-only demo was removed. `/sign-up` now uses the existing Cognito authorization-code boundary through the safe public configuration returned by `/api/v1/auth/config`. Cognito remains responsible for credentials, verification, recovery, and MFA; Rejuvonix does not receive or store passwords.

`/account` no longer renders a simulated dashboard. It checks the existing authenticated application principal through `/api/v1/auth/me` and provides a secure sign-out action. The page intentionally exposes no clinical content and does not provision database records.

The eligibility preview completion screen now links to secure account creation or patient sign-in. It remains a non-submitting preview; responses are not persisted.

## Cognito handoff

- Sign-in endpoint: returned `authorizationEndpoint` from `/api/v1/auth/config`
- Signup endpoint: returned `signupEndpoint` (`https://<configured-cognito-domain>/signup`)
- Callback: existing `/auth/callback` flow
- OAuth flow: existing authorization code flow
- Credentials: handled only by Cognito

No Cognito resources or settings were changed by this work. The local/staging app client must already allow the configured callback and logout URLs before testing.

## Local verification

- `/sign-up`, `/sign-in`, `/patients/login`, `/account`, `/api/health`, and `/api/v1/auth/config` returned HTTP 200 on the feature server at `http://localhost:5174`.
- The configured Cognito `/signup` endpoint returned HTTP 200 for a non-submitting reachability check.
- Rendered `/sign-up` contains the secure signup entry and no demo-account markers.
- The full Node 22 validation suite, build, route-link tests, and `git diff --check` passed.
- Browser signup, email verification, callback, and authenticated account-session validation remain owner-interaction gates.

## Remaining activation gates

- Confirm the staging Hosted UI signup screen and email-verification lifecycle with an owner-controlled synthetic identity.
- Confirm successful callback and application-user provisioning policy. This branch does not add just-in-time database provisioning.
- Replace interim privacy/terms language and activate clinical intake only after the required privacy, consent, security, and provider workflow approvals.
- Run the complete local validation suite before opening a pull request.

Governance references: RIX-API-001 v1.0.0, RIX-API-002 v1.0.0, RIX-SEC-001 v1.0.0, RIX-OBS-001 v1.0.0, RIX-TST-001 v1.0.0, RIX-OPS-001 v1.0.0.

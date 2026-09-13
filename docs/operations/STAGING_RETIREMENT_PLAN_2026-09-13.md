# Staging Retirement Plan — 2026-09-13

## Decision

**NO-GO for staging retirement.** Production serves the expected public routes,
but production authentication is not independent of staging and the production
and staging hostnames currently share the same AWS application edge/runtime.
Staging must remain available until the production auth and edge separation
gates below are completed.

This document records a read-only assessment. No AWS, DNS, Cognito, database,
GitHub, or application changes were made.

## Current repository state

- Audit branch: `feature/staging-auth-identity-mapping`
- HEAD: `b8df97770fc10ee7efc22fd1efe2d7a732cdc8d5`
- `origin/staging`: `f01a842e2888a0056dc8063fc563c70114f0971a`
- `origin/main`: `e80c731d417382ebfe26d3262afd4fbf42270d0a`
- Worktree changes: no tracked-file changes; two pre-existing untracked security-audit documents were preserved.

## Production validation

The following production URLs returned HTTP 200 with no redirect chain:

- `/`
- `/api/health`
- `/eligibility`
- `/patients/login`
- `/peptides/eligibility`
- `/sign-in`
- `/sign-up`
- `/api/v1/auth/config`

Production `/sign-up` is currently a Cognito Hosted UI handoff page, not the old
demo/simulation page. This is not sufficient to approve retirement because the
returned auth configuration still uses the staging callback.

### Production auth gate

`https://rejuvonix.com/api/v1/auth/config` currently reports:

- Cognito hosted domain: `rejuvonix-staging-identity.auth.us-east-1.amazoncognito.com`
- callback: `https://staging.rejuvonix.com/auth/callback`
- logout endpoint: Cognito hosted logout endpoint

The active Cognito client currently contains these callback URLs:

- `http://localhost:5173/auth/callback`
- `https://staging.rejuvonix.com/auth/callback`

and these logout URLs:

- `http://localhost:5173/`
- `https://staging.rejuvonix.com/`

The production callback `https://rejuvonix.com/auth/callback` and production
logout target are not present in the inspected client configuration.

Therefore:

- Production callback present: **NO**
- Production logout present: **NO**
- Staging callback present: **YES**
- Staging logout present: **YES**
- Auth independent of staging: **NO**
- Retirement gate: **BLOCKED**

A live browser login/callback/session/logout test on production was not run by
this read-only CLI audit. It remains a required manual synthetic-identity gate
after production callback/logout configuration is separately approved.

## AWS architecture and active staging dependencies

Read-only inspection found:

| Resource | Current state | Retirement implication |
|---|---|---|
| ECS service | `rejuvonix-staging`, task definition `:23`, desired/running 1/1 | Cannot remove while production is served by the same runtime. |
| Image | `rejuvonix-staging:f01a842e2888a0056dc8063fc563c70114f0971a` | Retain for rollback until cutover is proven. |
| ALB | `rejuvonix-staging`, internet-facing | Shared by production and staging; retain. |
| Target group | `rejuvonix-staging-tg`, port 3000, health `/api/health` | Shared forwarding target; retain. |
| WAF | Web ACL `rejuvonix-staging` associated with the ALB | Retain while the shared ALB serves production. |
| ACM | Certificates for `rejuvonix.com`, `patients.rejuvonix.com`, and `staging.rejuvonix.com` are all in use by the same ALB | Staging certificate cannot be removed while edge ownership is unresolved. |
| RDS | `rejuvonix-staging-postgres`, PostgreSQL 16.4, available, encrypted, private, 7-day backups | No change; retain until application/runtime separation is complete. |
| Recovery | Automated snapshots available through 2026-09-13; latest restorable point observed at audit time | Preserve recovery capability. |
| Logs | `/rejuvonix/rejuvonix-staging/application` plus ECS Container Insights and RDS logs | Retain during observation and rollback window. |

The ALB has an HTTPS listener on 443 with certificates for all three inspected
hostnames and a default forward to `rejuvonix-staging-tg`. HTTP 80 redirects to
HTTPS. The WAF is associated with that same ALB.

### DNS findings

DNS appears to be managed outside the inspected Route 53 zones; no matching
Route 53 records were returned. Current resolution observed:

- `rejuvonix.com`: `3.228.188.127`
- `www.rejuvonix.com`: CNAME to `rejuvonix-staging-1215636038.us-east-1.elb.amazonaws.com`
- `patients.rejuvonix.com`: CNAME to the same staging-named ALB
- `staging.rejuvonix.com`: CNAME to the same staging-named ALB

This means production and staging currently share the staging-named ALB and
application target. DNS provider/proxy ownership was not determinable from AWS
Route 53 inspection and must be confirmed with the authoritative DNS provider.

## Repository, CI/CD, and public references

The repository search found approximately 276 matching staging-reference lines
across active and historical material. Relevant active references include:

### Active runtime/auth

- `app/api/v1/auth/callback/route.ts` defaults the callback to the staging URL.
- `app/api/v1/auth/config/route.ts` defaults the callback to the staging URL.
- Cognito infrastructure examples/configuration are staging-specific.

These are **BLOCKING ACTIVE_RUNTIME references** until production has an
explicit, independently verified auth configuration. Do not remove or change
them as part of this read-only plan.

### CI/CD and tests

- `.github/workflows/deploy-staging.yml` deploys the staging ECS service and
  uses `https://staging.rejuvonix.com` for smoke testing.
- `scripts/staging-smoke.sh` defaults to the staging hostname.
- `docs/testing/STAGING_VALIDATION.md` and staging architecture/runbooks are
  operational references.

Classify these as **RETAIN TEMPORARILY** during cutover, then **DISABLE AFTER
CUTOVER** or **REMOVE AFTER RETIREMENT** only after replacement production
workflows and rollback procedures are live.

### Public links

No active application source reference to `staging.rejuvonix.com` was found in
the searched `app/` files. Auth route defaults and operational links remain
active risks. A final browser/link crawl is still required before redirecting
or retiring the hostname.

## Safe retirement strategy

### Visitor behavior recommendation

Use a **temporary 302 redirect** from the staging hostname to the equivalent
production hostname only after production auth is independent and route parity
is verified. A 302 preserves rollback flexibility and avoids permanently
indexing a cutover decision before the observation window completes.

After the observation window and owner approval, convert the visitor behavior
to a permanent 301 or a clear retired page, depending on traffic and support
needs. Do not use an immediate DNS removal: it creates the most confusion and
has the weakest rollback path.

Route exceptions:

- Keep `/auth/callback` functional until all Cognito staging callback sessions
  have drained and production callback has been proven.
- Keep `/api/v1/auth/*` behavior unchanged during the transition; do not blindly
  redirect API endpoints.
- Keep `/patients/login` available until production login, callback, session,
  and logout are proven. Then redirect it to the production equivalent.

## Recommended rollback window

**14 days after the final production cutover** is recommended. The reason is
that production auth independence is not yet proven, the public hostnames share
an ALB/runtime, and DNS/Cognito/edge changes would be coupled. Retain the
previous ECS image/task definition, RDS recovery capability, Cognito staging
URLs, staging certificate, and operational logs throughout that window.

## Exact staged retirement sequence

### Phase A — Production readiness

1. Establish an approved production Cognito callback and logout configuration.
2. Verify production `/api/v1/auth/config` contains no staging callback/logout
   dependency.
3. With the synthetic test identity, verify production Hosted UI login,
   callback, `/api/v1/auth/me`, protected patient access, refresh, logout, and
   post-logout denial.
4. Confirm production signup policy. The current page is a Cognito Hosted UI
   handoff; verify email verification and duplicate-account behavior only with
   synthetic identities.
5. Confirm production DB/application identity mapping is available if
   `/api/v1/auth/me` requires it.

### Phase B — Edge and link cutover

6. Confirm whether production needs a dedicated ALB/target group or whether the
   current shared edge is intentionally retained. Do not retire the shared ALB
   while production depends on it.
7. Replace public staging links and operational references with production
   equivalents where appropriate.
8. Add a temporary 302 staging visitor behavior for ordinary public pages,
   preserving auth/API exceptions.
9. Update monitors and smoke tests to production, while retaining staging
   checks during the observation window.

### Phase C — Observation and decommissioning

10. Observe traffic, auth, errors, alarms, and support reports for 14 days.
11. Disable staging deployment automation only after production rollback and
    release procedures are proven.
12. Remove staging Cognito callback/logout URLs only after sessions are drained
    and owner approval is recorded.
13. Remove staging DNS records last, after confirming production records and
    rollback ownership with the DNS provider.
14. Retire staging-specific ALB/listener/certificate/WAF resources only if they
    are no longer shared with production.
15. Scale down and later delete the staging ECS service only after edge and
    runtime separation is confirmed.
16. Take a final approved RDS snapshot and retain it under the documented
    retention policy. Decommission the staging database only under a separate
    explicit approval.
17. Archive final monitoring, deployment, and rollback evidence.

## Go/no-go gates

### GO only when all are true

- Production health and required public routes pass.
- Production Cognito callback and logout URLs are present and verified.
- Production synthetic login, callback, `/api/v1/auth/me`, protected access,
  refresh, and logout pass.
- No production auth step depends on `staging.rejuvonix.com`.
- Production signup behavior is explicitly approved and tested synthetically.
- Production links, smoke tests, monitoring, and support references are ready.
- Shared ALB/runtime ownership is resolved.
- Rollback references and the 14-day observation window are approved.

### Current NO-GO blockers

1. Production `/api/v1/auth/config` returns the staging callback URL.
2. The inspected Cognito client has no production callback/logout entries.
3. Production and staging resolve to/share the staging-named ALB, target group,
   ECS service, WAF association, and certificates.
4. Production browser auth/session/logout has not been independently proven in
   this audit.
5. DNS ownership/provider and exact production-vs-staging edge routing require
   confirmation outside the inspected Route 53 account.

## Mutation record

- DNS changed: **NO**
- Cognito changed: **NO**
- ECS changed: **NO**
- ALB changed: **NO**
- ACM changed: **NO**
- RDS changed: **NO**
- WAF changed: **NO**
- GitHub workflows changed: **NO**
- Application source changed: **NO**
- Production changed: **NO**

## Recommended next action

**PRODUCTION READY — PREPARE CONTROLLED STAGING RETIREMENT** is **not yet
appropriate**. The immediate next workstream is:

1. provision/authorize production Cognito callback and logout configuration;
2. verify production auth end to end with the synthetic identity;
3. resolve whether the shared ALB/runtime is intentionally canonical or must be
   separated;
4. rerun this audit and obtain an explicit retirement approval.

Until then:

**STAGING RETIREMENT BLOCKED — PRODUCTION AUTH MUST BE COMPLETED AND SHARED EDGE DEPENDENCIES RESOLVED**

## Production auth independence workstream — 2026-09-13

The existing Cognito app client was updated additively to include:

- `https://rejuvonix.com/auth/callback`
- `https://rejuvonix.com/`

The localhost and staging callback/logout URLs remain present. OAuth flow,
scopes, identity provider, token validity, and token revocation settings were
preserved. No user-pool policy or user data was changed.

The application-side fix is limited to an allowlisted request-host resolver.
The auth config and callback routes now resolve independently for production,
staging, and localhost rather than relying on a staging-only fallback. This
fix is validated locally but is **not yet deployed** to the live runtime.

Required next gates remain:

1. CI and normal review for the focused production-auth branch.
2. Deploy through the approved production/staging runtime path.
3. Verify live production config reports the production callback.
4. Complete synthetic production login, callback, `/api/v1/auth/me`, protected
   access, refresh, and logout tests.

Until those gates pass, `AUTH INDEPENDENT OF STAGING` remains **NO** and staging
retirement remains **NO-GO**.

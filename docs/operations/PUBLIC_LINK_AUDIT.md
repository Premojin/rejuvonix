# Public Rejuvonix link audit

**Audit date:** 2026-09-10
**Scope:** read-only public HTTPS/HTTP link, source, build, ECS, and ALB audit

## Executive result

The main GLP intake works. The patient portal login and peptide intake routes
are implemented on the local `feature/public-route-remediation` branch, but
have not been deployed. The live audit state below remains the pre-fix state:
both routes returned framework 404 responses. All four public hostnames reach
the same default ALB forward action, so there is no verified host-based ALB
cause.

| Link | Purpose | Live Status | Final URL | Source Route Exists | Staging Status | Patients Host Status | Root Cause | Fix Required |
|---|---|---:|---|---|---|---|---|---|
| `https://rejuvonix.com/eligibility` | Main GLP intake | 200 / working | Same URL | YES: `app/eligibility/page.tsx` | 200 | 200 | None verified | None |
| `https://rejuvonix.com/patients/login` | Patient portal login | 404 pre-fix / local fix implemented, not deployed | Same URL | YES locally: `app/patients/login/page.tsx` | 404 pre-fix | 404 pre-fix | Application route was missing; local route now reuses the existing sign-in boundary | Deploy approved feature branch after owner review |
| `https://rejuvonix.com/peptides/eligibility` | Peptide intake | 404 pre-fix / local fix implemented, not deployed | Same URL | YES locally: `app/peptides/eligibility/page.tsx` | 404 pre-fix | 404 pre-fix | Application route was missing; local route now reuses the governed eligibility flow | Deploy approved feature branch after owner review |

## Live transport evidence

HTTPS requests completed without redirect loops or hostname changes. The
canonical apex results were:

- `/eligibility`: `200`, `text/html; charset=utf-8`, Rejuvonix page
- `/patients/login`: `404`, `text/html; charset=utf-8`, framework 404
- `/peptides/eligibility`: `404`, `text/html; charset=utf-8`, framework 404

The same status matrix was observed on `www.rejuvonix.com`,
`patients.rejuvonix.com`, and `staging.rejuvonix.com`.

HTTP requests to the apex returned `301 Moved Permanently` to the matching
HTTPS URL for all three paths. No redirect chain was present after HTTPS.

Response headers included the Rejuvonix security headers, HSTS, and the
application content type. The 404 body contains `404: This page could not be
found.` and `noindex`, identifying a framework/application route miss rather
than an ALB error page.

## Host comparison

| Host | `/eligibility` | `/patients/login` | `/peptides/eligibility` |
|---|---:|---:|---:|
| `rejuvonix.com` | 200 | 404 | 404 |
| `www.rejuvonix.com` | 200 | 404 | 404 |
| `patients.rejuvonix.com` | 200 | 404 | 404 |
| `staging.rejuvonix.com` | 200 | 404 | 404 |

The hostnames resolve to the same staging-named ALB, and the HTTPS listener
has only a default rule forwarding to `rejuvonix-staging-tg`. No host-header
or path-specific rule was found.

## Source and build findings

- `/eligibility` is defined by `app/eligibility/page.tsx` and its generated
  route entries appear in `dist/server/.vite/manifest.json` and
  `.next/types/routes.d.ts`.
- `/patients/login` is implemented locally by `app/patients/login/page.tsx`,
  which reuses `app/sign-in/page.tsx` and its existing auth boundary. It is referenced as `PATIENT_PORTAL_URL` in
  `app/components/routing.ts` and used by `app/components/SiteChrome.tsx`.
- `/peptides/eligibility` is implemented locally by
  `app/peptides/eligibility/page.tsx`, which reuses `EligibilityFlow` with a
  peptide-intake label. It is referenced as `PEPTIDE_INTAKE_URL` in `app/components/routing.ts`, used by
  homepage/protocol navigation, and asserted by routing tests.
- `next.config.ts` contains headers only; no rewrite, redirect, middleware, or
  canonical-host rule explains the 404s.

## Deployment findings

- ECS service: `rejuvonix-staging`
- Task definition: `rejuvonix-staging:19`
- Running/desired tasks: `1/1`
- Image: `rejuvonix-staging:42ef82c752bad2ffd7040e2e3f9a76f1cfce4c6e-amd64`
- Image digest: `sha256:86e2a5d05777eb5e2f6cb0933fd83d63f296ca97e1a9de83c4460b42b4d2d033`
- Image pushed: 2026-08-30 19:59:17 EDT
- The image tag corresponds to application commit `42ef82c752bad2ffd7040e2e3f9a76f1cfce4c6e`; there are no application-source differences between that commit and current HEAD. The later commits are documentation-only.

There is no evidence that a stale application image caused these two 404s.
The deployed build is consistent with the current application route tree.

## Recommended remediation

### P0 — patient portal login

`/patients/login` was absent from the audited deployment and returned a
framework 404 on all hostnames. The feature branch now provides the route by
reusing the existing patient sign-in page and auth boundary. Deployment and
live verification remain owner-controlled follow-up work.

### P0 — peptide intake

`/peptides/eligibility` was absent from the audited deployment and returned a
framework 404 on all hostnames. The feature branch now provides a labeled entry
point into the existing governed eligibility flow without adding clinical
questions or PHI persistence. Deployment and live verification remain
owner-controlled follow-up work.

Local fix status: implemented on `feature/public-route-remediation`; not yet
deployed.

## Safety

This audit made no AWS, DNS, ECS, application, database, Cognito, WAF, CRM, or
PHI changes.

# Public route inventory

This inventory covers the public references discovered for the requested
eligibility and patient-login destinations. It distinguishes a source link
from an implemented server route.

| Canonical route | Aliases | Hostnames observed | Source files | Live status | Intended audience |
|---|---|---|---|---|---|
| `/eligibility` | `/eligibility/[program]` for `weight-loss`, `performance`, `sexual-health`, `hair-restoration`, and `skin-restoration` | Apex, `www`, patients, staging: 200 | `app/eligibility/page.tsx`; `app/eligibility/[program]/page.tsx`; `app/components/EligibilityProgramSelector.tsx`; `app/components/EligibilityFlow.tsx` | PRESENT and working; generated manifest entries present | Public prospective members; informational/simulated assessment preview |
| `/patients/login` | None | Apex, `www`, patients, staging: 404 pre-fix; local route implemented | `app/patients/login/page.tsx`; `app/sign-in/page.tsx`; `app/components/routing.ts`; `app/components/SiteChrome.tsx`; `tests/public-route-remediation.test.mjs` | IMPLEMENTED LOCALLY — NOT DEPLOYED; live audit was framework 404 | Patient portal login; reuses existing secure sign-in boundary |
| `/peptides/eligibility` | None | Apex, `www`, patients, staging: 404 pre-fix; local route implemented | `app/peptides/eligibility/page.tsx`; `app/components/EligibilityFlow.tsx`; `app/components/routing.ts`; `app/page.tsx`; `app/components/ProductPage.tsx`; `tests/public-route-remediation.test.mjs` | IMPLEMENTED LOCALLY — NOT DEPLOYED; live audit was framework 404 | Prospective members seeking peptide/protocol eligibility intake |

## Implemented route topology

The active application uses the Next/Vinext app-router structure. The relevant
implemented pages are:

```text
app/
├── eligibility/
│   ├── page.tsx                 -> /eligibility
│   └── [program]/page.tsx       -> /eligibility/[program]
└── components/
    └── routing.ts               -> external-looking destination constants
```

The feature branch adds `app/patients/login/page.tsx` and
`app/peptides/eligibility/page.tsx`. The patient route re-exports the existing
sign-in page; the peptide route enters the existing governed eligibility flow
with a peptide eligibility/intake label. These routes are not deployed yet.

## Navigation references

- `MAIN_GLP_INTAKE_URL` points to `https://rejuvonix.com/eligibility` and is a
  valid working target.
- `PEPTIDE_INTAKE_URL` points to `https://rejuvonix.com/peptides/eligibility`,
  implemented locally and pending deployment.
- `PATIENT_PORTAL_URL` points to `https://rejuvonix.com/patients/login`,
  implemented locally and pending deployment.
- Homepage cards and protocol/product links consume the centralized peptide
  destination, so the broken peptide target is repeated navigation debt rather
  than a single isolated link.
- Header and mobile navigation consume the centralized patient portal
  destination, so the broken patient-login target is repeated navigation debt.

## Environment comparison

All four hostnames currently terminate on the same staging-named ALB and
forward through the same default target group. Each environment/hostname has
the same route matrix:

| Route | Production apex | `www` | Patients host | Staging |
|---|---:|---:|---:|---:|
| `/eligibility` | 200 | 200 | 200 | 200 |
| `/patients/login` | 404 | 404 | 404 | 404 |
| `/peptides/eligibility` | 404 | 404 | 404 | 404 |

Classification:

- `/eligibility`: BOTH production and staging; patients host also works.
- `/patients/login`: implemented locally; live deployment remains 404 until the
  feature branch is deployed.
- `/peptides/eligibility`: implemented locally; live deployment remains 404
  until the feature branch is deployed.

## Build/deployment evidence

The pre-remediation `dist/server/.vite/manifest.json` and
`.next/types/routes.d.ts` contained the eligibility route entries but no
entries for `/patients/login` or `/peptides/eligibility`. The deployed ECS
image was consistent with that application route tree; no stale application
diff was found. A fresh local build is the required verification for the new
routes before deployment.

## Recommended remediation

1. Review and approve the local `/patients/login` route reuse of the existing
   auth boundary.
2. Review and approve the local peptide entry point and its existing governed
   performance-context flow.
3. Deploy only through the approved workflow, then repeat the public link audit
   and route-level checks.

These recommendations are documentation only; no fixes were made.

# Rejuvonix User Journey Model

This model describes the current public experience and the intended boundary
for future clinical runtime work. It deliberately distinguishes education from
authenticated healthcare workflows.

## Public journey

```text
Homepage
   ↓
Treatment / Compounded Education
   ↓
Informational Eligibility Questions
   ↓
Patient Sign-In Boundary
   ↓
Future Patient Onboarding
```

The canonical public entry points are `/`, `/treatments`, `/compounded`, and
`/get-started`. All treatment and education CTAs converge on those routes. The
current questionnaire is advisory marketing content; it is not a diagnosis,
clinical intake, or prescription decision.

## Current versus future steps

| Step | Current state |
| --- | --- |
| Public education | Implemented |
| Informational eligibility questions | Implemented; non-diagnostic |
| Patient account creation/sign-in | Public shell only; authentication is not connected |
| Consent | Primitive exists in clinical foundation; no patient UI/runtime route |
| Health intake | Not implemented as an authenticated clinical workflow |
| Consultation request | Not implemented |
| Patient dashboard | Not implemented |
| Treatment/order/follow-up APIs | Not implemented as authenticated runtime APIs |

## Patient journey boundary

The future patient route family should be introduced behind server-side
authentication and authorization, with the least disruptive structure chosen
when the runtime is implemented:

```text
/patient
/patient/profile
/patient/consents
/patient/intake
/patient/appointments
/patient/treatment
```

These routes do not currently exist. They must not be simulated by public
marketing routes or protected only through hidden navigation.

## Clinician journey

The future clinician boundary should remain separate from patient routes:

```text
/clinician
/clinician/patients
/clinician/appointments
/clinician/encounters
```

Clinician access must require authenticated identity, active role, assignment
checks, and object-level authorization. The existing authorization tests cover
the policy primitives; they do not imply that a clinician portal is deployed.

## Admin, operations, and support

Administrative and support workflows are future privileged surfaces, not public
consumer navigation:

```text
/admin
/operations
/support
```

`/support` currently means public program/support education and contact. It is
not an operations console. Future admin/operations routes must use distinct
server-authorized boundaries and must not be exposed as ordinary consumer
links.

## Safety and continuity rules

- A provider, not the marketing questionnaire, makes clinical decisions.
- No public route claims to submit a secure clinical assessment in this phase.
- No patient, clinician, or admin data is exposed by the public route tree.
- Consent, audit, RBAC, PostgreSQL, security headers, WAF, and health contracts
  remain platform foundations for the future runtime phase.
- The next implementation phase is clinical authentication/runtime work, not
  more marketing-route aliases.

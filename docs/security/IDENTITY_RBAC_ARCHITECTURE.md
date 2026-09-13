# Identity and RBAC Architecture

This design is a prerequisite for clinical workflows. It does not migrate the
current optional ChatGPT Workspace identity integration.

## Recommendation

Use Amazon Cognito or an enterprise identity provider as the application
identity authority after owner approval. Cognito is a reasonable default for
patient/clinician accounts because it supports managed recovery, MFA, federation,
OIDC/JWT validation, and separate app clients. Keep administrator and operations
access on workforce SSO/IAM Identity Center rather than treating an admin as a
clinical user. The current OpenAI Sites header helper may remain an adapter for
public/workspace preview use, but must not be the sole authority for patient
records.

Require MFA for clinicians, administrators, operations, and support. Prefer
passkeys/WebAuthn or phishing-resistant MFA; allow a documented recovery path.
Passwordless versus password authentication is an owner/product decision, but
local password storage is not recommended.

## Principals and roles

| Role | Default scope | Examples |
|---|---|---|
| Patient | `own-record` | Own profile, consents, appointments, messages, and permitted care summary |
| Clinician | `assigned-patient`, `clinical-care-team` | Assigned assessments, encounters, treatment plans, and clinical notes |
| Administrator | `administrative` | Tenant/configuration/user administration; no default clinical content |
| Operations | `administrative` / limited operational resources | Scheduling, fulfillment/status, non-clinical workflow support |
| Support | `support-limited` | Verified account troubleshooting and minimum necessary metadata |
| Service | `system` | Narrow machine-to-machine actions, no interactive login |

Authorization evaluates `principal`, `role`, `permission`, `resource`,
`action`, and `scope` on every server-side request. A UI hide/show decision is
never authorization. Deny by default; require explicit assignment and tenant
boundary checks. Support and operations must not read full clinical records.

## Session and lifecycle controls

Use short-lived access tokens, rotating refresh tokens, secure HttpOnly/SameSite
cookies for browser sessions, CSRF protection for cookie-authenticated writes,
idle and absolute timeouts, server-side revocation/session inventory, logout on
all devices, and audit events for sign-in, MFA, recovery, token revocation, and
privilege changes. Never log tokens or authorization headers.

Clinicians require identity/licensure verification, organization assignment,
role approval, periodic review, and immediate suspension workflow. Patients
require verified contact and identity checks appropriate to the clinical and
prescribing risk. Break-glass access must be time-bound, reason-required,
least-privilege, highly visible, independently audited, and reviewed after use.

## Enforcement and audit

Centralize policy decisions in an application authorization layer with resource
ownership and care-team queries. Record actor, subject, action, resource type/id,
scope, result, reason, request/correlation ID, source, and timestamp in append-
only audit/access events. Clinical record access history must be queryable by
authorized privacy/security staff without exposing event payloads to ordinary
support users.

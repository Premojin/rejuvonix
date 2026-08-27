# Rejuvonix Technical Design Document

**Document ID:** RJV-TDD-001
**Version:** 1.0.0
**Status:** Local architecture reconciliation; staging integration requires owner review.

## 1. Executive Summary

Rejuvonix is a modular monolith for public product discovery, patient-facing
workflow experience, application identity, authorization, and non-PHI
operational state. The v152 product experience is retained selectively. EmberFlow
is the designated external regulated platform for PHI and clinical records.

## 2. System Purpose and Context

The application explains care options, supports a patient account journey, and
coordinates approved non-clinical workflow references. It does not diagnose,
prescribe, collect, or persist regulated clinical records.

## 3. Technology Stack and Runtime

The application uses React/Next-compatible Vinext, Node 22, PostgreSQL, `pg`,
and Drizzle ORM. Cognito access tokens are verified server-side. The container
runtime uses `vinext start` with Vinext available in production dependencies.

## 4. Users and Journeys

Patients use public sign-up/sign-in entry points and a patient-facing account
experience. Workforce identities are invitation/admin provisioned and require
server-side authorization. Product discovery, goals, eligibility, membership,
and Connected Health/Jin remain available as product experience previews.

## 5. Application Domains

Domains are public content, patient application workflow, identity/RBAC,
consent metadata, scheduling/reference state, integration state, and audit,
access, and security events. Clinical record domains are externalized to
EmberFlow.

## 6. Authentication and Authorization

The production authority is Cognito -> JWT verification -> local application
identity mapping -> RBAC -> object-level authorization. Authorization is
server-side, deny-by-default, tenant-aware, and patient-isolated. The v152
sessionStorage account flow is a clearly labeled local preview only; it is not
an authentication or authorization boundary.

## 7. Rejuvonix Data Architecture

PostgreSQL stores identity mappings, roles, permissions, non-PHI account/profile
metadata, consent metadata, workflow/reference state, appointment metadata,
integration references, and audit/access/security metadata. APIs expose DTOs and
do not expose unrestricted database rows.

## 8. EmberFlow PHI Boundary

**REJUVONIX DOES NOT PERSIST CLINICAL PHI THAT BELONGS IN EMBERFLOW.** EmberFlow
owns clinical intake, medical history, symptoms, allergies, medications,
diagnoses, notes, assessments, prescriptions, treatment decisions, encounter
narratives, and regulated clinical records. Official EmberFlow documentation and
credentials are pending; no real adapter is implemented.

## 9. Provider and API Architecture

`ClinicalDataProvider` is an application-owned boundary. The local mock is
available only when explicitly selected in local/test environments; all other
environments return `INTEGRATION_NOT_CONFIGURED`. No endpoint, auth scheme,
payload, webhook, or provider URL is assumed. New APIs use `/api/v1/`, safe
errors, and correlation IDs.

## 10. Consent, Workflow, and Appointments

Consent retains type, version, status, timestamps, source, and evidence/reference
metadata without clinical payloads. Appointments and workflow records are
provisional non-PHI references and may include external identifiers only after
approved integration contracts exist.

## 11. Audit, Access, Security, and Data Lifecycle

Security-relevant authentication, authorization, access, and operational actions
are recorded through governed event primitives. Retention and deletion policies
require owner, legal, and provider review before real data collection.

## 12. Build, Testing, Deployment, and Operating Model

Validation consists of governance, typecheck, lint, tests, build, and diff
checks. Local tests use synthetic data. AWS deployment remains a separate
owner-controlled workflow; no database migration runs at startup.

## 13. AI Status

**AI IMPLEMENTATION: PAUSED.** No agents, models, RAG, embeddings, vector
storage, or AI-to-EmberFlow capability is part of this reconciliation.

## 14. Known Gaps, Deferred Integrations, and Open Questions

Official EmberFlow API/auth/webhook documentation, credentials, data-minimization
rules, failure semantics, and authorization responsibilities remain open. The
fresh non-PHI database baseline is prepared and locally validated, but staging
execution requires owner approval and the restore/recovery gate remains open.
The local preview account must be replaced or wired to Cognito before production
identity use.

## 15. Architectural Decisions

1. EmberFlow is the regulated PHI system of record.
2. Rejuvonix PostgreSQL is limited to non-PHI application data and references.
3. D1/SQLite is not canonical production persistence.
4. Cognito/JWT/RBAC/object authorization remain authoritative.
5. AI implementation remains paused.

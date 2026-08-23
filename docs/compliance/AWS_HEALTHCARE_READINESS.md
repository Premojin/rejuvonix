# AWS Healthcare Readiness Preconditions

AWS infrastructure does not make Rejuvonix HIPAA compliant. Before processing
PHI, the organization must complete administrative, legal, contractual,
physical, and technical requirements and document accountable owners.

## Required decisions

- Use a dedicated staging account and a separate production account under AWS
  Organizations; consider a log-archive and security account pattern.
- Confirm an AWS Business Associate Addendum where HIPAA applies and review all
  vendors/subprocessors, including identity, pharmacy, messaging, payments,
  video, monitoring, and support tooling.
- Restrict PHI to approved HIPAA-eligible services and configurations. Confirm
  regional/service eligibility with current AWS guidance before use.
- Assign security, privacy, incident-response, backup/restore, and clinical
  operations owners. Define breach response, evidence preservation, and access
  review cadence.
- Approve encryption/key ownership, retention/deletion/legal hold, RTO/RPO,
  disaster recovery, workforce training, and minimum-necessary access policy.

## Staging rule

Staging is synthetic/de-identified only, uses separate resources/keys/secrets,
and must have controls that prevent production data connections. Evidence should
include Terraform review, IAM/OIDC policy review, backup restore, log redaction,
access audit retrieval, vulnerability scans, and rollback testing.

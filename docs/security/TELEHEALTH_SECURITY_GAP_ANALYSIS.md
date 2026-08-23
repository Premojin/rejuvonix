# Telehealth Security Gap Analysis

This is a codebase readiness assessment, not a HIPAA compliance determination.
HIPAA readiness also requires administrative, physical, contractual, and
organizational controls, including applicable BAAs.

| Control | Status | Finding / required action |
|---|---|---|
| Authentication | Partially Implemented | Workspace ChatGPT header helper exists; no clinical identity lifecycle or session policy. |
| MFA | Requires Organizational Decision | Select an identity provider and require phishing-resistant MFA where appropriate. |
| RBAC / least privilege | Missing | Define patient, clinician, support, admin, and service roles with object-level checks. |
| Session termination | Missing | Define idle/absolute timeouts, revocation, logout, recovery, and device/session visibility. |
| Encryption in transit | Partially Implemented | Proposed AWS TLS topology; repository has no deployment enforcement. |
| Encryption at rest | Missing | Require KMS-backed RDS, S3, logs, backups, and environment-specific key policy. |
| Secrets management | Missing | Use Secrets Manager/CI secret store; never image-bake or commit values. |
| Auditability / access history | Missing | Add immutable security, auth, audit, and clinical access event streams with actor/resource/reason. |
| Logging safety | Missing | Add structured redaction; prohibit credentials, tokens, complete records, unnecessary PHI, and card data. |
| Data retention | Requires Organizational Decision | Approve clinical, audit, backup, and deletion/legal-hold schedules. |
| Backup / restore / DR | Missing | Configure and test encrypted backups, restore, failover, and documented RTO/RPO. |
| Environment isolation | Partially Implemented | Source has no production data connection, but no AWS guardrails exist yet. |
| Non-production data | Requires Organizational Decision | Use generated/de-identified fixtures and automated production-data deny controls. |
| Input validation / CSRF / rate limits | Missing | Add server-side schemas, origin/CSRF protection, abuse controls, and alerting before write APIs. |
| Security headers / CSP / CORS | Missing | Define strict headers and an explicit same-origin CORS policy at the edge/app. |
| Dependency security | Missing | Audit reports 4 high production findings, including Next 16.2.6 and its transitive chain. |

## Severity summary

- Critical: no confirmed critical secret/PHI finding in tracked source scan.
- High: current dependency audit; no clinical authorization/audit boundary; no
  secrets or environment guardrails for a future data-bearing deployment.
- Medium: missing headers/CSP/CSRF/rate limiting, missing type baseline, and
  stale failing smoke test.
- Low/Informational: fixed Sites URL metadata, image lint warnings, and
  placeholder review content.

Patient data must not enter the platform until identity and authorization,
validated write APIs, encrypted persistence, access/audit events, safe logs,
secrets management, backup/restore, environment isolation, incident response,
and applicable organizational/vendor approvals exist.

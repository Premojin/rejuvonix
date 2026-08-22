# Staging Deployment Plan

No AWS resources were provisioned in this assessment.

## Gates before first staging deployment

1. Approve AWS account/region, domain, certificate, network CIDR, cost owner,
   RTO/RPO, retention, and BAA/vendor scope.
2. Resolve the current dependency audit and type/test failures.
3. Decide clinical identity architecture, MFA, RBAC, consent, audit, and data
   model; do not use the current marketing quiz as a clinical intake endpoint.
4. Implement Terraform staging only, review its plan, and apply manually through
   an approved AWS role. Keep production Terraform unapplied.
5. Build/tag an ECR image by commit SHA, inject secrets at runtime, and deploy
   ECS tasks in private subnets behind the ALB health check.
6. Verify TLS, WAF, headers/CSP, logs/redaction, alarms, backups, restore,
   synthetic-data guardrails, and staging-to-production network isolation.
7. Run smoke, regression, dependency, secret, SAST, container, and IaC scans;
   record evidence and obtain manual staging approval.

## Rollback

Use immutable image/commit tags and ECS service rollback. Database migrations
must be backward-compatible and separately approved. Never restore or query a
production snapshot into staging without explicit de-identification approval.

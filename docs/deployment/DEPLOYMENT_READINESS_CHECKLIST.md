# AWS Staging Deployment Readiness Checklist

- [ ] Readiness foundation and P0 branch merged into `staging`
- [ ] Dependencies remediated or explicitly dispositioned
- [ ] Install, lint, TypeScript, tests, and build pass
- [ ] Container builds and runs as non-root
- [ ] `/api/health` returns only `{ "status": "ok" }`
- [ ] Terraform format and validate pass; staging plan reviewed
- [ ] AWS staging account, region, DNS, domain, and certificate confirmed
- [ ] Cost estimate and NAT/VPC endpoint choice reviewed
- [ ] IAM/OIDC roles approved and production role is separate
- [ ] BAA/compliance decision documented before any PHI
- [ ] No real PHI is present
- [ ] Secrets Manager/KMS strategy ready
- [ ] RDS backup/restore and retention strategy ready
- [ ] Logging redaction, alarms, WAF, and rollback tested

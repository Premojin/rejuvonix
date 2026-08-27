# Staging Validation

## Baseline

The staging baseline is the public marketing experience at
`https://staging.rejuvonix.com`. The minimum public contract is:

- `GET /` returns HTTP 200 and renders the treatment, care-journey, and review sections.
- `GET /api/health` returns exactly `{"status":"ok"}` and no runtime details.
- HTTP redirects to HTTPS.
- The active ECS task has no public IP and the ALB target is healthy.

## Automated checks

Run `npm test` for the built application contract suite and
`npm run smoke:staging` for the deployed endpoint smoke test. Set
`STAGING_BASE_URL` to validate another non-production environment.

The smoke script intentionally checks availability and the public health
contract only. Authenticated clinical validation uses synthetic credentials
provisioned outside source control and verifies patient own-resource access,
clinician assignment access, support restriction, consent persistence,
appointment request, and audit/access events.

## Rollback

Application rollback uses a previously verified immutable ECR image SHA and
the existing ECS deployment workflow. Infrastructure rollback uses a reviewed
Terraform plan; do not use ad-hoc `terraform destroy` or force-pushes. Database
migrations must remain backward-compatible with the previous application
revision before an application rollback is attempted.

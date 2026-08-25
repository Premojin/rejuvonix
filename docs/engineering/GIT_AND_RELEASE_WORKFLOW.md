# Git and Release Workflow

## DEV1

```text
staging
  -> dev1/<domain>-<feature>
  -> PR
  -> CI
  -> owner review
  -> authorized merge
  -> AWS staging deployment
```

## DEV2

```text
staging
  -> dev2/<domain>-<feature>
  -> implementation
  -> PR
  -> CI
  -> handoff
  -> owner/DEV1 review
  -> authorized merge
  -> AWS staging deployment
```

Dev2 does not independently merge deployment-triggering changes and does not
run Terraform apply, update ECS, provision Cognito, modify RDS/IAM/WAF/network
resources, or manually trigger deployment workflows.

## Production

```text
validated staging
  -> release approval
  -> main
  -> production deployment approval
```

`main` and `staging` are permanent branches. No direct developer pushes,
force-pushes, or history rewrites are permitted. New work branches from
`origin/staging`, not `main`.

## Deployment workflow controls

- Pull requests run validation only; they must not deploy.
- A staging deployment is allowed only for the `staging` branch.
- Manual deployment runs must refuse non-staging refs.
- AWS authentication uses GitHub OIDC with minimum job permissions.
- Production uses a separate GitHub Environment, secrets, and approval path.
- No credentials, PHI, JWTs, clinical notes, or database dumps belong in GitHub.

## Future Troy codebase intake

Do not overwrite staging when the updated codebase arrives. Use:

```text
integration/troy-codebase-reconciliation
  -> diff against current staging
  -> compare domain/database/tests
  -> identify DEV1/DEV2 conflicts
  -> validate
  -> review
  -> controlled merge to staging
```

This branch is a future recommendation only and is not created by this
cleanup task.

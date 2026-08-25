# Git and Release Workflow

```text
origin/staging
  -> dev1/* / dev2/* / integration/*
  -> PR
  -> CI and owner review
  -> authorized merge
  -> AWS staging deployment only through the owner-approved workflow
```

`main` and `staging` are permanent branches. No direct developer pushes, force pushes, or history rewrites are permitted. This reconciliation branch must stop before merging.

Future Troy intake uses `integration/troy-codebase-reconciliation`, compares product, database, API, tests, governance, and workstream collisions, and requires review before integration.

No production deployment, Terraform apply, RDS change, Cognito change, or ECS change is performed by local reconciliation.

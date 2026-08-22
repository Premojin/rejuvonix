# CI/CD Strategy

Promotion path:

```text
codex feature branch -> PR -> staging -> CI -> AWS staging -> smoke/regression/security
-> manual approval -> PR staging to main -> production deployment
```

Required blocking checks: locked dependency install, lint, TypeScript,
application tests, reproducible build, secret scanning, dependency scanning,
SAST, container scan, and Terraform/IaC scan. Deploy images to ECR using the
commit SHA; do not use `latest` as the release identifier.

GitHub controls: protect `main` with PRs, required CI, approvals, resolved
conversations, no direct pushes, and no force pushes. Protect `staging` with
PRs for normal work, required CI, and no force pushes. Use separate protected
AWS OIDC roles for staging and production; production requires an environment
approval.

The repository's current helper scripts assume Linux GNU `timeout`, `flock`,
and `sha256sum`. CI should run on Ubuntu; local macOS development should use
direct Vinext/type-check commands or a documented container.

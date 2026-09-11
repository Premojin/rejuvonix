# Staging Dependency Remediation — 2026-09-11

## Scope

This branch is limited to dependency, lockfile, and container-security
remediation from canonical staging SHA
`09389447c608805c7befb448e3f33159acf5b650`. No application feature, signup,
JWT, Postgres, Cognito, AWS, AI, or EmberFlow changes are included.

Original blocking CI run: [34587217418](https://github.com/Premojin/rejuvonix/actions/runs/34587217418)

## Findings and remediation

| Component | Before | After | Reason |
|---|---:|---:|---|
| Next.js | 16.3.2 | 16.3.3 | Patched critical advisories in the existing major line |
| eslint-config-next | 16.3.2 | 16.3.3 | Keep framework lint configuration aligned |
| sharp | 0.35.2/0.35.3 | 0.35.4 | Parent updates remove vulnerable native dependency versions |
| `@cloudflare/vite-plugin` | 1.53.1 | 1.54.7 | Brings Miniflare/sharp remediation |
| Wrangler | 4.125.0 | 4.131.0 | Required by the patched Cloudflare plugin |
| workers-types | 5.20260822.1 | 5.20260911.1 | Satisfies the patched Wrangler peer contract |
| browserslist | 4.28.2 | 4.28.7 | Resolves high CI finding through a compatible override |
| fast-uri | 3.1.5 | 3.1.6 | Resolves high CI finding through the existing AJV override |
| js-yaml | 4.3.1 | 4.3.2 | Resolves high ESLint dependency finding |

The non-forced audit path leaves four moderate `esbuild` findings in the
historical `drizzle-kit` → `@esbuild-kit` chain. `npm audit fix --force` proposes
a breaking Drizzle downgrade and was not used. No findings were suppressed.

## Validation

- `npm ci`: PASS
- `npm audit --audit-level=high`: PASS
- Governance: PASS
- Typecheck: PASS
- Lint: PASS, 0 errors (existing warnings only)
- Tests: PASS
- Build: PASS
- `git diff --check`: PASS
- Local Docker/Trivy scan: NOT AVAILABLE; Docker daemon unavailable
- GitHub container scan: required before merge

The route and auth source was not changed. Signup remains demo-only. The
Postgres baseline and JWT work remain excluded.

## Deployment boundary

No AWS mutation is authorized by this branch. After CI is fully green, staging
deployment requires the normal reviewed process. Production remains separately
gated.

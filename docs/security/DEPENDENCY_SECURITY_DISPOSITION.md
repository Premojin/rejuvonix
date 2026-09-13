# Dependency Security Disposition

The original production audit reported four high findings, including Next.js
16.2.6 and transitive `nanoid`, `postcss`, and `sharp` issues. The direct runtime
upgrade to Next.js 16.3.2 removed all production (`--omit=dev`) findings.

Targeted development/toolchain remediation then upgraded Cloudflare/Vinext,
Vite, Wrangler, React Server Components, React, and Worker types to compatible
patched releases. Narrow npm overrides updated vulnerable transitive parser/
glob dependencies without forcing an incompatible dependency tree.

Current audit result: 0 high, 0 critical; 1 low and 4 moderate findings remain
in development-only tooling. The remaining moderate chain is:

- `drizzle-kit` -> deprecated `@esbuild-kit/*` -> nested `esbuild`
- npm proposes `drizzle-kit@0.18.1`, which is a downgrade and not acceptable
  without migration-generator compatibility testing.

Disposition: accepted temporarily / requires toolchain decision. `drizzle-kit`
is not part of the production container runtime and is not used by the current
empty schema. Revisit before introducing PostgreSQL migrations; prefer a
supported Drizzle migration toolchain upgrade or replacement, then rerun the
full audit. The remaining low Babel finding is development-only and has no
known production execution path in this application.

No critical vulnerability is accepted silently. CI continues to fail on any
high or critical audit result.

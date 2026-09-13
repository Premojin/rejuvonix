# Rejuvonix Protocols Surgery V5 Audit

## Scope
V5 builds on the clean V4 protocol framework and applies the supplied COA archive plus the approved visual refinements. No unrelated redesign was performed.

## COA library
- Protocol records: 19
- Unique supplied certificate PDFs imported: 19
- Protocol families with one or more supplied batch COAs: 15
- Protocols without a supplied batch COA in the archive: ss-31, aod-9604, tb-500, gonadorelin
- Exact duplicate downloads were collapsed only when the PDF bytes were identical.
- Original imported PDFs are stored unchanged under `public/documents/coa/`.

## Multi-part packages preserved
- `sermorelin` lot `LG52241285`: 2 companion links retained within the original multi-page PDF.
- `glutathione` lot `ProRx062625-1`: 2 companion links retained within the original multi-page PDF.
- `nad-plus` lot `LG52243282`: 2 companion links retained within the original multi-page PDF.

## FDA-approved product rule
FDA-approved finished-product pathways retain official prescribing/manufacturer documentation as their primary documentation and do not require a COA. Where the supplied archive contains a compounded formulation COA for the same active ingredient, that certificate appears only in the separate batch-by-batch compounded documentation section.

## V5 UI refinements
- Wegovy Pill FDA orbit copy now revolves around the circular seal.
- The inner `FDA` mark is aligned diagonally along the check/tick.
- Protocol, documentation, batch, clinical-brief, review, and related cards use the rounded-edge standard.
- Generic footer trust icons were replaced with the supplied HIPAA and Compounded in USA crest assets.

## Validation
- Protocol tests: 7/7 passed.
- COA/document verifier: passed for 19 protocols and 19 batch certificate files.
- 19 unique SHA-256 certificate fingerprints confirmed.
- Reference-site-name scan: zero matches in application/scripts/tests/docs.
- Obsolete `COA not verified` / `COA pending verification` copy: zero matches in application data/UI.
- Full TypeScript project typecheck could not run because the unpacked snapshot does not include installed `@cloudflare/workers-types`; this is a dependency-environment limitation, not a reported V5 test failure.

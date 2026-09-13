# Rejuvonix Protocols Surgery V6 — Build Audit

## Scope
V6 layers the requested protocol-card and weight-loss presentation refinements on top of the V5 batch-COA snapshot. It does not replace the V5 COA library, authentication, clinical runtime, assessment routes, or OpenAI Sites/vinext architecture.

## Included UI changes
- Protocol listing cards now include a local medication-vial image, a price line, provider/pharmacy trust lines, a named **View <protocol>** CTA, rounded edges, and hover lift/floating-bottle motion.
- All Protocols and goal-specific protocol lists are horizontal scroll/snap shelves rather than fixed three-column grids.
- Goal identities are rendered as floating text rather than rounded chips.
- A compact provider/pharmacy/security trust strip appears immediately below protocol shelves.
- Protocol detail heroes now place a floating medication bottle at top right with the mapped Rejuvonix goals drifting around it; Related Goals moves to the lower action row beside the assessment CTA.
- Protocol category navigation uses an aqua/blue glowing underline on hover and active state.
- The homepage compounded comparison and Compounded Care page now contain three clickable options: Semaglutide, Tirzepatide, and GLP-1 Microdose.
- The three supplied weight-loss vial images are used in those sections and link to the weight-loss assessment.

## Pricing behavior
Three starting monthly prices were directly legible in the supplied reference card screenshot and are represented numerically in V6:
- Semax / Selank — from $239/mo
- DSIP — from $199/mo
- NAD+ — from $159/mo

The execution environment could not independently retrieve the live source catalog during this build. V6 therefore deliberately does **not** invent prices for the remaining protocols. Their price line reads **Current pricing confirmed in assessment** until an exact current price can be verified and substituted.

## Local visual assets packaged with V6
- `public/v6/compounded-medication-generic.png`
- `public/v6/semaglutide-2.5mg-ml.png`
- `public/v6/tirzepatide-5mg-0.5ml.png`
- `public/v6/glp1-microdose-500mcg-ml.png`

Only the supplied bottle assets that are actually used by V6 are packaged into the project. Reference screenshots are intentionally excluded from the shipped source.

## Preserved V5 behavior
- 19 protocol records
- 19 unique local COA PDFs
- Batch-by-batch COA architecture
- Multi-part certificate packages remain grouped
- FDA-approved finished-product documentation remains distinct from compounded batch COAs
- No obsolete `COA not verified` / `COA pending verification` copy
- No source-reference brand naming in the application/framework

## Validation
- Existing protocol catalog tests: 7/7 passed
- V5 COA verifier: passed for 19 protocols / 19 batch certificates
- V6 UI contract tests: 6/6 passed
- TS/TSX syntax transpile check: passed for all V6-modified TypeScript files
- Full TypeScript project check was not executable without installed project dependencies (`@cloudflare/workers-types` is absent from this sandbox).

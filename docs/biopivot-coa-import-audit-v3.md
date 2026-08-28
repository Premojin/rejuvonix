# Rejuvonix Protocol COA Import Audit — Surgery v3

**Audit date:** 2026-08-28

## Locked documentation rule

- FDA-approved finished drug products use official FDA/manufacturer documentation. **A COA is not required for that FDA-approved product pathway.**
- For non-FDA items, the user has authorized importing an existing BioPivot COA.
- Import is still exact-match controlled: the certificate must be attributable to the exact BioPivot item; where the certificate carries formulation/strength/lot/batch metadata, those details must remain attached.
- When a BioPivot COA is imported, preserve the original BioPivot source URL and, where technically available, a local immutable copy under `public/documents/biopivot-coa/`.
- Do not relabel a third-party substitute-vendor certificate as a BioPivot COA.

## Retrieval result for this build

The public-web retrieval environment did not expose stable BioPivot certificate PDFs or exact item-specific COA URLs. A search of the user file library also did not locate BioPivot-specific COA documents or exact BioPivot item-to-COA mappings. Therefore this build enables the import pipeline and source traceability but intentionally imports **zero unverified certificates**.

| Protocol | Regulatory status | Surgery v3 document path | COA state |
|---|---|---|---|
| Semaglutide | FDA-approved products available | Official documentation / COA not required | not-required |
| Tirzepatide | FDA-approved products available | Official documentation / COA not required | not-required |
| AOD-9604 | Not FDA approved | Import authorized; exact BioPivot certificate retrieval pending | retrieval-pending |
| MOTS-C | Not FDA approved | Import authorized; exact BioPivot certificate retrieval pending | retrieval-pending |
| Tesamorelin | FDA approved for a specific indication | Official documentation / COA not required | not-required |
| CJC-1295 / Ipamorelin | Not FDA approved | Import authorized; exact BioPivot certificate retrieval pending | retrieval-pending |
| Sermorelin | Historical FDA approval; discontinued/withdrawn | Import authorized; exact BioPivot certificate retrieval pending | retrieval-pending |
| Epithalon | Not FDA approved | Import authorized; exact BioPivot certificate retrieval pending | retrieval-pending |
| GHK-Cu | Status depends on formulation and route | Import authorized; exact BioPivot certificate retrieval pending | retrieval-pending |
| BPC-157 | Not FDA approved | Import authorized; exact BioPivot certificate retrieval pending | retrieval-pending |
| TB-500 | Not FDA approved | Import authorized; exact BioPivot certificate retrieval pending | retrieval-pending |
| SS-31 / Elamipretide | FDA approved for a specific indication | Official documentation / COA not required | not-required |
| Thymosin Alpha-1 | Not FDA approved in the U.S. | Import authorized; exact BioPivot certificate retrieval pending | retrieval-pending |
| Glutathione | Status and risk depend on formulation and route | Import authorized; exact BioPivot certificate retrieval pending | retrieval-pending |
| Semax / Selank | Not FDA approved | Import authorized; exact BioPivot certificate retrieval pending | retrieval-pending |
| DSIP / Emideltide | Not FDA approved | Import authorized; exact BioPivot certificate retrieval pending | retrieval-pending |
| NAD+ | No FDA-approved injectable wellness indication | Import authorized; exact BioPivot certificate retrieval pending | retrieval-pending |
| PT-141 / Bremelanotide | FDA approved for a specific indication | Official documentation / COA not required | not-required |
| Gonadorelin | Historical FDA-approved human products; discontinued | Import authorized; exact BioPivot certificate retrieval pending | retrieval-pending |

## Import acceptance checklist

A BioPivot certificate may move from `retrieval-pending` to `verified` only when all applicable checks pass:

1. Exact protocol/compound identity matches the BioPivot catalog item.
2. Source URL resolves to BioPivot or a document host directly linked by BioPivot.
3. Strength/formulation matches when specified by the certificate or source page.
4. Lot/batch is retained when present.
5. Laboratory and test date are retained when present.
6. Test methods/results are not paraphrased into claims the certificate does not support.
7. Original source URL is stored for traceability.
8. Local copy, if imported, is stored under `public/documents/biopivot-coa/` and is never silently replaced.
9. FDA-approved finished-product entries stay on official documentation and remain `COA not required`.

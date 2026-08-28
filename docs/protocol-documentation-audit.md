# Rejuvonix Protocol Documentation Audit — Surgery v2

**Audit date:** 2026-08-28

**Locked rule:** FDA-approved finished drug products use official prescribing information and do not require a COA. For non-FDA items, a BioPivot COA may only be displayed after the exact BioPivot item-to-document relationship is independently verified. No substitute-vendor certificates are permitted.

**BioPivot retrieval note:** The current public-web retrieval environment did not expose BioPivot certificate documents or stable BioPivot COA URLs. Therefore, no non-FDA BioPivot COA relationship is marked verified in this pass. This is an intentional verification hold, not an assumption that BioPivot has no COA.

| Protocol | Regulatory classification | Documentation path | BioPivot COA status |
|---|---|---|---|
| Semaglutide | FDA-approved products available | Wegovy prescribing information — Novo Nordisk prescribing information | not-required |
| Tirzepatide | FDA-approved products available | Zepbound prescribing information — Eli Lilly prescribing information | not-required |
| AOD-9604 | Not FDA approved | BioPivot COA relationship not yet verified | unverified |
| MOTS-C | Not FDA approved | BioPivot COA relationship not yet verified | unverified |
| Tesamorelin | FDA approved for a specific indication | EGRIFTA WR FDA prescribing information — U.S. FDA | not-required |
| CJC-1295 / Ipamorelin | Not FDA approved | BioPivot COA relationship not yet verified | unverified |
| Sermorelin | Historical FDA approval; discontinued/withdrawn | BioPivot COA relationship not yet verified | unverified |
| Epithalon | Not FDA approved | BioPivot COA relationship not yet verified | unverified |
| GHK-Cu | Status depends on formulation and route | BioPivot COA relationship not yet verified | unverified |
| BPC-157 | Not FDA approved | BioPivot COA relationship not yet verified | unverified |
| TB-500 | Not FDA approved | BioPivot COA relationship not yet verified | unverified |
| SS-31 / Elamipretide | FDA approved for a specific indication | Forzinity FDA prescribing information — U.S. FDA | not-required |
| Thymosin Alpha-1 | Not FDA approved in the U.S. | BioPivot COA relationship not yet verified | unverified |
| Glutathione | Status and risk depend on formulation and route | BioPivot COA relationship not yet verified; current FDA safety documentation available | unverified |
| Semax / Selank | Not FDA approved | BioPivot COA relationship not yet verified | unverified |
| DSIP / Emideltide | Not FDA approved | BioPivot COA relationship not yet verified | unverified |
| NAD+ | No FDA-approved injectable wellness indication | BioPivot COA relationship not yet verified; current FDA sterile-compounding safety documentation available | unverified |
| PT-141 / Bremelanotide | FDA approved for a specific indication | Vyleesi prescribing information — Vyleesi prescribing information | not-required |
| Gonadorelin | Historical FDA-approved human products; discontinued | BioPivot COA relationship not yet verified | unverified |

## Verification controls

- No non-FDA protocol contains a BioPivot COA URL unless `bioPivotCoa.status` is `verified`.
- No FDA-approved finished-product pathway contains a BioPivot COA URL; those items use official labeling.
- No unrelated research-peptide vendor COA is accepted as a substitute for BioPivot documentation.
- Historical approvals (Sermorelin, Gonadorelin) are not presented as currently marketed FDA-approved human products.
- Route-dependent items (GHK-Cu, Glutathione, NAD+) keep route/formulation distinctions visible.
- No dosing schedules were introduced in this pass.

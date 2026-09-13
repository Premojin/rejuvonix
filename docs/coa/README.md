# COA document handling

Certificates shown on Rejuvonix protocol pages must be exact-item records.

- FDA-approved finished drug products use official prescribing information and do not require a COA.
- For other protocol items, display a COA only after the exact item/certificate relationship is verified.
- Preserve the original certificate bytes. Do not edit logos, client names, laboratory names, results, lot numbers, dates, or other certificate content.
- Store public certificate copies under `public/documents/coa/`.
- A certificate URL is never rendered while its manifest status is pending.
- Never substitute a certificate merely because it tests a similarly named compound.

# Clinical intake readiness

## Current decision

The five program journeys remain non-submitting. The project must not accept real patient medical information until the items below are verified and approved.

## Blocking requirements

### Hosting and agreements

- Written confirmation that every service handling intake data is within the organization’s approved HIPAA/BAA scope.
- A current data-flow diagram naming the hosting platform, database, identity provider, prescribing medical group, pharmacy partners, analytics tools, error monitoring and support access.
- Executed agreements required by healthcare and privacy counsel.

### Patient authentication

- Select an identity system intended for public patients. The included ChatGPT sign-in helper is not enabled because patients should not be assumed to have ChatGPT accounts.
- Require verified identity before saving or retrieving an intake.
- Enforce server-side record ownership on every read and write.
- Define account recovery, session expiration, suspicious-login and support-verification procedures.

### Data security

- Confirm encryption at rest and in transit for every service.
- Add application-level encryption for medical answers before database persistence.
- Store only ciphertext in `intake_answers`; manage encryption keys outside source control and version every key.
- Prohibit health answers, medication details, DOB, address and uploads in URLs, logs, analytics, error messages and support tools.
- Complete security review, threat modeling and penetration testing before launch.

### Consent and policy

- Counsel-approved Terms, Privacy Notice and Telehealth Consent with version identifiers and effective dates.
- Separate treatment-related consent from optional marketing communications consent.
- Record the exact document version and cryptographic hash accepted by the patient.
- Define withdrawal, record-access, correction, retention and deletion procedures.

### Clinical governance

- Prescribing-medical-group approval for every medical question, required field and branch.
- Written rules for provider escalation and urgent symptoms.
- No automated approval or disqualification unless separately validated and approved.
- Provider-facing review state and immutable audit events.
- State availability and licensure checks before matching a patient to a provider.

### Uploads

- Keep uploads disabled until approved object storage, file-type validation, size limits, malware scanning, restricted signed access, retention and deletion are implemented.

## Prepared but disabled

`db/schema.ts` defines the future encrypted intake, consent and audit record structure. D1 and R2 remain disabled in `.openai/hosting.json`; there is no intake API and no patient information is persisted.

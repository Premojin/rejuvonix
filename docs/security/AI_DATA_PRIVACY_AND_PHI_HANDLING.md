# AI Data, Privacy & PHI Handling Standard

**Document ID:** RAI-SEC-002  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Privacy & Security Governance  
**Effective Date:** 2026-08-24

## 1. Initial Boundary

Until explicitly authorized, AI development and staging MUST use synthetic or de-identified data only.

## 2. Minimum Necessary

AI context must include only the information required for the task.

Do not send an entire patient record when a narrow subset is sufficient.

## 3. Prohibited Logging

Never log:

- passwords;
- access tokens;
- refresh tokens;
- session cookies;
- full authorization headers;
- unnecessary PHI;
- entire clinical notes unless explicitly approved for a secure audit purpose;
- secrets.

## 4. Model Provider Configuration

Before PHI use:

- provider/service must be approved for the intended regulated workload;
- contractual requirements must be satisfied;
- data retention controls must be reviewed;
- training-on-customer-data settings must be reviewed;
- regional processing requirements must be reviewed;
- encryption and access controls must be confirmed.

## 5. Prompt / Response Retention

Raw prompt/response retention is not the default.

Retain only what is necessary for safety, audit, quality, or care continuity, using approved retention rules.

## 6. Redaction

Implement pre-model and pre-log redaction where appropriate.

## 7. Data Classification

AI data should be classified as:

- Public
- Internal
- Confidential
- Sensitive Health / PHI
- Security Sensitive

Policy enforcement must follow classification.

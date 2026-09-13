# AI Release & Change-Control Standard

**Document ID:** RAI-OPS-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Platform Operations  
**Effective Date:** 2026-08-24

## 1. Governed Change Types

The following are release-controlled:

- model change;
- system prompt/policy change;
- source hierarchy change;
- knowledge publication;
- tool addition;
- tool permission change;
- retrieval configuration;
- safety rule change;
- role behavior change;
- clinical workflow integration.

## 2. Required Release Evidence

Each release must identify:

- change summary;
- affected document IDs;
- benchmark results;
- security test results;
- cost impact;
- rollback plan;
- staging validation;
- approval record.

## 3. Environment Promotion

```text
local
 -> feature branch
 -> PR
 -> staging
 -> synthetic evaluation
 -> approval
 -> production
```

No direct production experimentation.

## 4. Rollback

Keep prior known-good:

- model routing config;
- prompt/policy version;
- knowledge index/version;
- application image;
- tool schema.

## 5. Emergency Disable

The architecture must support disabling:

- specific model;
- specific agent role;
- specific tool;
- specific knowledge collection;
- all AI functionality

without taking the core Rejuvonix platform offline.

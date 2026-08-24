# Integration Release & Change-Control Standard

**Document ID:** RIX-OPS-001  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Platform Operations  
**Effective Date:** 2026-08-24

## 1. Controlled Changes

Review required for:

- new partner API;
- new webhook;
- new event;
- breaking API change;
- provider replacement;
- queue topology change;
- new external data flow;
- PHI exposure change;
- AI tool addition.

## 2. Release Evidence

Each change should identify:

- affected document IDs;
- contract changes;
- security impact;
- test results;
- retry/DLQ behavior;
- observability;
- rollback;
- cost impact.

## 3. Promotion

```text
local
 -> feature branch
 -> PR
 -> staging
 -> synthetic integration tests
 -> approval
 -> production
```

## 4. Rollback

Keep prior known-good application image and provider configuration where possible.

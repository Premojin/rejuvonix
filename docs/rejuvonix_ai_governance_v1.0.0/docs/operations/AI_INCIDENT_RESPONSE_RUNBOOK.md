# AI Incident Response Runbook

**Document ID:** RAI-OPS-002  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Security Operations / Clinical Governance  
**Effective Date:** 2026-08-24

## 1. Trigger Events

Examples:

- PHI disclosed to wrong user;
- cross-patient retrieval;
- unsafe clinical recommendation;
- model jailbreak bypass;
- fabricated clinical policy;
- incorrect source citation;
- unauthorized tool execution;
- abnormal AI cost spike;
- unexpected provider behavior.

## 2. Immediate Actions

1. Preserve relevant audit metadata.
2. Disable affected tool/agent/model if needed.
3. Prevent further exposure.
4. Identify scope.
5. Engage security/clinical/privacy owners.
6. Do not delete evidence.

## 3. Containment Controls

Architecture should permit disabling:

- one role;
- one knowledge collection;
- one tool;
- one model;
- the complete AI layer.

## 4. Investigation

Determine:

- actor;
- affected resources;
- source versions;
- model version;
- policy version;
- tools;
- authorization result;
- patient impact;
- repeated occurrences.

## 5. Recovery

Require regression test and approval before re-enabling a materially unsafe capability.

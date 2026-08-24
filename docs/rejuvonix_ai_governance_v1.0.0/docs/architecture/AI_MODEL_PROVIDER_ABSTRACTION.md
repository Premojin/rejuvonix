# AI Model & Provider Abstraction Standard

**Document ID:** RAI-ARC-002  
**Version:** 1.0.0  
**Status:** APPROVED BASELINE  
**Owner:** Rejuvonix Architecture  
**Effective Date:** 2026-08-24

## 1. Goal

Prevent hard dependency on one model vendor.

## 2. Application Contract

Business features should depend on Rejuvonix interfaces, not vendor SDKs.

Required abstractions:

- generation;
- retrieval;
- embeddings;
- structured output;
- tool calling;
- safety evaluation;
- streaming where used.

## 3. Provider Registry

Maintain provider configuration by environment.

Each model entry should include:

- provider;
- model ID;
- model version where available;
- approved role/use cases;
- context limit;
- PHI eligibility status;
- evaluation version;
- cost class;
- fallback model.

## 4. Routing

Model selection may depend on task class, but authorization and safety policy must remain outside the provider.

## 5. Fallback

Fallbacks must not silently weaken safety or source-grounding requirements.

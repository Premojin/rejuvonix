# DEV1 Clinical Runtime Disposition

This is a read-only architectural disposition of the active `codex/clinical-runtime-and-auth` work. The Dev1 worktree was not modified.

| DEV1 area | Disposition | Reason |
|---|---|---|
| Cognito verifier and issuer/audience/token validation | KEEP | Application identity remains a Rejuvonix responsibility. |
| Local identity mapping to application principal | KEEP | Required for non-PHI application authorization. |
| Server-side RBAC and deny-by-default policy | KEEP | Required independent of EmberFlow. |
| Patient own-resource and object authorization | KEEP | Patient portal isolation remains a Rejuvonix responsibility. |
| Clinician assignment authorization | MODIFY | Keep the boundary, but do not grant access to EmberFlow clinical data until contracts and assignments are approved. |
| PostgreSQL connection pooling/TLS/Secrets Manager contract | KEEP | PostgreSQL remains the Rejuvonix application store. |
| Users, roles, permissions, user-role mapping, sessions | KEEP | Non-PHI identity/application data. |
| Patient profile metadata | KEEP | Restrict to non-PHI account/profile fields. |
| Consent metadata | KEEP | Preserve versioned metadata and external evidence references. |
| Appointment tables/API | MODIFY | Retain only provisional non-PHI scheduling/reference state pending ownership confirmation. |
| Clinical intake persistence | EMBERFLOW-BOUNDARY | Rebuild as provider handoff/reference state; no raw answers locally. |
| Encounters and treatment plans | REMOVE from Rejuvonix target model / DEFER | These are clinical record concepts owned by EmberFlow. Do not delete Dev1 files blindly; disposition before migration. |
| Audit/access/security event builders | KEEP | Metadata-only events; no clinical payloads. |
| Clinical APIs exposing local clinical rows | MODIFY | Re-scope to non-PHI references/workflow or defer until EmberFlow contract. |
| Cognito/ECS/Terraform changes | DEFER | No AWS changes in this local reconciliation. |

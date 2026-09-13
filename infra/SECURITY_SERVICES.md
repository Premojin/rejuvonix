# AWS Security and Observability Integration

| Service | Staging posture | Production posture | Cost/ownership note |
|---|---|---|---|
| KMS | One environment key for RDS, S3, logs/secrets as approved | Separate keys and administrators | Key requests and CloudTrail events incur operational/call costs |
| Secrets Manager | Runtime DB/provider secrets only | Separate secret paths and rotation | Per-secret/month and API-call charges |
| WAF | Regional ALB ACL with managed common rules | Add rate rules, bot controls, and tuned managed rules | Request-based; tune false positives and budget |
| CloudWatch | ECS/RDS logs, metrics, health alarms, 30-day app retention template | Longer approved retention and security alarms | Logs, metrics, alarms, dashboards, and data transfer |
| CloudTrail | Organization/account trail to protected log bucket | Central immutable log archive and alerting | Management/data event volume and storage |
| Config | Enable required baseline rules after account decision | Organization-wide conformance packs | Per-resource evaluations and recorder/storage |
| GuardDuty | Enable in dedicated staging account after owner approval | Organization delegated administrator | Findings/service volume; no blind enablement across accounts |
| Security Hub | Enable selected standards and route findings | Centralized delegated administrator | Per-check and finding costs vary by region |
| Inspector | ECR image scanning and runtime coverage as approved | Required release gate and remediation workflow | Scanning usage and continuous monitoring |
| Backup | RDS encrypted backup and restore test | Cross-region/central vault policy as required | Storage, copy, and restore costs |
| VPC Flow Logs | Enable for incident/debug need with retention decision | Central collection and alerting | Log ingestion/storage can be material |

Staging currently uses one NAT gateway for cost control, which is a single-AZ
egress dependency. Two NAT gateways improve AZ independence but increase fixed
cost. VPC endpoints for ECR, S3, CloudWatch, and Secrets Manager can reduce NAT
dependency after traffic and endpoint costs are measured. Production should not
inherit the staging single-NAT tradeoff without an explicit resilience decision.

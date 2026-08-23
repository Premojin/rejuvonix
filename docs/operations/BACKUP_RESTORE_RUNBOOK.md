# Staging Backup and Restore Runbook

## Current policy

Rejuvonix staging PostgreSQL is private, encrypted, Single-AZ, and configured
with seven-day automated backup retention. The staging RTO/RPO assumptions are
RTO four hours and RPO 24 hours. This runbook uses synthetic data only.

## Verify backups without touching the active database

1. Confirm the AWS account is `235494780327` and region is `us-east-1`.
2. Run `aws rds describe-db-instances` for `rejuvonix-staging-postgres`.
3. Confirm `BackupRetentionPeriod` is 7, `StorageEncrypted` is true, and
   `PubliclyAccessible` is false.
4. Review recent automated backups with `aws rds describe-db-snapshots`.

## Isolated restore test

Only perform this when the cost owner approves the temporary RDS charge.

1. Select a recent automated snapshot; never use a production snapshot.
2. Restore to a uniquely named temporary instance in the existing private DB
   subnets and attach the staging DB security group.
3. Do not attach the restored instance to the application service or expose it
   publicly. Use a short-lived operator session to validate connectivity and
   schema metadata only.
4. Record restore start/end times, status, encryption, and connectivity.
5. Delete the temporary instance after validation and confirm deletion in AWS.

No restore test is authorized to copy real patient data into staging. If a
restore cannot be isolated and cost-bounded, document the verification as
not-run rather than risking the active database.

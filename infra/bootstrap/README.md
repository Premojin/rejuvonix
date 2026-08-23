# Terraform state bootstrap

This is a separate, one-time bootstrap boundary. It creates only the encrypted,
versioned, private S3 state bucket and dedicated KMS key. It must be reviewed and applied with an
approved bootstrap role before the staging backend is initialized.

The staging backend uses S3 native lockfiles (`use_lockfile = true`) supported
by the selected Terraform version; no DynamoDB table is required. The state
bucket name is derived from the authenticated AWS account ID.

After bootstrap, initialize staging with the bucket name from the bootstrap
output. Do not commit `.tfstate`, credentials, or backend config containing
sensitive values.

# AWS staging account decision record

The current AWS credentials resolve to an existing AWS account containing
unrelated networking, database, ECS, ECR, S3, and DNS resources. It is not a
dedicated Rejuvonix staging account. The current principal is a long-lived IAM
user with broad administrative access; credential values are not recorded
here.

No Rejuvonix resources were applied in this run. This is a deployment blocker
for an early telehealth platform because account-level blast radius, IAM
separation, billing ownership, and audit-log ownership are not isolated.

Owner decision required:

1. Provide or designate a dedicated staging AWS account under AWS
   Organizations, or explicitly approve a narrowly scoped shared-account
   exception with resource naming, IAM, budget, and rollback controls.
2. Establish a GitHub OIDC staging deployment role; do not use the current
   long-lived IAM user in CI.
3. Confirm the notification destination, staging DNS ownership, and monthly
   spend ceiling.

Until then, Terraform work is limited to local validation and plan review.

data "aws_iam_policy_document" "github_assume" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    principals { type = "Federated" identifiers = [aws_iam_openid_connect_provider.github.arn] }
    condition { test = "StringEquals" variable = "token.actions.githubusercontent.com:aud" values = ["sts.amazonaws.com"] }
    condition { test = "StringLike" variable = "token.actions.githubusercontent.com:sub" values = ["repo:${var.github_repository}:ref:refs/heads/${var.branch}"] }
  }
}

resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
  tags = var.tags
}

resource "aws_iam_role" "staging" {
  name = var.name
  assume_role_policy = data.aws_iam_policy_document.github_assume.json
  tags = var.tags
}

# Attach only staging-specific ECR/ECS/Terraform permissions after review.
# This module intentionally grants no permissions by itself.

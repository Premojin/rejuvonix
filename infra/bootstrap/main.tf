data "aws_caller_identity" "current" {}

locals {
  bucket_name = "${var.project}-terraform-state-${data.aws_caller_identity.current.account_id}"
}

resource "aws_kms_key" "state" {
  description             = "Rejuvonix Terraform state encryption"
  enable_key_rotation     = true
  deletion_window_in_days = 30
  tags = {
    Project            = "Rejuvonix"
    Environment        = "shared-infrastructure"
    ManagedBy          = "Terraform"
    CostCenter         = "Rejuvonix"
    Owner              = "Platform"
    DataClassification = "Confidential"
  }
}

resource "aws_kms_alias" "state" {
  name          = "alias/rejuvonix-terraform-state"
  target_key_id = aws_kms_key.state.key_id
}

resource "aws_s3_bucket" "state" {
  bucket        = local.bucket_name
  force_destroy = false
  tags = {
    Project            = "Rejuvonix"
    Environment        = "shared-infrastructure"
    ManagedBy          = "Terraform"
    CostCenter         = "Rejuvonix"
    Owner              = "Platform"
    DataClassification = "Confidential"
  }
}

resource "aws_s3_bucket_public_access_block" "state" {
  bucket                  = aws_s3_bucket.state.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "state" {
  bucket = aws_s3_bucket.state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "state" {
  bucket = aws_s3_bucket.state.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.state.arn
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_policy" "state" {
  bucket = aws_s3_bucket.state.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "DenyInsecureTransport"
      Effect    = "Deny"
      Principal = "*"
      Action    = "s3:*"
      Resource  = [aws_s3_bucket.state.arn, "${aws_s3_bucket.state.arn}/*"]
      Condition = { Bool = { "aws:SecureTransport" = "false" } }
    }]
  })
}

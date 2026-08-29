locals {
  flow_log_review_date = "2026-09-07"
  flow_log_tags = merge(var.tags, {
    Application = "Rejuvonix"
    Environment = var.name
    Purpose     = "TemporaryNetworkInvestigation"
    ReviewAfter = local.flow_log_review_date
    Retention   = "30Days"
  })
}

resource "aws_s3_bucket" "vpc_flow_logs" {
  bucket        = "${var.name}-vpc-flow-logs"
  force_destroy = false
  tags          = merge(local.flow_log_tags, { Name = "${var.name}-vpc-flow-logs" })
}

resource "aws_s3_bucket_public_access_block" "vpc_flow_logs" {
  bucket                  = aws_s3_bucket.vpc_flow_logs.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "vpc_flow_logs" {
  bucket = aws_s3_bucket.vpc_flow_logs.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = module.security.kms_key_arn
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_versioning" "vpc_flow_logs" {
  bucket = aws_s3_bucket.vpc_flow_logs.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "vpc_flow_logs" {
  bucket = aws_s3_bucket.vpc_flow_logs.id

  rule {
    id     = "temporary-investigation-retention"
    status = "Enabled"

    filter {}

    expiration {
      days = 30
    }

    noncurrent_version_expiration {
      noncurrent_days = 7
    }
  }
}

data "aws_iam_policy_document" "vpc_flow_logs_bucket" {
  statement {
    sid    = "AWSLogDeliveryAclCheck1"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["delivery.logs.amazonaws.com"]
    }

    actions   = ["s3:GetBucketAcl"]
    resources = [aws_s3_bucket.vpc_flow_logs.arn]

    condition {
      test     = "StringEquals"
      variable = "aws:SourceAccount"
      values   = [data.aws_caller_identity.current.account_id]
    }

    condition {
      test     = "ArnLike"
      variable = "aws:SourceArn"
      values   = ["arn:aws:logs:${var.aws_region}:${data.aws_caller_identity.current.account_id}:*"]
    }
  }

  statement {
    sid    = "AWSLogDeliveryWrite1"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["delivery.logs.amazonaws.com"]
    }

    actions = ["s3:PutObject"]
    resources = [
      "${aws_s3_bucket.vpc_flow_logs.arn}/vpcflowlogs/AWSLogs/${data.aws_caller_identity.current.account_id}/*"
    ]

    condition {
      test     = "StringEquals"
      variable = "aws:SourceAccount"
      values   = [data.aws_caller_identity.current.account_id]
    }

    condition {
      test     = "ArnLike"
      variable = "aws:SourceArn"
      values   = ["arn:aws:logs:${var.aws_region}:${data.aws_caller_identity.current.account_id}:*"]
    }

    condition {
      test     = "StringEquals"
      variable = "s3:x-amz-acl"
      values   = ["bucket-owner-full-control"]
    }
  }
}

resource "aws_s3_bucket_policy" "vpc_flow_logs" {
  bucket = aws_s3_bucket.vpc_flow_logs.id
  policy = data.aws_iam_policy_document.vpc_flow_logs_bucket.json
}

resource "aws_flow_log" "private_subnets" {
  for_each = toset([
    "subnet-01f213031743511d2",
    "subnet-0b3f6acd48529d8af",
    "subnet-03c2693a737af2cd0",
    "subnet-0aee3136553a6b2fe",
  ])

  subnet_id                = each.value
  traffic_type             = "ALL"
  max_aggregation_interval = 600
  log_destination_type     = "s3"
  log_destination          = "${aws_s3_bucket.vpc_flow_logs.arn}/vpcflowlogs/"
  log_format               = "$${version} $${account-id} $${interface-id} $${srcaddr} $${dstaddr} $${srcport} $${dstport} $${protocol} $${packets} $${bytes} $${start} $${end} $${action} $${log-status} $${vpc-id} $${subnet-id} $${az-id} $${pkt-srcaddr} $${pkt-dstaddr} $${traffic-path} $${flow-direction}"
  tags                     = merge(local.flow_log_tags, { Name = "${var.name}-${each.value}-flow-log" })

  depends_on = [aws_s3_bucket_policy.vpc_flow_logs]
}

resource "aws_athena_workgroup" "vpc_flow_logs" {
  name = "${var.name}-vpc-flow-logs"

  configuration {
    enforce_workgroup_configuration    = true
    publish_cloudwatch_metrics_enabled = false
    bytes_scanned_cutoff_per_query     = 1073741824

    result_configuration {
      output_location = "s3://${aws_s3_bucket.vpc_flow_logs.bucket}/athena-results/"

      encryption_configuration {
        encryption_option = "SSE_KMS"
        kms_key_arn       = module.security.kms_key_arn
      }
    }
  }

  tags = local.flow_log_tags
}

data "aws_caller_identity" "current" {}

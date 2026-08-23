terraform {
  required_version = ">= 1.8.0"
  required_providers {
    aws = { source = "hashicorp/aws" version = "~> 5.0" }
  }
  # Configure an encrypted, restricted S3 backend after the staging account
  # and state bucket are approved. Never commit credentials or tfstate.
}

provider "aws" {
  region = var.aws_region
  default_tags { tags = var.tags }
}

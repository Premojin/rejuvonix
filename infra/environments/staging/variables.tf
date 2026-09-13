variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "name" {
  type    = string
  default = "rejuvonix-staging"
}

variable "vpc_cidr" {
  type    = string
  default = "10.42.0.0/16"
}

variable "azs" {
  type    = list(string)
  default = ["us-east-1a", "us-east-1b"]
}

variable "tags" {
  type = map(string)
  default = {
    Application        = "Rejuvonix"
    Project            = "Rejuvonix"
    ManagedBy          = "Terraform"
    CostCenter         = "Rejuvonix"
    Owner              = "Platform"
    DataClassification = "SyntheticOnly"
  }
}

variable "monthly_budget_usd" {
  type    = number
  default = 250
}

variable "budget_notification_email" {
  type    = string
  default = ""
}

variable "github_repository" {
  type    = string
  default = "Premojin/rejuvonix"
}

variable "certificate_arn" {
  type     = string
  nullable = true
  default  = null
}

variable "staging_domain" {
  type    = string
  default = "staging.rejuvonix.com"
}

variable "create_service" {
  type    = bool
  default = false
}

variable "image_tag" {
  type    = string
  default = "bootstrap"
}

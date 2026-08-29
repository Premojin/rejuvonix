locals { common_tags = merge(var.tags, { Environment = var.name }) }
data "aws_region" "current" {}

resource "aws_cognito_user_pool" "this" {
  name                     = var.name
  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]
  mfa_configuration        = "ON"
  software_token_mfa_configuration { enabled = true }

  password_policy {
    minimum_length                   = 12
    require_lowercase                = true
    require_numbers                  = true
    require_symbols                  = true
    require_uppercase                = true
    temporary_password_validity_days = 1
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  schema {
    name                     = "tenant_id"
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = false
    required                 = false
    string_attribute_constraints {}
  }
  user_attribute_update_settings {
    attributes_require_verification_before_update = ["email"]
  }
  deletion_protection = "ACTIVE"
  tags                = local.common_tags
}

resource "aws_cognito_user_pool_client" "this" {
  name                                 = "${var.name}-app"
  user_pool_id                         = aws_cognito_user_pool.this.id
  generate_secret                      = false
  prevent_user_existence_errors        = "ENABLED"
  enable_token_revocation              = true
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["openid", "email", "profile"]
  callback_urls                        = var.callback_urls
  logout_urls                          = var.logout_urls
  supported_identity_providers         = ["COGNITO"]
  access_token_validity                = 60
  id_token_validity                    = 60
  refresh_token_validity               = 30
  token_validity_units {
    access_token  = "minutes"
    id_token      = "minutes"
    refresh_token = "days"
  }
}

resource "aws_cognito_user_pool_domain" "this" {
  domain       = var.domain_prefix
  user_pool_id = aws_cognito_user_pool.this.id
}

resource "aws_cognito_user_group" "patient" {
  name         = "Patient"
  user_pool_id = aws_cognito_user_pool.this.id
  precedence   = 10
}
resource "aws_cognito_user_group" "clinician" {
  name         = "Clinician"
  user_pool_id = aws_cognito_user_pool.this.id
  precedence   = 20
}
resource "aws_cognito_user_group" "administrator" {
  name         = "Administrator"
  user_pool_id = aws_cognito_user_pool.this.id
  precedence   = 30
}
resource "aws_cognito_user_group" "operations" {
  name         = "Operations"
  user_pool_id = aws_cognito_user_pool.this.id
  precedence   = 40
}
resource "aws_cognito_user_group" "support" {
  name         = "Support"
  user_pool_id = aws_cognito_user_pool.this.id
  precedence   = 50
}
resource "aws_cognito_user_group" "service" {
  name         = "Service"
  user_pool_id = aws_cognito_user_pool.this.id
  precedence   = 60
}

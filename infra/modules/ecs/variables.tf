variable "name" { type = string }
variable "subnet_ids" { type = list(string) }
variable "security_group_id" { type = string }
variable "target_group_arn" { type = string }
variable "db_secret_arn" {
  type     = string
  nullable = true
  default  = null
}
variable "db_host" {
  type     = string
  nullable = true
  default  = null
}
variable "db_port" {
  type     = number
  nullable = true
  default  = null
}
variable "db_name" {
  type    = string
  default = "rejuvonix"
}
variable "cognito_user_pool_id" {
  type     = string
  nullable = true
  default  = null
}
variable "auth_client_id" {
  type     = string
  nullable = true
  default  = null
}
variable "cognito_domain" {
  type     = string
  nullable = true
  default  = null
}
variable "kms_key_arn" {
  type     = string
  nullable = true
  default  = null
}

variable "image_tag" {
  type    = string
  default = "bootstrap"
}

variable "cpu" {
  type    = number
  default = 256
}

variable "memory" {
  type    = number
  default = 512
}

variable "desired_count" {
  type    = number
  default = 1
}

variable "create_service" {
  type    = bool
  default = false
}

variable "max_tasks" {
  type    = number
  default = 2
}

variable "tags" {
  type    = map(string)
  default = {}
}

variable "name" { type = string }
variable "subnet_ids" { type = list(string) }
variable "security_group_id" { type = string }
variable "kms_key_id" { type = string }
variable "instance_class" { type = string default = "db.t4g.micro" }
variable "engine_version" { type = string default = "16.4" }
variable "backup_retention_days" { type = number default = 7 }
variable "deletion_protection" { type = bool default = false }
variable "tags" { type = map(string) default = {} }

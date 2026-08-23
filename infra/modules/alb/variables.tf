variable "name" { type = string }
variable "subnet_ids" { type = list(string) }
variable "security_group_id" { type = string }
variable "vpc_id" { type = string }
variable "target_port" { type = number default = 3000 }
variable "tags" { type = map(string) default = {} }

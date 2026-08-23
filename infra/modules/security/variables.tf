variable "name" { type = string }
variable "vpc_id" { type = string }
variable "vpc_cidr" { type = string }

variable "app_port" {
  type    = number
  default = 3000
}

variable "db_port" {
  type    = number
  default = 5432
}

variable "tags" {
  type    = map(string)
  default = {}
}

variable "name" { type = string }
variable "subnet_ids" { type = list(string) }
variable "security_group_id" { type = string }
variable "target_group_arn" { type = string }

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

variable "max_tasks" {
  type    = number
  default = 2
}

variable "tags" {
  type    = map(string)
  default = {}
}

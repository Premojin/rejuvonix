variable "name" { type = string }
variable "github_repository" { type = string }

variable "branch" {
  type    = string
  default = "staging"
}

variable "github_environment" {
  type    = string
  default = "staging"
}

variable "tags" {
  type    = map(string)
  default = {}
}

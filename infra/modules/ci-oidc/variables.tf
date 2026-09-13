variable "name" { type = string }
variable "github_repository" { type = string }

variable "github_repository_subject" {
  type    = string
  default = "Premojin@316004841/rejuvonix@1343163474"
}

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

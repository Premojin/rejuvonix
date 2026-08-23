variable "aws_region" { type = string default = "us-east-1" }
variable "name" { type = string default = "rejuvonix-staging" }
variable "vpc_cidr" { type = string default = "10.42.0.0/16" }
variable "azs" { type = list(string) default = ["us-east-1a", "us-east-1b"] }
variable "tags" { type = map(string) default = { Project = "rejuvonix" ManagedBy = "terraform" } }

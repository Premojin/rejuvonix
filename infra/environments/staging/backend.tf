terraform {
  backend "s3" {
    key          = "rejuvonix/staging/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}

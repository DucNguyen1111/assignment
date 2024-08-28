terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.50.0"
    }
  }

  backend "s3" {
    bucket  = "ducnh3-terraform"
    key     = "app/terraform.tfstate"
    region  = "ap-southeast-1"
    encrypt = "true"
  }
}

provider "aws" {
  region  = "ap-southeast-1"
}
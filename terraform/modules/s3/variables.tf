variable "buckets" {
  description = "Bucket object to determine name and access policy of S3 bucket"
  type = map(object({
    name = string
    access_policy = string
  }))
}
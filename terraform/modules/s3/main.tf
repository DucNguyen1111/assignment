resource "aws_s3_bucket" "s3_bucket" {
  for_each = var.buckets
  bucket = each.value.name
}

resource "aws_s3_bucket_public_access_block" "example" {
  for_each = var.buckets
  bucket = aws_s3_bucket.s3_bucket[each.key].id
  block_public_acls   = each.value.access_policy == "public" ? false : true
  block_public_policy = each.value.access_policy == "public" ? false : true
}
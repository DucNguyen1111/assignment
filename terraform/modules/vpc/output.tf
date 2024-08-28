output "public_subnet_ids" {
  description = "The IDs of the public subnets in the VPC"
  value       = aws_subnet.public_subnet[*].id
}

output "private_subnet_ids" {
  description = "The IDs of the private subnets in the VPC"
  value       = aws_subnet.private_subnet[*].id
}

output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.default_vpc.id
}

output "subnet_ids" {
  description = "List of all subnet IDs in the VPC"
  value       = concat(aws_subnet.private_subnet[*].id, aws_subnet.public_subnet[*].id)
}
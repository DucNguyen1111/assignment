module "vpc" {
  source = "../modules/vpc"
  eks_cluster_name = var.eks_cluster_name
  vpc_tag_name = var.vpc_tag_name
  route_table_tag_name = var.route_table_tag_name
}

module "eks" {
  source = "../modules/eks"
  eks_cluster_name = var.eks_cluster_name
  node_group_name = var.node_group_name
  eks_cluster_subnet_ids = module.vpc.subnet_ids
  private_subnet_ids = module.vpc.private_subnet_ids
  public_subnet_ids = module.vpc.public_subnet_ids
  cluster_sg_name = var.cluster_sg_name
  nodes_sg_name = var.nodes_sg_name
  vpc_id = module.vpc.vpc_id
  ecr_names = var.ecr_names
}

module "s3" {
  source = "../modules/s3"
  buckets = var.buckets
}
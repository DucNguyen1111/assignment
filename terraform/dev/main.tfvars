eks_cluster_name = "eks-cluster"
vpc_tag_name = "vpc_default"
route_table_tag_name = "rt_default"
node_group_name = "ng_eks_default"
cluster_sg_name = "sg_cluster_default"
nodes_sg_name = "sg_ng_default"
ecr_names = ["mono-client", "mono-image", "mono-analysis"]
buckets = {
  bucket_1 = {
    name = "mono-s3-bucket"
    access_policy = "public"
  }
}
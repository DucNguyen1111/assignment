import boto3
from ..config import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

def get_image_from_s3(bucket: str, key: str) -> bytes:
    s3_client = boto3.client('s3',aws_access_key_id=AWS_ACCESS_KEY_ID,aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

    s3_response = s3_client.get_object(Bucket=bucket, Key=key)
    return s3_response['Body'].read()
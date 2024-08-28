from pydantic import BaseModel

class S3Message(BaseModel):
    s3_bucket: str
    s3_key: str
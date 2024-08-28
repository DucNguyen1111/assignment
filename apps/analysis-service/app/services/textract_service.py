import boto3

def analyze_image_with_textract(image_bytes: bytes):
    textract_client = boto3.client('textract')
    response = textract_client.analyze_document(
        Document={'Bytes': image_bytes},
        FeatureTypes=["TABLES", "FORMS"]
    )
    return response
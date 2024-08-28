import pika
import json
from .s3_service import get_image_from_s3
from .textract_service import analyze_image_with_textract
from ..models import S3Message
from ..config import RABBITMQ_URL, QUEUE_IN, QUEUE_OUT

def callback(ch, method, properties, body):
    body_str = body.decode('utf-8')
    s3_msg = json.loads(body_str)
    image_bytes = get_image_from_s3(s3_msg["s3_bucket"], s3_msg["s3_key"])
    textract_response = analyze_image_with_textract(image_bytes)
    lines = []
    
    # Iterate through blocks to extract text from LINE blocks
    for block in textract_response['Blocks']:
        if block['BlockType'] == 'LINE':
            lines.append(block['Text'])

    # Concatenate all lines into a single string with newlines
    concatenated_text = "\n".join(lines)
    publish_message = {
        "pattern": "analyzed-image",
        "data": {
            "id": s3_msg["id"],
            "content": concatenated_text
        }
    }

    connection = pika.BlockingConnection(pika.URLParameters(RABBITMQ_URL))
    channel = connection.channel()
    channel.queue_declare(queue=QUEUE_OUT, durable=True)

    textract_response_json = json.dumps(publish_message)
    channel.basic_publish(
        exchange='',
        routing_key=QUEUE_OUT,
        body=textract_response_json
    )
    print('Published message', textract_response_json)
    connection.close()

def start_rabbitmq_listener():
    connection = pika.BlockingConnection(pika.URLParameters(RABBITMQ_URL))
    channel = connection.channel()

    channel.queue_declare(queue=QUEUE_IN, durable=True)
    channel.basic_consume(queue=QUEUE_IN, on_message_callback=callback, auto_ack=True)
    
    channel.start_consuming()
# FastAPI Boilerplate

# Features
- REST API endpoints
- Database integration (use an ORM of your choice)
- RabbitMQ integration for message queuing
- Implement at least one worker process that consumes messages from RabbitMQ

## Running the app in local

Install package for your app:

```shell
pip install --no-cache-dir --upgrade -r /code/requirements.txt
```

To run the dev server for your app, use:

```shell
fastapi dev main.py
```

## Structure

```
├── app
│   ├── config.py
│   ├── env.example
│   ├── __init__.py
│   ├── main.py
│   ├── models.py
│   └── services
│       ├── rabbitmq_service.py
│       ├── s3_service.py
│       └── textract_service.py
├── Dockerfile
├── README.md
└── requirements.txt
```
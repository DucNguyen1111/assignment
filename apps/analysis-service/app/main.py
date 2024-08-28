from fastapi import FastAPI
from .services.rabbitmq_service import start_rabbitmq_listener

app = FastAPI()

@app.on_event("startup")
def startup_event():
    start_rabbitmq_listener()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
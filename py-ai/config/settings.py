from pydantic_settings import BaseSettings
import os

class Config(BaseSettings):
    base_url: str = os.getenv("BASE_URL","")
    model_name: str = os.getenv("MODEL_NAME","")


settings = Config()

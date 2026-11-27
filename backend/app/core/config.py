import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Tero Parbon API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "tero-parbon-dev-secret-key-32-chars-min"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    # PostgreSQL configuration
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "tero_parbon"
    POSTGRES_PORT: str = "5432"

    # Default to PostgreSQL, overrideable via DATABASE_URL env var
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        f"postgresql+psycopg2://postgres:postgres@localhost:5432/tero_parbon"
    )

    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000"
    ]

    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "allow"

settings = Settings()

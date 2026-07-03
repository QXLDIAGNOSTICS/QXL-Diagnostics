"""Application configuration via environment-driven Pydantic settings."""
from __future__ import annotations

from functools import lru_cache
from typing import Annotated

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # App
    ENVIRONMENT: str = "development"
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "QXL Backend"
    CORS_ORIGINS: Annotated[list[str], NoDecode] = Field(
        default_factory=lambda: ["http://localhost:3000"]
    )
    MAX_UPLOAD_BYTES: int = 25 * 1024 * 1024  # 25 MB
    ALLOWED_UPLOAD_TYPES: Annotated[list[str], NoDecode] = Field(
        default_factory=lambda: [
            "application/pdf",
            "image/png",
            "image/jpeg",
            "text/plain",
        ]
    )

    # PostgreSQL
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/appdb"

    # Auth0 (API — validates Bearer access tokens on protected endpoints)
    AUTH0_DOMAIN: str = ""
    AUTH0_API_AUDIENCE: str = ""
    AUTH0_ISSUER: str = ""
    AUTH0_ALGORITHMS: Annotated[list[str], NoDecode] = Field(default_factory=lambda: ["RS256"])

    # Auth0 (Regular Web App — backend-owned Authorization Code login flow)
    AUTH0_CLIENT_ID: str = ""
    AUTH0_CLIENT_SECRET: str = ""
    AUTH0_CALLBACK_URL: str = "http://localhost:3000/api/v1/auth/callback"
    FRONTEND_BASE_URL: str = "http://localhost:3000"
    SESSION_COOKIE_NAME: str = "qxl_session"
    SESSION_TTL_DAYS: int = 14

    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    SUPABASE_BUCKET: str = "user-files"

    # OpenAI
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"
    OPENAI_EMBEDDING_MODEL: str = "text-embedding-3-small"
    EMBEDDING_DIM: int = 1536
    RAG_TOP_K: int = 5
    CHAT_HISTORY_LIMIT: int = 10

    @field_validator("CORS_ORIGINS", "AUTH0_ALGORITHMS", "ALLOWED_UPLOAD_TYPES", mode="before")
    @classmethod
    def _split_csv(cls, v: object) -> object:
        """Allow comma-separated env strings for list fields."""
        if isinstance(v, str):
            return [item.strip() for item in v.split(",") if item.strip()]
        return v

    @field_validator("AUTH0_ISSUER", mode="before")
    @classmethod
    def _default_issuer(cls, v: object, info) -> object:
        return v

    @property
    def issuer(self) -> str:
        if self.AUTH0_ISSUER:
            return self.AUTH0_ISSUER
        return f"https://{self.AUTH0_DOMAIN}/"

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT.lower() in {"production", "prod"}


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()

"""Application configuration via environment-driven Pydantic settings."""
from __future__ import annotations

from functools import lru_cache
from typing import Annotated

from pydantic import Field, field_validator, model_validator
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

    # First-party session auth
    FRONTEND_BASE_URL: str = "http://localhost:3000"
    SESSION_COOKIE_NAME: str = "qxl_session"
    SESSION_TTL_DAYS: int = 14
    # Idle/inactivity timeout: a session cookie is rejected (forcing re-login)
    # if unused for this many hours, even if the absolute SESSION_TTL_DAYS
    # ceiling hasn't been reached yet. Refreshed (slides forward) on each
    # authenticated request.
    SESSION_IDLE_TIMEOUT_HOURS: int = 24
    PASSWORD_MIN_LENGTH: int = 8
    LOGIN_LOCKOUT_THRESHOLD: int = 5
    LOGIN_LOCKOUT_MINUTES: int = 15
    OTP_LENGTH: int = 8
    OTP_TTL_SECONDS: int = 300
    OTP_MAX_ATTEMPTS: int = 5
    LOGIN_CHALLENGE_TTL_SECONDS: int = 900

    # SMS (Nettyfish SmartSMS)
    NETTYFISH_BASE_URL: str = "https://sms.nettyfish.com"
    NETTYFISH_API_KEY: str = ""
    NETTYFISH_CLIENT_ID: str = ""
    NETTYFISH_SENDER_ID: str = ""
    NETTYFISH_PRINCIPLE_ENTITY_ID: str = ""
    NETTYFISH_TEMPLATE_ID: str = ""
    NETTYFISH_SERVICE_ID: str = ""
    NETTYFISH_VALIDITY_PERIOD: str = "5m"

    # Shared admin key required during admin OTP verification.
    ADMIN_ACCESS_KEY: str = ""
    ADMIN_SUPER_IDENTIFIERS: Annotated[list[str], NoDecode] = Field(default_factory=list)

    # Email (SMTP) — used as a secondary channel for OTP/notifications.
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USERNAME: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_EMAIL: str = "no-reply@qxldiagnostics.com"
    SMTP_USE_TLS: bool = True

    # Razorpay
    RAZORPAY_KEY_ID: str = ""
    RAZORPAY_KEY_SECRET: str = ""
    RAZORPAY_WEBHOOK_SECRET: str = ""

    # Prescriptions
    PRESCRIPTION_MONTHLY_UPLOAD_LIMIT: int = 5

    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    SUPABASE_BUCKET: str = "user-files"

    # Cloudinary — used for public, permanent CMS images (doctor photos, banner
    # art, blog cover images, etc.) uploaded from the admin panel. Supabase
    # storage above stays reserved for private, per-user files (prescriptions).
    # Either set the three fields below individually, OR set CLOUDINARY_URL to
    # the single combined value Cloudinary's dashboard shows you
    # ("cloudinary://<api_key>:<api_secret>@<cloud_name>") — it is parsed
    # automatically in `_parse_cloudinary_url` below.
    CLOUDINARY_URL: str = ""
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""
    CLOUDINARY_UPLOAD_FOLDER: str = "qxl"
    MAX_IMAGE_UPLOAD_BYTES: int = 8 * 1024 * 1024  # 8 MB

    # OpenAI
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"
    OPENAI_EMBEDDING_MODEL: str = "text-embedding-3-small"
    EMBEDDING_DIM: int = 1536
    RAG_TOP_K: int = 5
    CHAT_HISTORY_LIMIT: int = 10

    @field_validator(
        "CORS_ORIGINS", "ALLOWED_UPLOAD_TYPES", "ADMIN_SUPER_IDENTIFIERS", mode="before"
    )
    @classmethod
    def _split_csv(cls, v: object) -> object:
        """Allow comma-separated env strings for list fields."""
        if isinstance(v, str):
            return [item.strip() for item in v.split(",") if item.strip()]
        return v

    @model_validator(mode="after")
    def _parse_cloudinary_url(self) -> "Settings":
        """Populate CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET from CLOUDINARY_URL
        (format: cloudinary://<api_key>:<api_secret>@<cloud_name>) if the
        individual fields weren't set explicitly.
        """
        if self.CLOUDINARY_URL and not (
            self.CLOUDINARY_CLOUD_NAME and self.CLOUDINARY_API_KEY and self.CLOUDINARY_API_SECRET
        ):
            try:
                without_scheme = self.CLOUDINARY_URL.split("://", 1)[1]
                creds, cloud_name = without_scheme.split("@", 1)
                api_key, api_secret = creds.split(":", 1)
                self.CLOUDINARY_CLOUD_NAME = self.CLOUDINARY_CLOUD_NAME or cloud_name
                self.CLOUDINARY_API_KEY = self.CLOUDINARY_API_KEY or api_key
                self.CLOUDINARY_API_SECRET = self.CLOUDINARY_API_SECRET or api_secret
            except (IndexError, ValueError):
                pass
        return self

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT.lower() in {"production", "prod"}


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()

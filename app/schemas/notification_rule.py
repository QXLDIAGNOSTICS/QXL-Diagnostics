"""Schemas for admin-configurable notification automation rules."""
from __future__ import annotations

import uuid
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.models.notification_rule import TEMPLATE_CHOICES_BY_RULE_TYPE

RULE_TYPES = {"payment_reminder", "booking_reminder", "marketing"}
RULE_CHANNELS = {"sms", "email", "both"}
ALL_TEMPLATE_KEYS = {t for choices in TEMPLATE_CHOICES_BY_RULE_TYPE.values() for t in choices}


class NotificationRuleBase(BaseModel):
    name: str = Field(..., max_length=120)
    rule_type: str
    channel: str = "sms"
    interval_days: int = Field(7, ge=1, le=365)
    start_date: date | None = None
    end_date: date | None = None
    # Defaults to paused: a rule (especially "marketing") messages EVERY
    # patient on file the moment it's active, so staff must explicitly flip
    # it on after reviewing the wording — never as a side effect of saving.
    is_active: bool = False
    # Which canned copy style to use when subject/message are blank — see
    # TEMPLATE_CHOICES_BY_RULE_TYPE. None means "use the rule type's default".
    template: str | None = None
    subject: str | None = Field(None, max_length=200)
    message: str | None = Field(None, max_length=2000)

    @field_validator("rule_type")
    @classmethod
    def _valid_rule_type(cls, v: str) -> str:
        if v not in RULE_TYPES:
            raise ValueError(f"rule_type must be one of {RULE_TYPES}")
        return v

    @field_validator("channel")
    @classmethod
    def _valid_channel(cls, v: str) -> str:
        if v not in RULE_CHANNELS:
            raise ValueError(f"channel must be one of {RULE_CHANNELS}")
        return v

    @field_validator("template")
    @classmethod
    def _valid_template(cls, v: str | None) -> str | None:
        if v is not None and v not in ALL_TEMPLATE_KEYS:
            raise ValueError(f"template must be one of {sorted(ALL_TEMPLATE_KEYS)}")
        return v


class NotificationRuleCreate(NotificationRuleBase):
    pass


class NotificationRuleUpdate(BaseModel):
    name: str | None = Field(None, max_length=120)
    channel: str | None = None
    interval_days: int | None = Field(None, ge=1, le=365)
    start_date: date | None = None
    end_date: date | None = None
    is_active: bool | None = None
    template: str | None = None
    subject: str | None = Field(None, max_length=200)
    message: str | None = Field(None, max_length=2000)

    @field_validator("channel")
    @classmethod
    def _valid_channel(cls, v: str | None) -> str | None:
        if v is not None and v not in RULE_CHANNELS:
            raise ValueError(f"channel must be one of {RULE_CHANNELS}")
        return v

    @field_validator("template")
    @classmethod
    def _valid_template(cls, v: str | None) -> str | None:
        if v is not None and v not in ALL_TEMPLATE_KEYS:
            raise ValueError(f"template must be one of {sorted(ALL_TEMPLATE_KEYS)}")
        return v


class NotificationRuleRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    name: str
    rule_type: str
    channel: str
    interval_days: int
    start_date: date | None = None
    end_date: date | None = None
    is_active: bool
    template: str | None = None
    subject: str | None = None
    message: str | None = None
    last_run_at: datetime | None = None
    created_by: str | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None


class NotificationRuleList(BaseModel):
    items: list[NotificationRuleRead]
    count: int


class MessageTemplateOption(BaseModel):
    """One selectable canned-copy style for the automation "Template" picker."""

    key: str
    label: str
    subject_preview: str
    message_preview: str

"""Schemas for CMS content: Doctors, Banners, BlogPosts, FAQs."""
from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


# ── Doctor ────────────────────────────────────────────────────────────────────

class DoctorRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    name: str
    slug: str
    qualification: str | None = None
    specialization: str | None = None
    bio: str | None = None
    image_url: str | None = None
    is_active: bool = True
    sort_order: int = 0


class DoctorCreate(BaseModel):
    name: str
    slug: str | None = None  # auto-generated from name if omitted
    qualification: str | None = None
    specialization: str | None = None
    bio: str | None = None
    image_url: str | None = None
    is_active: bool = True
    sort_order: int = 0


class DoctorUpdate(BaseModel):
    name: str | None = None
    qualification: str | None = None
    specialization: str | None = None
    bio: str | None = None
    image_url: str | None = None
    is_active: bool | None = None
    sort_order: int | None = None


# ── Banner ────────────────────────────────────────────────────────────────────

class BannerRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    title: str | None = None
    title_accent: str | None = None
    subtitle: str | None = None
    subtitle_accent: str | None = None
    description: str | None = None
    badge: str | None = None
    cta_label: str | None = None
    cta_link: str | None = None
    cta_secondary_label: str | None = None
    cta_secondary_link: str | None = None
    image_url: str | None = None
    image_fit: str | None = None
    image_only: bool = False
    bg_from: str | None = None
    bg_to: str | None = None
    features: str | None = None   # JSON list
    is_active: bool = True
    sort_order: int = 0


class BannerCreate(BaseModel):
    title: str | None = None
    title_accent: str | None = None
    subtitle: str | None = None
    subtitle_accent: str | None = None
    description: str | None = None
    badge: str | None = None
    cta_label: str | None = None
    cta_link: str | None = None
    cta_secondary_label: str | None = None
    cta_secondary_link: str | None = None
    image_url: str | None = None
    image_fit: str | None = None
    image_only: bool = False
    bg_from: str | None = None
    bg_to: str | None = None
    features: str | None = None
    sort_order: int = 0
    is_active: bool = True


class BannerUpdate(BaseModel):
    title: str | None = None
    title_accent: str | None = None
    subtitle: str | None = None
    subtitle_accent: str | None = None
    description: str | None = None
    badge: str | None = None
    cta_label: str | None = None
    cta_link: str | None = None
    cta_secondary_label: str | None = None
    cta_secondary_link: str | None = None
    image_url: str | None = None
    image_fit: str | None = None
    image_only: bool | None = None
    bg_from: str | None = None
    bg_to: str | None = None
    features: str | None = None
    is_active: bool | None = None
    sort_order: int | None = None


# ── Blog Post ─────────────────────────────────────────────────────────────────

class BlogPostRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    title: str
    slug: str
    excerpt: str | None = None
    content: str | None = None
    author: str | None = None
    category: str | None = None
    image_url: str | None = None
    tags: str | None = None
    is_published: bool = False
    sort_order: int = 0
    created_at: datetime


class BlogPostCreate(BaseModel):
    title: str
    slug: str | None = None  # auto-generated from title if omitted
    excerpt: str | None = None
    content: str | None = None
    author: str | None = None
    category: str | None = None
    image_url: str | None = None
    tags: str | None = None
    is_published: bool = False
    sort_order: int = 0


class BlogPostUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    excerpt: str | None = None
    content: str | None = None
    author: str | None = None
    category: str | None = None
    image_url: str | None = None
    tags: str | None = None
    is_published: bool | None = None
    sort_order: int | None = None


class BlogPostList(BaseModel):
    items: list[BlogPostRead]
    count: int


# ── FAQ ───────────────────────────────────────────────────────────────────────

class FAQRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    question: str
    answer: str
    category: str | None = None
    is_active: bool = True
    sort_order: int = 0


class FAQCreate(BaseModel):
    question: str
    answer: str
    category: str | None = None
    is_active: bool = True
    sort_order: int = 0


class FAQUpdate(BaseModel):
    question: str | None = None
    answer: str | None = None
    category: str | None = None
    is_active: bool | None = None
    sort_order: int | None = None


# ── Review ────────────────────────────────────────────────────────────────────

class ReviewRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    author_name: str
    rating: int
    content: str
    source: str | None = None
    is_published: bool = True
    sort_order: int = 0
    created_at: datetime


class ReviewCreate(BaseModel):
    author_name: str
    rating: int = Field(ge=1, le=5)
    content: str
    source: str | None = None
    is_published: bool = True
    sort_order: int = 0


class ReviewUpdate(BaseModel):
    author_name: str | None = None
    rating: int | None = Field(default=None, ge=1, le=5)
    content: str | None = None
    source: str | None = None
    is_published: bool | None = None
    sort_order: int | None = None


class ReviewList(BaseModel):
    items: list[ReviewRead]
    count: int


# ── Gallery ─────────────────────────────────────────────────────────

class GalleryItemRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    title: str
    image_url: str
    category: str | None = None
    is_active: bool = True
    sort_order: int = 0


class GalleryItemCreate(BaseModel):
    title: str
    image_url: str
    category: str | None = None
    is_active: bool = True
    sort_order: int = 0


class GalleryItemUpdate(BaseModel):
    title: str | None = None
    image_url: str | None = None
    category: str | None = None
    is_active: bool | None = None
    sort_order: int | None = None


class GalleryItemList(BaseModel):
    items: list[GalleryItemRead]
    count: int


# ── Site Settings ─────────────────────────────────────────────────────────────

class SiteSettingsRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    theme_primary: str = "#2563eb"
    theme_secondary: str = "#0d2e42"
    maintenance_mode: bool = False
    cookie_banner: bool = True
    ai_chat_enabled: bool = True
    announcement: str | None = None
    custom_scripts: str | None = None
    live_chat_widget_id: str | None = None
    phone_display: str = "+91 99646 39639"
    phone_e164: str = "+919964639639"
    whatsapp_number: str = "919964639639"


class SiteSettingsUpdate(BaseModel):
    theme_primary: str | None = None
    theme_secondary: str | None = None
    maintenance_mode: bool | None = None
    cookie_banner: bool | None = None
    ai_chat_enabled: bool | None = None
    announcement: str | None = None
    custom_scripts: str | None = None
    live_chat_widget_id: str | None = None
    phone_display: str | None = None
    phone_e164: str | None = None
    whatsapp_number: str | None = None
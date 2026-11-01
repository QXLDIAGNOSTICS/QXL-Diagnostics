"""CMS content models: Doctor, Banner, BlogPost, FAQ, Review, Gallery, Speciality, SiteSettings, ContentBlock."""
from __future__ import annotations

import uuid
from datetime import datetime
from typing import Any

from sqlalchemy import JSON, Boolean, DateTime, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin, new_uuid


class Doctor(Base, TimestampMixin):
    """Doctor / consultant profile shown on the website."""

    __tablename__ = "doctors"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    name: Mapped[str] = mapped_column(String, nullable=False)
    slug: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    qualification: Mapped[str | None] = mapped_column(String, nullable=True)
    specialization: Mapped[str | None] = mapped_column(String, nullable=True)
    bio: Mapped[str | None] = mapped_column(Text, nullable=True)
    image_url: Mapped[str | None] = mapped_column(String, nullable=True)
    # Team page: role line ("Founder & CEO"), founder flag and profile copy.
    title: Mapped[str | None] = mapped_column(String, nullable=True)
    is_founder: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    experience: Mapped[str | None] = mapped_column(String, nullable=True)
    expertise: Mapped[str | None] = mapped_column(Text, nullable=True)
    achievements: Mapped[str | None] = mapped_column(Text, nullable=True)
    contribution: Mapped[str | None] = mapped_column(Text, nullable=True)
    department: Mapped[str | None] = mapped_column(String, nullable=True)
    registration_number: Mapped[str | None] = mapped_column(String, nullable=True)
    # Variants for the Founder & Consultants page and the homepage cards; each
    # falls back to the plain qualification / image_url / title when empty.
    card_qualification: Mapped[str | None] = mapped_column(String, nullable=True)
    card_image_url: Mapped[str | None] = mapped_column(String, nullable=True)
    short_title: Mapped[str | None] = mapped_column(String, nullable=True)
    # Site path of the doctor's hand-written profile page, e.g. "/dr-ajitha-pillai".
    profile_path: Mapped[str | None] = mapped_column(String, nullable=True)
    # CSS object-position for the card photo, e.g. "center 15%".
    image_position: Mapped[str | None] = mapped_column(String(32), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class Banner(Base, TimestampMixin):
    """Homepage/marketing carousel banner."""

    __tablename__ = "banners"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    title: Mapped[str | None] = mapped_column(String, nullable=True)
    title_accent: Mapped[str | None] = mapped_column(String, nullable=True)
    subtitle: Mapped[str | None] = mapped_column(String, nullable=True)
    subtitle_accent: Mapped[str | None] = mapped_column(String, nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    badge: Mapped[str | None] = mapped_column(String(32), nullable=True)
    cta_label: Mapped[str | None] = mapped_column(String(64), nullable=True)
    cta_link: Mapped[str | None] = mapped_column(String, nullable=True)
    cta_secondary_label: Mapped[str | None] = mapped_column(String(64), nullable=True)
    cta_secondary_link: Mapped[str | None] = mapped_column(String, nullable=True)
    image_url: Mapped[str | None] = mapped_column(String, nullable=True)
    image_fit: Mapped[str | None] = mapped_column(String(16), default="cover", nullable=True)
    image_only: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    bg_from: Mapped[str | None] = mapped_column(String(16), nullable=True)
    bg_to: Mapped[str | None] = mapped_column(String(16), nullable=True)
    # JSON-serialised feature list e.g. ["NABL Certified", "CAP Standards"]
    features: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class BlogPost(Base, TimestampMixin):
    """Blog article / news post."""

    __tablename__ = "blog_posts"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    title: Mapped[str] = mapped_column(String, nullable=False)
    slug: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    excerpt: Mapped[str | None] = mapped_column(Text, nullable=True)
    content: Mapped[str | None] = mapped_column(Text, nullable=True)
    author: Mapped[str | None] = mapped_column(String, nullable=True)
    category: Mapped[str | None] = mapped_column(String, nullable=True, index=True)
    image_url: Mapped[str | None] = mapped_column(String, nullable=True)
    tags: Mapped[str | None] = mapped_column(Text, nullable=True)  # JSON list
    is_published: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class FAQ(Base, TimestampMixin):
    """Frequently asked question."""

    __tablename__ = "faqs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    question: Mapped[str] = mapped_column(Text, nullable=False)
    answer: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str | None] = mapped_column(String, nullable=True, index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class Review(Base, TimestampMixin):
    """Patient review/testimonial — powers on-site testimonials plus
    AggregateRating/Review JSON-LD schema for SEO/AEO/GEO trust signals."""

    __tablename__ = "reviews"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    author_name: Mapped[str] = mapped_column(String, nullable=False)
    rating: Mapped[int] = mapped_column(Integer, nullable=False)  # 1-5
    content: Mapped[str] = mapped_column(Text, nullable=False)
    # Where the review originated, e.g. "Google", "Website", "Practo" — shown
    # as an attribution badge and helps keep NAP/reputation signals honest.
    source: Mapped[str | None] = mapped_column(String(32), nullable=True)
    is_published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class GalleryItem(Base, TimestampMixin):
    """Public media gallery item (lab facility photos, equipment, events)."""

    __tablename__ = "gallery_items"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    title: Mapped[str] = mapped_column(String, nullable=False)
    image_url: Mapped[str] = mapped_column(String, nullable=False)
    category: Mapped[str | None] = mapped_column(String, nullable=True, index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class Speciality(Base, TimestampMixin):
    """A clinical speciality landing page (/specialities/<slug>): hero copy,
    test profiles, FAQs and SEO metadata. List-valued fields are JSON."""

    __tablename__ = "specialities"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    name: Mapped[str] = mapped_column(String, nullable=False)
    slug: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    card_image_url: Mapped[str | None] = mapped_column(String, nullable=True)
    hero_image_url: Mapped[str | None] = mapped_column(String, nullable=True)
    hero_title: Mapped[str | None] = mapped_column(String, nullable=True)
    hero_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    intro: Mapped[str | None] = mapped_column(Text, nullable=True)
    # list[str]
    who_should_take: Mapped[Any] = mapped_column(JSON, nullable=True)
    # list[{name, tests, tat, sample}]
    profiles: Mapped[Any] = mapped_column(JSON, nullable=True)
    # list[str] paragraphs for the "For Clinicians" box
    clinician_notes: Mapped[Any] = mapped_column(JSON, nullable=True)
    disclaimer: Mapped[str | None] = mapped_column(Text, nullable=True)
    # Optional featured card: {badge, note, title, text, link, link_label}
    callout: Mapped[Any] = mapped_column(JSON, nullable=True)
    # list[{title, desc}]
    why_choose: Mapped[Any] = mapped_column(JSON, nullable=True)
    # list[{q, a}]
    faqs: Mapped[Any] = mapped_column(JSON, nullable=True)
    cta_title: Mapped[str | None] = mapped_column(String, nullable=True)
    cta_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    # Content for the tabbed /speciality-tests page: {order, color, description,
    # who_should_take, tests[], benefits[], packages[]}.
    directory: Mapped[Any] = mapped_column(JSON, nullable=True)
    # Sidebar "need help?" box.
    help_title: Mapped[str | None] = mapped_column(String, nullable=True)
    help_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    seo_title: Mapped[str | None] = mapped_column(String, nullable=True)
    seo_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class SiteSettings(Base, TimestampMixin):
    """Singleton row (id always 1) holding site-wide, admin-configurable
    preferences: theme colors, feature toggles, third-party script embeds,
    and contact information (phone, WhatsApp). Read publicly (so the storefront
    can apply it), written only by admins via the Settings screen.
    """

    __tablename__ = "site_settings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, default=1)
    theme_primary: Mapped[str] = mapped_column(String(16), default="#2563eb", nullable=False)
    theme_secondary: Mapped[str] = mapped_column(String(16), default="#0d2e42", nullable=False)
    maintenance_mode: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    cookie_banner: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    ai_chat_enabled: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    announcement: Mapped[str | None] = mapped_column(Text, nullable=True)
    custom_scripts: Mapped[str | None] = mapped_column(Text, nullable=True)
    live_chat_widget_id: Mapped[str | None] = mapped_column(String, nullable=True)
    # Contact information — admin-configurable
    phone_display: Mapped[str] = mapped_column(String(20), default="+91 9964 639639", nullable=False)
    phone_e164: Mapped[str] = mapped_column(String(20), default="+919964639639", nullable=False)
    whatsapp_number: Mapped[str] = mapped_column(String(20), default="919964639639", nullable=False)


class ContentBlock(Base):
    """Admin-managed JSON document keyed by name, for CMS sections that don't
    warrant their own table: website branding/navigation/footer copy
    ("website"), careers openings, departments, per-page SEO overrides,
    marketing coupons and the admin activity log. Which keys exist, and which
    are publicly readable, is defined in ``app.services.content_service``.
    """

    __tablename__ = "content_blocks"

    key: Mapped[str] = mapped_column(String(64), primary_key=True)
    data: Mapped[Any] = mapped_column(JSON, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )

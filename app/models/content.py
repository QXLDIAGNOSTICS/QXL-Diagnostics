"""CMS content models: Doctor, Banner, BlogPost, FAQ."""
from __future__ import annotations

import uuid

from sqlalchemy import Boolean, Integer, String, Text
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

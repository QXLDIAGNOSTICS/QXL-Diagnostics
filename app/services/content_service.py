"""CMS content service: doctors, banners, blog posts, FAQs."""
from __future__ import annotations

import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError
from app.models.content import FAQ, Banner, BlogPost, Doctor
from app.repositories.content_repository import (
    BannerRepository,
    BlogPostRepository,
    DoctorRepository,
    FAQRepository,
)
from app.services.catalog_service import slugify

# ── Doctors ───────────────────────────────────────────────────────────────────

async def list_active_doctors(db: AsyncSession) -> list[Doctor]:
    return await DoctorRepository(db).get_all_active()


async def list_all_doctors(db: AsyncSession, limit: int, offset: int) -> tuple[list[Doctor], int]:
    return await DoctorRepository(db).list_all(limit=limit, offset=offset)


async def create_doctor(db: AsyncSession, data: dict) -> Doctor:
    doc = await DoctorRepository(db).create(**data)
    await db.commit()
    await db.refresh(doc)
    return doc


async def update_doctor(db: AsyncSession, doctor_id: uuid.UUID, data: dict) -> Doctor:
    repo = DoctorRepository(db)
    doc = await repo.get_by_id(doctor_id)
    if doc is None:
        raise NotFoundError("Doctor not found")
    doc = await repo.update(doc, **data)
    await db.commit()
    await db.refresh(doc)
    return doc


async def delete_doctor(db: AsyncSession, doctor_id: uuid.UUID) -> None:
    repo = DoctorRepository(db)
    doc = await repo.get_by_id(doctor_id)
    if doc is None:
        raise NotFoundError("Doctor not found")
    await repo.delete(doc)
    await db.commit()


# ── Banners ───────────────────────────────────────────────────────────────────

async def list_active_banners(db: AsyncSession) -> list[Banner]:
    return await BannerRepository(db).get_all_active()


async def list_all_banners(db: AsyncSession, limit: int, offset: int) -> tuple[list[Banner], int]:
    return await BannerRepository(db).list_all(limit=limit, offset=offset)


async def create_banner(db: AsyncSession, data: dict) -> Banner:
    banner = await BannerRepository(db).create(**data)
    await db.commit()
    await db.refresh(banner)
    return banner


async def update_banner(db: AsyncSession, banner_id: uuid.UUID, data: dict) -> Banner:
    repo = BannerRepository(db)
    banner = await repo.get_by_id(banner_id)
    if banner is None:
        raise NotFoundError("Banner not found")
    banner = await repo.update(banner, **{k: v for k, v in data.items() if v is not None})
    await db.commit()
    await db.refresh(banner)
    return banner


async def delete_banner(db: AsyncSession, banner_id: uuid.UUID) -> None:
    repo = BannerRepository(db)
    banner = await repo.get_by_id(banner_id)
    if banner is None:
        raise NotFoundError("Banner not found")
    await repo.delete(banner)
    await db.commit()


# ── Blog Posts ────────────────────────────────────────────────────────────────

async def list_published_posts(db: AsyncSession, limit: int, offset: int) -> tuple[list[BlogPost], int]:
    return await BlogPostRepository(db).get_published(limit=limit, offset=offset)


async def get_post_by_slug(db: AsyncSession, slug: str) -> BlogPost:
    post = await BlogPostRepository(db).get_by_slug(slug)
    if post is None:
        raise NotFoundError("Blog post not found")
    return post


async def list_all_posts(db: AsyncSession, limit: int, offset: int) -> tuple[list[BlogPost], int]:
    return await BlogPostRepository(db).list_all(limit=limit, offset=offset)


async def create_post(db: AsyncSession, data: dict) -> BlogPost:
    repo = BlogPostRepository(db)
    if not data.get("slug"):
        data["slug"] = slugify(data["title"])
    post = await repo.create(**data)
    await db.commit()
    await db.refresh(post)
    return post


async def update_post(db: AsyncSession, post_id: uuid.UUID, data: dict) -> BlogPost:
    repo = BlogPostRepository(db)
    post = await repo.get_by_id(post_id)
    if post is None:
        raise NotFoundError("Blog post not found")
    post = await repo.update(post, **{k: v for k, v in data.items() if v is not None})
    await db.commit()
    await db.refresh(post)
    return post


async def delete_post(db: AsyncSession, post_id: uuid.UUID) -> None:
    repo = BlogPostRepository(db)
    post = await repo.get_by_id(post_id)
    if post is None:
        raise NotFoundError("Blog post not found")
    await repo.delete(post)
    await db.commit()


# ── FAQs ──────────────────────────────────────────────────────────────────────

async def list_active_faqs(db: AsyncSession, category: str | None = None) -> list[FAQ]:
    return await FAQRepository(db).get_all_active(category=category)


async def list_all_faqs(db: AsyncSession, limit: int, offset: int) -> tuple[list[FAQ], int]:
    return await FAQRepository(db).list_all(limit=limit, offset=offset)


async def create_faq(db: AsyncSession, data: dict) -> FAQ:
    faq = await FAQRepository(db).create(**data)
    await db.commit()
    await db.refresh(faq)
    return faq


async def update_faq(db: AsyncSession, faq_id: uuid.UUID, data: dict) -> FAQ:
    repo = FAQRepository(db)
    faq = await repo.get_by_id(faq_id)
    if faq is None:
        raise NotFoundError("FAQ not found")
    faq = await repo.update(faq, **{k: v for k, v in data.items() if v is not None})
    await db.commit()
    await db.refresh(faq)
    return faq


async def delete_faq(db: AsyncSession, faq_id: uuid.UUID) -> None:
    repo = FAQRepository(db)
    faq = await repo.get_by_id(faq_id)
    if faq is None:
        raise NotFoundError("FAQ not found")
    await repo.delete(faq)
    await db.commit()

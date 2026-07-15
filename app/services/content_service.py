"""CMS content service: doctors, banners, blog posts, FAQs."""
from __future__ import annotations

import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError
from app.models.content import FAQ, Banner, BlogPost, Doctor, GalleryItem, Review
from app.repositories.content_repository import (
    BannerRepository,
    BlogPostRepository,
    DoctorRepository,
    FAQRepository,
    GalleryItemRepository,
    ReviewRepository,
)
from app.services.catalog_service import slugify

# ── Doctors ───────────────────────────────────────────────────────────────────

async def list_active_doctors(db: AsyncSession) -> list[Doctor]:
    return await DoctorRepository(db).get_all_active()


async def get_doctor_by_slug(db: AsyncSession, slug: str) -> Doctor:
    doc = await DoctorRepository(db).get_by_slug(slug)
    if doc is None:
        raise NotFoundError("Doctor not found")
    return doc


async def list_all_doctors(db: AsyncSession, limit: int, offset: int) -> tuple[list[Doctor], int]:
    return await DoctorRepository(db).list_all(limit=limit, offset=offset)


async def create_doctor(db: AsyncSession, data: dict) -> Doctor:
    repo = DoctorRepository(db)
    if not data.get("slug"):
        data["slug"] = slugify(data["name"])
    existing = await repo.get_by_slug(data["slug"])
    if existing is not None:
        data["slug"] = f"{data['slug']}-{uuid.uuid4().hex[:6]}"
    doc = await repo.create(**data)
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
    existing = await repo.get_by_slug(data["slug"])
    if existing is not None:
        data["slug"] = f"{data['slug']}-{uuid.uuid4().hex[:6]}"
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


async def search_blog_posts(db: AsyncSession, q: str, limit: int = 5) -> list[BlogPost]:
    return await BlogPostRepository(db).search(q, limit=limit, published_only=True)


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


# ── Reviews ───────────────────────────────────────────────────────────────────

async def list_published_reviews(db: AsyncSession, limit: int = 20, offset: int = 0) -> tuple[list[Review], int]:
    return await ReviewRepository(db).get_published(limit=limit, offset=offset)


async def list_all_reviews(db: AsyncSession, limit: int, offset: int) -> tuple[list[Review], int]:
    return await ReviewRepository(db).list_all(limit=limit, offset=offset)


async def create_review(db: AsyncSession, data: dict) -> Review:
    review = await ReviewRepository(db).create(**data)
    await db.commit()
    await db.refresh(review)
    return review


async def update_review(db: AsyncSession, review_id: uuid.UUID, data: dict) -> Review:
    repo = ReviewRepository(db)
    review = await repo.get_by_id(review_id)
    if review is None:
        raise NotFoundError("Review not found")
    review = await repo.update(review, **data)
    await db.commit()
    await db.refresh(review)
    return review


async def delete_review(db: AsyncSession, review_id: uuid.UUID) -> None:
    repo = ReviewRepository(db)
    review = await repo.get_by_id(review_id)
    if review is None:
        raise NotFoundError("Review not found")
    await repo.delete(review)
    await db.commit()


# ── Gallery ─────────────────────────────────────────────────────────

async def list_active_gallery_items(db: AsyncSession) -> list[GalleryItem]:
    return await GalleryItemRepository(db).get_all_active()


async def list_all_gallery_items(db: AsyncSession, limit: int, offset: int) -> tuple[list[GalleryItem], int]:
    return await GalleryItemRepository(db).list_all(limit=limit, offset=offset)


async def create_gallery_item(db: AsyncSession, data: dict) -> GalleryItem:
    item = await GalleryItemRepository(db).create(**data)
    await db.commit()
    await db.refresh(item)
    return item


async def update_gallery_item(db: AsyncSession, item_id: uuid.UUID, data: dict) -> GalleryItem:
    repo = GalleryItemRepository(db)
    item = await repo.get_by_id(item_id)
    if item is None:
        raise NotFoundError("Gallery item not found")
    item = await repo.update(item, **data)
    await db.commit()
    await db.refresh(item)
    return item


async def delete_gallery_item(db: AsyncSession, item_id: uuid.UUID) -> None:
    repo = GalleryItemRepository(db)
    item = await repo.get_by_id(item_id)
    if item is None:
        raise NotFoundError("Gallery item not found")
    await repo.delete(item)
    await db.commit()

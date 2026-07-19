"""CMS content endpoints: doctors, banners, blog posts, FAQs. Public read, admin write."""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import DbSession, require_role
from app.models.user import User
from app.schemas.content import (
    BannerCreate,
    BannerRead,
    BannerUpdate,
    BlogPostCreate,
    BlogPostList,
    BlogPostRead,
    BlogPostUpdate,
    DoctorCreate,
    DoctorRead,
    DoctorUpdate,
    FAQCreate,
    FAQRead,
    FAQUpdate,
    GalleryItemCreate,
    GalleryItemList,
    GalleryItemRead,
    GalleryItemUpdate,
    ReviewCreate,
    ReviewList,
    ReviewRead,
    ReviewUpdate,
    SiteSettingsRead,
    SiteSettingsUpdate,
)
from app.services import content_service

router = APIRouter(tags=["content"])


# ── Doctors ───────────────────────────────────────────────────────────────────

@router.get("/doctors", response_model=list[DoctorRead])
async def list_doctors(db: DbSession) -> list[DoctorRead]:
    doctors = await content_service.list_active_doctors(db)
    return [DoctorRead.model_validate(d) for d in doctors]


@router.get("/doctors/admin", response_model=list[DoctorRead])
async def admin_list_doctors(
    db: DbSession, limit: int = 100, offset: int = 0, user: User = Depends(require_role("admin"))
) -> list[DoctorRead]:
    items, _ = await content_service.list_all_doctors(db, limit=limit, offset=offset)
    return [DoctorRead.model_validate(d) for d in items]


@router.get("/doctors/{slug}", response_model=DoctorRead)
async def get_doctor(slug: str, db: DbSession) -> DoctorRead:
    doc = await content_service.get_doctor_by_slug(db, slug)
    return DoctorRead.model_validate(doc)


@router.post("/doctors", response_model=DoctorRead, status_code=201)
async def create_doctor(body: DoctorCreate, db: DbSession, user: User = Depends(require_role("admin"))) -> DoctorRead:
    doc = await content_service.create_doctor(db, body.model_dump())
    return DoctorRead.model_validate(doc)


@router.patch("/doctors/{doctor_id}", response_model=DoctorRead)
async def update_doctor(
    doctor_id: uuid.UUID, body: DoctorUpdate, db: DbSession, user: User = Depends(require_role("admin"))
) -> DoctorRead:
    doc = await content_service.update_doctor(db, doctor_id, body.model_dump(exclude_unset=True))
    return DoctorRead.model_validate(doc)


@router.delete("/doctors/{doctor_id}", status_code=204)
async def delete_doctor(doctor_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("admin"))) -> None:
    await content_service.delete_doctor(db, doctor_id)


# ── Banners ───────────────────────────────────────────────────────────────────

@router.get("/banners", response_model=list[BannerRead])
async def list_banners(db: DbSession) -> list[BannerRead]:
    banners = await content_service.list_active_banners(db)
    return [BannerRead.model_validate(b) for b in banners]


@router.get("/banners/admin", response_model=list[BannerRead])
async def admin_list_banners(
    db: DbSession, limit: int = 100, offset: int = 0, user: User = Depends(require_role("admin"))
) -> list[BannerRead]:
    items, _ = await content_service.list_all_banners(db, limit=limit, offset=offset)
    return [BannerRead.model_validate(b) for b in items]


@router.post("/banners", response_model=BannerRead, status_code=201)
async def create_banner(body: BannerCreate, db: DbSession, user: User = Depends(require_role("admin"))) -> BannerRead:
    banner = await content_service.create_banner(db, body.model_dump())
    return BannerRead.model_validate(banner)


@router.patch("/banners/{banner_id}", response_model=BannerRead)
async def update_banner(
    banner_id: uuid.UUID, body: BannerUpdate, db: DbSession, user: User = Depends(require_role("admin"))
) -> BannerRead:
    banner = await content_service.update_banner(db, banner_id, body.model_dump(exclude_unset=True))
    return BannerRead.model_validate(banner)


@router.delete("/banners/{banner_id}", status_code=204)
async def delete_banner(banner_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("admin"))) -> None:
    await content_service.delete_banner(db, banner_id)


# ── Blog Posts ────────────────────────────────────────────────────────────────

@router.get("/blog", response_model=BlogPostList)
async def list_blog_posts(db: DbSession, limit: int = 50, offset: int = 0) -> BlogPostList:
    items, count = await content_service.list_published_posts(db, limit=limit, offset=offset)
    return BlogPostList(items=[BlogPostRead.model_validate(p) for p in items], count=count)


@router.get("/blog/admin", response_model=BlogPostList)
async def admin_list_blog_posts(
    db: DbSession, limit: int = 100, offset: int = 0, user: User = Depends(require_role("admin"))
) -> BlogPostList:
    items, count = await content_service.list_all_posts(db, limit=limit, offset=offset)
    return BlogPostList(items=[BlogPostRead.model_validate(p) for p in items], count=count)


@router.get("/blog/{slug}", response_model=BlogPostRead)
async def get_blog_post(slug: str, db: DbSession) -> BlogPostRead:
    post = await content_service.get_post_by_slug(db, slug)
    return BlogPostRead.model_validate(post)


@router.post("/blog", response_model=BlogPostRead, status_code=201)
async def create_blog_post(body: BlogPostCreate, db: DbSession, user: User = Depends(require_role("admin"))) -> BlogPostRead:
    post = await content_service.create_post(db, body.model_dump())
    return BlogPostRead.model_validate(post)


@router.patch("/blog/{post_id}", response_model=BlogPostRead)
async def update_blog_post(
    post_id: uuid.UUID, body: BlogPostUpdate, db: DbSession, user: User = Depends(require_role("admin"))
) -> BlogPostRead:
    post = await content_service.update_post(db, post_id, body.model_dump(exclude_unset=True))
    return BlogPostRead.model_validate(post)


@router.delete("/blog/{post_id}", status_code=204)
async def delete_blog_post(post_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("admin"))) -> None:
    await content_service.delete_post(db, post_id)


# ── FAQs ──────────────────────────────────────────────────────────────────────

@router.get("/faqs", response_model=list[FAQRead])
async def list_faqs(db: DbSession, category: str | None = None) -> list[FAQRead]:
    faqs = await content_service.list_active_faqs(db, category=category)
    return [FAQRead.model_validate(f) for f in faqs]


@router.get("/faqs/admin", response_model=list[FAQRead])
async def admin_list_faqs(
    db: DbSession, limit: int = 100, offset: int = 0, user: User = Depends(require_role("admin"))
) -> list[FAQRead]:
    items, _ = await content_service.list_all_faqs(db, limit=limit, offset=offset)
    return [FAQRead.model_validate(f) for f in items]


@router.post("/faqs", response_model=FAQRead, status_code=201)
async def create_faq(body: FAQCreate, db: DbSession, user: User = Depends(require_role("admin"))) -> FAQRead:
    faq = await content_service.create_faq(db, body.model_dump())
    return FAQRead.model_validate(faq)


@router.patch("/faqs/{faq_id}", response_model=FAQRead)
async def update_faq(
    faq_id: uuid.UUID, body: FAQUpdate, db: DbSession, user: User = Depends(require_role("admin"))
) -> FAQRead:
    faq = await content_service.update_faq(db, faq_id, body.model_dump(exclude_unset=True))
    return FAQRead.model_validate(faq)


@router.delete("/faqs/{faq_id}", status_code=204)
async def delete_faq(faq_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("admin"))) -> None:
    await content_service.delete_faq(db, faq_id)


# ── Reviews ───────────────────────────────────────────────────────────────

@router.get("/reviews", response_model=ReviewList)
async def list_reviews(db: DbSession, limit: int = 20, offset: int = 0) -> ReviewList:
    items, count = await content_service.list_published_reviews(db, limit=limit, offset=offset)
    return ReviewList(items=[ReviewRead.model_validate(r) for r in items], count=count)


@router.get("/reviews/admin", response_model=ReviewList)
async def admin_list_reviews(
    db: DbSession, limit: int = 100, offset: int = 0, user: User = Depends(require_role("admin"))
) -> ReviewList:
    items, count = await content_service.list_all_reviews(db, limit=limit, offset=offset)
    return ReviewList(items=[ReviewRead.model_validate(r) for r in items], count=count)


@router.post("/reviews", response_model=ReviewRead, status_code=201)
async def create_review(body: ReviewCreate, db: DbSession, user: User = Depends(require_role("admin"))) -> ReviewRead:
    review = await content_service.create_review(db, body.model_dump())
    return ReviewRead.model_validate(review)


@router.patch("/reviews/{review_id}", response_model=ReviewRead)
async def update_review(
    review_id: uuid.UUID, body: ReviewUpdate, db: DbSession, user: User = Depends(require_role("admin"))
) -> ReviewRead:
    review = await content_service.update_review(db, review_id, body.model_dump(exclude_unset=True))
    return ReviewRead.model_validate(review)


@router.delete("/reviews/{review_id}", status_code=204)
async def delete_review(review_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("admin"))) -> None:
    await content_service.delete_review(db, review_id)


# ── Gallery ─────────────────────────────────────────────────────────

@router.get("/gallery", response_model=GalleryItemList)
async def list_gallery_items(db: DbSession) -> GalleryItemList:
    items = await content_service.list_active_gallery_items(db)
    return GalleryItemList(items=[GalleryItemRead.model_validate(i) for i in items], count=len(items))


@router.get("/gallery/admin", response_model=GalleryItemList)
async def admin_list_gallery_items(
    db: DbSession, limit: int = 100, offset: int = 0, user: User = Depends(require_role("admin"))
) -> GalleryItemList:
    items, count = await content_service.list_all_gallery_items(db, limit=limit, offset=offset)
    return GalleryItemList(items=[GalleryItemRead.model_validate(i) for i in items], count=count)


@router.post("/gallery", response_model=GalleryItemRead, status_code=201)
async def create_gallery_item(
    body: GalleryItemCreate, db: DbSession, user: User = Depends(require_role("admin"))
) -> GalleryItemRead:
    item = await content_service.create_gallery_item(db, body.model_dump())
    return GalleryItemRead.model_validate(item)


@router.patch("/gallery/{item_id}", response_model=GalleryItemRead)
async def update_gallery_item(
    item_id: uuid.UUID, body: GalleryItemUpdate, db: DbSession, user: User = Depends(require_role("admin"))
) -> GalleryItemRead:
    item = await content_service.update_gallery_item(db, item_id, body.model_dump(exclude_unset=True))
    return GalleryItemRead.model_validate(item)


@router.delete("/gallery/{item_id}", status_code=204)
async def delete_gallery_item(item_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("admin"))) -> None:
    await content_service.delete_gallery_item(db, item_id)


# ── Site Settings ──────────────────────────────────────────────────────────

@router.get("/settings", response_model=SiteSettingsRead)
async def get_site_settings(db: DbSession) -> SiteSettingsRead:
    settings = await content_service.get_site_settings(db)
    return SiteSettingsRead.model_validate(settings)


@router.put("/settings", response_model=SiteSettingsRead)
async def update_site_settings(
    body: SiteSettingsUpdate, db: DbSession, user: User = Depends(require_role("admin"))
) -> SiteSettingsRead:
    settings = await content_service.update_site_settings(db, body.model_dump(exclude_unset=True))
    return SiteSettingsRead.model_validate(settings)

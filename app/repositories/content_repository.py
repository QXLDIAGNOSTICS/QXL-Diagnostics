"""Repository for CMS content: Doctor, Banner, BlogPost, FAQ."""
from __future__ import annotations

import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.content import FAQ, Banner, BlogPost, Doctor


class DoctorRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_all_active(self) -> list[Doctor]:
        stmt = (
            select(Doctor)
            .where(Doctor.is_active == True)  # noqa: E712
            .order_by(Doctor.sort_order, Doctor.name)
        )
        return list((await self.db.execute(stmt)).scalars().all())

    async def list_all(self, limit: int = 50, offset: int = 0) -> tuple[list[Doctor], int]:
        count = (await self.db.execute(select(func.count()).select_from(Doctor))).scalar_one()
        rows = list(
            (await self.db.execute(select(Doctor).order_by(Doctor.sort_order).limit(limit).offset(offset))).scalars().all()
        )
        return rows, count

    async def get_by_id(self, doctor_id: uuid.UUID) -> Doctor | None:
        return await self.db.get(Doctor, doctor_id)

    async def create(self, **kwargs) -> Doctor:  # noqa: ANN003
        doc = Doctor(**kwargs)
        self.db.add(doc)
        await self.db.flush()
        return doc

    async def update(self, doc: Doctor, **kwargs) -> Doctor:  # noqa: ANN003
        for k, v in kwargs.items():
            if v is not None:
                setattr(doc, k, v)
        await self.db.flush()
        return doc

    async def delete(self, doc: Doctor) -> None:
        await self.db.delete(doc)
        await self.db.flush()


class BannerRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_all_active(self) -> list[Banner]:
        stmt = (
            select(Banner)
            .where(Banner.is_active == True)  # noqa: E712
            .order_by(Banner.sort_order)
        )
        return list((await self.db.execute(stmt)).scalars().all())

    async def list_all(self, limit: int = 50, offset: int = 0) -> tuple[list[Banner], int]:
        count = (await self.db.execute(select(func.count()).select_from(Banner))).scalar_one()
        rows = list(
            (await self.db.execute(select(Banner).order_by(Banner.sort_order).limit(limit).offset(offset))).scalars().all()
        )
        return rows, count

    async def get_by_id(self, banner_id: uuid.UUID) -> Banner | None:
        return await self.db.get(Banner, banner_id)

    async def create(self, **kwargs) -> Banner:  # noqa: ANN003
        banner = Banner(**kwargs)
        self.db.add(banner)
        await self.db.flush()
        return banner

    async def update(self, banner: Banner, **kwargs) -> Banner:  # noqa: ANN003
        for k, v in kwargs.items():
            setattr(banner, k, v)
        await self.db.flush()
        return banner

    async def delete(self, banner: Banner) -> None:
        await self.db.delete(banner)
        await self.db.flush()


class BlogPostRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_published(self, limit: int = 20, offset: int = 0) -> tuple[list[BlogPost], int]:
        count = (
            await self.db.execute(
                select(func.count()).select_from(BlogPost).where(BlogPost.is_published == True)  # noqa: E712
            )
        ).scalar_one()
        rows = list(
            (
                await self.db.execute(
                    select(BlogPost)
                    .where(BlogPost.is_published == True)  # noqa: E712
                    .order_by(BlogPost.sort_order.desc(), BlogPost.created_at.desc())
                    .limit(limit)
                    .offset(offset)
                )
            ).scalars().all()
        )
        return rows, count

    async def get_by_slug(self, slug: str) -> BlogPost | None:
        stmt = select(BlogPost).where(BlogPost.slug == slug)
        return (await self.db.execute(stmt)).scalars().first()

    async def list_all(self, limit: int = 50, offset: int = 0) -> tuple[list[BlogPost], int]:
        count = (await self.db.execute(select(func.count()).select_from(BlogPost))).scalar_one()
        rows = list(
            (await self.db.execute(
                select(BlogPost).order_by(BlogPost.created_at.desc()).limit(limit).offset(offset)
            )).scalars().all()
        )
        return rows, count

    async def get_by_id(self, post_id: uuid.UUID) -> BlogPost | None:
        return await self.db.get(BlogPost, post_id)

    async def create(self, **kwargs) -> BlogPost:  # noqa: ANN003
        post = BlogPost(**kwargs)
        self.db.add(post)
        await self.db.flush()
        return post

    async def update(self, post: BlogPost, **kwargs) -> BlogPost:  # noqa: ANN003
        for k, v in kwargs.items():
            setattr(post, k, v)
        await self.db.flush()
        return post

    async def delete(self, post: BlogPost) -> None:
        await self.db.delete(post)
        await self.db.flush()


class FAQRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_all_active(self, category: str | None = None) -> list[FAQ]:
        stmt = select(FAQ).where(FAQ.is_active == True).order_by(FAQ.sort_order)  # noqa: E712
        if category:
            stmt = stmt.where(FAQ.category == category)
        return list((await self.db.execute(stmt)).scalars().all())

    async def list_all(self, limit: int = 100, offset: int = 0) -> tuple[list[FAQ], int]:
        count = (await self.db.execute(select(func.count()).select_from(FAQ))).scalar_one()
        rows = list(
            (await self.db.execute(select(FAQ).order_by(FAQ.sort_order).limit(limit).offset(offset))).scalars().all()
        )
        return rows, count

    async def get_by_id(self, faq_id: uuid.UUID) -> FAQ | None:
        return await self.db.get(FAQ, faq_id)

    async def create(self, **kwargs) -> FAQ:  # noqa: ANN003
        faq = FAQ(**kwargs)
        self.db.add(faq)
        await self.db.flush()
        return faq

    async def update(self, faq: FAQ, **kwargs) -> FAQ:  # noqa: ANN003
        for k, v in kwargs.items():
            setattr(faq, k, v)
        await self.db.flush()
        return faq

    async def delete(self, faq: FAQ) -> None:
        await self.db.delete(faq)
        await self.db.flush()

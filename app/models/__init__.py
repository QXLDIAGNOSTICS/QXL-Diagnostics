"""ORM models. Import all models here so Alembic can discover them."""
from app.db.base import Base
from app.models.booking import Booking
from app.models.catalog import Center, HealthPackage, TestCatalog
from app.models.content import FAQ, Banner, BlogPost, Doctor
from app.models.conversation import Conversation, Message
from app.models.doc_chunk import DocChunk
from app.models.file import FileRecord
from app.models.lead import CollaborationLead, ContactInquiry
from app.models.login_challenge import LoginChallenge
from app.models.notification import BookingNotification
from app.models.payment import Payment
from app.models.prescription import Prescription
from app.models.role import CustomRole
from app.models.session import Session
from app.models.user import User

__all__ = [
    "Base",
    "User",
    "FileRecord",
    "Conversation",
    "Message",
    "DocChunk",
    "Session",
    "LoginChallenge",
    "Payment",
    "BookingNotification",
    "CustomRole",
    "Center",
    "HealthPackage",
    "TestCatalog",
    "Booking",
    "Prescription",
    "CollaborationLead",
    "ContactInquiry",
    "Doctor",
    "Banner",
    "BlogPost",
    "FAQ",
]

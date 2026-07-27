"""Fine-grained admin-panel feature permissions.

These are separate from the coarse ``tier`` (staff/admin) that backend route
guards use for real security boundaries. Permissions are what the
super-admin-managed Roles screen toggles per role, and the admin frontend
uses them purely to decide which nav items / buttons a role can see.
"""
from __future__ import annotations

PERMISSION_CATALOG: list[dict[str, str]] = [
    {"key": "appointments.view", "label": "View appointments & dashboard", "group": "Appointments"},
    {"key": "appointments.manage", "label": "Update status, check-in, edit bookings", "group": "Appointments"},
    {"key": "appointments.delete", "label": "Delete appointments", "group": "Appointments"},
    {"key": "appointments.export", "label": "Export appointments (CSV)", "group": "Appointments"},
    {"key": "appointments.notify", "label": "Send SMS / email to patients", "group": "Appointments"},
    {"key": "patients.view", "label": "View patient directory", "group": "Patients"},
    {"key": "home_collection.manage", "label": "Manage home collection requests", "group": "Operations"},
    {"key": "enquiries.manage", "label": "Manage enquiries & leads", "group": "Operations"},
    {"key": "website.manage", "label": "Manage website content (pages, banners, doctors, tests, packages…)", "group": "Website"},
    {"key": "seo.manage", "label": "SEO settings", "group": "Website"},
    {"key": "knowledge_base.manage", "label": "Chatbot knowledge base", "group": "Website"},
    {"key": "marketing.manage", "label": "Marketing campaigns & offers", "group": "Marketing"},
    {"key": "reports.view", "label": "View reports", "group": "Insights"},
    {"key": "analytics.view", "label": "View analytics", "group": "Insights"},
    {"key": "users.manage", "label": "Manage staff user accounts", "group": "Administration"},
    {"key": "roles.manage", "label": "Manage roles & permissions", "group": "Administration"},
    {"key": "settings.manage", "label": "System preferences", "group": "Administration"},
]

PERMISSION_KEYS: frozenset[str] = frozenset(p["key"] for p in PERMISSION_CATALOG)

# Referenced directly by app.services.staff_assignment_service to decide who
# is eligible for booking auto-assignment.
PERMISSION_APPOINTMENTS_MANAGE = "appointments.manage"

# Default permission sets seeded for built-in roles (kept in sync with the
# legacy static behaviour in ``app.core.roles`` at the time custom roles
# shipped).
FRONT_DESK_DEFAULT_PERMISSIONS: list[str] = [
    "appointments.view",
    "appointments.manage",
    "appointments.notify",
    "patients.view",
    "home_collection.manage",
    "enquiries.manage",
]

ADMIN_DEFAULT_PERMISSIONS: list[str] = [
    "appointments.view",
    "appointments.manage",
    "appointments.delete",
    "appointments.export",
    "appointments.notify",
    "patients.view",
    "home_collection.manage",
    "enquiries.manage",
    "website.manage",
    "seo.manage",
    "knowledge_base.manage",
    "marketing.manage",
    "reports.view",
    "analytics.view",
    "users.manage",
    "settings.manage",
]

SUPER_ADMIN_DEFAULT_PERMISSIONS: list[str] = [*ADMIN_DEFAULT_PERMISSIONS, "roles.manage"]

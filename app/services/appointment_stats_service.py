"""Appointment dashboard + live front-desk stats.

Dates are compared against ``preferred_date`` (the visit date the patient
actually booked, an ISO ``YYYY-MM-DD`` string) using Asia/Kolkata "today" so
the numbers match what front-desk staff expect to see, regardless of the
server's own timezone.
"""
from __future__ import annotations

from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.booking_repository import BookingRepository

_IST = ZoneInfo("Asia/Kolkata")


def _today_ist() -> datetime:
    return datetime.now(_IST)


async def get_dashboard_stats(db: AsyncSession) -> dict:
    repo = BookingRepository(db)
    now = _today_ist()
    today = now.date()
    yesterday = today - timedelta(days=1)
    tomorrow = today + timedelta(days=1)
    week_start = today - timedelta(days=today.weekday())
    month_start = today.replace(day=1)

    today_s, yesterday_s, tomorrow_s = today.isoformat(), yesterday.isoformat(), tomorrow.isoformat()

    per_patient = await repo.bookings_per_patient()
    total_patients = len(per_patient)
    new_patients = sum(1 for c in per_patient.values() if c == 1)
    returning_patients = total_patients - new_patients

    since_24h = now.astimezone(ZoneInfo("UTC")) - timedelta(hours=24)

    dashboard = {
        "total_appointments": await repo.total_count(),
        "today_appointments": await repo.count_preferred_date(today_s),
        "yesterday_appointments": await repo.count_preferred_date(yesterday_s),
        "tomorrow_appointments": await repo.count_preferred_date(tomorrow_s),
        "this_week_appointments": await repo.count_preferred_date_between(week_start.isoformat(), today_s),
        "this_month_appointments": await repo.count_preferred_date_between(month_start.isoformat(), today_s),
        "total_patients": total_patients,
        "new_patients": new_patients,
        "returning_patients": returning_patients,
        "pending_appointments": await repo.count_where(status="pending"),
        "confirmed_appointments": await repo.count_where(status="confirmed"),
        "checked_in_patients": await repo.count_where(status="checked_in"),
        "completed_appointments": await repo.count_where(status="completed"),
        "cancelled_appointments": await repo.count_where(status="cancelled"),
        "no_show_appointments": await repo.count_where(status="no_show"),
        "rescheduled_appointments": await repo.count_where(was_rescheduled=True),
        "walk_in_patients": await repo.count_where(visit_type="walk_in"),
        "emergency_patients": await repo.count_where(visit_type="emergency"),
        "revenue_paid_paise": await repo.sum_paid_amount_paise(),
        "revenue_today_paise": await repo.sum_paid_amount_paise_for_preferred_date(today_s),
        "outstanding_paise": await repo.sum_unpaid_amount_paise(),
        "paid_bookings": await repo.count_paid(),
        "status_counts": await repo.status_counts(),
    }

    today_count = await repo.distinct_patient_count_for_date(today_s)
    yesterday_count = await repo.distinct_patient_count_for_date(yesterday_s)
    change_percent = (
        round(((today_count - yesterday_count) / yesterday_count) * 100, 1) if yesterday_count else None
    )

    live = {
        "currently_waiting": await repo.count_where(status="checked_in"),
        "with_doctor": await repo.count_where(status="in_progress"),
        "avg_waiting_minutes": await repo.avg_minutes_between("checked_in_at", "in_progress_at", since=since_24h),
        "avg_consultation_minutes": await repo.avg_minutes_between(
            "in_progress_at", "completed_at", since=since_24h
        ),
        "today_patient_count": today_count,
        "yesterday_patient_count": yesterday_count,
        "change_percent": change_percent,
        "upcoming_today": await repo.upcoming_today_count(today_s),
    }

    return {"dashboard": dashboard, "live": live}

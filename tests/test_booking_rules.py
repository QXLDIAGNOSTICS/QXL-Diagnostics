"""Pure-logic tests for booking slot parsing, catalog matching, the
home-collection fee, SMS template limits and stale scheduled reminders."""
from __future__ import annotations

from datetime import date, time, timedelta
from types import SimpleNamespace

import pytest

from app.services import booking_service as bs
from app.services.booking_notification_service import _stale_reason
from app.services.notification_service import _gsm_safe
from app.services.notification_templates import build_default
from app.services.payment_service import home_collection_fee_paise


@pytest.mark.parametrize(
    ("raw", "expected"),
    [
        ("2026-11-02", date(2026, 11, 2)),
        ("02-11-2026", date(2026, 11, 2)),
        ("2026-11-02T00:00:00.000Z", date(2026, 11, 2)),
        ("Mon, 2 Nov 2026", date(2026, 11, 2)),
        ("2nd Nov 2026", date(2026, 11, 2)),
        ("garbage", None),
        ("", None),
    ],
)
def test_normalize_date(raw, expected):
    assert bs._normalize_date(raw) == expected


def test_normalize_date_relative_and_yearless():
    today = bs.datetime.now(bs._IST).date()
    assert bs._normalize_date("Today") == today
    assert bs._normalize_date("tomorrow") == today + timedelta(days=1)
    # A day/month that's long past this year means next year's.
    long_ago = today - timedelta(days=200)
    parsed = bs._normalize_date(long_ago.strftime("%d %b"))
    assert parsed is not None and parsed > today


@pytest.mark.parametrize(
    ("raw", "label", "start", "end"),
    [
        ("6:30 AM", "6:30 AM", time(6, 30), None),
        ("06:30 am", "6:30 AM", time(6, 30), None),
        ("14:30", "2:30 PM", time(14, 30), None),
        ("6:00 – 8:00 AM", "6:00 AM - 8:00 AM", time(6), time(8)),
        ("07:00 AM - 10:00 AM", "7:00 AM - 10:00 AM", time(7), time(10)),
        ("10:00 – 12:00 PM", "10:00 AM - 12:00 PM", time(10), time(12)),
        ("11:00 – 1:00 PM", "11:00 AM - 1:00 PM", time(11), time(13)),
    ],
)
def test_normalize_time(raw, label, start, end):
    assert bs._normalize_time(raw) == (label, start, end, False)


def test_normalize_time_urgent_and_invalid():
    label, start, end, urgent = bs._normalize_time("Next 60 Minutes (Urgent)")
    assert urgent and start is None and len(label) <= 20
    assert bs._normalize_time("noon") is None
    assert bs._normalize_time("25:00") is None


def _items(*names):
    return [SimpleNamespace(name=n) for n in names]


def test_catalog_match_exact_then_contained():
    items = _items("COMPLETE BLOOD COUNT (CBC)", "Liver Function Test Panel", "Vitamin B12")
    def match(query, catalog=items):
        return bs._best_catalog_match(query, catalog, name_getter=lambda i: i.name)

    assert match("Complete Blood Count (CBC)").name == "COMPLETE BLOOD COUNT (CBC)"
    assert match("CBC").name == "COMPLETE BLOOD COUNT (CBC)"
    assert match("Q-Arthritis & Autoimmune", _items("Q-Arthritis and Autoimmune"))


@pytest.mark.parametrize(
    ("query", "catalog"),
    [
        ("Kidney Function Test Panel", "Liver Function Test Panel"),
        ("Cancer Antigen 19-9", "Cancer Antigen 125"),
        ("NT-proBNP (N-Terminal pro-B-type Natriuretic Peptide)", "C-Peptide"),
        ("Apolipoprotein A-1 (Apo A-1)", "Lipoprotein(a)"),
        ("Vitamin D", "Vitamin B12"),
    ],
)
def test_catalog_match_never_conflates_distinct_tests(query, catalog):
    assert bs._best_catalog_match(query, _items(catalog), name_getter=lambda i: i.name) is None


def _booking(**kw):
    defaults = dict(
        collection_type="home",
        payment_status="unpaid",
        status="pending",
        patient_name="Priya Sharma",
        test_name="Complete Blood Count (CBC)",
        amount_paise=39500,
        preferred_date="2026-11-02",
        preferred_time="10:00 AM - 12:00 PM",
    )
    return SimpleNamespace(**{**defaults, **kw})


def test_home_collection_fee_rule():
    assert home_collection_fee_paise([_booking()], 39500) == 15000
    assert home_collection_fee_paise([_booking()], 49900) == 0
    assert home_collection_fee_paise([_booking(collection_type="center")], 39500) == 0


def test_sms_variables_fit_dlt_limit_and_gsm():
    _, message = build_default(
        "booking_received",
        _booking(test_name="Q-Hypertension and Cardiovascular Risk Assessment Package"),
    )
    assert "02 Nov at 10:00 AM - 12:00 PM" in message
    assert "Q-Hypertension and Cardiova..." in message  # exactly 30 chars
    assert _gsm_safe("6:00 – 8:00 AM ₹395") == "6:00 - 8:00 AM Rs.395"


def test_stale_scheduled_reminders_are_skipped():
    reminder = SimpleNamespace(type="payment_reminder")
    assert _stale_reason(reminder, _booking(payment_status="paid"))
    assert _stale_reason(reminder, _booking(status="cancelled"))
    assert _stale_reason(reminder, _booking()) is None
    assert _stale_reason(SimpleNamespace(type="reminder"), _booking(status="completed"))
    confirmation = SimpleNamespace(type="confirmation")
    assert _stale_reason(confirmation, _booking(payment_status="paid")) is None

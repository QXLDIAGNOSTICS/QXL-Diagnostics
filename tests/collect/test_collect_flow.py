"""End-to-end QXL Collect acceptance flow against a real PostgreSQL database.

Run only when explicitly enabled (it writes data):

    QXL_COLLECT_DB_TESTS=1 DATABASE_URL=postgresql+asyncpg://... \\
    LOCAL_STORAGE_DIR=/tmp/qxl-files BOOKING_SLOTS="8:00 AM - 10:00 AM,4:00 PM - 6:00 PM" \\
    uv run pytest tests/collect

Covers the synthetic patient workflow from the QXL Collect brief plus the
negative cases: duplicate booking, wrong identity, duplicate barcode,
missing aftercare/payment, missing specimen in transport, rejected specimen
→ recollection, unauthorized report release and cross-account access.
"""
from __future__ import annotations

import os
import secrets
import uuid
from datetime import date, timedelta

import pytest
from httpx import ASGITransport, AsyncClient

pytestmark = pytest.mark.skipif(os.getenv("QXL_COLLECT_DB_TESTS") != "1", reason="needs a real database")

SLOT = "8:00 AM - 10:00 AM"


def _phone() -> str:
    return "+9198" + "".join(secrets.choice("0123456789") for _ in range(8))


async def _user(db, role: str, name: str):  # noqa: ANN001
    from app.models.user import User

    user = User(phone=_phone(), name=name, role=role, email=None)
    db.add(user)
    await db.flush()
    return user


async def _client(db, user):  # noqa: ANN001
    from app.core.config import settings
    from app.main import app
    from app.services import session_service

    token = await session_service.create_session(db, user, user_agent="pytest", ip_address="127.0.0.1")
    return AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test", cookies={settings.SESSION_COOKIE_NAME: token}
    )


@pytest.fixture
async def world():
    from app.db.session import AsyncSessionLocal
    from app.models.catalog import Center, TestCatalog
    from app.models.collect import CollectorProfile, ServiceArea
    from app.services.collect.common import today_ist

    zone = f"z{secrets.token_hex(3)}"
    pincode = f"5{secrets.randbelow(10**5):05d}"
    async with AsyncSessionLocal() as db:
        patient = await _user(db, "patient", "Asha Rao")
        stranger = await _user(db, "patient", "Other Person")
        collector = await _user(db, "collector", "Ravi Kumar")
        courier = await _user(db, "courier", "Suresh Courier")
        dispatcher = await _user(db, "dispatcher", "Dee Dispatcher")
        lab_user = await _user(db, "lab_reporting", "Lab Tech")
        all_days = [0, 1, 2, 3, 4, 5, 6]
        db.add(CollectorProfile(user_id=collector.id, employee_code=f"C{secrets.token_hex(3)}", display_name="Ravi K",
                                zone=zone, shift_start="06:00", shift_end="20:00", working_days=all_days,
                                competencies=["routine_venipuncture"], contact_phone="+919800000001", is_active=True))
        db.add(CollectorProfile(user_id=courier.id, employee_code=f"R{secrets.token_hex(3)}", display_name="Suresh",
                                zone=zone, working_days=all_days, is_active=True))
        db.add(ServiceArea(pincode=pincode, locality="Vijayanagar", zone=zone, is_active=True))
        cbc = TestCatalog(name=f"CBC {zone}", slug=f"cbc-{zone}", price=400, is_active=True,
                          home_collection_available=True, container_type="EDTA", sample_type="Whole blood")
        lipid = TestCatalog(name=f"Lipid {zone}", slug=f"lipid-{zone}", price=600, is_active=True,
                            home_collection_available=True, container_type="SST", sample_type="Serum",
                            fasting_required=True)
        centre_only = TestCatalog(name=f"Biopsy {zone}", slug=f"biopsy-{zone}", price=900, is_active=True,
                                  home_collection_available=False)
        lab = Center(name=f"Lab {zone}", slug=f"lab-{zone}", address="Kengeri", city="Bengaluru", is_active=True)
        db.add_all([cbc, lipid, centre_only, lab])
        await db.commit()
        clients = {
            "patient": await _client(db, patient),
            "stranger": await _client(db, stranger),
            "collector": await _client(db, collector),
            "courier": await _client(db, courier),
            "dispatcher": await _client(db, dispatcher),
            "lab": await _client(db, lab_user),
        }
        await db.commit()
        courier_code = (await db.get(CollectorProfile, courier.id)).employee_code
    w = {
        **clients,
        "pincode": pincode,
        "zone": zone,
        "tests": {"cbc": str(cbc.id), "lipid": str(lipid.id), "centre_only": str(centre_only.id)},
        "lab_center": str(lab.id),
        "courier_code": courier_code,
        "day": today_ist() + timedelta(days=1),
    }
    yield w
    for c in clients.values():
        await c.aclose()


async def _book(w, *, key: str, items: list[str], payment_mode: str = "pay_on_visit") -> dict:  # noqa: ANN001
    p = w["patient"]
    profiles = (await p.get("/api/v1/me/profiles")).json()
    if not profiles:
        r = await p.post("/api/v1/me/profiles", json={"full_name": "Asha Rao", "date_of_birth": "1990-05-04",
                                                       "gender": "female", "relation": "self"})
        assert r.status_code == 201, r.text
        profiles = [r.json()]
    body = {
        "profile_id": profiles[0]["id"],
        "items": [{"kind": "test", "id": w["tests"][i]} for i in items],
        "address": {"house": "12, 3rd Cross", "locality": "Vijayanagar", "pincode": w["pincode"],
                    "lat": 12.9716, "lng": 77.5300, "instructions": "Blue gate"},
        "slot_date": w["day"].isoformat(),
        "slot_label": SLOT,
        "payment_mode": payment_mode,
        "consent_accepted": True,
    }
    r = await p.post("/api/v1/home-visits", json=body, headers={"Idempotency-Key": key})
    assert r.status_code == 201, r.text
    return r.json()


async def _assign_and_arrive(w, visit_id: str) -> str:  # noqa: ANN001
    r = await w["dispatcher"].post(f"/api/v1/ops/visits/{visit_id}/auto-assign")
    assert r.status_code == 200, r.text
    jobs = (await w["collector"].get("/api/v1/collector/jobs", params={"scope": "upcoming"})).json()
    job_id = next(j["id"] for j in jobs if j["visit_reference"] == r.json()["reference"])
    c = w["collector"]
    assert (await c.post(f"/api/v1/collector/jobs/{job_id}/acknowledge")).status_code == 200
    assert (await c.post(f"/api/v1/collector/jobs/{job_id}/start", json={"lat": 12.95, "lng": 77.52})).status_code == 200
    r = await c.post(f"/api/v1/collector/jobs/{job_id}/location",
                     json={"points": [{"lat": 12.9712, "lng": 77.5302, "accuracy_m": 8}]})
    assert r.json()["accepted"] == 1
    assert (await c.post(f"/api/v1/collector/jobs/{job_id}/arrive", json={"lat": 12.9716, "lng": 77.53})).status_code == 200
    return job_id


async def test_full_home_collection_flow(world):
    w = world
    p, c = w["patient"], w["collector"]

    # Serviceability, slots, centre-only tests and booking validation.
    assert (await p.get("/api/v1/service-areas/check", params={"pincode": w["pincode"]})).json()["serviceable"]
    assert not (await p.get("/api/v1/service-areas/check", params={"pincode": "999999"})).json()["serviceable"]
    slots = (await p.get("/api/v1/home-collection/slots", params={"date": w["day"].isoformat(), "pincode": w["pincode"]})).json()
    assert any(s["label"] == SLOT and s["available"] for s in slots["slots"])

    # Booking + idempotent retry (no duplicate visit).
    key = str(uuid.uuid4())
    visit = await _book(w, key=key, items=["cbc", "lipid"])
    again = await _book(w, key=key, items=["cbc", "lipid"])
    assert again["id"] == visit["id"]
    assert len((await p.get("/api/v1/home-visits")).json()["items"]) == 1
    assert visit["status"] == "confirmed" and visit["stage"] == "awaiting_assignment"
    assert len(visit["visit_code"]) == 4
    assert visit["total_paise"] == 100_000 + visit["collection_fee_paise"]

    # Another account can't see it; patients can't dispatch.
    assert (await w["stranger"].get(f"/api/v1/home-visits/{visit['id']}")).status_code == 404
    assert (await p.post(f"/api/v1/ops/visits/{visit['id']}/auto-assign")).status_code == 403

    job_id = await _assign_and_arrive(w, visit["id"])
    track = (await p.get(f"/api/v1/home-visits/{visit['id']}/tracking")).json()
    assert track["job_status"] == "arrived"
    assert track["collector"]["name"] == "Ravi K"
    assert track["location"] is not None

    # Identity gates collection.
    r = await c.post(f"/api/v1/collector/jobs/{job_id}/specimens",
                     json={"barcode": "QXL0000A1", "container_type": "EDTA", "booking_ids": [visit["tests"][0]["booking_id"]]})
    assert r.status_code == 409
    r = await c.post(f"/api/v1/collector/jobs/{job_id}/verify-identity",
                     json={"name_confirmed": True, "stated_dob": "1991-05-04"})
    assert r.status_code == 422
    r = await c.post(f"/api/v1/collector/jobs/{job_id}/verify-identity",
                     json={"name_confirmed": True, "stated_dob": "1990-05-04", "visit_code": visit["visit_code"]})
    assert r.status_code == 200 and r.json()["identity_method"] == "name+dob+visit_code"

    # Barcodes: unique, linked to tests; replay with the same key is safe.
    b1 = f"QXL{secrets.token_hex(4).upper()}"
    b2 = f"QXL{secrets.token_hex(4).upper()}"
    spec_key = str(uuid.uuid4())
    for _ in range(2):
        r = await c.post(f"/api/v1/collector/jobs/{job_id}/specimens", headers={"Idempotency-Key": spec_key},
                         json={"barcode": b1, "container_type": "EDTA", "booking_ids": [visit["tests"][0]["booking_id"]]})
        assert r.status_code in (200, 201), r.text
    r = await c.post(f"/api/v1/collector/jobs/{job_id}/specimens",
                     json={"barcode": b1, "container_type": "SST", "booking_ids": [visit["tests"][1]["booking_id"]]})
    assert r.status_code == 409  # label already used

    # Completion guards: coverage, checklist, payment.
    checklist = {k: True for k in (await c.get(f"/api/v1/collector/jobs/{job_id}")).json()["checklist_keys"]}
    r = await c.post(f"/api/v1/collector/jobs/{job_id}/complete", json={"outcome": "collected", "checklist": checklist})
    assert r.status_code == 422 and "no specimen" in r.json()["error"]["message"]
    r = await c.post(f"/api/v1/collector/jobs/{job_id}/specimens",
                     json={"barcode": b2, "container_type": "SST", "booking_ids": [visit["tests"][1]["booking_id"]]})
    assert r.status_code == 201
    r = await c.post(f"/api/v1/collector/jobs/{job_id}/complete", json={"outcome": "collected"})
    assert r.status_code == 422  # checklist
    due = (await c.get(f"/api/v1/collector/jobs/{job_id}")).json()["amount_due_paise"]
    r = await c.post(f"/api/v1/collector/jobs/{job_id}/complete", json={"outcome": "collected", "checklist": checklist})
    assert r.status_code == 422 and "payment" in r.json()["error"]["message"]
    r = await c.post(f"/api/v1/collector/jobs/{job_id}/complete",
                     json={"outcome": "collected", "checklist": checklist,
                           "payment": {"mode": "upi", "amount_paise": due, "reference": "UPI123"}})
    assert r.status_code == 200 and r.json()["status"] == "collected"
    detail = (await p.get(f"/api/v1/home-visits/{visit['id']}")).json()
    assert detail["stage"] == "collected" and detail["payment_status"] == "paid"

    # Custody: collector → courier (scan to accept) → lab (scan to receive).
    r = await c.post("/api/v1/manifests", json={"barcodes": [b1, b2], "handover_to_code": w["courier_code"],
                                                "seal_intact": True, "container_ref": "BOX-7"})
    assert r.status_code == 201, r.text
    manifest_id = r.json()["id"]
    courier = w["courier"]
    pending = (await courier.get("/api/v1/courier/manifests")).json()
    assert any(m["id"] == manifest_id for m in pending)
    r = await courier.post(f"/api/v1/manifests/{manifest_id}/accept", json={"barcodes": [b1, b2], "seal_intact": True})
    assert r.status_code == 200 and r.json()["status"] == "in_transit"
    assert (await p.get(f"/api/v1/home-visits/{visit['id']}")).json()["stage"] == "in_transit"
    lab = w["lab"]
    r = await lab.post(f"/api/v1/lab/manifests/{manifest_id}/receive", json={"barcodes": [b1, b2], "seal_intact": True})
    assert r.status_code == 200 and r.json()["missing"] == []
    # Hold needs a standard reason, puts the tests on hold, and can then be accepted.
    r = await lab.post(f"/api/v1/lab/specimens/{b1}/decision", json={"decision": "hold"})
    assert r.status_code == 422
    r = await lab.post(f"/api/v1/lab/specimens/{b1}/decision",
                       json={"decision": "hold", "reason": "insufficient_volume", "notes": "check with pathologist"})
    assert r.status_code == 200 and r.json()["status"] == "on_hold" and not r.json()["recollection_opened"]
    held = (await lab.get(f"/api/v1/lab/specimens/{b1}")).json()
    assert held["status"] == "on_hold" and {t["lab_status"] for t in held["tests"]} == {"on_hold"}
    for b in (b1, b2):
        r = await lab.post(f"/api/v1/lab/specimens/{b}/decision", json={"decision": "accept"})
        assert r.status_code == 200 and r.json()["status"] == "accepted"
    history = (await lab.get(f"/api/v1/lab/specimens/{b1}")).json()["history"]
    assert [h["event"] for h in history][:4] == ["collected", "manifested", "custody_accepted", "lab_received"]
    assert (await lab.get(f"/api/v1/lab/specimens/{b1}")).json()["tests"][0]["lab_status"] == "in_progress"

    # Lab status + authorized report release + secure access.
    booking_ids = [t["booking_id"] for t in detail["tests"]]
    r = await lab.post(f"/api/v1/lab/bookings/{booking_ids[0]}/status", json={"lab_status": "authorized"})
    assert r.status_code == 422  # only a release can authorize
    r = await lab.post(f"/api/v1/lab/bookings/{booking_ids[0]}/status",
                       json={"lab_status": "under_review", "lis_accession": "ITD-0001"})
    assert r.status_code == 200
    pdf = b"%PDF-1.4\n% test report\n"
    r = await lab.post("/api/v1/lab/reports", data={"visit_id": visit["id"], "booking_ids": str(booking_ids).replace("'", '"'),
                                                    "title": "Haematology & lipids"},
                       files={"file": ("r.pdf", pdf, "application/pdf")})
    assert r.status_code == 201, r.text
    draft = r.json()
    assert (await lab.post(f"/api/v1/lab/reports/{draft['id']}/release")).status_code == 422  # no authorization
    assert (await p.get("/api/v1/me/reports")).json() == []  # drafts never visible
    r = await lab.post("/api/v1/lab/reports", data={"visit_id": visit["id"], "booking_ids": str(booking_ids).replace("'", '"'),
                                                    "title": "Haematology & lipids", "authorized_by_name": "Dr. Path",
                                                    "authorized_at": "2026-01-01T10:00:00+05:30"},
                       files={"file": ("r.pdf", pdf, "application/pdf")})
    report = r.json()
    r = await lab.post(f"/api/v1/lab/reports/{report['id']}/release")
    assert r.status_code == 200 and r.json()["status"] == "released"
    reports = (await p.get("/api/v1/me/reports")).json()
    assert [x["id"] for x in reports] == [report["id"]]
    assert (await w["stranger"].post(f"/api/v1/me/reports/{report['id']}/access")).status_code == 404
    access = (await p.post(f"/api/v1/me/reports/{report['id']}/access")).json()
    assert access["expires_in"] > 0
    if os.getenv("LOCAL_STORAGE_DIR"):
        token_path = access["url"].split("/api/v1", 1)[1]
        got = await p.get("/api/v1" + token_path)
        assert got.status_code == 200 and got.content == pdf
    final = (await p.get(f"/api/v1/home-visits/{visit['id']}")).json()
    assert final["stage"] == "report_ready"
    assert {t["lab_status"] for t in final["tests"]} == {"authorized"}

    # Amendment supersedes the old version; old one can no longer be opened.
    r = await lab.post("/api/v1/lab/reports", data={"visit_id": visit["id"], "booking_ids": str(booking_ids).replace("'", '"'),
                                                    "title": "Haematology & lipids", "authorized_by_name": "Dr. Path",
                                                    "authorized_at": "2026-01-02T10:00:00+05:30",
                                                    "supersedes_id": report["id"], "amendment_note": "Unit corrected"},
                       files={"file": ("r2.pdf", pdf, "application/pdf")})
    amended = r.json()
    assert amended["version"] == 2
    assert (await lab.post(f"/api/v1/lab/reports/{amended['id']}/release")).status_code == 200
    assert (await p.post(f"/api/v1/me/reports/{report['id']}/access")).status_code == 409
    assert (await p.post(f"/api/v1/me/reports/{amended['id']}/access")).status_code == 200

    # Revoke: needs a reason, only lab reporting can do it, and the patient loses access at once.
    assert (await p.post(f"/api/v1/lab/reports/{amended['id']}/revoke", json={"reason": "x"})).status_code == 403
    assert (await lab.post(f"/api/v1/lab/reports/{amended['id']}/revoke", json={})).status_code == 422
    r = await lab.post(f"/api/v1/lab/reports/{amended['id']}/revoke", json={"reason": "Released to the wrong visit"})
    assert r.status_code == 200 and r.json()["status"] == "revoked"
    assert (await p.post(f"/api/v1/me/reports/{amended['id']}/access")).status_code in (404, 409)
    assert all(x["id"] != amended["id"] for x in (await p.get("/api/v1/me/reports")).json())
    # A revoked report can't be released again.
    assert (await lab.post(f"/api/v1/lab/reports/{amended['id']}/release")).status_code == 409

    inbox = (await p.get("/api/v1/me/inbox")).json()
    kinds = {i["kind"] for i in inbox["items"]}
    assert {"visit_booked", "collector_assigned", "collector_on_the_way", "collector_arrived", "sample_collected",
            "report_ready"} <= kinds


async def test_rejection_missing_sample_and_guards(world):
    w = world
    p, c = w["patient"], w["collector"]

    # Centre-only tests can't be booked for home collection.
    profiles = (await p.get("/api/v1/me/profiles")).json()
    if not profiles:
        await p.post("/api/v1/me/profiles", json={"full_name": "Asha Rao", "date_of_birth": "1990-05-04"})
    visit = await _book(w, key=str(uuid.uuid4()), items=["cbc"])
    bad = await p.post("/api/v1/home-visits", headers={"Idempotency-Key": str(uuid.uuid4())}, json={
        "profile_id": visit["patient"]["profile_id"], "items": [{"kind": "test", "id": w["tests"]["centre_only"]}],
        "address": {"house": "1", "locality": "Vijayanagar", "pincode": w["pincode"]}, "slot_date": w["day"].isoformat(),
        "slot_label": SLOT, "payment_mode": "pay_on_visit", "consent_accepted": True})
    assert bad.status_code == 422

    # Patient self-service reschedule before the collector leaves; not after.
    r = await p.post(f"/api/v1/home-visits/{visit['id']}/reschedule",
                     json={"slot_date": w["day"].isoformat(), "slot_label": "4:00 PM - 6:00 PM"})
    assert r.status_code == 200 and r.json()["slot_label"] == "4:00 PM - 6:00 PM"
    job_id = await _assign_and_arrive(w, visit["id"])
    assert (await p.post(f"/api/v1/home-visits/{visit['id']}/cancel", json={"reason": "x"})).status_code == 409

    await c.post(f"/api/v1/collector/jobs/{job_id}/verify-identity", json={"name_confirmed": True, "stated_dob": "1990-05-04"})
    b1 = f"QXL{secrets.token_hex(4).upper()}"
    await c.post(f"/api/v1/collector/jobs/{job_id}/specimens",
                 json={"barcode": b1, "container_type": "EDTA", "booking_ids": [visit["tests"][0]["booking_id"]]})
    checklist = {k: True for k in (await c.get(f"/api/v1/collector/jobs/{job_id}")).json()["checklist_keys"]}
    due = (await c.get(f"/api/v1/collector/jobs/{job_id}")).json()["amount_due_paise"]
    r = await c.post(f"/api/v1/collector/jobs/{job_id}/complete",
                     json={"outcome": "collected", "checklist": checklist, "payment": {"mode": "cash", "amount_paise": due}})
    assert r.status_code == 200

    # Direct-to-lab manifest; lab scans nothing → specimen flagged missing.
    r = await c.post("/api/v1/manifests", json={"barcodes": [b1], "destination_center_id": w["lab_center"]})
    manifest_id = r.json()["id"]
    r = await w["lab"].post(f"/api/v1/lab/manifests/{manifest_id}/receive", json={"barcodes": []})
    assert r.json()["missing"] == [b1]
    alerts = (await w["dispatcher"].get("/api/v1/ops/alerts")).json()
    assert any(a.get("barcode") == b1 and a["type"] == "specimen_missing" for a in alerts)

    # A found specimen can be received individually after review — but a
    # missing one must be reviewed first, so receive is refused.
    assert (await w["lab"].post(f"/api/v1/lab/specimens/{b1}/receive")).status_code == 409

    # Second visit: receive then reject → recollection job + patient notice.
    v2 = await _book(w, key=str(uuid.uuid4()), items=["cbc"])
    j2 = await _assign_and_arrive(w, v2["id"])
    await c.post(f"/api/v1/collector/jobs/{j2}/verify-identity", json={"name_confirmed": True, "stated_dob": "1990-05-04"})
    b2 = f"QXL{secrets.token_hex(4).upper()}"
    await c.post(f"/api/v1/collector/jobs/{j2}/specimens",
                 json={"barcode": b2, "container_type": "EDTA", "booking_ids": [v2["tests"][0]["booking_id"]]})
    due = (await c.get(f"/api/v1/collector/jobs/{j2}")).json()["amount_due_paise"]
    await c.post(f"/api/v1/collector/jobs/{j2}/complete",
                 json={"outcome": "collected", "checklist": checklist, "payment": {"mode": "cash", "amount_paise": due}})
    await w["lab"].post(f"/api/v1/lab/specimens/{b2}/receive")
    r = await w["lab"].post(f"/api/v1/lab/specimens/{b2}/decision", json={"decision": "reject", "reason": "hemolyzed"})
    assert r.status_code == 200 and r.json()["recollection_opened"]
    detail = (await w["dispatcher"].get(f"/api/v1/ops/visits/{v2['id']}")).json()
    assert detail["job"]["kind"] == "recollection" and detail["job"]["status"] == "unassigned"
    inbox = (await p.get("/api/v1/me/inbox")).json()
    assert any(i["kind"] == "recollection_required" for i in inbox["items"])

    metrics = (await w["dispatcher"].get("/api/v1/ops/metrics",
                                         params={"from": date.today().isoformat(), "to": (w["day"]).isoformat()})).json()
    assert metrics["lab"]["specimens_by_status"].get("rejected", 0) >= 1

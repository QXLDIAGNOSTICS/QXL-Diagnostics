"""Seed the domain catalog/content tables from the data already hardcoded in the
frontend (cmsStore.ts / centers/page.tsx), so the new backend-driven pages have
real production data instead of an empty database.

Usage (from qxl-backend/):
    uv run python scripts/seed_data.py

Safe to re-run: skips any table that already has rows.
"""
from __future__ import annotations

import asyncio
import json

from sqlalchemy import func, select

from app.db.session import AsyncSessionLocal
from app.models.catalog import Center, HealthPackage, TestCatalog
from app.models.content import FAQ, Banner, Doctor
from app.services.catalog_service import slugify

CENTERS = [
    {"name": "Kengeri – QXL Diagnostics Super Speciality Reference Laboratory (NABL Accredited)", "address": "Kengeri, Bengaluru", "city": "Bengaluru", "phone": "+91 99646 39639", "hours": "Open 24x7", "lat": 12.9175, "lng": 77.4836, "is_nabl": True},
    {"name": "Nayandahalli (Mysuru Road) – Spandana Hospital, Powered by QXL Diagnostics", "address": "Nayandahalli (Mysuru Road), Bengaluru", "city": "Bengaluru", "phone": "+91 99646 39639", "hours": "Open 24x7", "lat": 12.9469, "lng": 77.5255},
    {"name": "Nagarabhavi – Astrio Multispeciality Hospital, Powered by QXL Diagnostics", "address": "Nagarabhavi, Bengaluru", "city": "Bengaluru", "phone": "+91 99646 39639", "hours": "Open 24x7", "lat": 12.9669, "lng": 77.5110},
    {"name": "Chandra Layout – Nandi Diagnostics, Powered by QXL Diagnostics", "address": "Chandra Layout, Bengaluru", "city": "Bengaluru", "phone": "+91 99646 39639", "hours": "Mon - Sat: 7:00 AM - 9:00 PM", "lat": 12.9602, "lng": 77.5246},
    {"name": "Yelahanka Old Town – Shushrusha Hospital, Powered by QXL Diagnostics", "address": "Yelahanka Old Town, Bengaluru", "city": "Bengaluru", "phone": "+91 99646 39639", "hours": "Open 24x7", "lat": 13.0970, "lng": 77.5954},
    {"name": "Yelahanka (Galleria Mall) – North City Specialities Powered by QXL Diagnostics (NABL Accredited)", "address": "Yelahanka (Galleria Mall), Bengaluru", "city": "Bengaluru", "phone": "+91 99646 39639", "hours": "Mon - Sat: 7:00 AM - 9:00 PM", "lat": 13.1007, "lng": 77.5963, "is_nabl": True},
    {"name": "Sanjaynagar – Nisarga Diagnostics, Powered by QXL Diagnostics", "address": "Sanjaynagar, Bengaluru", "city": "Bengaluru", "phone": "+91 99646 39639", "hours": "Mon - Sat: 7:00 AM - 9:00 PM", "lat": 13.0333, "lng": 77.5794},
    {"name": "Vidyaranyapura – Dr. Abhi Kollur's Clinic, Powered by QXL Diagnostics", "address": "Vidyaranyapura, Bengaluru", "city": "Bengaluru", "phone": "+91 99646 39639", "hours": "Mon - Sat: 7:00 AM - 9:00 PM", "lat": 13.0805, "lng": 77.5562},
]

PACKAGES = [
    {"name": "Quick Fit Package", "price": 1770, "old_price": 4696, "save_amount": 2926, "includes": "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Liver Function Tests, Kidney Function Tests (Creatinine, Urea, BUN, Uric Acid), TSH, Vitamin D, CBC, ESR, Urine Routine & Microscopy.", "parameters": "13+ Parameters", "tag": "QUICK", "benefits": ["Quick overall health snapshot", "Check basic organ functions", "Assess immunity & vitamins"], "who_should_take": "Working professionals with limited time wanting a quick basic checkup.", "age_group": "18+ Years", "gender": "Male / Female", "doctor_recommended": True},
    {"name": "Q-Screen Diabetes Package", "price": 1900, "old_price": 4960, "save_amount": 3060, "includes": "FBS, HbA1c, eAG, Urine Microalbumin, Protein/Creatinine Ratio, C-Peptide, Lipid Profile, Liver Function Test, Kidney Function Test (Creatinine, Urea, BUN, Sodium, Potassium, Chloride), TSH, CBC, ESR, Urine Routine & Microscopy.", "parameters": "15+ Parameters", "tag": "DIABETES", "benefits": ["Early diabetes detection", "Monitor blood sugar control", "Assess kidney impact from diabetes"], "who_should_take": "Diabetics, pre-diabetics, or those with a family history of diabetes.", "age_group": "25+ Years", "gender": "Male / Female", "doctor_recommended": True},
    {"name": "Q-Master Health Pro Package", "price": 4600, "old_price": 9600, "save_amount": 5000, "includes": "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Apo A-1, Apo-B, Apo B/A1 Ratio, Liver Function Tests, Kidney Screen (Creatinine, Urea, BUN, Uric Acid, Sodium, Potassium, Chloride), Thyroid Function Tests (T3, T4, TSH), Vitamin D, Vitamin B12, CBC, ESR, Urine Routine & Microscopy, Gastritis Screen (H. pylori IgG Antibodies), hs-CRP.", "parameters": "25+ Parameters", "tag": "PRO", "benefits": ["Complete systemic evaluation", "Heart risk assessment", "Extensive vitamin & thyroid checks"], "who_should_take": "Adults seeking a comprehensive annual full-body screening.", "age_group": "30+ Years", "gender": "Male / Female", "doctor_recommended": True},
    {"name": "Q-Oncoscreen Package", "price": 7900, "old_price": 13600, "save_amount": 5700, "includes": "Cancer Markers (Alpha Fetoprotein AFP, Carcinoembryonic Antigen (CEA), Beta HCG, Prostate-Specific Antigen (PSA) - Male, CA-125 (Ovarian Cancer Marker) - Female, CA-19.9 (Pancreatic Cancer Marker)), CBC, ESR, Urine Routine & Microscopy, Calprotectin in Stool, Fecal Occult Blood Test (FOBT), Protein Electrophoresis.", "parameters": "15+ Parameters", "tag": "ONCOSCREEN", "benefits": ["Early detection of tumor markers", "Screening for major cancers", "Assess gastrointestinal health"], "who_should_take": "Individuals with a family history of cancer or those advised by an oncologist.", "age_group": "40+ Years", "gender": "Male / Female", "doctor_recommended": True},
    {"name": "Q-Advanced Arthritis and Autoimmune Panel", "price": 6900, "old_price": 12660, "save_amount": 5760, "includes": "FBS, HbA1c, eAG, Lipid Profile, hs-CRP, Liver Function Tests, Kidney Function Tests, Thyroid Screen (T3, T4, TSH), Iron Studies (Iron, TIBC, Transferrin), Bone Health (Calcium, Phosphorus), Vitamin B12, Vitamin D, Autoimmune Tests (RF, Anti-CCP, ANA), DHEA-S, Cortisol, CBC, ESR, Urine Routine & Microscopy.", "parameters": "20+ Parameters", "tag": "ARTHRITIS", "benefits": ["Diagnose joint pain causes", "Assess autoimmune markers", "Comprehensive bone health check"], "who_should_take": "Individuals experiencing joint pain, stiffness, or suspected autoimmune conditions.", "age_group": "35+ Years", "gender": "Male / Female", "doctor_recommended": True},
    {"name": "Q-Hypertension and Cardiovascular Risk Assessment Package", "price": 9000, "old_price": 18900, "save_amount": 9900, "includes": "CBC, Lipid Profile, Kidney Screen (BUN, Urea, Creatinine, Sodium, Potassium, Chloride), Urine Routine & Microscopy, FBS, Apo A1, Apo B, Apo B/A1 Ratio, hs-CRP, Lipoprotein(a), Fibrinogen, Homocysteine, NT-proBNP, Insulin, C-Peptide, Thyroid Screen (T3, T4, TSH), Cortisol Level, Serum Magnesium.", "parameters": "22+ Parameters", "tag": "CARDIAC", "benefits": ["In-depth heart risk assessment", "Detect hidden cardiovascular threats", "Advanced lipid and stress markers"], "who_should_take": "Individuals with high blood pressure, family history of heart disease, or high stress levels.", "age_group": "40+ Years", "gender": "Male / Female", "doctor_recommended": True},
]

TESTS = [
    {"name": "BILE ACIDS - SERUM", "price": 2500, "parameters_hint": "Single Parameter"},
    {"name": "COMPLETE BLOOD COUNT (CBC)", "price": 395, "parameters_hint": "24 Parameters"},
    {"name": "HBA1C, GLYCATED HEMOGLOBIN", "price": 610, "parameters_hint": "Single Parameter"},
    {"name": "LIPID PROFILE", "price": 800, "parameters_hint": "9 Parameters"},
    {"name": "LIVER FUNCTION TEST (LFT)", "price": 800, "parameters_hint": "11 Parameters"},
    {"name": "SEX HORMONE BINDING GLOBULIN (SHBG)", "price": 2900, "parameters_hint": "Single Parameter"},
]

DOCTORS = [
    {"name": "Dr. Shantakumar Muruda", "qualification": "MD, BIOCHEMISTRY", "image_url": "/image/dr_shantakumar_v4.jpg"},
    {"name": "Dr. Pritilata Rout", "qualification": "MD, PATHOLOGY", "image_url": "/image/dr_pritilata_v4.jpg"},
    {"name": "Dr. Ajitha Pillai", "qualification": "MD, MICROBIOLOGY", "image_url": "/image/dr_ajitha_latest.jpg"},
    {"name": "Dr. Naveen Kumar N", "qualification": "DCP, DNB PATHOLOGY", "image_url": "/image/dr_naveen_latest.jpg"},
]

FAQS = [
    {"question": "How do I book a home collection?", "answer": "Simply fill out our Home Collection form, message us on WhatsApp (+91 9964 639639), or select a health package and complete the check-out."},
    {"question": "How long does it take to receive reports?", "answer": "Most routine report cards (like blood sugar, lipid profiles, and CBC) are delivered via email and WhatsApp within 6 to 12 hours."},
]

BANNERS = [
    {"title": "Food Intolerance", "badge": "NEW", "image_url": "/image/food_intolerance_banner.jpg", "bg_from": "#06558f", "bg_to": "#128bc7", "image_fit": "contain", "image_only": True},
    {"title": "Collaborate with us", "badge": "NEW", "image_url": "/image/franchise_banner.png", "bg_from": "#ffffff", "bg_to": "#ffffff", "image_fit": "contain", "image_only": True},
    {
        "title": "AI-Powered Super Speciality",
        "title_accent": "Diagnostics Labs in Bengaluru",
        "badge": "LEADER IN DIAGNOSTICS",
        "subtitle": "Advanced pathology, microbiology, immunology, molecular diagnostics, histopathology and precision testing",
        "subtitle_accent": "with expert-reviewed reports and home sample collection across Bengaluru.",
        "description": "Supported by state-of-the-art technology and a highly skilled team of pathologists, microbiologists, and biochemists.",
        "cta_label": "Book Now", "cta_link": "/book",
        "cta_secondary_label": "Our Specialities", "cta_secondary_link": "/speciality-tests",
        "image_url": "/image/user_female_microscope.jpg", "image_fit": "cover",
        "bg_from": "#eff6ff", "bg_to": "#dbeafe",
        "features": ["NABL Certified", "CAP Standards", "Highly Skilled Team", "100% Accurate"],
    },
    {
        "title": "Double the Care", "title_accent": "Double the Savings",
        "badge": "FAMILY CARE",
        "subtitle": "Full Body Comprehensive Health Check-up", "subtitle_accent": "1+1 FAMILY OFFER",
        "description": "Get comprehensive insights for two people for the price of one. 86+ Parameters included.",
        "cta_label": "Book Now", "cta_link": "/book",
        "cta_secondary_label": "Learn More", "cta_secondary_link": "/packages",
        "image_url": "/image/family_clinic_consult.png", "image_fit": "cover",
        "bg_from": "#f0f9ff", "bg_to": "#e0f2fe",
        "features": ["86+ Tests", "1+1 Offer", "Save 50%", "Home Collection"],
    },
]


async def _seed_if_empty(db, model, rows_factory) -> int:
    count = (await db.execute(select(func.count()).select_from(model))).scalar_one()
    if count > 0:
        return 0
    rows = rows_factory()
    db.add_all(rows)
    await db.flush()
    return len(rows)


async def seed() -> None:
    async with AsyncSessionLocal() as db:
        n = await _seed_if_empty(db, Center, lambda: [Center(**c, sort_order=i) for i, c in enumerate(CENTERS)])
        print(f"Centers: inserted {n}")

        def _packages():
            rows = []
            for i, p in enumerate(PACKAGES):
                data = dict(p)
                benefits = data.pop("benefits")
                rows.append(
                    HealthPackage(**data, slug=slugify(p["name"]), benefits=json.dumps(benefits), sort_order=i)
                )
            return rows

        n = await _seed_if_empty(db, HealthPackage, _packages)
        print(f"Health packages: inserted {n}")

        def _tests():
            rows = []
            for t in TESTS:
                rows.append(
                    TestCatalog(
                        name=t["name"],
                        slug=slugify(t["name"]),
                        price=t["price"],
                        category="General",
                        description=t["parameters_hint"],
                    )
                )
            return rows

        n = await _seed_if_empty(db, TestCatalog, _tests)
        print(f"Tests: inserted {n}")

        n = await _seed_if_empty(db, Doctor, lambda: [Doctor(**d, sort_order=i) for i, d in enumerate(DOCTORS)])
        print(f"Doctors: inserted {n}")

        n = await _seed_if_empty(db, FAQ, lambda: [FAQ(**f, sort_order=i) for i, f in enumerate(FAQS)])
        print(f"FAQs: inserted {n}")

        def _banners():
            rows = []
            for i, b in enumerate(BANNERS):
                data = dict(b)
                features = data.pop("features", None)
                rows.append(Banner(**data, features=json.dumps(features) if features else None, sort_order=i))
            return rows

        n = await _seed_if_empty(db, Banner, _banners)
        print(f"Banners: inserted {n}")

        await db.commit()
        print("Seed complete.")


if __name__ == "__main__":
    asyncio.run(seed())

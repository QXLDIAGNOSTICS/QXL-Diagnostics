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
from app.models.content import FAQ, Banner, BlogPost, Doctor, Review
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
    {
        "name": "Dr. Shantakumar Muruda",
        "qualification": "MD, BIOCHEMISTRY",
        "specialization": "Clinical Biochemistry, Laboratory Operations & Management, Diabetology",
        "bio": "Founder & CEO of QXL Diagnostics with over two decades of experience as a Clinical Biochemist, Laboratory Director, and NABL Lead Assessor, having completed over 150 NABL assessments. PHFI-certified Diabetologist.",
        "image_url": "/image/dr_shantakumar_v4.jpg",
    },
    {
        "name": "Dr. Pritilata Rout",
        "qualification": "MD, PATHOLOGY, PDF (NEUROPATH)",
        "specialization": "Neuropathology, Cytopathology, Endocrine Pathology, Onco-Pathology",
        "bio": "Senior Consultant Histopathologist with 28+ years of experience (since 1996) and a post-doctoral fellowship in Neuropathology from NIMHANS. Provides expert diagnostic interpretation for complex histopathology, cytology, and oncology cases.",
        "image_url": "/image/dr_pritilata_v4.jpg",
    },
    {
        "name": "Dr. Ajitha Pillai",
        "qualification": "MD, MICROBIOLOGY",
        "specialization": "Clinical Microbiology, Molecular Biology, Infection & Autoimmune Serology",
        "bio": "Senior Consultant Clinical Microbiologist with extensive expertise in Microbiology, Molecular Biology, Infection Serology, Autoimmune Serology, and Infection Control across premium tertiary care hospitals in Bengaluru.",
        "image_url": "/image/dr_ajitha_latest.jpg",
    },
    {
        "name": "Dr. Naveen Kumar N",
        "qualification": "DCP, DNB PATHOLOGY",
        "specialization": "Pathology, Histopathology, Hematology, Laboratory Quality Management",
        "bio": "Consultant Pathologist and hematology specialist with 8+ years of diagnostic experience, playing a pivotal role in continuous NABL certification maintenance.",
        "image_url": "/image/dr_naveen_latest.jpg",
    },
]

FAQS = [
    {"question": "How do I book a home collection?", "answer": "Simply fill out our Home Collection form, message us on WhatsApp (+91 9964 639639), or select a health package and complete the check-out."},
    {"question": "How long does it take to receive reports?", "answer": "Most routine report cards (like blood sugar, lipid profiles, and CBC) are delivered via email and WhatsApp within 6 to 12 hours."},
]

REVIEWS = [
    {
        "author_name": "Ananth Raman",
        "rating": 5,
        "content": "QXL team was very fast. Blood collector arrived on time in the morning. Electronic reports came by evening.",
        "source": "Website",
    },
    {
        "author_name": "Preeti Sharma",
        "rating": 5,
        "content": "Best diagnostic center in Bangalore. Extremely professional setup and NABL standard test precision.",
        "source": "Google",
    },
]

# Ported from frontend cmsStore defaultBlogs — published so public /blog and
# homepage BlogSlider show content immediately; admin can edit afterward.
BLOGS = [
    {
        "title": "The Future is Now: AI-Assisted Diagnostics at QXL",
        "excerpt": "Discover how QXL Diagnostics integrates artificial intelligence to deliver faster, more accurate pathology reports.",
        "content": "Artificial Intelligence is transforming healthcare, and at QXL Diagnostics, we are at the forefront of this revolution. By integrating AI algorithms into our diagnostic workflows, our pathologists can identify cellular abnormalities with unprecedented precision.\n\nAI doesn't replace our expert doctors; it acts as a powerful second set of eyes, rapidly analyzing thousands of data points in blood smears and tissue samples to flag potential issues. This reduces human error and significantly decreases turnaround times, meaning you get your results faster without compromising on accuracy.\n\nWhether it's a routine CBC or a complex histopathology report, AI-assisted diagnostics ensure that your doctor receives the most reliable data to guide your treatment.",
        "author": "Dr. Shantakumar Muruda",
        "image_url": "/image/slide_lab_facility.png",
        "category": "Technology",
    },
    {
        "title": "Understanding AMH: Your Guide to Fertility Testing",
        "excerpt": "Anti-Mullerian Hormone (AMH) testing is crucial for understanding ovarian reserve. Learn who needs it and why.",
        "content": "Anti-Mullerian Hormone (AMH) is a protein produced by the cells inside the ovarian follicles. Measuring AMH levels in the blood is currently the most accurate way to assess a woman's ovarian reserve—essentially, the number of eggs she has remaining.\n\nUnlike other fertility hormones, AMH levels remain relatively stable throughout the menstrual cycle, meaning the test can be taken on any day. It's an invaluable tool for women planning for pregnancy, those considering IVF, or those experiencing symptoms of PCOS (where AMH is typically elevated).\n\nAt QXL Diagnostics, we use advanced CLIA technology to provide highly accurate AMH results, empowering women with the knowledge they need to make informed family planning decisions.",
        "author": "Dr. Pritilata Rout",
        "image_url": "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg",
        "category": "Women's Health",
    },
    {
        "title": "Allergy Testing: Identifying Your Hidden Triggers",
        "excerpt": "Chronic sneezing, rashes, or digestive issues? Learn how comprehensive allergy testing can pinpoint the exact cause.",
        "content": "Allergies occur when your immune system overreacts to a foreign substance, such as pollen, pet dander, or specific foods. While symptoms can range from mild sneezing to severe anaphylaxis, identifying the exact trigger is often a frustrating guessing game.\n\nQXL Diagnostics offers comprehensive allergy panels that test for hundreds of common environmental and food allergens specific to the Indian context. Using a single blood sample, we can measure specific IgE antibodies to pinpoint exactly what is causing your symptoms.\n\nArmed with an accurate allergy profile, you and your doctor can develop a targeted avoidance strategy or immunotherapy plan, finally bringing relief from chronic allergic reactions.",
        "author": "Dr. Ajitha Pillai",
        "image_url": "https://res.cloudinary.com/btjglif5/image/upload/v1784150328/Assets-QXL/legacy-assets/image/slide_immunity_test_new.jpg",
        "category": "Allergy",
    },
    {
        "title": "Beyond Cholesterol: Advanced Cardiac Risk Assessment",
        "excerpt": "A standard lipid profile isn't always enough. Learn about hs-CRP, Lp(a), and advanced markers for heart health.",
        "content": "For decades, the standard lipid profile (Total Cholesterol, LDL, HDL) has been the gold standard for assessing heart disease risk. However, up to 50% of heart attacks occur in individuals with 'normal' cholesterol levels. This is where advanced cardiac risk assessment comes in.\n\nAt QXL Diagnostics, we test for deeper risk markers such as High-Sensitivity C-Reactive Protein (hs-CRP), which measures dangerous inflammation in the arteries, and Lipoprotein(a), a genetic lipid particle highly associated with early heart disease.\n\nBy looking beyond basic cholesterol, we provide cardiologists with a comprehensive picture of your cardiovascular health, allowing for truly preventative, personalized heart care.",
        "author": "Dr. Shantakumar Muruda",
        "image_url": "https://res.cloudinary.com/btjglif5/image/upload/v1784150314/Assets-QXL/legacy-assets/image/slide_heart_health.jpg",
        "category": "Cardiology",
    },
    {
        "title": "The Science of Kidney Stones: Diagnosis and Analysis",
        "excerpt": "Kidney stones are incredibly painful, but analyzing them can prevent future occurrences. Learn about our stone analysis tests.",
        "content": "Passing a kidney stone is often described as one of the most painful experiences a person can endure. Unfortunately, if you've had one stone, you are highly likely to develop another. The key to prevention lies in understanding exactly what the stone is made of.\n\nQXL Diagnostics offers advanced Kidney Stone Analysis. If you catch a passed stone, our lab can determine its chemical composition—whether it's calcium oxalate, uric acid, struvite, or cystine.\n\nCoupled with our 24-hour urine metabolic workup and serum kidney function tests, this analysis allows your urologist to prescribe specific dietary changes and medications that effectively stop new stones from forming.",
        "author": "Dr. Naveen Kumar N",
        "image_url": "https://res.cloudinary.com/btjglif5/image/upload/v1784150333/Assets-QXL/legacy-assets/image/slide_liver_kidney.jpg",
        "category": "Nephrology",
    },
    {
        "title": "Histopathology: The Gold Standard in Cancer Diagnosis",
        "excerpt": "Take a look inside the lab to understand how pathologists examine tissue biopsies to diagnose cancer with certainty.",
        "content": "When a suspicious lump or lesion is found, imaging scans can only tell a doctor so much. The definitive diagnosis always relies on histopathology—the microscopic examination of a tissue biopsy.\n\nAt QXL Diagnostics, our highly trained histopathologists prepare tissue samples into wafer-thin slices, stain them, and meticulously examine the cellular architecture under powerful microscopes. We look for abnormal cell shapes, chaotic growth patterns, and invasion into surrounding tissues.\n\nIn cases of cancer, our histopathology reports determine the exact type and grade of the tumor, which is the most critical factor in deciding whether a patient needs surgery, chemotherapy, or radiation.",
        "author": "Dr. Pritilata Rout",
        "image_url": "/image/slide_histopathology.png",
        "category": "Oncology",
    },
    {
        "title": "Multiplex PCR: Rapid Detection of Infectious Diseases",
        "excerpt": "When every hour counts, Multiplex PCR testing identifies multiple viruses and bacteria simultaneously from a single sample.",
        "content": "In cases of severe infections like meningitis or acute respiratory distress, waiting days for traditional bacterial cultures to grow is not an option. Doctors need answers immediately to start the correct life-saving antibiotics or antivirals.\n\nQXL Diagnostics utilizes state-of-the-art Multiplex PCR technology. This molecular technique amplifies the DNA or RNA of pathogens, allowing us to test for dozens of different viruses, bacteria, and fungi simultaneously from a single sample (like blood, sputum, or CSF).\n\nWithin hours, we can accurately identify the exact organism causing the infection, revolutionizing the speed and accuracy of infectious disease treatment.",
        "author": "Dr. Ajitha Pillai",
        "image_url": "/image/slide_molecular.png",
        "category": "Infectious Disease",
    },
    {
        "title": "Demystifying the ANA Test for Autoimmune Diseases",
        "excerpt": "What does a positive ANA test mean? Learn how this crucial blood test helps diagnose Lupus, Rheumatoid Arthritis, and more.",
        "content": "Autoimmune diseases occur when your immune system mistakenly attacks your own body. Because symptoms like joint pain and fatigue are so vague, diagnosing them can be a long, frustrating process. The Antinuclear Antibody (ANA) test is usually the first step.\n\nAn ANA test detects antibodies that target the nucleus of your own cells. A positive result is a strong indicator of autoimmune conditions like Systemic Lupus Erythematosus (SLE), Sjögren's syndrome, or Scleroderma.\n\nAt QXL Diagnostics, we use advanced Immunofluorescence techniques to not only detect ANA but also determine its 'pattern', providing rheumatologists with crucial clues to pinpoint your exact autoimmune diagnosis.",
        "author": "Dr. Pritilata Rout",
        "image_url": "/image/slide_autoimmune.png",
        "category": "Autoimmune",
    },
    {
        "title": "What Makes a 'Super Speciality' Laboratory Different?",
        "excerpt": "Not all labs are created equal. Discover the technology, expertise, and quality control that define a super speciality lab.",
        "content": "You've likely seen many diagnostic centers in your neighborhood, but what exactly sets a 'Super Speciality' laboratory like QXL Diagnostics apart?\n\nThe difference lies in capabilities and expertise. While routine labs handle basic blood sugar and CBC tests, super speciality labs are equipped with high-end molecular platforms, flow cytometers, and automated immunohistochemistry stainers. We perform complex genetic, oncological, and autoimmune assays that require immense precision.\n\nFurthermore, these complex tests require interpretation by specialized doctors. Our reports are reviewed by consultant pathologists, microbiologists, and biochemists, ensuring that the data provided to your doctor is of the highest clinical standard.",
        "author": "Dr. Shantakumar Muruda",
        "image_url": "/image/slide_lab_facility.png",
        "category": "About QXL",
    },
    {
        "title": "The Importance of Expert-Reviewed Diagnostic Reports",
        "excerpt": "A machine can generate numbers, but it takes an expert pathologist to provide a clinically meaningful diagnosis.",
        "content": "In an era of automated healthcare, it is easy to assume that a blood test is simply a machine printing out numbers. However, context is everything in medicine.\n\nAt QXL Diagnostics, we mandate that all critical and specialized reports are reviewed by our panel of senior medical consultants before they reach your doctor. Our experts look for subtle discrepancies, correlate findings across different tests, and add clinical interpretation notes that guide treatment.\n\nWhen a borderline result could mean the difference between a cancer diagnosis and a benign condition, the trained eye of an expert pathologist is irreplaceable. This is our commitment to precision care.",
        "author": "Dr. Naveen Kumar N",
        "image_url": "https://res.cloudinary.com/btjglif5/image/upload/v1784150160/Assets-QXL/legacy-assets/image/dr_shantakumar_v4.jpg",
        "category": "Quality",
    },
    {
        "title": "Why AI-Driven Diagnostics in Bangalore is the New Gold Standard",
        "excerpt": "Discover how artificial intelligence is changing the diagnostic landscape in Bangalore, led by QXL Diagnostics' advanced clinical protocols.",
        "content": "Bangalore, the tech capital of India, is now leading the healthcare revolution with AI-driven diagnostics. Traditional testing methods rely heavily on manual checks, which, despite best efforts, can be subject to human fatigue. At QXL Diagnostics, we merge state-of-the-art laboratory instrumentation with AI-assisted review systems. This dual-verification model ensures that cell counting, pattern recognition in blood films, and tissue scan analyses are conducted with pixel-level precision. The integration of AI algorithms helps identify micro-anomalies that might be missed in early stages, making it the new gold standard for diagnostic care in Bengaluru.",
        "author": "Dr. Shantakumar Muruda",
        "image_url": "/image/slide_lab_facility.png",
        "category": "Technology",
    },
    {
        "title": "Choosing the Best Super Speciality Lab in Bangalore: What to Look For",
        "excerpt": "From NABL certifications to expert medical reviewers, here is why QXL Diagnostics stands out as Bangalore's premier diagnostic center.",
        "content": "With diagnostic centers on every corner, choosing the best super speciality lab in Bangalore can be challenging. Key factors to look for include NABL certification, automated analytical platforms, trained phlebotomists for home blood collection, and, most importantly, on-site expert consultant reviews. QXL Diagnostics check all these boxes. We are equipped with Beckman Coulter chemistry lines, Sysmex hematology tracks, and specialized molecular diagnostics equipment. Moreover, every critical report undergoes review by our panel of MD Pathologists and Biochemists. This ensures that you don't just get numbers, but accurate, clinically verified answers for your health.",
        "author": "Dr. Naveen Kumar N",
        "image_url": "https://res.cloudinary.com/btjglif5/image/upload/v1784150160/Assets-QXL/legacy-assets/image/dr_shantakumar_v4.jpg",
        "category": "About QXL",
    },
    {
        "title": "QXL Diagnostics: Pioneering Precision Medicine in Bangalore",
        "excerpt": "Learn how precision medicine and genomics are being made accessible to patient care in Bangalore through advanced diagnostic panels.",
        "content": "Precision medicine is transforming how we treat diseases by tailoring therapies to individual genetic profiles. At QXL Diagnostics, we are proud to be pioneering this field in Bangalore. By offering advanced genomics, oncological markers, and specialized molecular assays, we provide clinicians with the deep insights needed for personalized treatment plans. Whether it's selecting the most effective chemotherapy agent or identifying genetic risk factors for cardiovascular diseases, our lab provides the high-precision data that makes personalized care a reality.",
        "author": "Dr. Ajitha Pillai",
        "image_url": "/image/slide_molecular.png",
        "category": "Precision Medicine",
    },
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

        n = await _seed_if_empty(
            db,
            Review,
            lambda: [
                Review(**r, is_published=True, sort_order=i) for i, r in enumerate(REVIEWS)
            ],
        )
        print(f"Reviews: inserted {n}")

        def _blogs():
            rows = []
            for i, b in enumerate(BLOGS):
                rows.append(
                    BlogPost(
                        title=b["title"],
                        slug=slugify(b["title"]),
                        excerpt=b.get("excerpt"),
                        content=b.get("content"),
                        author=b.get("author"),
                        category=b.get("category"),
                        image_url=b.get("image_url"),
                        is_published=True,
                        sort_order=len(BLOGS) - i,
                    )
                )
            return rows

        n = await _seed_if_empty(db, BlogPost, _blogs)
        print(f"Blog posts: inserted {n}")

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

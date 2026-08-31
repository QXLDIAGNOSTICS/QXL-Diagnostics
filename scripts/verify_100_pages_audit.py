import re
import json

# Read cms100MasterData.ts and verify all 100 pages
with open("src/lib/seoPages/cms100MasterData.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Match json object in export
match = re.search(r'export const cms100MasterData: Record<string, DynamicPageData> = ({[\s\S]*});', text)
if not match:
    print("ERROR: Could not parse cms100MasterData.ts JSON")
    exit(1)

data_json = match.group(1)
data = json.loads(data_json)

total_tests = len(data)
print(f"--- REAL AUDIT RESULTS ---")
print(f"Total Master Tests in cms100MasterData: {total_tests}")

errors = []
warnings = []

expected_100_count = 100
if total_tests != 100:
    errors.append(f"Expected exactly 100 tests, found {total_tests}")

for i, (slug, page) in enumerate(data.items(), 1):
    # Required field checks
    if not page.get("title"): errors.append(f"[{i}] {slug}: missing title")
    if not page.get("h1Title"): errors.append(f"[{i}] {slug}: missing h1Title")
    if not page.get("metaDescription"): errors.append(f"[{i}] {slug}: missing metaDescription")
    if not page.get("price"): errors.append(f"[{i}] {slug}: missing price")
    if not page.get("sampleType"): errors.append(f"[{i}] {slug}: missing sampleType")
    if not page.get("fastingRequired"): errors.append(f"[{i}] {slug}: missing fastingRequired")
    if not page.get("turnaroundTime"): errors.append(f"[{i}] {slug}: missing turnaroundTime")
    
    # Overviews check
    overview = page.get("overview", [])
    if len(overview) < 3:
        warnings.append(f"[{i}] {slug}: overview has only {len(overview)} paragraphs (expected ≥3)")
        
    # FAQs check
    faqs = page.get("faqs", [])
    if len(faqs) < 10:
        warnings.append(f"[{i}] {slug}: has only {len(faqs)} FAQs (expected 10)")
        
    # NABL check
    if "NABL Accredited" in json.dumps(page):
        errors.append(f"[{i}] {slug}: still contains 'NABL Accredited' instead of 'NABL Certified'")

print(f"Total Errors Found: {len(errors)}")
print(f"Total Warnings Found: {len(warnings)}")

if errors:
    print("ERRORS LIST:")
    for err in errors:
        print(f"  - {err}")

if warnings:
    print("WARNINGS LIST:")
    for warn in warnings:
        print(f"  - {warn}")

if not errors and not warnings:
    print("🟢 AUDIT PASSED 100%: ZERO ERRORS, ZERO WARNINGS!")

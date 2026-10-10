import csv
import json
import re

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def process_tsv():
    tsv_path = 'scripts/raw_tsv_tests.tsv'
    master_path = 'src/lib/seoPages/cms100MasterData.ts'

    with open(master_path, 'r', encoding='utf-8') as f:
        text = f.read()

    start = text.find('{')
    end = text.rfind('}')
    master_data = json.loads(text[start:end+1])

    with open(tsv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='\t')
        rows = list(reader)

    print(f"Loaded {len(rows)} TSV test records.")

    for row in rows:
        test_id = row['test_id'].strip()
        test_name = row['test_name'].strip()
        slug = slugify(test_name)

        # Parse aliases
        aliases_raw = row.get('synonyms_aliases', '')
        aliases = []
        if aliases_raw:
            try:
                aliases = json.loads(aliases_raw)
            except:
                aliases = [a.strip() for a in aliases_raw.split(',') if a.strip()]

        # Parse references
        refs_raw = row.get('source_references_json', '')
        textbook_refs = []
        if refs_raw:
            try:
                refs_data = json.loads(refs_raw)
                for r in refs_data:
                    title = r.get('title', '')
                    loc = r.get('locator', '')
                    sup = r.get('supports', '')
                    textbook_refs.append(f"{title} ({loc}): {sup}")
            except:
                pass

        # Build FAQs
        faqs = []
        for i in range(1, 9):
            q = row.get(f'faq_{i}_question', '').strip()
            a = row.get(f'faq_{i}_answer', '').strip()
            if q and a:
                faqs.append({"question": q, "answer": a})

        # Limitations & Interferences
        limitations = []
        if row.get('medication_interferences'):
            limitations.append(f"Medication / Assay Interferences: {row['medication_interferences']}")
        if row.get('pediatric_considerations'):
            limitations.append(f"Pediatric Considerations: {row['pediatric_considerations']}")

        high_interp = row.get('interpretation_high', '').strip()
        low_interp = row.get('interpretation_low', '').strip()

        # Build entry
        entry = {
            "slug": slug,
            "title": row.get('seo_meta_title') or f"{test_name} Test: Uses, Preparation & Results | QXL",
            "metaDescription": row.get('seo_meta_description') or row.get('short_description'),
            "badge": "NABL ACCREDITED SUPER SPECIALITY LAB (MC-6849) · FREE HOME COLLECTION",
            "h1Title": f"{test_name} Test in Bangalore",
            "subtitle": row.get('short_description') or f"High-precision {test_name} assay accredited under ISO 15189:2022 standards.",
            "price": "450",
            "oldPrice": "650",
            "discountPercent": "30% OFF",
            "parametersCount": "Standard Clinical Assay",
            "sampleType": row.get('sample_type') or "Serum",
            "fastingRequired": row.get('fasting_required') or "Assay-specific; confirm at booking",
            "turnaroundTime": "12–24 Hours",
            "category": "Super Speciality Diagnostics",
            "overview": [
                f"The {test_name} ({test_id}) is a specialized clinical investigation performed at QXL Diagnostics, Bengaluru.",
                row.get('short_description', ''),
                f"Clinical Significance: {row.get('clinical_significance', '')}",
                f"Container & Handling: {row.get('container_requirements', '')}",
                f"Every result is verified by senior medical consultants under NABL ISO 15189:2022 quality controls."
            ],
            "whyImportant": [
                f"Primary Indication: {row.get('clinical_significance', '')}",
                f"Specimen Protocol: {row.get('sample_type', '')} ({row.get('container_requirements', '')})",
                f"Patient Preparation: {row.get('patient_preparation', '')}",
                "Certification: NABL Accredited Super Speciality Laboratory (MC-6849).",
                "Medical Reviewer: Dr. Shantakumar Muruda, MD (Biochemistry), NABL Lead Assessor.",
                "Home Collection: Available 7 days a week across 40+ Bengaluru areas."
            ],
            "faqs": faqs,
            "doctorSlug": "dr-shantakumar-muruda",
            "doctorName": "Dr. Shantakumar Muruda",
            "doctorQuals": "MD Biochemistry, NABL Lead Assessor",
            "testCode": test_id,
            "draftCode": f"DRAFT-{test_id}",
            "aliases": aliases,
            "department": "Super Speciality Diagnostics",
            "sampleVolume": "2 mL",
            "indications": row.get('clinical_significance', ''),
            "limitations": limitations,
            "clinicalSignificance": row.get('clinical_significance', ''),
            "preanalyticalNotes": f"Preparation: {row.get('patient_preparation', '')}. Container: {row.get('container_requirements', '')}",
            "interpretiveNotes": f"High Interpretation: {high_interp}\nLow Interpretation: {low_interp}",
            "textbookReferences": textbook_refs
        }

        master_data[slug] = entry
        # Add alternative slug aliases for easy routing
        for alias in aliases:
            alias_slug = slugify(alias)
            if alias_slug and alias_slug not in master_data:
                master_data[alias_slug] = entry

        print(f"Integrated {test_id}: {test_name} -> /{slug}")

    # Write updated master_data
    ts_content = "import type { DynamicPageData } from './dynamicPageResolver';\n\n"
    ts_content += "export const cms100MasterData: Record<string, DynamicPageData> = "
    ts_content += json.dumps(master_data, indent=2)
    ts_content += ";\n"

    with open(master_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print(f"Successfully updated {master_path} with {len(master_data)} total pages!")

if __name__ == '__main__':
    process_tsv()

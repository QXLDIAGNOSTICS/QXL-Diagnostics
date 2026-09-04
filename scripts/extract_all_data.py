import os
import re
import json
import zipfile
import xml.etree.ElementTree as ET

FOLDER = 'test page data '
OUTPUT_TS = 'src/lib/seoPages/extractedMasterData.ts'

def get_paragraphs(path):
    with zipfile.ZipFile(path) as z:
        xml_content = z.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        paragraphs = []
        for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
            p_text = ''.join([t.text for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text])
            if p_text.strip():
                paragraphs.append(p_text.strip())
        return paragraphs

files = sorted([f for f in os.listdir(FOLDER) if f.endswith('.docx')])
tests_by_slug = {}

category_map = {
    '01_Core_and_Routine_Tests.docx': 'Core & Routine Blood Tests',
    '02_Diabetes_and_Metabolic_Tests.docx': 'Diabetes & Metabolic Diagnostics',
    '03_Hormones_and_Fertility_Tests.docx': 'Hormones & Fertility Panels',
    '04_Prenatal_Screening_Tests.docx': 'Prenatal Screening Diagnostics',
    '05_Autoimmune_Tests.docx': 'Autoimmune & Rheumatology',
    '06_Allergy_and_Intolerance_Tests.docx': 'Allergy & Intolerance Panels',
    '07_Oncology_Tumour_Marker_Tests.docx': 'Oncology & Tumor Markers',
    '08_Cardiac_Tests.docx': 'Cardiovascular Biomarkers',
    '09_Protein_Disorders_Advanced_Tests.docx': 'Protein Disorders & Electrophoresis',
    '10_Infection_and_Fever_Tests.docx': 'Infectious Diseases & Fever Workups',
    '11_Advanced_Speciality_Tests.docx': 'Advanced Speciality Diagnostics'
}

for fname in files:
    full_path = os.path.join(FOLDER, fname)
    paras = get_paragraphs(full_path)
    category = category_map.get(fname, 'Diagnostic Testing')
    
    # Split paragraphs by test entries (lines matching '1. Test Name', '2. Test Name', etc.)
    entry_indices = []
    for idx, p in enumerate(paras):
        if re.match(r'^\d+\.\s+[A-Z]', p):
            entry_indices.append(idx)
            
    for k in range(len(entry_indices)):
        start = entry_indices[k]
        end = entry_indices[k+1] if k+1 < len(entry_indices) else len(paras)
        block = paras[start:end]
        
        test_name = re.sub(r'^\d+\.\s+', '', block[0]).strip()
        slug = ""
        meta_title = ""
        meta_desc = ""
        h1_title = ""
        quick_answer = ""
        faqs = []
        overview_paras = []
        why_important = []
        reference_ranges = []
        fasting_info = "No special preparation required."
        sample_info = "Serum / EDTA Blood"
        tat_info = "Same Day (6–12 Hours)"
        price = "499"
        old_price = "750"
        
        # Parse fields from block
        i = 0
        while i < len(block):
            line = block[i]
            
            if 'URL slug' in line:
                if i + 1 < len(block) and ('/tests/' in block[i+1] or '/' in block[i+1]):
                    s_text = block[i+1]
                else:
                    s_text = line
                m = re.search(r'/tests/([a-z0-9\-]+)|/([a-z0-9\-]+)', s_text)
                if m:
                    slug = m.group(1) or m.group(2)
                    
            elif 'Meta title' in line:
                if i + 1 < len(block):
                    meta_title = block[i+1]
            elif 'Meta description' in line:
                if i + 1 < len(block):
                    meta_desc = block[i+1]
            elif 'H1 on page' in line:
                if i + 1 < len(block):
                    h1_title = block[i+1]
            elif 'Quick answer' in line:
                if i + 1 < len(block):
                    quick_answer = block[i+1]
            elif 'What this test measures' in line or 'Clinical Overview' in line:
                j = i + 1
                while j < len(block) and not any(kwd in block[j] for kwd in ['Why your doctor orders it', 'Preparation and sample', 'Reference ranges', 'Frequently asked questions']):
                    if len(block[j]) > 30 and not block[j].startswith('•') and not block[j].startswith('URL'):
                        overview_paras.append(block[j])
                    j += 1
            elif 'Why your doctor orders it' in line:
                j = i + 1
                while j < len(block) and not any(kwd in block[j] for kwd in ['Preparation and sample', 'Reference ranges', 'Frequently asked questions']):
                    if block[j].startswith('•'):
                        why_important.append(block[j].lstrip('• ').strip())
                    j += 1
            elif 'Frequently asked questions' in line:
                j = i + 1
                while j < len(block) and not any(kwd in block[j] for kwd in ['Internal links', 'Structured data', 'Medical reviewer']):
                    # Check for Q & A pattern
                    if j + 1 < len(block) and (block[j].endswith('?') or len(block[j]) < 100):
                        q = block[j]
                        a = block[j+1]
                        if q and a and len(a) > 10 and not a.endswith('?'):
                            faqs.append({'question': q, 'answer': a})
                            j += 1
                    j += 1
            i += 1
            
        if not slug:
            slug = test_name.lower().replace(' ', '-').replace('(', '').replace(')', '').replace('/', '-').replace(',', '')
            
        slug = slug.strip('-')
        
        if not h1_title:
            h1_title = f"{test_name} in Bangalore"
        if not meta_title:
            meta_title = f"{test_name}: Normal Range, Price & Home Collection | QXL"
        if not meta_desc:
            meta_desc = quick_answer or f"Book {test_name} at QXL Diagnostics in Bangalore. NABL accredited lab with same-day reports."
        if not overview_paras:
            overview_paras = [
                f"{test_name} is an essential diagnostic investigation performed at QXL Diagnostics.",
                "Samples are collected by trained phlebotomy specialists and processed under strict NABL/ISO 15189:2022 quality systems."
            ]
        if not why_important:
            why_important = [
                f"Evaluates key clinical parameters for {test_name}.",
                "Conducted at NABL accredited super speciality laboratory (MC-6849).",
                "Digital PDF report delivered directly to your WhatsApp & Email."
            ]
            
        tests_by_slug[slug] = {
            "slug": slug,
            "title": meta_title,
            "metaDescription": meta_desc,
            "badge": "NABL ACCREDITED LAB (MC-6849) · FREE HOME COLLECTION",
            "h1Title": h1_title,
            "subtitle": quick_answer or overview_paras[0],
            "price": price,
            "oldPrice": old_price,
            "discountPercent": "33% OFF",
            "parametersCount": "Test-Specific",
            "sampleType": sample_info,
            "fastingRequired": fasting_info,
            "turnaroundTime": tat_info,
            "category": category,
            "overview": overview_paras[:3],
            "whyImportant": why_important[:5],
            "faqs": faqs[:10] if faqs else [
                {"question": f"Is home collection available for {test_name}?", "answer": "Yes, free doorstep sample collection is available across Bengaluru."},
                {"question": "How soon will I receive my digital report?", "answer": "Digital reports are delivered within 6 to 12 hours on the same day."}
            ],
            "doctorSlug": "dr-shantakumar-muruda",
            "doctorName": "Dr. Shantakumar Muruda",
            "doctorQuals": "MD Biochemistry, NABL Lead Assessor"
        }

print(f"Extracted {len(tests_by_slug)} complete test definitions from 11 docx volumes.")

# Generate TypeScript file
ts_content = "import type { DynamicPageData } from './dynamicPageResolver';\n\n"
ts_content += "export const masterExtractedPagesData: Record<string, DynamicPageData> = "
ts_content += json.dumps(tests_by_slug, indent=2)
ts_content += ";\n"

with open(OUTPUT_TS, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Wrote masterExtractedPagesData to {OUTPUT_TS}")

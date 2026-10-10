const fs = require('fs');

const tsvContent = fs.readFileSync('scripts/raw_tsv_tests.tsv', 'utf8');
const lines = tsvContent.split('\n').filter(l => l.trim());
const headers = lines[0].split('\t').map(h => h.trim());

function parseLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === '\t' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

const rows = [];
for (let i = 1; i < lines.length; i++) {
  const values = parseLine(lines[i]);
  const row = {};
  headers.forEach((h, index) => {
    let val = values[index] || '';
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.substring(1, val.length - 1).replace(/""/g, '"');
    }
    row[h] = val.trim();
  });
  if (row.test_id) rows.push(row);
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

let masterFileContent = fs.readFileSync('src/lib/seoPages/cms100MasterData.ts', 'utf8');

// Strip TypeScript import & export declarations before eval
let cleanedCode = masterFileContent.replace(/import\s+[\s\S]*?;\n?/g, '');
cleanedCode = cleanedCode.replace(/export\s+const\s+\w+\s*:\s*Record<[\s\S]*?>\s*=\s*/, '');
cleanedCode = cleanedCode.trim();
if (cleanedCode.endsWith(';')) {
  cleanedCode = cleanedCode.slice(0, -1);
}

let masterData = {};
try {
  masterData = eval('(' + cleanedCode + ')');
} catch (e) {
  console.error("Eval error:", e);
}

// Remove any numerical key artifacts like "1"
delete masterData['1'];
delete masterData['25'];

console.log("Existing masterData keys parsed:", Object.keys(masterData).length);

rows.forEach(row => {
  const testId = row.test_id;
  const testName = row.test_name;
  const slug = slugify(testName);

  let aliases = [];
  let rawAliases = row.synonyms_aliases || '';
  if (rawAliases) {
    try {
      aliases = JSON.parse(rawAliases);
    } catch {
      try {
        aliases = JSON.parse(rawAliases.replace(/\\"/g, '"'));
      } catch {
        aliases = rawAliases.replace(/^\[|\]$/g, '').replace(/"/g, '').split(',').map(s => s.trim()).filter(Boolean);
      }
    }
  }

  let textbookRefs = [];
  let rawRefs = row.source_references_json || '';
  if (rawRefs) {
    try {
      const refs = JSON.parse(rawRefs);
      textbookRefs = refs.map(r => `${r.title || ''} (${r.locator || ''}): ${r.supports || ''}`);
    } catch {
      try {
        const refs = JSON.parse(rawRefs.replace(/\\"/g, '"'));
        textbookRefs = refs.map(r => `${r.title || ''} (${r.locator || ''}): ${r.supports || ''}`);
      } catch {}
    }
  }

  const faqs = [];
  for (let i = 1; i <= 8; i++) {
    const q = row[`faq_${i}_question`];
    const a = row[`faq_${i}_answer`];
    if (q && a) faqs.push({ question: q, answer: a });
  }

  const limitations = [];
  if (row.medication_interferences) limitations.push(`Medication / Assay Interferences: ${row.medication_interferences}`);
  if (row.pediatric_considerations) limitations.push(`Pediatric Considerations: ${row.pediatric_considerations}`);

  const entry = {
    slug: slug,
    title: row.seo_meta_title || `${testName} Test: Uses, Preparation & Results | QXL`,
    metaDescription: row.seo_meta_description || row.short_description,
    badge: "NABL ACCREDITED SUPER SPECIALITY LAB (MC-6849) · FREE HOME COLLECTION",
    h1Title: `${testName} Test in Bangalore`,
    subtitle: row.short_description || `High-precision ${testName} assay accredited under ISO 15189:2022 standards.`,
    price: "450",
    oldPrice: "650",
    discountPercent: "30% OFF",
    parametersCount: "Standard Clinical Assay",
    sampleType: row.sample_type || "Serum",
    fastingRequired: row.fasting_required || "Assay-specific; confirm at booking",
    turnaroundTime: "12–24 Hours",
    category: "Super Speciality Diagnostics",
    overview: [
      `The ${testName} (${testId}) is a specialized clinical investigation performed at QXL Diagnostics, Bengaluru.`,
      row.short_description || '',
      `Clinical Significance: ${row.clinical_significance || ''}`,
      `Container & Handling: ${row.container_requirements || ''}`,
      "Every result is verified by senior medical consultants under NABL ISO 15189:2022 quality controls."
    ].filter(Boolean),
    whyImportant: [
      `Primary Indication: ${row.clinical_significance || ''}`,
      `Specimen Protocol: ${row.sample_type || ''} (${row.container_requirements || ''})`,
      `Patient Preparation: ${row.patient_preparation || ''}`,
      "Certification: NABL Accredited Super Speciality Laboratory (MC-6849).",
      "Medical Reviewer: Dr. Shantakumar Muruda, MD (Biochemistry), NABL Lead Assessor.",
      "Home Collection: Available 7 days a week across 40+ Bengaluru areas."
    ].filter(Boolean),
    faqs: faqs,
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor",
    testCode: testId,
    draftCode: `DRAFT-${testId}`,
    aliases: aliases,
    department: "Super Speciality Diagnostics",
    sampleVolume: "2 mL",
    indications: row.clinical_significance || '',
    limitations: limitations,
    clinicalSignificance: row.clinical_significance || '',
    preanalyticalNotes: `Preparation: ${row.patient_preparation || ''}. Container: ${row.container_requirements || ''}`,
    interpretiveNotes: `High: ${row.interpretation_high || ''}\nLow: ${row.interpretation_low || ''}`,
    textbookReferences: textbookRefs
  };

  masterData[slug] = entry;
  aliases.forEach(alias => {
    const aliasSlug = slugify(alias);
    if (aliasSlug && aliasSlug.length > 2 && !masterData[aliasSlug]) {
      masterData[aliasSlug] = entry;
    }
  });

  console.log(`Integrated ${testId}: ${testName} -> /${slug}`);
});

const newTsContent = `import type { DynamicPageData } from './dynamicPageResolver';\n\nexport const cms100MasterData: Record<string, DynamicPageData> = ${JSON.stringify(masterData, null, 2)};\n`;

fs.writeFileSync('src/lib/seoPages/cms100MasterData.ts', newTsContent, 'utf8');
console.log(`Successfully updated cms100MasterData.ts with ${Object.keys(masterData).length} total clean records.`);

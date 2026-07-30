const fs = require('fs');
const path = require('path');

const pagePath = path.resolve(__dirname, 'src/app/faq/page.tsx');
const rawNewFaqsPath = path.resolve(__dirname, 'raw_new_faqs.txt');

let pageContent = fs.readFileSync(pagePath, 'utf8');
const rawNewFaqs = fs.readFileSync(rawNewFaqsPath, 'utf8');

const blocks = rawNewFaqs.split('\n\n').map(b => b.trim()).filter(b => b);

const newCategories = [];

blocks.forEach((block, idx) => {
  const lines = block.split('\n').map(l => l.trim()).filter(l => l);
  if (lines.length < 3) return;

  const categoryName = lines[0]; // e.g. General, Endocrine
  const subCategoryName = lines[1]; // e.g. General & Test-Literacy FAQs, Diabetes Mellitus

  let goodToKnow = '';
  let questions = [];

  let desc = '';

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('Good to know:')) {
      goodToKnow = line;
    } else if (line.endsWith('?')) {
      questions.push(line);
    } else {
      desc += line + ' ';
    }
  }

  const faqs = questions.map(q => ({
    q: q,
    a: goodToKnow ? goodToKnow : (desc.trim() ? desc.trim() : "Answer coming soon based on clinical review draft.")
  }));

  // Group by categoryName or just use subCategoryName
  newCategories.push({
    id: `NEW_${idx}`,
    name: `${categoryName} - ${subCategoryName}`,
    faqs: faqs
  });
});

// We need to inject these new categories into faqData
const faqRegex = /const faqData = (\[[\s\S]*?\]);\n\nexport default function/m;
const match = pageContent.match(faqRegex);
if (!match) throw new Error("Could not find faqData");

let existingFaqData;
eval(`existingFaqData = ${match[1]}`);

// Append new categories
const updatedFaqData = existingFaqData.concat(newCategories);

const newFaqDataStr = `const faqData = ${JSON.stringify(updatedFaqData, null, 2)};`;
pageContent = pageContent.replace(/const faqData = \[\s*[\s\S]*?\s*\];/, newFaqDataStr);

// Add Intro Text to Hero
const introText = `
            <p className="text-blue-100/90 text-sm md:text-base max-w-3xl mx-auto font-medium leading-relaxed mt-4 bg-blue-900/20 p-4 rounded-xl border border-blue-400/20">
              <strong>Common Health Questions:</strong> The health questions people actually search for most — "why am I always tired," "what tests detect diabetes," "what does a high WBC count mean" — answered directly and grounded in QXL's clinician-drafted test catalogue. Built to be quoted accurately by AI answer engines.
            </p>`;
            
pageContent = pageContent.replace(
  /<p className="text-blue-800\/90 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">([\s\S]*?)<\/p>/,
  `<p className="text-blue-800/90 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">$1</p>${introText}`
);

// Add Disclaimer to the bottom of main
const disclaimer = `
        {/* Medical Disclaimer */}
        <div className="max-w-4xl mx-auto px-4 mt-12 mb-8">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-amber-900 text-sm leading-relaxed shadow-sm">
            <h4 className="font-bold text-amber-950 mb-2 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" /> Medical Disclaimer
            </h4>
            <p className="mb-3">
              This page is for general information only and does not replace medical advice. Please consult a doctor to interpret symptoms and test results.
            </p>
            <p className="text-xs text-amber-800/80">
              Test names, panels and limitation notes reflect QXL Diagnostics' internal clinical-review draft dated 29 July 2026. This catalogue itself states it is a "clinician-review draft, not a direct-to-consumer diagnostic promise" — confirm final clinical approval, live test-menu availability, and pricing before this content goes live.
            </p>
          </div>
        </div>`;
        
pageContent = pageContent.replace(/<\/main>/, `${disclaimer}\n      </main>`);

fs.writeFileSync(pagePath, pageContent, 'utf8');
console.log('Successfully updated faq/page.tsx with new common health questions and disclaimer.');

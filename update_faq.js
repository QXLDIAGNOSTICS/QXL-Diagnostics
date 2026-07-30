const fs = require('fs');
const path = require('path');

const pagePath = path.resolve(__dirname, 'src/app/faq/page.tsx');
const rawFaqsPath = path.resolve(__dirname, 'raw_faqs.txt'); // we'll put this in workspace too

let pageContent = fs.readFileSync(pagePath, 'utf8');
const rawFaqs = fs.readFileSync(rawFaqsPath, 'utf8');

// Parse new FAQs
const newFaqs = [];
const lines = rawFaqs.split('\n');
let currentQ = '';
let currentA = '';
for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed) continue;
  if (/^\d+\.\s/.test(trimmed)) {
    if (currentQ) {
      newFaqs.push({ q: currentQ, a: currentA });
    }
    currentQ = trimmed.replace(/^\d+\.\s*/, '');
    currentA = '';
  } else if (trimmed.startsWith('Answer:')) {
    currentA = trimmed.replace(/^Answer:\s*/, '');
  } else {
    currentA += ' ' + trimmed;
  }
}
if (currentQ) {
  newFaqs.push({ q: currentQ, a: currentA });
}

// Convert existing faqData
const faqRegex = /const faqData = \[\s*([\s\S]*?)\s*\];\n\nexport default function SymptomGuideFaq/m;
const match = pageContent.match(faqRegex);
if (!match) throw new Error("Could not find faqData");

let existingFaqData;
eval(`existingFaqData = [${match[1]}]`);

const newFaqData = existingFaqData.map(cat => {
  return {
    id: cat.id,
    name: cat.name,
    faqs: [
      { q: cat.q1.replace(/^Q\d+\.\s*/, ''), a: cat.a1 },
      { q: cat.q2.replace(/^Q\d+\.\s*/, ''), a: cat.a2 }
    ]
  };
});

// Add the new General FAQs
newFaqData.push({
  id: "GEN",
  name: "General Health & Diagnostics",
  faqs: newFaqs
});

// Serialize new faqData
const newFaqDataStr = `const faqData = ${JSON.stringify(newFaqData, null, 2)};`;

// Update pageContent with new data
pageContent = pageContent.replace(/const faqData = \[\s*[\s\S]*?\s*\];/, newFaqDataStr);

// Update Theme
pageContent = pageContent.replace(/className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-16 px-4"/g, 'className="bg-gradient-to-br from-blue-50 to-blue-100 text-[#0f2d5e] py-16 px-4 border-b border-blue-200"');
pageContent = pageContent.replace(/text-white drop-shadow-md/g, 'text-[#0f2d5e]');
pageContent = pageContent.replace(/text-blue-100\/90/g, 'text-blue-800/90');
pageContent = pageContent.replace(/bg-blue-800\/40 border border-blue-400\/30/g, 'bg-white border border-blue-200');
pageContent = pageContent.replace(/text-blue-200/g, 'text-[#2563eb]');
pageContent = pageContent.replace(/text-blue-100/g, 'text-[#0f2d5e]');

// Update schema generation
const oldSchemaGen = `const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.flatMap(d => [
      {
        "@type": "Question",
        name: d.q1,
        acceptedAnswer: { "@type": "Answer", text: d.a1 }
      },
      {
        "@type": "Question",
        name: d.q2,
        acceptedAnswer: { "@type": "Answer", text: d.a2 }
      }
    ])
  };`;

const newSchemaGen = `const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.flatMap(d => d.faqs.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a }
    })))
  };`;
pageContent = pageContent.replace(oldSchemaGen, newSchemaGen);

// Update FAQ rendering & remove book now
const oldRender = `                {/* FAQ Items */}
                <div className="p-3">
                  <div className="flex flex-col gap-2">
                    {/* Q1 */}
                    <details className="group bg-white rounded-xl [&_summary::-webkit-details-marker]:hidden border border-transparent hover:border-gray-100">
                      <summary className="flex items-center justify-between p-4 font-semibold cursor-pointer text-gray-800 rounded-xl transition-colors select-none">
                        <span className="pr-4 leading-relaxed text-[15px]">{system.q1}</span>
                        <span className="transition-transform duration-300 group-open:rotate-180 shrink-0 bg-slate-50 text-slate-500 p-1.5 rounded-full border border-slate-100">
                          <ChevronDown size={18} />
                        </span>
                      </summary>
                      <div className="px-4 pb-5 pt-1 text-[14.5px] text-slate-600 leading-relaxed">
                        {system.a1}
                      </div>
                    </details>
                    {/* Q2 */}
                    <details className="group bg-white rounded-xl [&_summary::-webkit-details-marker]:hidden border border-transparent hover:border-gray-100">
                      <summary className="flex items-center justify-between p-4 font-semibold cursor-pointer text-gray-800 rounded-xl transition-colors select-none">
                        <span className="pr-4 leading-relaxed text-[15px]">{system.q2}</span>
                        <span className="transition-transform duration-300 group-open:rotate-180 shrink-0 bg-slate-50 text-slate-500 p-1.5 rounded-full border border-slate-100">
                          <ChevronDown size={18} />
                        </span>
                      </summary>
                      <div className="px-4 pb-5 pt-1 text-[14.5px] text-slate-600 leading-relaxed">
                        {system.a2}
                      </div>
                    </details>
                  </div>
                </div>
                
                {/* Book Now Action */}
                <div className="bg-slate-50 p-4 md:px-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    Need tests for {system.name.toLowerCase()}?
                  </span>
                  <Link href="/book" className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-sm hover:shadow active:scale-95">
                    Book Now <ArrowRight size={16} />
                  </Link>
                </div>`;

const newRender = `                {/* FAQ Items */}
                <div className="p-3">
                  <div className="flex flex-col gap-2">
                    {system.faqs.map((faq, fIdx) => (
                      <details key={fIdx} className="group bg-white rounded-xl [&_summary::-webkit-details-marker]:hidden border border-transparent hover:border-gray-100">
                        <summary className="flex items-center justify-between p-4 font-semibold cursor-pointer text-gray-800 rounded-xl transition-colors select-none">
                          <span className="pr-4 leading-relaxed text-[15px]">{faq.q}</span>
                          <span className="transition-transform duration-300 group-open:rotate-180 shrink-0 bg-slate-50 text-slate-500 p-1.5 rounded-full border border-slate-100">
                            <ChevronDown size={18} />
                          </span>
                        </summary>
                        <div className="px-4 pb-5 pt-1 text-[14.5px] text-slate-600 leading-relaxed">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>`;

pageContent = pageContent.replace(oldRender, newRender);

fs.writeFileSync(pagePath, pageContent, 'utf8');
console.log('Successfully updated faq/page.tsx');

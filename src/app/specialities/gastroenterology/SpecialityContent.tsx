"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle, Activity, Stethoscope, Microscope, Shield, Clock, FlaskConical, Users, FileText } from 'lucide-react';

const SPECIALITIES = ["Neurology","Hematology","Cardiology","Urology","Endocrinology","Oncology","Infectious Diseases","Women's Health","Gastroenterology","Bone Disorders"];

const faqs = [
  { q: "What does an elevated ALT or AST level indicate?", a: "Elevated liver enzymes (SGOT/SGPT) suggest liver cell injury or inflammation, which can be caused by fatty liver disease, viral hepatitis, alcohol use, medication toxicity, or autoimmune liver disease. A full LFT with GGT and ALP helps narrow the cause." },
  { q: "Do I need to fast for a Liver Function Test?", a: "Yes, a fasting period of 10–12 hours is recommended before LFT, as food can affect bilirubin and triglyceride readings. Water is permitted. Inform us of any medications taken." },
  { q: "How is Celiac disease confirmed through blood tests?", a: "Anti-tissue Transglutaminase IgA (anti-tTG IgA) is the primary screening test. If IgA deficiency is suspected, anti-DGP IgG is tested in addition. Diagnosis is confirmed by duodenal biopsy after a positive antibody result." },
  { q: "What is Fecal Calprotectin and when is it useful?", a: "Fecal Calprotectin is a stool marker of intestinal inflammation. It helps differentiate inflammatory bowel disease (IBD) from irritable bowel syndrome (IBS). Elevated levels indicate active intestinal inflammation and guide the need for colonoscopy." },
];

export default function GastroenterologyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="glass-panel text-[#0c4a6e] py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#2563eb] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">Gastroenterology</span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#0c4a6e] leading-tight">Advanced Gastroenterology &amp; Liver Disease Testing in Bengaluru</h1>
            <p className="text-slate-700 text-base md:text-lg mb-8 leading-relaxed font-medium">
              Liver function, IBD markers, celiac disease, H. pylori, malabsorption workup, viral hepatitis, autoimmune liver panels, and pancreatic assessment — with expert-reviewed reports and home sample collection.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#test-profiles" className="bg-[#2563eb] text-white font-extrabold px-6 py-3 rounded-full hover:bg-[#1d4ed8] transition-all text-sm shadow-md">View Test Profiles</a>
              <Link href="/book" className="bg-white border-2 border-[#2563eb] text-[#2563eb] font-extrabold px-6 py-3 rounded-full hover:bg-sky-50 transition-all text-sm shadow-sm" style={{ color: '#2563eb' }}>Book a Test</Link>
              <Link href="/upload-prescription" className="border-2 border-slate-300 text-slate-700 font-bold px-6 py-3 rounded-full hover:bg-slate-100 transition-all text-sm">Upload Prescription</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center text-xs text-gray-500 flex-wrap gap-1">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/specialities" className="hover:text-sky-600">Our Specialities</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-semibold">Gastroenterology</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <p className="text-gray-700 text-lg leading-relaxed">
                QXL Diagnostics provides comprehensive gastroenterology and hepatology diagnostic testing. Our panels cover liver disease, inflammatory bowel disease, celiac disease, malabsorption, H. pylori infection, viral hepatitis, autoimmune liver conditions, and pancreatic health — all with clinically meaningful, consultant-reviewed reports.
              </p>
            </section>

            <section className="bg-sky-50 border border-sky-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-bold text-sky-900">Who Should Take These Tests?</h2>
              </div>
              <ul className="space-y-2 text-sm text-sky-800">
                {["Patients with chronic abdominal pain, bloating, or altered bowel habits","Those with jaundice, elevated liver enzymes, or fatty liver on ultrasound","Patients with suspected celiac disease, gluten intolerance, or malabsorption","Individuals with chronic diarrhea, weight loss, or blood in stools","Those with suspected H. pylori, peptic ulcer, or chronic gastritis","Patients with viral hepatitis B or C requiring monitoring","Individuals with IBD (Crohn's or Ulcerative Colitis) requiring disease monitoring"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </section>

            <section id="test-profiles">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Activity className="w-6 h-6 text-sky-600" /> Gastroenterology Test Profiles
              </h2>
              <div className="grid gap-5">
                {[
                  { name: "Liver Function Test (LFT) — Advanced", tests: "Bilirubin (Total, Direct, Indirect), SGOT (AST), SGPT (ALT), Alkaline Phosphatase (ALP), GGT, Total Protein, Albumin, Globulin, A/G Ratio, LDH", tat: "Same Day", sample: "Fasting blood (10–12 hrs)" },
                  { name: "Viral Hepatitis Panel", tests: "HBsAg (Hepatitis B Surface Antigen), Anti-HCV, HAV IgM, HCV RNA Quantitative PCR, HBV DNA Quantitative PCR, HBeAg, Anti-HBe", tat: "Same Day – 2 Days", sample: "Blood" },
                  { name: "Autoimmune Liver Disease Panel", tests: "ANA, ASMA (Anti-Smooth Muscle), Anti-LKM1, AMA (Anti-Mitochondrial), ANCA (pANCA/cANCA), IgG, IgM, IgA levels", tat: "2–4 Days", sample: "Blood" },
                  { name: "Celiac Disease Screening", tests: "Anti-tTG IgA, Total IgA, Anti-DGP IgG, Anti-Gliadin IgA/IgG", tat: "Same Day – 1 Day", sample: "Blood" },
                  { name: "IBD (Inflammatory Bowel Disease) Panel", tests: "Fecal Calprotectin, ASCA (Anti-Saccharomyces cerevisiae Ab), pANCA, CRP, ESR, CBC, Albumin", tat: "1–2 Days", sample: "Stool + Blood" },
                  { name: "H. Pylori Detection", tests: "H. pylori Antigen in Stool (HpSA), H. pylori IgG/IgM Antibody, H. pylori Urea Breath Test (on request)", tat: "Same Day", sample: "Stool / Blood" },
                  { name: "Malabsorption Profile", tests: "Iron, TIBC, Ferritin, Vitamin B12, Folate, Vitamin D, Calcium, Magnesium, Zinc, Phosphorus, Albumin, Stool Elastase", tat: "1–2 Days", sample: "Blood + Stool" },
                  { name: "Pancreatic Wellness Panel", tests: "Serum Amylase, Serum Lipase, Fasting Blood Sugar, HbA1c, CA 19-9 (if indicated)", tat: "Same Day", sample: "Blood (fasting for glucose)" },
                ].map((t) => (
                  <div key={t.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-sky-400 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-gray-900 mb-1">{t.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{t.tests}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> TAT: {t.tat}</span>
                          <span className="flex items-center gap-1"><FlaskConical className="w-3 h-3" /> Sample: {t.sample}</span>
                        </div>
                      </div>
                      <Link href="/book" className="self-start bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg whitespace-nowrap hover:bg-sky-700 transition-colors text-sm">Book Now</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><Stethoscope className="w-5 h-5 text-sky-600" /> For Clinicians</h2>
              <p className="text-gray-700 text-sm leading-relaxed">Our gastroenterology panel supports accurate diagnosis and monitoring of liver disease, IBD, malabsorption syndromes, and H. pylori. Fecal calprotectin helps differentiate IBD from IBS non-invasively. Quantitative PCR for HBV/HCV DNA supports treatment decisions. Our autoimmune liver panel aids diagnosis of AIH, PBC, and PSC. All reports include interpretation notes. Doctor enquiries: +91 99646 39639.</p>
            </section>

            <section className="bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Why Choose QXL Diagnostics?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <Shield className="w-5 h-5 text-sky-600" />, title: "NABL Certified Laboratory", desc: "Quality-assured testing for all GI and hepatology markers." },
                  { icon: <Microscope className="w-5 h-5 text-sky-600" />, title: "Expert-Reviewed Reports", desc: "Consultant pathologists review all super speciality gastroenterology panels." },
                  { icon: <Activity className="w-5 h-5 text-sky-600" />, title: "Stool & Molecular Testing", desc: "Fecal calprotectin, HpSA, and PCR-based quantitative hepatitis panels." },
                  { icon: <CheckCircle className="w-5 h-5 text-sky-600" />, title: "Home Sample Collection", desc: "Certified phlebotomists collect blood and stool samples at your home across Bengaluru." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-0.5 bg-sky-100 p-1.5 rounded-lg flex-shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-4 flex justify-between items-center font-semibold text-sm text-gray-900 hover:bg-gray-50">
                      {faq.q}
                      <ChevronRight className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                    </button>
                    {openFaq === i && <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">{faq.a}</div>}
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-gradient-to-r from-sky-600 to-sky-900 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Book Your Gastroenterology Profile</h3>
              <p className="text-[#0369a1] text-sm mb-4">Home collection available for blood and stool samples. Reports via email and WhatsApp.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book" className="bg-white text-sky-700 font-bold px-5 py-2 rounded-full text-sm hover:bg-sky-50">Book a Test</Link>
                <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="border-2 border-white text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-white/10">WhatsApp Us</a>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-5">
            <div className="bg-gradient-to-br from-sky-600 to-sky-900 text-white rounded-2xl p-5 shadow-lg">
              <h3 className="text-lg font-bold mb-2 text-white">Need help choosing the right GI test?</h3>
              <p className="text-[#0369a1] text-xs mb-4">Our consultants guide you to the right gastroenterology profile.</p>
              <a href="tel:+919964639639" className="w-full bg-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-sky-50 transition-colors mb-2 shadow text-sm" style={{ color: '#0284c7' }}>📞 Call +91 99646 39639</a>
              <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="w-full border border-sky-400 bg-sky-800 text-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-sky-700 transition-colors text-sm">WhatsApp Us</a>
              <Link href="/upload-prescription" className="mt-2 w-full border border-sky-400 text-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-white/10 transition-colors text-sm"><FileText className="w-4 h-4 mr-2" /> Upload Prescription</Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-base font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Our Specialities</h3>
              <ul className="space-y-2">
                {SPECIALITIES.map(spec => (
                  <li key={spec}>
                    <Link href={`/specialities/${spec.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-gray-600 hover:text-sky-600 text-sm flex items-center justify-between group font-medium">
                      {spec}<ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-sky-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Advanced Gastroenterology &amp; Liver Disease Testing in Bengaluru",
            "provider": {
              "@type": "MedicalClinic",
              "name": "QXL Diagnostics",
              "image": "https://res.cloudinary.com/btjglif5/image/upload/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png"
            },
            "areaServed": {
              "@type": "City",
              "name": "Bengaluru"
            },
            "description": "Liver function, IBD markers, celiac disease, H. pylori, malabsorption workup, viral hepatitis, autoimmune liver panels, and pancreatic assessment — with expert-reviewed reports and home sample collection.",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />
    </div>
  );
}
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle, Activity, Stethoscope, Microscope, Shield, Clock, FlaskConical, Users, FileText, Droplet } from 'lucide-react';

const SPECIALITIES = ["Neurology","Hematology","Cardiology","Urology","Endocrinology","Oncology","Infectious Diseases","Women's Health","Gastroenterology","Bone Disorders"];

const faqs = [
  { q: "What is the clinical significance of the Free-to-Total PSA ratio?", a: "Prostate-Specific Antigen (PSA) circulates in the blood in both bound (complexed) and unbound (free) forms. Men with prostate cancer tend to have a lower percentage of free PSA than men with benign prostate enlargement (BPH). Calculating this ratio helps clinicians determine if a biopsy is necessary when total PSA lies in the borderline zone (4.0 to 10.0 ng/mL)." },
  { q: "Why is eGFR reported alongside Serum Creatinine?", a: "Creatinine levels can be affected by factors like muscle mass, age, and gender. The estimated Glomerular Filtration Rate (eGFR) uses these variables to calculate how well the kidneys filter waste, providing a much more reliable assessment of chronic kidney disease (CKD) staging." },
  { q: "How do I collect a 24-hour urine sample for a stone risk profile?", a: "Start in the morning: discard the very first void of Day 1. Collect all subsequent urine voids for the next 24 hours, including the first morning void of Day 2, in the specialized container provided by QXL. Keep the container refrigerated or in a cool place throughout and submit it immediately." },
  { q: "Can a urinary tract infection (UTI) affect my kidney function tests?", a: "A localized lower urinary tract infection (bladder infection) typically does not affect kidney function test markers (Urea/Creatinine). However, if left untreated, it can ascend to the kidneys (pyelonephritis), which can cause acute kidney injury and temporary spikes in filtration markers." }
];

export default function UrologyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-750 to-blue-950 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2000')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">Urology</span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">Advanced Renal Function &amp; Prostate Screening in Bengaluru</h1>
            <p className="text-blue-100 text-base md:text-lg mb-8 leading-relaxed">
              Enzymatic kidney function profiles, diagnostic microalbuminuria screening, urinary stone risk evaluations, and high-precision Free/Total PSA ratios.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#test-profiles" className="bg-white text-blue-850 font-bold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors text-sm" style={{ color: '#1d4ed8' }}>View Test Profiles</a>
              <Link href="/book" className="bg-blue-600 border-2 border-white text-white font-bold px-5 py-2.5 rounded-full hover:bg-blue-500 transition-colors text-sm">Book a Test</Link>
              <Link href="/upload-prescription" className="border-2 border-white/60 text-white font-bold px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors text-sm">Upload Prescription</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center text-xs text-gray-500 flex-wrap gap-1">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/specialities" className="hover:text-blue-600">Our Specialities</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-semibold">Urology</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Intro */}
            <section>
              <p className="text-gray-700 text-lg leading-relaxed">
                Urological wellness and renal health are essential for maintaining systemic equilibrium. QXL Diagnostics provides NABL accredited assays for kidney function, bladder health, metabolic stone profiling, and prostate screening, ensuring clinical precision for targeted urological care.
              </p>
            </section>

            {/* Who Should Take */}
            <section className="bg-blue-50 border border-blue-150 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-700" />
                <h2 className="text-lg font-bold text-blue-950">Who Should Take These Tests?</h2>
              </div>
              <ul className="space-y-2 text-sm text-blue-900">
                {[
                  "Men over 50 experiencing difficulty in urination, weak urine stream, or nocturia",
                  "Patients with chronic conditions (such as diabetes or hypertension) needing diabetic nephropathy monitoring",
                  "Individuals suffering from recurrent painful urination, lower back pain, or cloudy urine (UTI screens)",
                  "Patients with a personal or family history of kidney stones requiring mineral excretion risk profiles",
                  "Individuals currently taking nephrotoxic medications requiring routine filtration monitoring",
                  "Patients undergoing treatment surveillance for kidney, bladder, or prostate disorders"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-650 mt-0.5 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </section>

            {/* Test Profiles */}
            <section id="test-profiles">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-600" /> Urology Test Profiles
              </h2>
              <div className="grid gap-5">
                {[
                  { name: "Kidney Function Test (KFT/RFT) — Advanced", tests: "Serum Urea, Serum Creatinine, Uric Acid, Blood Urea Nitrogen (BUN), eGFR (CKD-EPI formula), Electrolytes (Sodium, Potassium, Chloride)", tat: "Same Day", sample: "Blood (no fasting)" },
                  { name: "Prostate Health Panel", tests: "Total Prostate-Specific Antigen (PSA), Free PSA, Free-to-Total PSA Ratio calculation", tat: "Same Day", sample: "Blood (avoid testing immediately after physical exam or urinary trauma)" },
                  { name: "Urinary Stone Risk Profile", tests: "24-Hour Urine Volume, Urine Calcium, Oxalate, Uric Acid, Citrate, Creatinine, Phosphorus, Urinary pH level", tat: "1 Day", sample: "24-hour urine collection" },
                  { name: "Urinary Tract Infection (UTI) Screen", tests: "Urine Routine & Microscopy (pus cells, epithelial cells, crystals), Urine Culture & Sensitivity (aerobic incubation)", tat: "24–48 hrs", sample: "Mid-stream clean catch urine" },
                  { name: "Microalbuminuria Screen", tests: "Random Urine Microalbumin, Urine Creatinine, Microalbumin-to-Creatinine Ratio (ACR)", tat: "Same Day", sample: "Spot urine sample (first morning preferred)" }
                ].map((t) => (
                  <div key={t.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{t.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{t.tests}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> TAT: {t.tat}</span>
                          <span className="flex items-center gap-1"><FlaskConical className="w-3 h-3" /> Sample: {t.sample}</span>
                        </div>
                      </div>
                      <Link href="/book" className="self-start bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg whitespace-nowrap hover:bg-blue-700 transition-colors text-sm">Book Now</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Clinical Usefulness */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Stethoscope className="w-5 h-5 text-blue-600" /> For Clinicians</h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Our kidney profiles utilize standard enzymatic methods for serum creatinine to avoid chromogen interference. We calculate eGFR using the CKD-EPI equation for accurate chronic kidney disease staging. For prostate evaluations, providing simultaneous Free and Total PSA assists in distinguishing benign prostatic hyperplasia (BPH) from early malignant changes.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                UTI culture plates are read by consultant microbiologists using standardized antibiotic panels. Clinician consults are available at +91 99646 39639.
              </p>
            </section>

            {/* Why QXL */}
            <section className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Why Choose QXL Diagnostics?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <Shield className="w-5 h-5 text-blue-600" />, title: "NABL Certified Laboratories", desc: "Rigorous diagnostic quality protocols ensuring standard-aligned results." },
                  { icon: <Microscope className="w-5 h-5 text-blue-600" />, title: "High-Sensitivity Chemistry", desc: "Advanced enzymatic assays minimizing biochemical background interference." },
                  { icon: <Activity className="w-5 h-5 text-blue-600" />, title: "Clinician-Approved Formulations", desc: "eGFR and urine ratio calculations conforming to global kidney guidelines." },
                  { icon: <CheckCircle className="w-5 h-5 text-blue-600" />, title: "Painless Sample Collection", desc: "Sterile home collections across Bengaluru scheduled at your convenience." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-0.5 bg-blue-100 p-1.5 rounded-lg flex-shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
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

            {/* CTA Banner */}
            <section className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Book Your Urology/Renal Profile Today</h3>
              <p className="text-blue-100 text-sm mb-4">Fast same-day digital reports. Certified home collection across Bengaluru.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book" className="bg-white text-blue-700 font-bold px-5 py-2 rounded-full text-sm hover:bg-blue-50 transition-colors">Book a Test</Link>
                <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="border-2 border-white text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-white/10 transition-colors">WhatsApp Us</a>
                <a href="tel:+919964639639" className="border-2 border-white/60 text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-white/10 transition-colors">📞 Call Now</a>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-2xl p-5 shadow-lg">
              <h3 className="text-lg font-bold mb-2 text-white">Need help choosing the right test?</h3>
              <p className="text-blue-100 text-xs mb-4">Our medical consultant team can guide you to the right diagnostic profile for your symptoms.</p>
              <a href="tel:+919964639639" className="w-full bg-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-blue-50 transition-colors mb-2 shadow text-sm" style={{ color: '#1d4ed8' }}>📞 Call +91 99646 39639</a>
              <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="w-full border border-blue-400 bg-blue-800 text-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-blue-700 transition-colors text-sm">WhatsApp Us</a>
              <Link href="/upload-prescription" className="mt-2 w-full border border-blue-400 bg-transparent text-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-white/10 transition-colors text-sm"><FileText className="w-4 h-4 mr-2" /> Upload Prescription</Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-base font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Our Specialities</h3>
              <ul className="space-y-2">
                {SPECIALITIES.map(spec => (
                  <li key={spec}>
                    <Link href={`/specialities/${spec.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-gray-600 hover:text-blue-600 text-sm flex items-center justify-between group font-medium">
                      {spec}<ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-400" />
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
            "serviceType": "Advanced Renal Function &amp; Prostate Screening in Bengaluru",
            "provider": {
              "@type": "MedicalClinic",
              "name": "QXL Diagnostics",
              "image": "https://qxldiagnostics.com/image/Logo (1).png"
            },
            "areaServed": {
              "@type": "City",
              "name": "Bengaluru"
            },
            "description": "Enzymatic kidney function profiles, diagnostic microalbuminuria screening, urinary stone risk evaluations, and high-precision Free/Total PSA ratios.",
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
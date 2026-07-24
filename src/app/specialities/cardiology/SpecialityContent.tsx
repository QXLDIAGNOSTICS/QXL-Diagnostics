"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle, Activity, Stethoscope, Microscope, Heart, Shield, Clock, FlaskConical, Users, FileText } from 'lucide-react';

const SPECIALITIES = ["Neurology","Hematology","Cardiology","Urology","Endocrinology","Oncology","Infectious Diseases","Women's Health","Gastroenterology","Bone Disorders"];

const faqs = [
  { q: "How often should I get a lipid profile?", a: "Healthy adults should get a lipid profile at least once a year. Those with risk factors like hypertension, diabetes, obesity, smoking, or a family history of heart disease should test every 3–6 months as advised by their physician." },
  { q: "What is a cardiac biomarker test and when is it ordered?", a: "It measures specific proteins (Troponin I/T, CK-MB, NT-proBNP) released when heart muscle is damaged. It is ordered in emergency evaluation of chest pain, breathlessness, suspected heart attack, or to monitor heart failure." },
  { q: "Why are hs-CRP, Homocysteine, and Lp(a) important?", a: "These are advanced cardiovascular risk markers that predict risk of plaque buildup and atherosclerosis even when routine cholesterol appears normal. They are especially useful in patients with borderline lipid results." },
  { q: "What preparation is needed for cardiac blood tests?", a: "Most lipid tests require 10–12 hours of fasting. Cardiac enzyme tests (Troponin, CK-MB) do not require fasting. Please inform the phlebotomist of all medications you take." },
];

export default function CardiologyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="glass-panel text-[#0c4a6e] py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=2000')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#2563eb] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">Cardiology</span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#0c4a6e] leading-tight">Advanced Cardiac Risk &amp; Heart Health Testing in Bengaluru</h1>
            <p className="text-slate-700 text-base md:text-lg mb-8 leading-relaxed font-medium">
              Comprehensive lipid panels, cardiac biomarkers, inflammation markers, and advanced cardiovascular risk profiling — with expert-reviewed reports and home sample collection.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#test-profiles" className="bg-[#2563eb] text-white font-extrabold px-6 py-3 rounded-full hover:bg-[#1d4ed8] transition-all text-sm shadow-md">View Test Profiles</a>
              <Link href="/book" className="bg-white border-2 border-[#2563eb] text-[#2563eb] font-extrabold px-6 py-3 rounded-full hover:bg-sky-50 transition-all text-sm shadow-sm" style={{ color: '#2563eb' }}>Book a Test</Link>
              <Link href="/upload-prescription" className="border-2 border-slate-300 text-slate-700 font-bold px-6 py-3 rounded-full hover:bg-slate-100 transition-all text-sm">Upload Prescription</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center text-xs text-gray-500 flex-wrap gap-1">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/specialities" className="hover:text-sky-600">Our Specialities</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-semibold">Cardiology</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Intro */}
            <section>
              <p className="text-gray-700 text-lg leading-relaxed">
                At QXL Diagnostics, our cardiology testing goes beyond a routine lipid profile. We provide advanced cardiovascular risk profiling, cardiac emergency markers, hypertension workup, and inflammation-based atherosclerosis assessment — all with consultant-reviewed reports and AI-assisted diagnostic intelligence.
              </p>
            </section>

            {/* Who Should Take */}
            <section className="bg-sky-50 border border-sky-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-bold text-sky-900">Who Should Take These Tests?</h2>
              </div>
              <ul className="space-y-2 text-sm text-sky-800">
                {["Adults over 40 for annual cardiovascular risk assessment","Patients with hypertension, diabetes, or obesity","Individuals with a family history of heart attack or stroke","Smokers and those with sedentary lifestyles","Patients on statins requiring lipid monitoring","Anyone with chest pain, breathlessness, or palpitations (doctor-referred)","Post-angioplasty or cardiac event follow-up monitoring"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </section>

            {/* Test Profiles */}
            <section id="test-profiles">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Heart className="w-6 h-6 text-sky-600" /> Cardiology Test Profiles
              </h2>
              <div className="grid gap-5">
                {[
                  { name: "Lipid Profile — Advanced", tests: "Total Cholesterol, HDL, LDL, VLDL, Triglycerides, Apolipoprotein A1 & B, Lp(a), Apo B/A1 Ratio, Non-HDL Cholesterol", tat: "Same Day", sample: "Fasting blood (10–12 hrs)" },
                  { name: "Cardiac Biomarker Panel", tests: "High-Sensitivity Troponin-I, Troponin-T, CK-MB, NT-proBNP, Myoglobin, LDH", tat: "4–6 hrs", sample: "Blood (no fasting)" },
                  { name: "Cardiovascular Risk Screen", tests: "hs-CRP, Homocysteine, Lipoprotein (a), ApoB, ApoA1, Advanced Lipid Profile", tat: "Same Day", sample: "Fasting blood" },
                  { name: "Hypertension Workup", tests: "Plasma Renin Activity, Aldosterone, Serum Electrolytes (Na, K, Cl), Creatinine, Urine Microalbumin, Urine Protein/Creatinine Ratio", tat: "1–2 Days", sample: "Blood + Urine" },
                  { name: "Cardiac Risk Inflammation Markers", tests: "hs-CRP, IL-6, Fibrinogen, ESR, Ferritin", tat: "Same Day", sample: "Blood" },
                ].map((t) => (
                  <div key={t.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-sky-400 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{t.name}</h3>
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

            {/* Clinical Usefulness */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Stethoscope className="w-5 h-5 text-sky-600" /> For Clinicians</h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Our cardiology panel supports accurate risk stratification for primary and secondary cardiovascular prevention. Advanced lipid sub-fractions (Lp(a), ApoB) help identify residual risk in patients on statin therapy. Cardiac biomarkers (hs-Troponin, NT-proBNP) support NSTEMI/STEMI evaluation, heart failure diagnosis, and treatment monitoring.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                All reports are reviewed by our consultant biochemist and pathologist. Reports include clinical interpretation notes. Doctor enquiries welcome — call +91 99646 39639.
              </p>
            </section>

            {/* Why QXL */}
            <section className="bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Why Choose QXL Diagnostics?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <Shield className="w-5 h-5 text-sky-600" />, title: "NABL Certified Laboratory", desc: "Accredited testing with ISO 15189 quality standards ensuring every result is reliable." },
                  { icon: <Microscope className="w-5 h-5 text-sky-600" />, title: "Expert-Reviewed Reports", desc: "Consultant biochemists and pathologists review critical and super speciality panels." },
                  { icon: <Activity className="w-5 h-5 text-sky-600" />, title: "AI-Assisted Diagnostics", desc: "AI-powered result flagging and pattern recognition for faster clinical decisions." },
                  { icon: <CheckCircle className="w-5 h-5 text-sky-600" />, title: "Free Home Collection", desc: "Certified phlebotomists visit your home across Bengaluru at your preferred time." },
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
            <section className="bg-gradient-to-r from-sky-600 to-sky-800 rounded-2xl p-6 md:p-8 text-white shadow-xl">
              <h3 className="text-xl md:text-2xl font-extrabold mb-2 text-white">Ready to Book Your Cardiac Profile?</h3>
              <p className="text-sky-100 text-sm md:text-base mb-6 font-medium leading-relaxed">Free home sample collection across Bengaluru. Reports via email and WhatsApp.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book" className="bg-white font-extrabold px-6 py-3 rounded-full text-sm hover:bg-sky-50 transition-all shadow-md cursor-pointer flex items-center gap-1.5" style={{ color: '#0369a1' }}>
                  Book a Test
                </Link>
                <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="bg-white/15 hover:bg-white/25 border-2 border-white text-white font-extrabold px-6 py-3 rounded-full text-sm transition-all shadow-sm">
                  WhatsApp Us
                </a>
                <a href="tel:+919964639639" className="bg-white/15 hover:bg-white/25 border-2 border-white/80 text-white font-extrabold px-6 py-3 rounded-full text-sm transition-all shadow-sm">
                  📞 Call Now
                </a>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-gradient-to-br from-sky-600 to-sky-800 text-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold mb-2 text-white">Need help choosing the right test?</h3>
              <p className="text-sky-100 text-xs mb-5 font-medium leading-relaxed">Our consultant team can guide you to the right cardiac profile for your clinical need.</p>
              <a href="tel:+919964639639" className="w-full bg-white font-extrabold py-3 rounded-xl flex justify-center hover:bg-sky-50 transition-colors mb-3 shadow text-sm cursor-pointer" style={{ color: '#0369a1' }}>📞 Call +91 99646 39639</a>
              <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="w-full border border-sky-300 bg-sky-700/80 text-white font-bold py-3 rounded-xl flex justify-center hover:bg-sky-600 transition-colors text-sm shadow-sm mb-3">WhatsApp Us</a>
              <Link href="/upload-prescription" className="w-full border border-sky-300/60 bg-transparent text-white font-bold py-3 rounded-xl flex justify-center hover:bg-white/10 transition-colors text-sm"><FileText className="w-4 h-4 mr-2" /> Upload Prescription</Link>
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
            "serviceType": "Advanced Cardiac Risk &amp; Heart Health Testing in Bengaluru",
            "provider": {
              "@type": "MedicalClinic",
              "name": "QXL Diagnostics",
              "image": "https://res.cloudinary.com/btjglif5/image/upload/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png"
            },
            "areaServed": {
              "@type": "City",
              "name": "Bengaluru"
            },
            "description": "Comprehensive lipid panels, cardiac biomarkers, inflammation markers, and advanced cardiovascular risk profiling — with expert-reviewed reports and home sample collection.",
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
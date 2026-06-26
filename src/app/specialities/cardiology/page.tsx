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
      <section className="bg-gradient-to-r from-rose-600 to-rose-900 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=2000')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">Cardiology</span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">Advanced Cardiac Risk &amp; Heart Health Testing in Bengaluru</h1>
            <p className="text-rose-100 text-base md:text-lg mb-8 leading-relaxed">
              Comprehensive lipid panels, cardiac biomarkers, inflammation markers, and advanced cardiovascular risk profiling — with expert-reviewed reports and home sample collection.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#test-profiles" className="bg-white text-rose-700 font-bold px-5 py-2.5 rounded-full hover:bg-rose-50 transition-colors text-sm">View Test Profiles</a>
              <Link href="/book" className="bg-rose-500 border-2 border-white text-white font-bold px-5 py-2.5 rounded-full hover:bg-rose-400 transition-colors text-sm">Book a Test</Link>
              <Link href="/upload-prescription" className="border-2 border-white/60 text-white font-bold px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors text-sm">Upload Prescription</Link>
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
            <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-blue-900">Who Should Take These Tests?</h2>
              </div>
              <ul className="space-y-2 text-sm text-blue-800">
                {["Adults over 40 for annual cardiovascular risk assessment","Patients with hypertension, diabetes, or obesity","Individuals with a family history of heart attack or stroke","Smokers and those with sedentary lifestyles","Patients on statins requiring lipid monitoring","Anyone with chest pain, breathlessness, or palpitations (doctor-referred)","Post-angioplasty or cardiac event follow-up monitoring"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </section>

            {/* Test Profiles */}
            <section id="test-profiles">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Heart className="w-6 h-6 text-rose-600" /> Cardiology Test Profiles
              </h2>
              <div className="grid gap-5">
                {[
                  { name: "Lipid Profile — Advanced", tests: "Total Cholesterol, HDL, LDL, VLDL, Triglycerides, Apolipoprotein A1 & B, Lp(a), Apo B/A1 Ratio, Non-HDL Cholesterol", tat: "Same Day", sample: "Fasting blood (10–12 hrs)" },
                  { name: "Cardiac Biomarker Panel", tests: "High-Sensitivity Troponin-I, Troponin-T, CK-MB, NT-proBNP, Myoglobin, LDH", tat: "4–6 hrs", sample: "Blood (no fasting)" },
                  { name: "Cardiovascular Risk Screen", tests: "hs-CRP, Homocysteine, Lipoprotein (a), ApoB, ApoA1, Advanced Lipid Profile", tat: "Same Day", sample: "Fasting blood" },
                  { name: "Hypertension Workup", tests: "Plasma Renin Activity, Aldosterone, Serum Electrolytes (Na, K, Cl), Creatinine, Urine Microalbumin, Urine Protein/Creatinine Ratio", tat: "1–2 Days", sample: "Blood + Urine" },
                  { name: "Cardiac Risk Inflammation Markers", tests: "hs-CRP, IL-6, Fibrinogen, ESR, Ferritin", tat: "Same Day", sample: "Blood" },
                ].map((t) => (
                  <div key={t.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-rose-400 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{t.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{t.tests}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> TAT: {t.tat}</span>
                          <span className="flex items-center gap-1"><FlaskConical className="w-3 h-3" /> Sample: {t.sample}</span>
                        </div>
                      </div>
                      <Link href="/book" className="self-start bg-rose-600 text-white font-semibold px-4 py-2 rounded-lg whitespace-nowrap hover:bg-rose-700 transition-colors text-sm">Book Now</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Clinical Usefulness */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Stethoscope className="w-5 h-5 text-rose-600" /> For Clinicians</h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Our cardiology panel supports accurate risk stratification for primary and secondary cardiovascular prevention. Advanced lipid sub-fractions (Lp(a), ApoB) help identify residual risk in patients on statin therapy. Cardiac biomarkers (hs-Troponin, NT-proBNP) support NSTEMI/STEMI evaluation, heart failure diagnosis, and treatment monitoring.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                All reports are reviewed by our consultant biochemist and pathologist. Reports include clinical interpretation notes. Doctor enquiries welcome — call +91 99646 39639.
              </p>
            </section>

            {/* Why QXL */}
            <section className="bg-gradient-to-br from-rose-50 to-white border border-rose-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Why Choose QXL Diagnostics?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <Shield className="w-5 h-5 text-rose-600" />, title: "NABL Certified Laboratory", desc: "Accredited testing with ISO 15189 quality standards ensuring every result is reliable." },
                  { icon: <Microscope className="w-5 h-5 text-rose-600" />, title: "Expert-Reviewed Reports", desc: "Consultant biochemists and pathologists review critical and super speciality panels." },
                  { icon: <Activity className="w-5 h-5 text-rose-600" />, title: "AI-Assisted Diagnostics", desc: "AI-powered result flagging and pattern recognition for faster clinical decisions." },
                  { icon: <CheckCircle className="w-5 h-5 text-rose-600" />, title: "Free Home Collection", desc: "Certified phlebotomists visit your home across Bengaluru at your preferred time." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-0.5 bg-rose-100 p-1.5 rounded-lg flex-shrink-0">{item.icon}</div>
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
            <section className="bg-gradient-to-r from-rose-600 to-rose-800 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Ready to Book Your Cardiac Profile?</h3>
              <p className="text-rose-100 text-sm mb-4">Free home sample collection across Bengaluru. Reports via email and WhatsApp.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book" className="bg-white text-rose-700 font-bold px-5 py-2 rounded-full text-sm hover:bg-rose-50 transition-colors">Book a Test</Link>
                <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="border-2 border-white text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-white/10 transition-colors">WhatsApp Us</a>
                <a href="tel:+919964639639" className="border-2 border-white/60 text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-white/10 transition-colors">📞 Call Now</a>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-gradient-to-br from-rose-600 to-rose-800 text-white rounded-2xl p-5 shadow-lg">
              <h3 className="text-lg font-bold mb-2 text-white">Need help choosing the right test?</h3>
              <p className="text-rose-100 text-xs mb-4">Our consultant team can guide you to the right cardiac profile for your clinical need.</p>
              <a href="tel:+919964639639" className="w-full bg-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-rose-50 transition-colors mb-2 shadow text-sm" style={{ color: '#be123c' }}>📞 Call +91 99646 39639</a>
              <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="w-full border border-rose-400 bg-rose-700 text-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-rose-600 transition-colors text-sm">WhatsApp Us</a>
              <Link href="/upload-prescription" className="mt-2 w-full border border-rose-400 bg-transparent text-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-white/10 transition-colors text-sm"><FileText className="w-4 h-4 mr-2" /> Upload Prescription</Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-base font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Our Specialities</h3>
              <ul className="space-y-2">
                {SPECIALITIES.map(spec => (
                  <li key={spec}>
                    <Link href={`/specialities/${spec.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-gray-600 hover:text-rose-600 text-sm flex items-center justify-between group font-medium">
                      {spec}<ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-rose-400" />
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
              "image": "https://qxldiagnostics.com/image/Logo (1).png"
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
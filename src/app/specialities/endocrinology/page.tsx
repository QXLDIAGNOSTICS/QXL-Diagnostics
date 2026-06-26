"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle, Activity, Stethoscope, Microscope, Shield, Clock, FlaskConical, Users, FileText, Droplet } from 'lucide-react';

const SPECIALITIES = ["Neurology","Hematology","Cardiology","Urology","Endocrinology","Oncology","Infectious Diseases","Women's Health","Gastroenterology","Bone Disorders"];

const faqs = [
  { q: "Why is it important to measure Free T3 and Free T4 instead of just TSH?", a: "TSH is a pituitary screening marker, but measuring Free T3 and Free T4 provides a direct picture of the active hormones circulating in the body. This is crucial for distinguishing subclinical thyroid conditions, monitoring thyroiditis, and tracking medication efficacy." },
  { q: "What are the fasting requirements for reproductive hormone tests?", a: "Generally, reproductive hormones (FSH, LH, Prolactin) do not strictly require fasting, but it is highly recommended to collect samples in the morning (between 8:00 AM and 10:00 AM) due to diurnal variation, particularly for prolactin. Fasting is necessary if insulin, HOMA-IR, or blood sugar is tested in the same panel." },
  { q: "How does the cortisol test work, and why does it specify AM or PM?", a: "Cortisol levels fluctuate naturally throughout the day, peaking in the morning (AM) and dropping to their lowest around midnight (PM). Diurnal testing (AM/PM samples) helps identify adrenal dysfunction, such as Cushing's Syndrome or Addison's Disease, by checking if this natural rhythm is disrupted." },
  { q: "What preparation is needed for growth hormone testing?", a: "Growth hormone secretion is highly pulsatile. A resting period of 30 minutes prior to blood collection is often recommended to minimize stress-induced spikes. Fasting of 10-12 hours is required for concurrent insulin/IGF-1 testing." }
];

export default function EndocrinologyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-sky-600 to-sky-900 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">Endocrinology</span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">Advanced Endocrine &amp; Hormonal Testing in Bengaluru</h1>
            <p className="text-sky-100 text-base md:text-lg mb-8 leading-relaxed">
              Highly sensitive assays for thyroid function, diabetes monitoring, adrenal outputs, and reproductive health — featuring advanced immunoassays and expert biochemist reporting.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#test-profiles" className="bg-white text-sky-800 font-bold px-5 py-2.5 rounded-full hover:bg-sky-50 transition-colors text-sm">View Test Profiles</a>
              <Link href="/book" className="bg-sky-500 border-2 border-white text-white font-bold px-5 py-2.5 rounded-full hover:bg-sky-400 transition-colors text-sm">Book a Test</Link>
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
          <span className="text-gray-800 font-semibold">Endocrinology</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Intro */}
            <section>
              <p className="text-gray-700 text-lg leading-relaxed">
                Hormones act as the body's chemical messengers, regulating metabolism, reproduction, growth, and mood. QXL Diagnostics provides a comprehensive endocrinology testing suite utilizing state-of-the-art chemiluminescent immunoassays (CLIA) to deliver highly precise, clinically actionable results.
              </p>
            </section>

            {/* Who Should Take */}
            <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-blue-900">Who Should Take These Tests?</h2>
              </div>
              <ul className="space-y-2 text-sm text-blue-800">
                {[
                  "Individuals showing signs of thyroid disorders (sudden weight changes, fatigue, dry skin, temperature intolerance)",
                  "Patients requiring routine diabetes management or monitoring (glycemic tracking, HOMA-IR/insulin sensitivity)",
                  "Women experiencing PCOS symptoms, irregular periods, hirsutism, or fertility concerns",
                  "Men suffering from chronic fatigue, low libido, or muscle mass loss (testosterone monitoring)",
                  "Patients with suspected adrenal gland issues (diurnal cortisol shifts, BP fluctuations)",
                  "Children with suspected growth hormone delays or developmental concerns"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </section>

            {/* Test Profiles */}
            <section id="test-profiles">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Droplet className="w-6 h-6 text-sky-600" /> Endocrinology Test Profiles
              </h2>
              <div className="grid gap-5">
                {[
                  { name: "Thyroid Profile — Advanced", tests: "Free T3, Free T4, Ultrasensitive TSH, Anti-TPO Antibodies, Anti-TG (Thyroglobulin) Antibodies", tat: "Same Day", sample: "Blood (no fasting required)" },
                  { name: "Diabetes & Glycemic Care Panel", tests: "Fasting Blood Sugar, Post-Prandial Blood Sugar, HbA1c, Average Blood Glucose (eAG), Fasting Insulin, C-Peptide, HOMA-IR Index", tat: "Same Day", sample: "Fasting blood (10–12 hrs) + PP blood" },
                  { name: "Reproductive Hormone Profile", tests: "FSH, LH, Prolactin, Estradiol, Progesterone, Free & Total Testosterone, Sex Hormone Binding Globulin (SHBG)", tat: "Same Day", sample: "Blood (morning sample recommended)" },
                  { name: "Adrenal Function Panel", tests: "Cortisol (AM & PM), ACTH, DHEA-Sulfate, Aldosterone, Renin Activity", tat: "1–2 Days", sample: "Blood (specific timing required)" },
                  { name: "Growth & Metabolic Regulation", tests: "Growth Hormone (GH), Insulin-like Growth Factor-1 (IGF-1), IGFBP-3", tat: "2 Days", sample: "Fasting blood" }
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
                Our endocrine laboratory employs advanced immunoassay testing platforms featuring high specificity and sensitivity. Autoimmune panels such as Anti-TPO and Anti-Thyroglobulin support early diagnosis of Hashimoto's and Graves' disease. Diurnal Cortisol and ACTH mapping offer precise indicators for hypothalamic-pituitary-adrenal (HPA) axis disorders.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                All hormone results are verified by senior pathologists and biochemists, integrating age- and gender-specific reference ranges. Clinician-to-lab consultation is available for case discussions — call +91 99646 39639.
              </p>
            </section>

            {/* Why QXL */}
            <section className="bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Why Choose QXL Diagnostics?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <Shield className="w-5 h-5 text-sky-600" />, title: "NABL Accredited & Certified", desc: "Equipped with state-of-the-art instruments meeting NABL/ISO 15189 standards." },
                  { icon: <Microscope className="w-5 h-5 text-sky-600" />, title: "Hormonal Assays Specialists", desc: "Expert-reviewed results utilizing chemiluminescence for premium specificity." },
                  { icon: <Activity className="w-5 h-5 text-sky-600" />, title: "AI-Powered Diagnostics", desc: "Smart interpretation and result flagging systems for clinical correlation." },
                  { icon: <CheckCircle className="w-5 h-5 text-sky-600" />, title: "Certified Phlebotomists", desc: "Painless home sample collection at your convenience across Bengaluru." }
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
            <section className="bg-gradient-to-r from-sky-600 to-sky-800 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Book Your Endocrine/Hormone Test Today</h3>
              <p className="text-sky-100 text-sm mb-4">Free home sample collection available across Bengaluru. Digitally verified reports via WhatsApp.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book" className="bg-white text-sky-800 font-bold px-5 py-2 rounded-full text-sm hover:bg-sky-50 transition-colors">Book a Test</Link>
                <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="border-2 border-white text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-white/10 transition-colors">WhatsApp Us</a>
                <a href="tel:+919964639639" className="border-2 border-white/60 text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-white/10 transition-colors">📞 Call Now</a>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-gradient-to-br from-sky-600 to-sky-800 text-white rounded-2xl p-5 shadow-lg">
              <h3 className="text-lg font-bold mb-2 text-white">Need help choosing the right test?</h3>
              <p className="text-sky-100 text-xs mb-4">Our medical consultant team can guide you to the right diagnostic profile for your symptoms.</p>
              <a href="tel:+919964639639" className="w-full bg-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-sky-50 transition-colors mb-2 shadow text-sm" style={{ color: '#0369a1' }}>📞 Call +91 99646 39639</a>
              <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="w-full border border-sky-400 bg-sky-700 text-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-sky-600 transition-colors text-sm">WhatsApp Us</a>
              <Link href="/upload-prescription" className="mt-2 w-full border border-sky-400 bg-transparent text-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-white/10 transition-colors text-sm"><FileText className="w-4 h-4 mr-2" /> Upload Prescription</Link>
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
            "serviceType": "Advanced Endocrine &amp; Hormonal Testing in Bengaluru",
            "provider": {
              "@type": "MedicalClinic",
              "name": "QXL Diagnostics",
              "image": "https://qxldiagnostics.com/image/Logo (1).png"
            },
            "areaServed": {
              "@type": "City",
              "name": "Bengaluru"
            },
            "description": "Highly sensitive assays for thyroid function, diabetes monitoring, adrenal outputs, and reproductive health — featuring advanced immunoassays and expert biochemist reporting.",
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
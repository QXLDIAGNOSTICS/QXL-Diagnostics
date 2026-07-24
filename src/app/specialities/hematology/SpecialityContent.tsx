"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle, Activity, Stethoscope, Microscope, Shield, Clock, FlaskConical, Users, FileText, Droplet } from 'lucide-react';

const SPECIALITIES = ["Neurology","Hematology","Cardiology","Urology","Endocrinology","Oncology","Infectious Diseases","Women's Health","Gastroenterology","Bone Disorders"];

const faqs = [
  { q: "What does the HPLC test check for, and why is it preferred?", a: "HPLC (High-Performance Liquid Chromatography) is the gold standard for separating and quantifying hemoglobin fractions. It is highly preferred because it accurately detects abnormal hemoglobin variants like HbS (Sickle Cell), HbE, or elevated HbA2 levels, which are diagnostic markers for thalassemia traits." },
  { q: "Why is a peripheral blood smear examination done along with a CBC?", a: "While automated counters provide highly accurate cell counts, a peripheral smear involves a consultant pathologist physically reviewing the blood cells under a microscope. This is critical for identifying cell shape abnormalities (like target cells, tear-drop cells, or sickled cells) and detecting immature cells or parasites." },
  { q: "How often should a patient on blood thinners get their PT/INR checked?", a: "Patients on oral anticoagulants (like Warfarin) typically require frequent testing (weekly) when starting therapy. Once a stable therapeutic dose is achieved, the testing frequency can be adjusted to every 2 to 4 weeks or as advised by the clinician." },
  { q: "Do I need to fast for an anemia or iron profile?", a: "A standard CBC does not require fasting. However, if your test includes Iron Studies (Serum Iron, TIBC, Ferritin), a 10-12 hour fast is strongly recommended, as iron levels are highly affected by recent food intake and exhibit diurnal variation (highest in the morning)." }
];

export default function HematologyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="glass-panel text-[#0c4a6e] py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2000')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#2563eb] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">Hematology</span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#0c4a6e] leading-tight">Advanced Blood &amp; Coagulation Diagnostics in Bengaluru</h1>
            <p className="text-slate-700 text-base md:text-lg mb-8 leading-relaxed font-medium">
              Complete blood count profiling, hemoglobin variants screening via HPLC, clotting assays, and consultant-reviewed peripheral smears for precise hematology care.
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
          <span className="text-gray-800 font-semibold">Hematology</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Intro */}
            <section>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our hematology department specializes in assessing red blood cells, white blood cells, platelets, and the coagulation cascade. With advanced cell counters and a dedicated hematopathologist review system, we ensure accurate screening for anemias, hemoglobinopathies, and coagulation disorders.
              </p>
            </section>

            {/* Who Should Take */}
            <section className="bg-sky-50 border border-sky-150 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-sky-700" />
                <h2 className="text-lg font-bold text-sky-950">Who Should Take These Tests?</h2>
              </div>
              <ul className="space-y-2 text-sm text-sky-900">
                {[
                  "Individuals experiencing chronic weakness, severe fatigue, or unexplained paleness (anemia screening)",
                  "Patients experiencing frequent nosebleeds, gum bleeding, easy bruising, or heavy menstrual cycles",
                  "Couples planning a family wishing to screen for Thalassemia minor or Sickle Cell traits",
                  "Patients on anticoagulant therapy (such as Warfarin, Acitrom) requiring routine PT/INR monitoring",
                  "Patients with suspected deep vein thrombosis (DVT) or clotting risks requiring coagulation profiling",
                  "Individuals with unexplained fever, recurrent infections, or swollen lymph nodes"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </section>

            {/* Test Profiles */}
            <section id="test-profiles">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Droplet className="w-6 h-6 text-sky-600" /> Hematology Test Profiles
              </h2>
              <div className="grid gap-5">
                {[
                  { name: "Complete Blood Count (CBC) with Peripheral Smear", tests: "Hemoglobin, RBC Count, Hematocrit, MCV, MCH, MCHC, WBC Count (Total & Differential), Platelet Count, RDW, Pathologist Peripheral Smear Review", tat: "Same Day", sample: "Whole blood (EDTA)" },
                  { name: "Anemia Evaluation Profile — Extended", tests: "CBC, Serum Iron, Total Iron Binding Capacity (TIBC), Transferrin Saturation, Ferritin, Vitamin B12, Folic Acid, Active B12", tat: "Same Day", sample: "Fasting blood (10-12 hrs)" },
                  { name: "Coagulation Profile", tests: "Prothrombin Time (PT) with INR, Activated Partial Thromboplastin Time (APTT), Plasma Fibrinogen, D-Dimer, Bleeding & Clotting Time", tat: "4–6 hrs", sample: "Citrate plasma blood" },
                  { name: "Thalassemia & Hemoglobinopathy Screen", tests: "Hb HPLC (High-Performance Liquid Chromatography), Hemoglobin Electrophoresis, CBC, Reticulocyte Count, Peripheral Smear", tat: "Same Day", sample: "Whole blood (EDTA)" },
                  { name: "Bleeding Disorders Workup", tests: "Platelet Aggregation Studies, Factor VIII Assay, Factor IX Assay, Von Willebrand Factor (vWF) Antigen", tat: "2 Days", sample: "Blood (pre-arranged)" }
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
                Our hematology department combines automated flow-cytometric cell counting with mandatory pathologist-led slide review for all flag-raised cases. HPLC analysis provides highly resolution curves for hemoglobin variants (HbF, HbA2, HbS) for differential diagnosis of beta-thalassemia and structural hemoglobin mutations.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Critical results (such as platelets &lt; 20,000/µL or presence of blasts) are immediately communicated to the referring clinician via our emergency alert pathway. Contact our pathology team at +91 99646 39639.
              </p>
            </section>

            {/* Why QXL */}
            <section className="bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Why Choose QXL Diagnostics?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <Shield className="w-5 h-5 text-sky-600" />, title: "NABL Certified Excellence", desc: "Rigorous internal and external quality control programs ensuring reliable blood metrics." },
                  { icon: <Microscope className="w-5 h-5 text-sky-600" />, title: "Consultant Pathologist Verification", desc: "Every blood smear flag is manually reviewed under microscopy by our experts." },
                  { icon: <Activity className="w-5 h-5 text-sky-600" />, title: "HPLC Gold Standard Testing", desc: "High-resolution liquid chromatography for accurate thalassemia trait mapping." },
                  { icon: <CheckCircle className="w-5 h-5 text-sky-600" />, title: "Safe & Painless Extraction", desc: "Certified phlebotomists trained in pediatric and geriatric blood draws at home." }
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
              <h3 className="text-xl md:text-2xl font-extrabold mb-2 text-white">Book Your Hematology Test Today</h3>
              <p className="text-sky-100 text-sm md:text-base mb-6 font-medium leading-relaxed">Fast same-day digital reports. Safe home collection available across Bengaluru.</p>
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
              <p className="text-sky-100 text-xs mb-5 font-medium leading-relaxed">Our medical consultant team can guide you to the right diagnostic profile for your symptoms.</p>
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
            "serviceType": "Advanced Blood &amp; Coagulation Diagnostics in Bengaluru",
            "provider": {
              "@type": "MedicalClinic",
              "name": "QXL Diagnostics",
              "image": "https://res.cloudinary.com/btjglif5/image/upload/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png"
            },
            "areaServed": {
              "@type": "City",
              "name": "Bengaluru"
            },
            "description": "Complete blood count profiling, hemoglobin variants screening via HPLC, clotting assays, and consultant-reviewed peripheral smears for precise hematology care.",
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
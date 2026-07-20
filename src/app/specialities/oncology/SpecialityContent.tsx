"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle, Activity, Stethoscope, Microscope, Shield, Clock, FlaskConical, Users, FileText } from 'lucide-react';

const SPECIALITIES = ["Neurology","Hematology","Cardiology","Urology","Endocrinology","Oncology","Infectious Diseases","Women's Health","Gastroenterology","Bone Disorders"];

const faqs = [
  { q: "Can tumor markers be elevated in non-cancerous conditions?", a: "Yes, tumor markers can be elevated in benign inflammatory or infectious conditions. For example, PSA can be elevated in benign prostatic hyperplasia (BPH) or prostatitis, and CA-125 can rise during menstruation, pregnancy, or endometriosis. Therefore, results must be interpreted by a specialist clinician." },
  { q: "What is the ROMA Index and why is it preferred over CA-125 alone?", a: "The ROMA (Risk of Ovarian Malignancy Algorithm) combines HE4 (Human Epididymis Protein 4) and CA-125 along with menopausal status. Because HE4 is significantly less likely to be elevated in benign gynecological conditions than CA-125, the ROMA index offers higher specificity for distinguishing ovarian cancer from benign pelvic masses." },
  { q: "How are tumor markers used to monitor cancer treatment?", a: "Prior to starting treatment, a baseline level of the specific tumor marker is established. During or after therapy (surgery, chemotherapy, or radiation), the marker is measured at regular intervals. A declining trend suggests treatment efficacy, while rising levels may indicate disease recurrence." },
  { q: "Do I need to fast for tumor marker tests?", a: "Most tumor marker blood tests (PSA, CA-125, CEA, CA 19-9) do not require fasting. However, if they are ordered alongside other metabolic or lipid panels, fasting of 10–12 hours may be required." }
];

export default function OncologyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-violet-750 to-sky-950 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1579156492187-c374b2739e91?q=80&w=2000')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">Oncology</span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#0c4a6e] leading-tight">Advanced Tumor Marker &amp; Cancer Risk Assays in Bengaluru</h1>
            <p className="text-violet-100 text-base md:text-lg mb-8 leading-relaxed">
              Highly sensitive screening markers, ovarian malignancy indexes (ROMA), and post-therapy surveillance testing reviewed by consultant pathologists.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#test-profiles" className="bg-white text-violet-850 font-bold px-5 py-2.5 rounded-full hover:bg-violet-50 transition-colors text-sm" style={{ color: '#0284c7' }}>View Test Profiles</a>
              <Link href="/book" className="bg-violet-600 border-2 border-white text-white font-bold px-5 py-2.5 rounded-full hover:bg-violet-500 transition-colors text-sm">Book a Test</Link>
              <Link href="/upload-prescription" className="border-2 border-white/60 text-white font-bold px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors text-sm">Upload Prescription</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center text-xs text-gray-500 flex-wrap gap-1">
          <Link href="/" className="hover:text-violet-650">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/specialities" className="hover:text-violet-650">Our Specialities</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-semibold">Oncology</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Intro */}
            <section>
              <p className="text-gray-700 text-lg leading-relaxed">
                Early detection and rigorous surveillance are vital components of modern oncology care. QXL Diagnostics provides NABL accredited tumor marker testing, employing advanced chemiluminescent immunoassay (CLIA) platforms to ensure highly reproducible quantitative results.
              </p>
            </section>

            {/* Who Should Take */}
            <section className="bg-violet-50 border border-violet-150 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-violet-750" />
                <h2 className="text-lg font-bold text-violet-950">Who Should Take These Tests?</h2>
              </div>
              <ul className="space-y-2 text-sm text-violet-900">
                {[
                  "Patients currently undergoing cancer therapy (chemotherapy, radiation, or surgical monitoring)",
                  "Individuals in post-treatment surveillance to monitor for potential disease recurrence",
                  "Men over the age of 50 (or 45 with a family history) undergoing routine prostate checks (PSA)",
                  "Women with pelvic masses or ovarian cysts requiring risk evaluation (CA-125 & HE4 ROMA index)",
                  "Individuals with a strong family history of hereditary cancers under clinical guidance",
                  "Patients presenting with unexplained symptoms requiring rule-out diagnostic investigations"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </section>

            {/* Test Profiles */}
            <section id="test-profiles">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Microscope className="w-6 h-6 text-violet-600" /> Oncology Test Profiles
              </h2>
              <div className="grid gap-5">
                {[
                  { name: "Male Tumor Marker Panel", tests: "PSA (Prostate), CEA (Colon/Lungs), AFP (Liver/Testes), CA 19-9 (Pancreas/Biliary)", tat: "Same Day", sample: "Blood (no fasting)" },
                  { name: "Female Tumor Marker Panel", tests: "CA 125 (Ovarian), CA 15-3 (Breast), CEA (Colon/Lungs), AFP (Liver/Germ Cell), CA 19-9", tat: "Same Day", sample: "Blood (no fasting)" },
                  { name: "Ovarian Malignancy Screen (ROMA Index)", tests: "Human Epididymis Protein 4 (HE4), Cancer Antigen 125 (CA 125), Risk of Ovarian Malignancy Algorithm calculation", tat: "Same Day", sample: "Blood (no fasting)" },
                  { name: "Prostate Health Profile", tests: "Total PSA, Free PSA, Free-to-Total PSA Ratio", tat: "Same Day", sample: "Blood (avoid testing immediately after physical examination)" },
                  { name: "Gastrointestinal Oncology Panel", tests: "CEA, CA 19-9, CA 72-4, AFP", tat: "1 Day", sample: "Blood" }
                ].map((t) => (
                  <div key={t.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-violet-400 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{t.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{t.tests}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> TAT: {t.tat}</span>
                          <span className="flex items-center gap-1"><FlaskConical className="w-3 h-3" /> Sample: {t.sample}</span>
                        </div>
                      </div>
                      <Link href="/book" className="self-start bg-violet-600 text-white font-semibold px-4 py-2 rounded-lg whitespace-nowrap hover:bg-violet-750 transition-colors text-sm">Book Now</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Clinical Usefulness */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Stethoscope className="w-5 h-5 text-violet-600" /> For Clinicians</h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Our oncology testing suite is processed on high-throughput immunoassay analyzers with strict calibration verification. While tumor markers are primary tools for monitoring therapeutic efficacy and detecting residual disease, combining HE4 and CA-125 within the ROMA algorithm significantly improves preoperative triage of ovarian masses in postmenopausal patients.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Critical results are flagged and immediately routed to the referring oncologist. Case-related medical consultations are available via +91 99646 39639.
              </p>
            </section>

            {/* Why QXL */}
            <section className="bg-gradient-to-br from-violet-50 to-white border border-violet-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Why Choose QXL Diagnostics?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <Shield className="w-5 h-5 text-violet-600" />, title: "NABL Certified Lab", desc: "Meets international standards for diagnostic testing and quality assurance." },
                  { icon: <Microscope className="w-5 h-5 text-violet-600" />, title: "High-Sensitivity Assays", desc: "Using advanced chemiluminescence platforms for precise result quantification." },
                  { icon: <Activity className="w-5 h-5 text-violet-600" />, title: "Consultant-Reviewed Reports", desc: "Expert biochemists and pathologists verify every critical tumor marker profile." },
                  { icon: <CheckCircle className="w-5 h-5 text-violet-600" />, title: "Home Collection Service", desc: "Safe, sterile home collections across Bengaluru by NABL-certified phlebotomists." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-0.5 bg-violet-100 p-1.5 rounded-lg flex-shrink-0">{item.icon}</div>
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
            <section className="bg-gradient-to-r from-violet-700 to-sky-900 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Book Your Oncology Marker Panel</h3>
              <p className="text-violet-100 text-sm mb-4">Accurate testing with fast, consultant-reviewed digital reports. Home collection available.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book" className="bg-white text-violet-750 font-bold px-5 py-2 rounded-full text-sm hover:bg-violet-50 transition-colors">Book a Test</Link>
                <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="border-2 border-white text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-white/10 transition-colors">WhatsApp Us</a>
                <a href="tel:+919964639639" className="border-2 border-white/60 text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-white/10 transition-colors">📞 Call Now</a>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-gradient-to-br from-violet-700 to-sky-950 text-white rounded-2xl p-5 shadow-lg">
              <h3 className="text-lg font-bold mb-2 text-white">Need help choosing the right test?</h3>
              <p className="text-violet-100 text-xs mb-4">Our medical consultant team can guide you to the right diagnostic profile for your symptoms.</p>
              <a href="tel:+919964639639" className="w-full bg-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-violet-50 transition-colors mb-2 shadow text-sm" style={{ color: '#0284c7' }}>📞 Call +91 99646 39639</a>
              <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="w-full border border-violet-400 bg-violet-800 text-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-violet-750 transition-colors text-sm">WhatsApp Us</a>
              <Link href="/upload-prescription" className="mt-2 w-full border border-violet-400 bg-transparent text-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-white/10 transition-colors text-sm"><FileText className="w-4 h-4 mr-2" /> Upload Prescription</Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-base font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Our Specialities</h3>
              <ul className="space-y-2">
                {SPECIALITIES.map(spec => (
                  <li key={spec}>
                    <Link href={`/specialities/${spec.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-gray-600 hover:text-violet-650 text-sm flex items-center justify-between group font-medium">
                      {spec}<ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-violet-400" />
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
            "serviceType": "Advanced Tumor Marker &amp; Cancer Risk Assays in Bengaluru",
            "provider": {
              "@type": "MedicalClinic",
              "name": "QXL Diagnostics",
              "image": "https://res.cloudinary.com/btjglif5/image/upload/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png"
            },
            "areaServed": {
              "@type": "City",
              "name": "Bengaluru"
            },
            "description": "Highly sensitive screening markers, ovarian malignancy indexes (ROMA), and post-therapy surveillance testing reviewed by consultant pathologists.",
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
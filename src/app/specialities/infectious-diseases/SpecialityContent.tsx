"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle, Activity, Stethoscope, Microscope, Shield, Clock, FlaskConical, Users, FileText } from 'lucide-react';

const SPECIALITIES = ["Neurology","Hematology","Cardiology","Urology","Endocrinology","Oncology","Infectious Diseases","Women's Health","Gastroenterology","Bone Disorders"];

const faqs = [
  { q: "What is a multiplex PCR test, and why is it useful?", a: "A multiplex PCR test allows the laboratory to amplify and detect genetic material from multiple viruses, bacteria, or fungi simultaneously from a single sample. It is highly useful because it identifies the exact pathogen causing respiratory or gastrointestinal infections within hours, helping clinicians avoid unnecessary antibiotic use." },
  { q: "What is the difference between Dengue NS1 and IgG/IgM tests?", a: "Dengue NS1 antigen is a marker of active viral replication and is detectable in the blood from day 1 to day 5 of the fever. Dengue IgM antibodies typically appear after day 4–5, indicating acute response, while IgG antibodies develop later and represent past exposure or secondary infection." },
  { q: "How is the TB QuantiFERON Gold test different from a skin test?", a: "The QuantiFERON Gold is an interferon-gamma release assay (IGRA) blood test. Unlike the traditional Mantoux skin test, it requires only a single blood draw, is not affected by prior BCG vaccination, and has a much higher specificity, reducing false-positive results." },
  { q: "What is the turnaround time for blood cultures?", a: "While serology and PCR tests can be reported within a few hours, blood culture and sensitivity testing typically takes 24 to 48 hours for initial growth detection, and up to 5 days to confirm a negative result. This ensures we do not miss slow-growing bacteria." }
];

export default function InfectiousDiseasesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="glass-panel text-[#0c4a6e] py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=2000')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">Infectious Diseases</span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#0c4a6e] leading-tight">Advanced serology &amp; Molecular PCR Testing in Bengaluru</h1>
            <p className="text-[#0369a1] text-base md:text-lg mb-8 leading-relaxed">
              Rapid multiplex PCR assays, automated culture systems, and sensitive serology panels for precise viral, bacterial, and parasitic identification.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#test-profiles" className="bg-white text-sky-850 font-bold px-5 py-2.5 rounded-full hover:bg-sky-50 transition-colors text-sm" style={{ color: '#0284c7' }}>View Test Profiles</a>
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
          <span className="text-gray-800 font-semibold">Infectious Diseases</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Intro */}
            <section>
              <p className="text-gray-700 text-lg leading-relaxed">
                Prompt detection of pathogens is critical to managing acute infections and preventing secondary complications. QXL Diagnostics provides NABL accredited molecular (PCR) and serological testing, utilizing rapid assays to deliver fast, highly accurate results.
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
                  "Patients experiencing acute, unexplained fever lasting more than 3 days",
                  "Individuals requiring surgical or pre-pregnancy screenings for blood-borne pathogens (HIV, Hep B/C)",
                  "Patients with chronic respiratory symptoms requiring molecular pathogen differentiation",
                  "Individuals with a history of exposure to tuberculosis or presenting with chronic cough",
                  "Individuals seeking confidential screening for sexually transmitted infections (STIs)",
                  "Patients with suspected atypical or tropical infections (Typhoid, Leptospirosis, Scrub Typhus)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </section>

            {/* Test Profiles */}
            <section id="test-profiles">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Microscope className="w-6 h-6 text-sky-600" /> Infectious Diseases Test Profiles
              </h2>
              <div className="grid gap-5">
                {[
                  { name: "Fever Panel — Extended", tests: "Dengue NS1 Antigen, Dengue IgG/IgM, Malaria Antigen (Pf/Pv), Typhoid TyphiDot IgM/IgG, Complete Blood Count (CBC) with ESR, Urine Routine & Microscopy", tat: "4–6 hrs", sample: "Blood + Urine" },
                  { name: "Hepatitis Serology Profile", tests: "HBsAg (Hepatitis B Surface Antigen), Anti-HCV (Hepatitis C Antibody), Hepatitis A IgM, Hepatitis E IgM", tat: "Same Day", sample: "Blood (no fasting)" },
                  { name: "Tuberculosis (TB) Gold Panel", tests: "TB QuantiFERON Gold (IGRA), Mycobacterium Tuberculosis PCR, Acid-Fast Bacilli (AFB) Smear & Culture", tat: "Same Day (PCR) / culture up to 5 days", sample: "Blood / Sputum / CSF" },
                  { name: "STI/STD Comprehensive PCR Screen", tests: "Chlamydia trachomatis PCR, Neisseria gonorrhoeae PCR, Trichomonas vaginalis PCR, Syphilis VDRL/RPR, HIV 1 & 2 ELISA", tat: "1 Day", sample: "Urine / Swab / Blood" },
                  { name: "Respiratory Multiplex PCR Panel", tests: "Detection of 20+ viral and bacterial pathogens including Influenza A & B, RSV, Adenovirus, SARS-CoV-2, Mycoplasma pneumoniae", tat: "12–24 hrs", sample: "Nasopharyngeal swab" }
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
                Our infectious disease division utilizes rapid syndromic molecular testing (FilmArray PCR panels) alongside standard bacterial culture systems. By identifying causative viral or bacterial agents within hours, we assist clinicians in implementing early targeted therapy, enhancing antimicrobial stewardship, and minimizing empirical over-prescribing.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                All positive blood and sterile fluid cultures are immediately flagged for critical notification to ensure patient safety. Microbiologist consultations are available at +91 99646 39639.
              </p>
            </section>

            {/* Why QXL */}
            <section className="bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Why Choose QXL Diagnostics?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <Shield className="w-5 h-5 text-sky-600" />, title: "NABL Accredited Quality", desc: "Rigorous quality controls and inter-laboratory testing ensuring highest accuracy." },
                  { icon: <Microscope className="w-5 h-5 text-sky-600" />, title: "Molecular PCR Capabilities", desc: "Equipped with state-of-the-art thermocyclers for fast diagnostic assays." },
                  { icon: <Activity className="w-5 h-5 text-sky-600" />, title: "Antimicrobial Guidance", desc: "Susceptibility reports utilize current clinical standards for prescribing." },
                  { icon: <CheckCircle className="w-5 h-5 text-sky-600" />, title: "Free Home Collection", desc: "Professional phlebotomists trained in sterile sample collection protocols." }
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
            <section className="glass rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Book Your Infectious Disease Panel</h3>
              <p className="text-[#0369a1] text-sm mb-4">Same-day reports for routine serology and molecular tests. Home collection available across Bengaluru.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book" className="bg-white text-sky-700 font-bold px-5 py-2 rounded-full text-sm hover:bg-sky-50 transition-colors">Book a Test</Link>
                <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="border-2 border-white text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-white/10 transition-colors">WhatsApp Us</a>
                <a href="tel:+919964639639" className="border-2 border-white/60 text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-white/10 transition-colors">📞 Call Now</a>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            <div className="glass text-[#0c4a6e] rounded-2xl p-5 shadow-lg">
              <h3 className="text-lg font-bold mb-2 text-white">Need help choosing the right test?</h3>
              <p className="text-[#0369a1] text-xs mb-4">Our medical consultant team can guide you to the right diagnostic profile for your symptoms.</p>
              <a href="tel:+919964639639" className="w-full bg-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-sky-50 transition-colors mb-2 shadow text-sm" style={{ color: '#0284c7' }}>📞 Call +91 99646 39639</a>
              <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="w-full border border-sky-400 bg-sky-800 text-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-sky-750 transition-colors text-sm">WhatsApp Us</a>
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
            "serviceType": "Advanced serology &amp; Molecular PCR Testing in Bengaluru",
            "provider": {
              "@type": "MedicalClinic",
              "name": "QXL Diagnostics",
              "image": "https://res.cloudinary.com/btjglif5/image/upload/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png"
            },
            "areaServed": {
              "@type": "City",
              "name": "Bengaluru"
            },
            "description": "Rapid multiplex PCR assays, automated culture systems, and sensitive serology panels for precise viral, bacterial, and parasitic identification.",
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
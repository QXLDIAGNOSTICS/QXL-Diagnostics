"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle, Activity, Stethoscope, Microscope, Shield, Clock, FlaskConical, Users, FileText, Brain } from 'lucide-react';

const SPECIALITIES = ["Neurology","Hematology","Cardiology","Urology","Endocrinology","Oncology","Infectious Diseases","Women's Health","Gastroenterology","Bone Disorders"];

const faqs = [
  { q: "What neurological tests do you offer at QXL Diagnostics?", a: "We offer comprehensive neuropathy panels, autoimmune neurology workup (Anti-NMDA, Anti-AQP4, Anti-MOG), Myasthenia Gravis panel (AChR, MuSK antibodies), CSF analysis, meningitis/encephalitis PCR panels, paraneoplastic antibody screens, and nutritional neurology assessment (B12, Folate, Vitamin D)." },
  { q: "When should a doctor order autoimmune neurology tests?", a: "Autoimmune neurology panels are indicated in patients with subacute onset of encephalopathy, unexplained seizures, movement disorders, psychiatric symptoms, or peripheral neuropathy without a clear cause — especially when imaging is normal or inconclusive." },
  { q: "How should I prepare for a neuropathy blood test?", a: "Most antibody and molecular panels require no fasting. If the panel includes fasting glucose or metabolic markers, a fasting period of 8–12 hours is required. Inform the phlebotomist of all medications, particularly immunosuppressants." },
  { q: "What is the difference between ANA and specific neuro-antibody panels?", a: "ANA (Anti-Nuclear Antibody) is a broad screening test for autoimmune conditions. Specific neurology panels (Anti-NMDA, Anti-AQP4, Anti-MOG, AChR) target antibodies that directly attack the nervous system and are far more specific for autoimmune neurological diseases." },
];

export default function NeurologyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="glass-panel text-[#0c4a6e] py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2000')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#2563eb] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">Neurology</span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#0c4a6e] leading-tight">Advanced Neurology &amp; Autoimmune Neurology Testing in Bengaluru</h1>
            <p className="text-slate-700 text-base md:text-lg mb-8 leading-relaxed font-medium">
              Neuropathy panels, autoimmune encephalitis workup, CSF analysis, myasthenia gravis testing, and paraneoplastic antibody profiling — with expert-reviewed reports and home sample collection.
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
          <span className="text-gray-800 font-semibold">Neurology</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            <section>
              <p className="text-gray-700 text-lg leading-relaxed">
                QXL Diagnostics offers advanced neurology diagnostic testing for clinicians managing complex neurological disorders. Our panels cover autoimmune encephalitis, peripheral neuropathy, myasthenia gravis, multiple sclerosis support, NMO/MOG spectrum disease, and neuro-infectious conditions — all with consultant-reviewed reports.
              </p>
            </section>

            <section className="bg-sky-50 border border-sky-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-bold text-sky-900">Who Should Take These Tests?</h2>
              </div>
              <ul className="space-y-2 text-sm text-sky-800">
                {["Patients with unexplained encephalopathy, seizures, or psychiatric symptoms","Those with subacute limb weakness, sensory loss, or gait disorder","Patients suspected of myasthenia gravis (ptosis, diplopia, fatiguable weakness)","Patients with suspected MS, NMO, or MOG antibody disease","Individuals with peripheral neuropathy (numbness, tingling, weakness in hands/feet)","Patients on chemotherapy requiring neuro-paraneoplastic workup","Referred by neurologist for autoimmune or CSF-based evaluation"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </section>

            <section id="test-profiles">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Brain className="w-6 h-6 text-sky-600" /> Neurology Test Profiles
              </h2>
              <div className="grid gap-5">
                {[
                  { name: "Neuropathy Evaluation Panel", tests: "Vitamin B12, Folate, HbA1c, ANA (IFA), ESR, Blood Sugar (Fasting), Serum Protein Electrophoresis, TSH", tat: "Same Day – 1 Day", sample: "Blood (8 hr fasting for glucose)" },
                  { name: "Autoimmune Encephalitis Panel", tests: "Anti-NMDA Receptor Ab, Anti-CASPR2, Anti-LGI1, Anti-AMPA, Anti-GABA-B, Anti-DPPX (Serum & CSF)", tat: "5–7 Days", sample: "Serum + CSF (neurologist referral)" },
                  { name: "Myasthenia Gravis Panel", tests: "AChR Binding Antibody, AChR Blocking Antibody, AChR Modulating Antibody, Anti-MuSK IgG", tat: "3–5 Days", sample: "Blood" },
                  { name: "NMO / MOG Spectrum Panel", tests: "Anti-AQP4 (NMO-IgG), Anti-MOG IgG (Serum & CSF)", tat: "5–7 Days", sample: "Serum ± CSF" },
                  { name: "Paraneoplastic Neurological Panel", tests: "Anti-Hu, Anti-Yo, Anti-Ri, Anti-CV2, Anti-PNMA1/2, Anti-Amphiphysin", tat: "5–7 Days", sample: "Serum" },
                  { name: "CSF Analysis & Encephalitis PCR", tests: "CSF cell count, Protein, Glucose, Oligoclonal bands, HSV 1&2 PCR, CMV PCR, VZV PCR, Cryptococcal Antigen, CSF Culture", tat: "1–3 Days", sample: "CSF (neurologist/intensivist collected)" },
                  { name: "Encephalitis / Meningitis PCR Panel", tests: "FilmArray Meningitis/Encephalitis Panel — 14 targets (Bacterial, Viral, Fungal)", tat: "Same Day", sample: "CSF" },
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
              <p className="text-gray-700 text-sm leading-relaxed">Our autoimmune neurology panels support neurologists managing encephalopathy, demyelinating diseases, neuromuscular disorders, and paraneoplastic syndromes. Autoantibody testing is performed using validated cell-based assays (CBA) and ELISA platforms. CSF-based diagnostics including oligoclonal bands and encephalitis PCR panels (FilmArray) are available with urgent priority. Doctor enquiries: +91 99646 39639.</p>
            </section>

            <section className="bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Why Choose QXL Diagnostics?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <Shield className="w-5 h-5 text-sky-600" />, title: "NABL Certified Laboratory", desc: "ISO 15189 accredited testing for super speciality panels." },
                  { icon: <Microscope className="w-5 h-5 text-sky-600" />, title: "Expert-Reviewed Reports", desc: "Consultant neurologist-supported reporting and interpretation notes." },
                  { icon: <Activity className="w-5 h-5 text-sky-600" />, title: "Advanced Molecular Platforms", desc: "FilmArray PCR, CBA, ELISA for autoimmune and neuro-infectious testing." },
                  { icon: <CheckCircle className="w-5 h-5 text-sky-600" />, title: "Urgent Priority Processing", desc: "Emergency CSF/autoimmune panel processing available on doctor request." },
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

            <section className="bg-gradient-to-r from-sky-600 to-sky-800 rounded-2xl p-6 md:p-8 text-white shadow-xl">
              <h3 className="text-xl md:text-2xl font-extrabold mb-2 text-white">Book Your Neurology Profile Today</h3>
              <p className="text-sky-100 text-sm md:text-base mb-6 font-medium leading-relaxed">Home collection available. Doctor referral required for CSF-based tests. Reports reviewed by consultant pathologist.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book" className="bg-white font-extrabold px-6 py-3 rounded-full text-sm hover:bg-sky-50 transition-all shadow-md cursor-pointer flex items-center gap-1.5" style={{ color: '#0369a1' }}>
                  Book a Test
                </Link>
                <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="bg-white/15 hover:bg-white/25 border-2 border-white text-white font-extrabold px-6 py-3 rounded-full text-sm transition-all shadow-sm">
                  WhatsApp Us
                </a>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-5">
            <div className="bg-gradient-to-br from-sky-600 to-sky-800 text-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold mb-2 text-white">Need help with neurology testing?</h3>
              <p className="text-sky-100 text-xs mb-5 font-medium leading-relaxed">Our consultants are available for guidance on panel selection and result interpretation.</p>
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
            "serviceType": "Advanced Neurology &amp; Autoimmune Neurology Testing in Bengaluru",
            "provider": {
              "@type": "MedicalClinic",
              "name": "QXL Diagnostics",
              "image": "https://res.cloudinary.com/btjglif5/image/upload/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png"
            },
            "areaServed": {
              "@type": "City",
              "name": "Bengaluru"
            },
            "description": "Neuropathy panels, autoimmune encephalitis workup, CSF analysis, myasthenia gravis testing, and paraneoplastic antibody profiling — with expert-reviewed reports and home sample collection.",
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
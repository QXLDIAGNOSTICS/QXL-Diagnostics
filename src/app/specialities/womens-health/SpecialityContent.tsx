"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle, Activity, Stethoscope, Microscope, Shield, Clock, FlaskConical, Users, FileText, Baby } from 'lucide-react';

const SPECIALITIES = ["Neurology","Hematology","Cardiology","Urology","Endocrinology","Oncology","Infectious Diseases","Women's Health","Gastroenterology","Bone Disorders"];

const faqs = [
  { q: "When is the best time to take a PCOS/PCOD hormone test?", a: "Reproductive hormones (LH, FSH, Estradiol) are best tested on Day 2 or Day 3 of the menstrual cycle for the most accurate baseline. Testosterone, DHEAS, and Prolactin can be tested on any day. AMH can be tested on any day of the cycle." },
  { q: "What is AMH and why is it important?", a: "Anti-Müllerian Hormone (AMH) is produced by ovarian follicles and directly reflects the ovarian reserve — the remaining egg supply. It is essential for fertility assessment, IVF planning, PCOS evaluation, and monitoring the effect of chemotherapy on ovarian function." },
  { q: "What is the Double Marker (First Trimester Screening) test?", a: "The Double Marker test (Beta-hCG + PAPP-A) is performed between weeks 11–14 of pregnancy along with an NT (nuchal translucency) ultrasound. It screens for chromosomal abnormalities including Down syndrome (Trisomy 21) and Edwards syndrome (Trisomy 18) in the foetus." },
  { q: "Do I need to fast for women's health hormone tests?", a: "Most hormone tests (LH, FSH, AMH, Prolactin, Estradiol) do not require fasting. If your panel includes fasting blood sugar, insulin, or lipids, a fasting period of 10–12 hours is required. Please confirm with our team when booking." },
];

export default function WomensHealthPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-pink-600 to-pink-900 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2000')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">Women's Health</span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">Women's Health, Fertility, Pregnancy &amp; Hormone Testing in Bengaluru</h1>
            <p className="text-pink-100 text-base md:text-lg mb-8 leading-relaxed">
              AMH, PCOS screening, antenatal panels, pregnancy markers, fertility hormones, thyroid, menopause testing, and cervical cancer screening — with expert-reviewed reports and home sample collection.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#test-profiles" className="bg-white text-pink-700 font-bold px-5 py-2.5 rounded-full hover:bg-pink-50 transition-colors text-sm">View Test Profiles</a>
              <Link href="/book" className="bg-pink-500 border-2 border-white text-white font-bold px-5 py-2.5 rounded-full hover:bg-pink-400 transition-colors text-sm">Book a Test</Link>
              <Link href="/upload-prescription" className="border-2 border-white/60 text-white font-bold px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors text-sm">Upload Prescription</Link>
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
          <span className="text-gray-800 font-semibold">Women's Health</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <p className="text-gray-700 text-lg leading-relaxed">
                QXL Diagnostics offers a comprehensive range of women's health diagnostics — from PCOS and fertility profiling to antenatal screening, prenatal genetic markers, menopause evaluation, thyroid testing, and cervical cancer screening. All tests are performed with NABL-certified quality and consultant-reviewed reports.
              </p>
            </section>

            <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-blue-900">Who Should Take These Tests?</h2>
              </div>
              <ul className="space-y-2 text-sm text-blue-800">
                {["Women with irregular menstrual cycles, PCOS, or hormonal imbalance","Women planning pregnancy or undergoing IVF/fertility treatment","Pregnant women for antenatal screening (ANC)","Women with infertility or recurrent pregnancy loss","Women approaching or experiencing menopause","Adolescent girls with delayed puberty or menstrual irregularity","Women with thyroid disorders, diabetes, or obesity","Women aged 25+ for cervical cancer screening (Pap smear / HPV PCR)"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </section>

            <section id="test-profiles">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Baby className="w-6 h-6 text-pink-600" /> Women's Health Test Profiles
              </h2>
              <div className="grid gap-5">
                {[
                  { name: "PCOS / PCOD Screening Panel", tests: "LH, FSH, LH/FSH Ratio, Prolactin, Free Testosterone, Total Testosterone, DHEAS, SHBG, Fasting Insulin, Fasting Blood Sugar, HOMA-IR, AMH", tat: "1–2 Days", sample: "Blood — Day 2/3 of cycle (hormone tests)" },
                  { name: "Fertility Hormone Profile", tests: "FSH, LH, Estradiol (E2), Progesterone, AMH, Prolactin, TSH, Inhibin B", tat: "1–2 Days", sample: "Blood — Day 2/3 of cycle" },
                  { name: "Antenatal Profile (ANC Basic)", tests: "Blood Group & Rh Factor, CBC, Blood Sugar (Fasting & PP), HIV, HBsAg, VDRL, Rubella IgG, Urine Culture, TSH", tat: "Same Day – 1 Day", sample: "Blood + Urine" },
                  { name: "First Trimester Screening (Double Marker)", tests: "Beta-hCG (Free), PAPP-A — with NT Ultrasound (Week 11–14)", tat: "Same Day", sample: "Blood" },
                  { name: "Second Trimester Screening (Triple Marker)", tests: "AFP, Beta-hCG, Unconjugated Estriol (uE3) — Week 15–20", tat: "Same Day", sample: "Blood" },
                  { name: "Menopause Health Panel", tests: "FSH, LH, Estradiol (E2), AMH, TSH, Vitamin D (25-OH), Calcium, Bone ALP, Lipid Profile, HbA1c", tat: "Same Day – 1 Day", sample: "Blood" },
                  { name: "Cervical Cancer Screening", tests: "Liquid-Based Cytology (LBC / ThinPrep Pap), High-Risk HPV DNA PCR (14 genotypes), HPV Genotyping (16/18 + others)", tat: "2–3 Days", sample: "Cervical swab (gynecologist collected)" },
                  { name: "Ovarian Cancer Markers", tests: "CA 125, HE4, ROMA Index (CA 125 + HE4 + Menopausal status)", tat: "Same Day", sample: "Blood" },
                ].map((t) => (
                  <div key={t.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-pink-400 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-gray-900 mb-1">{t.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{t.tests}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> TAT: {t.tat}</span>
                          <span className="flex items-center gap-1"><FlaskConical className="w-3 h-3" /> Sample: {t.sample}</span>
                        </div>
                      </div>
                      <Link href="/book" className="self-start bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg whitespace-nowrap hover:bg-pink-700 transition-colors text-sm">Book Now</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><Stethoscope className="w-5 h-5 text-pink-600" /> For Clinicians</h2>
              <p className="text-gray-700 text-sm leading-relaxed">Our women's health panels support gynaecologists, fertility specialists, and endocrinologists. AMH is available any day of cycle. Hormone panels (FSH, LH, E2) are time-sensitive — Day 2/3 collection recommended for baseline. ROMA index (CA 125 + HE4) supports malignancy risk stratification. Prenatal screening reports include risk calculation and are formatted for clinical use. Doctor enquiries: +91 99646 39639.</p>
            </section>

            <section className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Why Choose QXL Diagnostics?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <Shield className="w-5 h-5 text-pink-600" />, title: "NABL Certified Laboratory", desc: "Accredited quality testing for all women's health and fertility panels." },
                  { icon: <Microscope className="w-5 h-5 text-pink-600" />, title: "Expert-Reviewed Reports", desc: "Consultant pathologists review and validate all super speciality results." },
                  { icon: <Activity className="w-5 h-5 text-pink-600" />, title: "Comprehensive Fertility Testing", desc: "AMH, PCOS panel, Double/Triple Marker, and ovarian cancer markers under one roof." },
                  { icon: <CheckCircle className="w-5 h-5 text-pink-600" />, title: "Home Collection Available", desc: "Convenient home blood sample collection across Bengaluru by female phlebotomist (on request)." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-0.5 bg-pink-100 p-1.5 rounded-lg flex-shrink-0">{item.icon}</div>
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

            <section className="bg-gradient-to-r from-pink-600 to-pink-900 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Book Your Women's Health Profile</h3>
              <p className="text-pink-100 text-sm mb-4">Home collection available across Bengaluru. Female phlebotomist on request.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book" className="bg-white text-pink-700 font-bold px-5 py-2 rounded-full text-sm hover:bg-pink-50">Book a Test</Link>
                <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="border-2 border-white text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-white/10">WhatsApp Us</a>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-5">
            <div className="bg-gradient-to-br from-pink-600 to-pink-900 text-white rounded-2xl p-5 shadow-lg">
              <h3 className="text-lg font-bold mb-2 text-white">Fertility or Women's Health Query?</h3>
              <p className="text-pink-100 text-xs mb-4">Our team guides you to the right panel based on your clinical requirement.</p>
              <a href="tel:+919964639639" className="w-full bg-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-pink-50 transition-colors mb-2 shadow text-sm" style={{ color: '#be185d' }}>📞 Call +91 99646 39639</a>
              <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="w-full border border-pink-400 bg-pink-800 text-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-pink-700 transition-colors text-sm">WhatsApp Us</a>
              <Link href="/upload-prescription" className="mt-2 w-full border border-pink-400 text-white font-bold py-2.5 rounded-xl flex justify-center hover:bg-white/10 transition-colors text-sm"><FileText className="w-4 h-4 mr-2" /> Upload Prescription</Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-base font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Our Specialities</h3>
              <ul className="space-y-2">
                {SPECIALITIES.map(spec => (
                  <li key={spec}>
                    <Link href={`/specialities/${spec.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-gray-600 hover:text-pink-600 text-sm flex items-center justify-between group font-medium">
                      {spec}<ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-pink-400" />
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
            "serviceType": "Women's Health, Fertility, Pregnancy &amp; Hormone Testing in Bengaluru",
            "provider": {
              "@type": "MedicalClinic",
              "name": "QXL Diagnostics",
              "image": "https://res.cloudinary.com/btjglif5/image/upload/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png"
            },
            "areaServed": {
              "@type": "City",
              "name": "Bengaluru"
            },
            "description": "AMH, PCOS screening, antenatal panels, pregnancy markers, fertility hormones, thyroid, menopause testing, and cervical cancer screening — with expert-reviewed reports and home sample collection.",
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
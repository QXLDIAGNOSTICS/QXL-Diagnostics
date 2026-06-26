"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, CheckCircle, Phone, MessageCircle, Users } from "lucide-react";

const specialities = [
  {
    id: "neurology",
    title: "NEUROLOGY",
    icon: "/image/spec_neurology.png",
    color: "#2563eb",
    description:
      "Advanced neurology diagnostic panels covering brain, spinal cord, peripheral nerve, and autoimmune neurological conditions. Our tests support early detection of dementia, encephalitis, multiple sclerosis, myasthenia gravis, and paraneoplastic syndromes.",
    whoShouldTake: "Patients with unexplained seizures, memory loss, weakness, numbness, vision changes, or suspected autoimmune neurological conditions. Also useful for doctors managing MS, NMO, MG, and paraneoplastic syndrome workup.",
    tests: [
      "CSF Analysis (Routine & Special)",
      "Anti-NMDA Receptor Antibodies",
      "Anti-AQP4 (NMO Antibody)",
      "Anti-MOG Antibodies",
      "Myelin Basic Protein",
      "Anti-Ganglioside Panel (Anti-GQ1b, GM1)",
      "ANA / ANA Profile (ENA)",
      "Oligoclonal Bands (IgG Index)",
      "Ceruloplasmin",
      "Paraneoplastic Panel (Hu, Yo, Ri)",
    ],
    benefits: [
      "Early detection of autoimmune encephalitis",
      "Multiple sclerosis and NMO differentiation",
      "Myasthenia gravis antibody testing",
      "Paraneoplastic neurological syndrome screening",
    ],
    packages: ["Neurology Basic Panel ₹2,500", "Autoimmune Neuro Panel ₹6,800"],
  },
  {
    id: "hematology",
    title: "HEMATOLOGY",
    icon: "/image/spec_hematology.png",
    color: "#c0392b",
    description:
      "Complete blood disorder diagnostics including advanced coagulation studies, bone marrow assessments, hemoglobin electrophoresis, and specialised hematological panels for accurate diagnosis and monitoring of anaemia, thrombosis, bleeding disorders, and haematological malignancies.",
    whoShouldTake: "Patients with anaemia, unexplained fatigue, bleeding tendencies, recurrent clotting, or suspected thalassemia. Doctors managing haematological malignancies, coagulation disorders, or requiring pre-surgical coagulation workup.",
    tests: [
      "Complete Blood Count (CBC) — 24 Parameters",
      "Peripheral Blood Smear with Morphology",
      "Reticulocyte Count",
      "Coagulation Profile (PT, APTT, INR, TT)",
      "Factor Assays (Factor VIII, IX, XI, XII)",
      "Fibrinogen",
      "D-Dimer",
      "Hemoglobin Electrophoresis (HPLC)",
      "G6PD Deficiency Screen",
      "Flow Cytometry (CD3, CD4, CD8, CD19)",
    ],
    benefits: [
      "Anaemia diagnosis and classification",
      "Thalassemia and hemoglobinopathy screening",
      "Bleeding and thrombophilia risk evaluation",
      "Leukemia and lymphoma screening support",
    ],
    packages: ["Anemia Profile ₹1,200", "Complete Coagulation Panel ₹3,500"],
  },
  {
    id: "cardiology",
    title: "CARDIOLOGY",
    icon: "/image/spec_cardiology.png",
    color: "#e74c3c",
    description:
      "Advanced cardiac risk profiling and biomarker testing for detection and monitoring of heart disease, atherosclerosis, heart failure, and acute myocardial infarction. Our comprehensive cardiology panel goes beyond routine lipids to include inflammation markers, cardiac stress biomarkers, and advanced lipid sub-fractions.",
    whoShouldTake: "Patients with chest pain, hypertension, family history of heart disease, dyslipidemia, or diabetes. Doctors performing cardiac risk stratification, monitoring heart failure, or evaluating acute coronary syndrome.",
    tests: [
      "Cardiac Troponin I & T (High Sensitivity)",
      "BNP / NT-proBNP (Heart Failure Marker)",
      "CK-MB",
      "Lipid Profile — Extended (9 Parameters)",
      "Lipoprotein (a) — Lp(a)",
      "ApoA1 & ApoB / ApoB:ApoA1 Ratio",
      "hs-CRP (High Sensitivity CRP)",
      "Homocysteine",
      "Fibrinogen",
      "D-Dimer",
    ],
    benefits: [
      "Acute myocardial infarction detection",
      "Heart failure risk stratification",
      "Advanced atherosclerosis risk profiling",
      "Inflammation and clotting marker assessment",
    ],
    packages: ["Basic Cardiac Panel ₹1,800", "Advanced Cardiac Risk Panel ₹4,200"],
  },
  {
    id: "urology",
    title: "UROLOGY",
    icon: "/image/spec_urology.png",
    color: "#2980b9",
    description:
      "Comprehensive urological diagnostics including kidney function assessment, prostate health markers, urinary tract infection panels, kidney stone analysis, and glomerulonephritis workup. Our urology panel supports early detection of chronic kidney disease, prostate disorders, and metabolic stone disease.",
    whoShouldTake: "Patients with recurrent UTI, kidney stones, high blood pressure, diabetes, swelling, or reduced urine output. Also men above 50 for prostate screening, and patients with suspected glomerulonephritis or nephrotic syndrome.",
    tests: [
      "Kidney Function Test (KFT) — 11 Parameters",
      "Urine Routine & Microscopy",
      "24-Hour Urine Protein",
      "Urine Culture & Sensitivity",
      "PSA (Total & Free) with PSA Ratio",
      "eGFR Calculation",
      "Cystatin C",
      "Beta-2 Microglobulin",
      "Kidney Stone Analysis (FTIR Spectroscopy)",
      "Microalbumin / Protein:Creatinine Ratio",
    ],
    benefits: [
      "Early chronic kidney disease detection",
      "Prostate cancer screening (PSA)",
      "UTI diagnosis and treatment monitoring",
      "Kidney stone composition analysis for prevention",
    ],
    packages: ["Kidney Health Panel ₹1,500", "Prostate Health Panel ₹2,800"],
  },
  {
    id: "endocrinology",
    title: "ENDOCRINOLOGY",
    icon: "/image/spec_endocrinology.png",
    color: "#8e44ad",
    description:
      "Advanced hormonal and metabolic testing for thyroid, adrenal, pituitary, and reproductive endocrine disorders. Comprehensive panels for diabetes monitoring, PCOS evaluation, fertility hormone profiling, metabolic syndrome, and insulin resistance. Including AMH, FSH, LH, Prolactin, Estradiol, Testosterone, Cortisol and more.",
    whoShouldTake: "Patients with fatigue, weight changes, irregular periods, infertility, hair loss, or blood sugar issues. Doctors managing diabetes, thyroid disorders, PCOS, adrenal conditions, metabolic syndrome, or hormonal imbalances.",
    tests: [
      "Thyroid Profile (T3, T4, TSH, Free T3, Free T4)",
      "Anti-TPO & Anti-Thyroglobulin Antibodies",
      "HbA1c (Glycated Hemoglobin)",
      "Fasting & Post-Prandial Blood Glucose",
      "Insulin & C-Peptide (HOMA-IR)",
      "AMH (Anti-Müllerian Hormone)",
      "FSH, LH, Estradiol, Progesterone, Prolactin",
      "Testosterone (Total & Free), DHEA-S",
      "Cortisol (Basal & Post-ACTH)",
      "Growth Hormone, IGF-1",
    ],
    benefits: [
      "Thyroid disorder diagnosis and monitoring",
      "Diabetes and insulin resistance workup",
      "PCOS and fertility hormone profiling",
      "Adrenal and cortisol assessment",
    ],
    packages: ["Thyroid Profile ₹640", "Complete Hormonal Panel ₹5,200"],
  },
  {
    id: "oncology",
    title: "ONCOLOGY",
    icon: "/image/spec_oncology.png",
    color: "#16a085",
    description:
      "Comprehensive cancer biomarker panels for early detection support, treatment monitoring, and surveillance. Includes histopathology, cytopathology, immunohistochemistry (IHC), and molecular oncology support. Note: Tumor markers assist clinical decisions — diagnosis requires correlation with imaging, biopsy, and clinical history.",
    whoShouldTake: "Patients with family history of cancer, unexplained weight loss, persistent lumps, or abnormal imaging. Patients undergoing cancer treatment for monitoring response. Clinicians ordering pre-treatment staging or post-treatment surveillance.",
    tests: [
      "PSA (Prostate Specific Antigen) — Total & Free",
      "CEA (Carcinoembryonic Antigen)",
      "CA 125 (Ovarian Cancer Marker)",
      "CA 19-9 (Pancreatic / GI Marker)",
      "AFP (Alpha Fetoprotein)",
      "Beta-HCG",
      "CA 15-3 (Breast Cancer Marker)",
      "HE4 (Ovarian Cancer Support)",
      "Cyfra 21-1 (Lung Cancer Marker)",
      "NSE (Neuro-Specific Enolase)",
    ],
    benefits: [
      "Multi-cancer marker screening panel",
      "Treatment response and recurrence monitoring",
      "Histopathology and IHC for tissue diagnosis",
      "Prognostic and predictive marker assessment",
    ],
    packages: ["Basic Tumor Markers ₹2,200", "Complete Oncology Panel ₹8,500"],
  },
  {
    id: "infectious-diseases",
    title: "INFECTIOUS DISEASES",
    icon: "/image/spec_infectious.png",
    color: "#d35400",
    description:
      "Advanced molecular and serological testing for infectious diseases using FilmArray Multiplex PCR, CB-NAAT for TB, BACT/ALERT blood culture, VITEK antimicrobial susceptibility testing, and next-generation immunoassays. Rapid and accurate identification of bacterial, viral, fungal and parasitic pathogens.",
    whoShouldTake: "Patients with fever of unknown origin, respiratory symptoms, suspected sepsis, suspected TB, sexually transmitted infections, or immunocompromised states. Clinicians requiring antimicrobial stewardship support, blood culture, or multiplex pathogen identification.",
    tests: [
      "FilmArray Respiratory Panel (22 pathogens)",
      "FilmArray Blood Culture Identification Panel",
      "CB-NAAT / GeneXpert (TB PCR with NTM)",
      "BACT/ALERT Blood Culture System",
      "VITEK Microbial ID & Susceptibility Testing",
      "Dengue NS1 Ag + IgM / IgG",
      "Malaria Antigen Rapid Test",
      "HIV 1 & 2 Antibody (4th Generation)",
      "Hepatitis B & C (HBsAg, Anti-HCV, HCV RNA)",
      "TORCH Profile",
    ],
    benefits: [
      "Rapid multiplex pathogen identification",
      "Antimicrobial resistance profiling",
      "TB PCR with NTM differentiation",
      "Sepsis and blood culture workup",
    ],
    packages: ["Fever Panel ₹1,800", "Complete Infection Workup ₹6,500"],
  },
  {
    id: "womens-health",
    title: "WOMEN'S HEALTH",
    icon: "/image/spec_womens.png",
    color: "#e91e8c",
    description:
      "Specialised diagnostic panels addressing the unique health needs of women across all life stages — from fertility evaluation, PCOS workup, antenatal screening, and pregnancy monitoring, to menopause assessment, thyroid health, hormonal profiling, and cervical cancer prevention.",
    whoShouldTake: "Women of all ages with menstrual irregularities, fertility concerns, PCOS symptoms, or pregnancy planning. Pregnant women for antenatal screening. Post-menopausal women for hormonal monitoring. Doctors managing women's endocrinology, reproductive health, or gynaecological oncology.",
    tests: [
      "Hormonal Profile (FSH, LH, Estradiol, Progesterone)",
      "AMH (Anti-Müllerian Hormone) — Ovarian Reserve",
      "Prolactin, Testosterone (Total & Free)",
      "Thyroid Profile (TSH, T3, T4, Anti-TPO)",
      "Beta-hCG (Pregnancy / Trophoblastic)",
      "Double Marker / Triple Marker (Antenatal)",
      "Pap Smear / Liquid Based Cytology (LBC)",
      "CA 125 & HE4 (Ovarian Cancer Markers)",
      "TORCH Profile",
      "Vitamin D, B12, Iron Studies, CBC",
    ],
    benefits: [
      "Fertility assessment and ovarian reserve (AMH)",
      "PCOS hormonal profiling",
      "Antenatal and prenatal screening",
      "Cervical cancer prevention (Pap smear / LBC)",
    ],
    packages: ["Women's Basic Panel ₹1,800", "Complete Women's Health ₹5,500"],
  },
  {
    id: "gastroenterology",
    title: "GASTROENTEROLOGY",
    icon: "/image/spec_gastro.png",
    color: "#27ae60",
    description:
      "Advanced hepatology and gastroenterology panels for liver disease, inflammatory bowel disease, celiac disease, malabsorption, gastrointestinal infections, and GI cancer surveillance. Includes H. pylori testing, stool antigen, fecal calprotectin, bile acids, and comprehensive hepatitis screening.",
    whoShouldTake: "Patients with abdominal pain, chronic diarrhoea, unexplained weight loss, jaundice, abnormal liver enzymes, suspected IBD, celiac disease, or H. pylori infection. Clinicians requiring liver function monitoring, gastritis workup, or GI cancer surveillance.",
    tests: [
      "Liver Function Test (LFT) — 11 Parameters",
      "Hepatitis Panel (A, B, C, E)",
      "H. pylori — Stool Antigen & IgG Antibody",
      "Fecal Calprotectin (IBD Marker)",
      "Celiac Disease Panel (Anti-tTG IgA / IgG, IgA)",
      "ASCA / Anti-pANCA (IBD Differentiation)",
      "Bile Acids — Serum",
      "Amylase & Lipase",
      "GI Cancer Markers (CEA, CA 19-9, AFP)",
      "Stool Routine & Fecal Occult Blood Test (FOBT)",
    ],
    benefits: [
      "Hepatitis and liver cirrhosis diagnosis",
      "Inflammatory bowel disease monitoring",
      "Celiac disease and malabsorption screening",
      "GI cancer and H. pylori workup",
    ],
    packages: ["Liver Health Panel ₹1,200", "Complete GI Panel ₹4,800"],
  },
  {
    id: "bone-disorders",
    title: "BONE DISORDERS",
    icon: "/image/spec_bone.png",
    color: "#795548",
    description:
      "Comprehensive musculoskeletal, bone metabolism, and rheumatology panels for osteoporosis, arthritis, autoimmune joint disease, and metabolic bone disorders. Includes bone turnover markers, vitamin D, PTH, calcium metabolism, rheumatoid factor, Anti-CCP, ANA, and HLA-B27.",
    whoShouldTake: "Patients with joint pain, swelling, morning stiffness, fractures, or suspected osteoporosis. Women post-menopause for bone density assessment. Doctors managing rheumatoid arthritis, ankylosing spondylitis, lupus, or metabolic bone disease.",
    tests: [
      "Calcium (Total & Ionized)",
      "Phosphorus",
      "Vitamin D — 25-Hydroxy (D2 + D3)",
      "PTH-Intact (Parathyroid Hormone)",
      "Alkaline Phosphatase & Osteocalcin",
      "P1NP (Bone Formation Marker)",
      "Beta-CTX (Bone Resorption Marker)",
      "Rheumatoid Factor (RA Factor)",
      "Anti-CCP, ANA, ANA Profile (ENA)",
      "HLA-B27 (Ankylosing Spondylitis Marker)",
    ],
    benefits: [
      "Osteoporosis risk and bone turnover assessment",
      "Rheumatoid arthritis and Anti-CCP diagnosis",
      "Vitamin D deficiency treatment monitoring",
      "Ankylosing spondylitis screening (HLA-B27)",
    ],
    packages: ["Bone Health Panel ₹1,500", "Arthritis & Autoimmune Profile ₹3,200"],
  },
];

export default function SpecialityTestsPage() {
  const [activeId, setActiveId] = useState("neurology");
  const [showFaq, setShowFaq] = useState(false);
  const active = specialities.find((s) => s.id === activeId)!;

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* Page Hero */}
      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#eff6ff] py-14 border-b border-gray-100">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase mb-4">
            10 Specialities
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0f2d5e] mb-3 leading-tight">
            Super Speciality Diagnostic Tests
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl font-medium mb-6">
            Advanced diagnostic testing across 10 medical specialities — reviewed by expert consultants. AI-assisted processing, precision reporting, and home sample collection across Bengaluru.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="tel:+919964639639"
              className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-bold px-6 py-3 rounded-full hover:bg-[#1d4ed8] transition-all text-sm shadow-md">
              <Phone className="w-4 h-4" /> Book a Test
            </a>
            <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[#25d366] text-[#25d366] font-bold px-6 py-3 rounded-full hover:bg-green-50 transition-all text-sm">
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
            <Link href="/upload-prescription"
              className="inline-flex items-center gap-2 border-2 border-[#2563eb] text-[#2563eb] font-bold px-6 py-3 rounded-full hover:bg-blue-50 transition-all text-sm">
              Upload Prescription
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-[1260px] mx-auto px-4 py-10 w-full">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar Navigation ── */}
          <aside className="w-full lg:w-[260px] flex-shrink-0">
            <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm sticky top-24">
              <div className="bg-[#2563eb] text-white px-5 py-4">
                <h3 className="font-extrabold text-sm tracking-wide">Our Specialities</h3>
                <p className="text-blue-100 text-[11px] mt-0.5">Select to explore tests</p>
              </div>
              <nav className="py-2">
                {specialities.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setActiveId(s.id); setShowFaq(false); }}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-all ${
                      activeId === s.id
                        ? "bg-[#dbeafe] text-[#2563eb] font-extrabold border-r-4 border-[#2563eb]"
                        : "text-slate-600 hover:bg-gray-50 font-semibold"
                    }`}
                  >
                    <div className="w-7 h-7 flex-shrink-0 overflow-hidden flex items-center justify-center">
                      <img 
                        src={`${s.icon}?v=3`} 
                        alt={s.title} 
                        className={`w-full h-full object-contain mix-blend-multiply ${s.title === "GASTROENTEROLOGY" ? "scale-[1.4]" : "scale-110"}`} 
                      />
                    </div>
                    <span className="text-[12px] leading-tight">{s.title}</span>
                    {activeId === s.id && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <main className="flex-1 min-w-0">
            <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm">
              {/* Speciality Header */}
              <div className="relative overflow-hidden p-8 border-b border-gray-100"
                style={{ background: `linear-gradient(135deg, ${active.color}15 0%, ${active.color}05 100%)` }}>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center p-3 flex-shrink-0 overflow-hidden">
                    <img 
                      src={`${active.icon}?v=3`} 
                      alt={active.title} 
                      className={`w-14 h-14 object-contain mix-blend-multiply ${active.title === "GASTROENTEROLOGY" ? "scale-[1.4]" : "scale-110"}`} 
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f2d5e] mb-1">{active.title}</h2>
                    <p className="text-slate-500 text-sm font-medium max-w-xl">{active.description}</p>
                  </div>
                </div>
              </div>

              {/* Who Should Take */}
              <div className="px-8 pt-6 pb-0">
                <div className="bg-[#f0f9ff] border border-[#bfdbfe] rounded-xl p-4 flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] font-extrabold text-[#0f2d5e] mb-1">Who Should Take These Tests?</p>
                    <p className="text-[12px] text-slate-600 font-medium leading-relaxed">{active.whoShouldTake}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 grid md:grid-cols-2 gap-8">
                {/* Tests List */}
                <div>
                  <h3 className="text-lg font-extrabold text-[#0f2d5e] mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#dbeafe] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
                    </span>
                    Available Tests
                  </h3>
                  <ul className="space-y-2.5">
                    {active.tests.map((test, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-[#2563eb] flex-shrink-0 mt-0.5" />
                        <span className="text-[13px] text-slate-700 font-semibold">{test}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits + Packages */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0f2d5e] mb-4 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#dbeafe] flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
                      </span>
                      Clinical Benefits
                    </h3>
                    <ul className="space-y-2.5">
                      {active.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#2563eb] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                          <span className="text-[13px] text-slate-700 font-semibold">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Related Packages */}
                  <div className="bg-[#dbeafe]/50 rounded-2xl p-5 border border-[#2563eb]/10">
                    <h3 className="text-sm font-extrabold text-[#0f2d5e] mb-3">Related Packages</h3>
                    <div className="space-y-3">
                      {active.packages.map((pkg, i) => (
                        <div key={i} className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                          <span className="text-[12px] font-bold text-slate-700">{pkg}</span>
                          <a href={`https://api.whatsapp.com/send?phone=919964639639&text=Hi%2C%20I%20want%20to%20book%20${encodeURIComponent(pkg)}`}
                            target="_blank" rel="noreferrer"
                            className="bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-xl hover:bg-[#1d4ed8] transition-colors flex-shrink-0 ml-3">
                            Book
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-2">
                    <a href="tel:+919964639639"
                      className="w-full flex items-center justify-center gap-2 bg-[#2563eb] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors text-sm shadow-md">
                      <Phone className="w-4 h-4" /> Book This Test
                    </a>
                    <a href={`https://api.whatsapp.com/send?phone=919964639639&text=Hi%2C%20I%20want%20to%20know%20about%20${encodeURIComponent(active.title)}%20tests`}
                      target="_blank" rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 border-2 border-[#25d366] text-[#25d366] font-bold py-3 rounded-xl hover:bg-green-50 transition-colors text-sm">
                      <MessageCircle className="w-4 h-4" /> Enquire on WhatsApp
                    </a>
                    <div className="text-center pt-1">
                      <span className="text-[11px] text-slate-400 font-medium">📞 +91 99646 39639 · 🕐 Open 24x7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation between specialities */}
            <div className="flex justify-between mt-6 gap-4">
              {specialities.findIndex((s) => s.id === activeId) > 0 && (
                <button
                  onClick={() => setActiveId(specialities[specialities.findIndex((s) => s.id === activeId) - 1].id)}
                  className="flex items-center gap-2 border border-gray-200 text-slate-600 font-bold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Previous Speciality
                </button>
              )}
              {specialities.findIndex((s) => s.id === activeId) < specialities.length - 1 && (
                <button
                  onClick={() => setActiveId(specialities[specialities.findIndex((s) => s.id === activeId) + 1].id)}
                  className="flex items-center gap-2 bg-[#2563eb] text-white font-bold px-5 py-2.5 rounded-xl hover:bg-[#1d4ed8] transition-colors text-sm ml-auto">
                  Next Speciality <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, User, Calendar, ShieldCheck, ArrowRight, Activity, Stethoscope, HeartPulse, Dna, Microscope } from 'lucide-react';
import { SITE_URL, NABL_CERTIFICATE } from '@/lib/businessInfo';

export const metadata: Metadata = {
  title: "QXL Knowledge Centre | Doctor-Reviewed Laboratory Medicine",
  description: "Evidence-based, doctor-reviewed clinical laboratory interpretation articles by QXL Diagnostics' consultant pathologists and biochemists in Bengaluru.",
  alternates: { canonical: `${SITE_URL}/knowledge-centre` },
  openGraph: {
    title: "QXL Knowledge Centre | Clinical Laboratory Medicine",
    description: "Doctor-reviewed guides on blood test interpretation, autoimmune serology, cancer biomarkers, and metabolic panels.",
    url: `${SITE_URL}/knowledge-centre`,
    type: "website",
  },
};

const CATEGORIES = [
  { id: "understanding-tests", name: "Understanding Your Tests", icon: BookOpen, desc: "Plain-language guides explaining sample preparation, reference intervals, and diagnostic terminology." },
  { id: "lab-interpretation", name: "Laboratory Interpretation", icon: Activity, desc: "Deeper clinical notes on how pathologists evaluate complex blood, liver, kidney, and thyroid results." },
  { id: "womens-diagnostics", name: "Women's Diagnostics", icon: HeartPulse, desc: "PCOS hormone panels, AMH fertility markers, thyroid screening, and bone density markers." },
  { id: "autoimmune-diagnostics", name: "Autoimmune Diagnostics", icon: Dna, desc: "ANA by IFA patterns, ENA 12-antibody profiles, Anti-CCP, and vasculitis markers." },
  { id: "cardiovascular-biomarkers", name: "Cardiovascular Biomarkers", icon: HeartPulse, desc: "Lipid risk stratification, hs-CRP, Homocysteine, Troponin-I, and NT-proBNP." },
  { id: "diabetes-metabolism", name: "Diabetes & Metabolism", icon: Activity, desc: "HbA1c HPLC technology, eAG calculation, Fasting Insulin, HOMA-IR, and C-Peptide." },
  { id: "cancer-biomarkers", name: "Cancer Biomarkers", icon: Stethoscope, desc: "Tumor marker panels (PSA, CA-125, CEA, CA-19.9, AFP) and clinical histopathology." },
  { id: "pregnancy-screening", name: "Pregnancy Screening", icon: HeartPulse, desc: "First & second trimester prenatal screening (Double, Triple, Quadruple marker) and NIPT." },
  { id: "infectious-diseases", name: "Infectious Diseases", icon: Microscope, desc: "Dengue NS1/IgM serology, Typhoid, Hepatitis viral loads, and TB-PCR molecular assays." },
  { id: "for-doctors", name: "For Doctors & Clinicians", icon: ShieldCheck, desc: "Reference laboratory protocols, critical values policy, sample stability, and B2B hospital referrals." },
];

const FEATURED_ARTICLES = [
  {
    title: "Understanding Your Complete Blood Count (CBC) & Peripheral Smear Flags",
    category: "Understanding Your Tests",
    slug: "understanding-cbc-blood-test",
    reviewer: "Dr. Naveen Kumar N",
    quals: "DCP, DNB Pathology",
    reviewerSlug: "dr-naveen-kumar-n",
    published: "August 10, 2026",
    lastReviewed: "August 2026",
    summary: "How consultant haematopathologists evaluate red cell indices (MCV, MCH, MCHC, RDW), differential white counts, and platelet trends to differentiate iron deficiency from thalassemia trait.",
    references: ["Dacie and Lewis Practical Haematology (13th Ed)", "ICMR Guidelines for Anaemia Management 2024"]
  },
  {
    title: "HbA1c HPLC Measurement vs Fasting Blood Glucose: Clinical Diagnostic Standards",
    category: "Diabetes & Metabolism",
    slug: "hba1c-hplc-vs-fasting-glucose",
    reviewer: "Dr. Shantakumar Muruda",
    quals: "MD Biochemistry, NABL Lead Assessor",
    reviewerSlug: "dr-shantakumar-muruda",
    published: "August 12, 2026",
    lastReviewed: "August 2026",
    summary: "Why ion-exchange HPLC is the gold standard for HbA1c testing, how estimated Average Glucose (eAG) is derived, and addressing interference from South Indian hemoglobin variants.",
    references: ["ADA Standards of Medical Care in Diabetes 2026", "WHO HbA1c Diagnostic Criteria"]
  },
  {
    title: "ANA by Immunofluorescence (IFA): Pattern Interpretation & ENA Profile Correlation",
    category: "Autoimmune Diagnostics",
    slug: "ana-ifa-patterns-ena-profile",
    reviewer: "Dr. Naveen Kumar N",
    quals: "DCP, DNB Pathology",
    reviewerSlug: "dr-naveen-kumar-n",
    published: "August 15, 2026",
    lastReviewed: "August 2026",
    summary: "A practical clinical guide for rheumatologists and physicians on interpreting nuclear staining patterns (homogeneous, speckled, nucleolar, centromere) on HEp-2 substrate.",
    references: ["International Consensus on ANA Patterns (ICAP) 2025", "EULAR/ACR Classification Criteria"]
  },
  {
    title: "Thyroid Hormones & Anti-TPO Antibodies: Subclinical Hypothyroidism in Urban Bengaluru",
    category: "Women's Diagnostics",
    slug: "subclinical-hypothyroidism-anti-tpo",
    reviewer: "Dr. Shantakumar Muruda",
    quals: "MD Biochemistry, NABL Lead Assessor",
    reviewerSlug: "dr-shantakumar-muruda",
    published: "August 18, 2026",
    lastReviewed: "August 2026",
    summary: "Evaluating TSH elevations above 4.5 mIU/L, the role of Anti-TPO autoantibodies in predicting progression to overt disease, and pregnancy trimester-specific TSH targets.",
    references: ["American Thyroid Association (ATA) Guidelines", "Endocrine Society Clinical Practice Guideline"]
  },
  {
    title: "Histopathology & Biopsy Processing: The Pathologist's Role in Oncological Diagnosis",
    category: "Cancer Biomarkers",
    slug: "histopathology-biopsy-processing-guide",
    reviewer: "Dr. Pritilata Rout",
    quals: "MD Pathology (NIMHANS)",
    reviewerSlug: "dr-pritilata-rout",
    published: "August 20, 2026",
    lastReviewed: "August 2026",
    summary: "From formalin fixation to paraffin embedding, immunohistochemistry (IHC), and frozen sections — how surgical tissue samples are processed at QXL Diagnostics.",
    references: ["College of American Pathologists (CAP) Accreditation Protocols", "NIMHANS Neuropathology Manual"]
  },
  {
    title: "Dengue Fever Serology: NS1 Antigen, IgM/IgG Kinetics & Platelet Transfusion Alerts",
    category: "Infectious Diseases",
    slug: "dengue-serology-ns1-platelet-alerts",
    reviewer: "Dr. Ajitha Pillai",
    quals: "MD Microbiology",
    reviewerSlug: "dr-ajitha-pillai",
    published: "August 22, 2026",
    lastReviewed: "August 2026",
    summary: "Diagnostic window for NS1 vs IgM antibodies, daily hematocrit monitoring for plasma leakage, and critical alert thresholds for platelet counts below 50,000/µL.",
    references: ["NVBDCP Dengue Management Guidelines 2025", "WHO Dengue Guidelines for Diagnosis"]
  }
];

export default function KnowledgeCentrePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "QXL Knowledge Centre — Doctor-Reviewed Laboratory Medicine",
    "description": "Evidence-based clinical laboratory medicine knowledge base written and reviewed by consultant pathologists and clinical biochemists.",
    "url": `${SITE_URL}/knowledge-centre`,
    "publisher": {
      "@type": "DiagnosticLab",
      "name": "QXL Diagnostics",
      "url": SITE_URL
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-14 border-b border-sky-900">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#D69A18] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Clinical Medical Knowledge
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight text-white" style={{ color: '#ffffff' }}>
              QXL Knowledge Centre
            </h1>
            <p className="text-sky-100 text-sm md:text-base leading-relaxed mb-6 font-medium">
              Evidence-based laboratory medicine insights, reference range interpretations, and clinical diagnostic articles authored and reviewed by consultant pathologists and clinical biochemists at QXL Diagnostics.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-sky-200">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> NABL Accredited ({NABL_CERTIFICATE})
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                <Stethoscope className="w-4 h-4 text-sky-300" /> Doctor Reviewed & Signed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 border-b border-slate-200 bg-white">
        <div className="max-w-[1260px] mx-auto px-4">
          <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-6">Explore Knowledge Categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-[#2563eb] transition-all hover:shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#2563eb] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-[#0f2d5e] text-sm mb-1">{cat.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs text-[#2563eb] font-extrabold uppercase tracking-wider">Peer-Reviewed Publications</span>
              <h2 className="text-2xl font-extrabold text-[#0f2d5e]">Clinical Interpretation Guides</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_ARTICLES.map((art) => (
              <article key={art.slug} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <span className="inline-block bg-sky-50 text-[#2563eb] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3 border border-sky-100">
                    {art.category}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#0f2d5e] mb-3 leading-snug hover:text-[#2563eb] transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  {/* Doctor Reviewer Attribution */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#0f2d5e] text-white flex items-center justify-center text-xs font-black">
                        {art.reviewer.charAt(4)}
                      </div>
                      <div>
                        <Link href={`/${art.reviewerSlug}`} className="text-xs font-bold text-slate-800 hover:text-[#2563eb] block">
                          {art.reviewer}
                        </Link>
                        <span className="text-[10px] text-slate-500 font-semibold">{art.quals}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 px-1">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-sky-500" /> Reviewed: {art.lastReviewed}</span>
                    <span className="text-[#2563eb] hover:underline flex items-center gap-0.5">Read Guide <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

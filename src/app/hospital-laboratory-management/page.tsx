import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Clock,
  Microscope,
  Stethoscope,
  Users,
  MessageSquareText,
  ClipboardList,
  BarChart3,
  Layers,
  AlertTriangle,
  Star,
  ChevronRight,
} from "lucide-react";
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, EMAIL, NABL_CERTIFICATE, ISO_STANDARD } from "@/lib/businessInfo";

export const metadata: Metadata = {
  title: "Hospital Laboratory Management (HLM) for Hospitals in India | QXL Diagnostics",
  description:
    "QXL Diagnostics provides Hospital Laboratory Management (HLM) for hospitals, nursing homes and healthcare groups. Onsite emergency testing, specialised reference testing, staffing, equipment, quality systems, NABL readiness and transparent partnership models.",
  alternates: { canonical: `${SITE_URL}/hospital-laboratory-management` },
  openGraph: {
    title: "Hospital Laboratory Management (HLM) for Hospitals in India | QXL Diagnostics",
    description:
      "QXL Diagnostics provides Hospital Laboratory Management (HLM) for hospitals, nursing homes and healthcare groups. Onsite emergency testing, specialised reference testing, staffing, equipment, quality systems, NABL readiness and transparent partnership models.",
    url: `${SITE_URL}/hospital-laboratory-management`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
  keywords: [
    "hospital laboratory management",
    "hospital lab management services",
    "HLM services India",
    "hospital lab outsourcing",
    "hospital laboratory outsourcing India",
    "hospital pathology lab management",
    "turnkey hospital laboratory services",
    "NABL hospital laboratory",
    "ISO 15189 hospital lab",
    "hospital lab quality management",
    "hospital lab management Bengaluru",
    "hospital laboratory outsourcing Bangalore",
    "hospital lab partner Karnataka",
  ],
};

const hlmModels = [
  {
    title: "Full Hospital Laboratory Management",
    description:
      "QXL assumes agreed operational responsibilities for the hospital laboratory, which may include equipment, staffing, reagents, quality systems and referral testing.",
    icon: Building2,
    color: "blue",
  },
  {
    title: "Hybrid HLM",
    description:
      "High-frequency and emergency tests stay onsite while specialised investigations are performed at the QXL reference laboratory.",
    icon: Layers,
    color: "emerald",
  },
  {
    title: "Laboratory Management Services",
    description:
      "QXL supports the operation and quality management of an existing hospital laboratory while retaining selected hospital-owned equipment or staff.",
    icon: ClipboardList,
    color: "purple",
  },
  {
    title: "Reference Laboratory Partnership",
    description:
      "A hospital retains its laboratory and uses QXL only for specialised investigations from the reference lab.",
    icon: Microscope,
    color: "amber",
  },
];

const challengeTable = [
  { challenge: "Expensive analysers and recurring AMC/service costs", outcome: "High fixed overhead", hlm: "Match equipment capacity to actual hospital volumes" },
  { challenge: "Low utilisation of specialised analysers", outcome: "High cost per report", hlm: "Centralise low-volume specialised testing" },
  { challenge: "Reagent minimum order quantities and short expiry", outcome: "Wastage and blocked working capital", hlm: "Consolidated procurement and inventory control" },
  { challenge: "24×7 technician requirements", outcome: "Recruitment, absenteeism and rostering pressure", hlm: "Structured manpower planning and backup" },
  { challenge: "Need for pathology/biochemistry/microbiology expertise", outcome: "Limited specialist availability", hlm: "Shared specialist clinical support" },
  { challenge: "Analyser downtime", outcome: "Interrupted service and delayed TAT", hlm: "Backup protocols and reference-lab support" },
  { challenge: "Large specialised test menu", outcome: "Significant additional equipment and expertise", hlm: "Reference laboratory integration" },
  { challenge: "IQC, EQAS/PT and documentation", outcome: "Continuous quality-management workload", hlm: "Standardised QMS governance" },
  { challenge: "NABL preparation", outcome: "Significant documentation and process work", hlm: "Accreditation-readiness programme" },
  { challenge: "Multiple unrelated referral laboratories", outcome: "Fragmented logistics and reporting", hlm: "Integrated reference laboratory" },
];

const comparisonRows = [
  { feature: "Laboratory inside hospital", inhouse: "Yes", hlm: "Yes" },
  { feature: "Emergency testing onsite", inhouse: "Yes", hlm: "Yes" },
  { feature: "Hospital controls clinical requirements", inhouse: "Yes", hlm: "Yes" },
  { feature: "Equipment responsibility", inhouse: "Hospital", hlm: "Defined under agreement" },
  { feature: "Reagent procurement", inhouse: "Hospital", hlm: "Can be managed by QXL" },
  { feature: "Technical manpower", inhouse: "Hospital", hlm: "Can be managed by QXL" },
  { feature: "Quality system", inhouse: "Hospital", hlm: "QXL-supported management system" },
  { feature: "Specialised tests", inhouse: "Hospital buys technology or refers", hlm: "Integrated QXL reference laboratory" },
  { feature: "Equipment downtime backup", inhouse: "Hospital arranges", hlm: "Defined backup/referral pathway" },
  { feature: "Specialist laboratory consultation", inhouse: "Hospital arranges", hlm: "QXL laboratory specialists" },
  { feature: "NABL preparation", inhouse: "Hospital team", hlm: "Structured joint programme" },
  { feature: "Operational management", inhouse: "Hospital", hlm: "QXL / jointly governed" },
];

const partnershipSteps = [
  { step: "Step 1", title: "Initial Discussion", desc: "Hospital management shares bed strength, specialty mix, existing laboratory status and approximate monthly laboratory volumes." },
  { step: "Step 2", title: "Onsite Assessment", desc: "QXL evaluates space, current infrastructure, equipment, manpower, test volumes and workflows." },
  { step: "Step 3", title: "HLM Feasibility Report", desc: "A recommended onsite test menu, reference-testing menu, equipment plan, staffing plan, quality framework and commercial structure are prepared." },
  { step: "Step 4", title: "SLA and Responsibility Matrix", desc: "Both organisations agree TAT, manpower, equipment, logistics, reporting, escalation, quality and commercial responsibilities." },
  { step: "Step 5", title: "Transition", desc: "Staffing, equipment, LIS, SOPs, inventory and sample workflows are implemented using a planned transition." },
  { step: "Step 6", title: "Go-Live and Quality Monitoring", desc: "Operations begin with defined KPIs and joint performance reviews." },
];

const faqs = [
  {
    q: "What is Hospital Laboratory Management?",
    a: "Hospital Laboratory Management is an arrangement in which a specialist diagnostic provider manages agreed elements of a hospital's onsite laboratory while supporting it with reference-laboratory testing, technology, staffing and quality systems.",
  },
  {
    q: "Is HLM the same as sending every test outside?",
    a: "No. QXL's preferred HLM architecture keeps clinically urgent and high-frequency testing onsite and uses the central reference laboratory for suitable specialised or lower-volume testing.",
  },
  {
    q: "Will the hospital lose control of its laboratory?",
    a: "No. Clinical requirements, service levels, escalation procedures, pricing, responsibilities and quality KPIs should be defined jointly in the HLM agreement.",
  },
  {
    q: "Does HLM require replacing our existing analysers?",
    a: "Not necessarily. QXL first evaluates usable existing infrastructure. Equipment replacement or addition is recommended only where operationally justified.",
  },
  {
    q: "Can existing hospital laboratory staff continue?",
    a: "Depending on the agreed operating structure, existing competent personnel may be retained, trained or integrated into the HLM workflow.",
  },
  {
    q: "Can QXL provide 24×7 hospital laboratory services?",
    a: "The operating hours and staffing model are designed according to each hospital's emergency, ICU, OT and inpatient requirements.",
  },
  {
    q: "What happens if an analyser breaks down?",
    a: "The HLM plan should contain defined downtime, backup-instrument or reference-laboratory procedures according to the clinical urgency of each test.",
  },
  {
    q: "Can the hospital laboratory prepare for NABL accreditation?",
    a: "Yes. QXL can implement and strengthen quality systems and support accreditation readiness. NABL accreditation itself is granted by NABL following its applicable process and scope assessment.",
  },
  {
    q: "Does QXL's NABL accreditation automatically cover our hospital?",
    a: "No. QXL's accreditation applies to its accredited laboratory and scope. Any accreditation claim for a hospital HLM site must reflect that site's actual NABL status and applicable arrangement.",
  },
  {
    q: "Can QXL manage only part of our laboratory?",
    a: "Yes. Full HLM, hybrid HLM, laboratory-management support and reference-laboratory partnerships can be considered depending on the hospital's requirements.",
  },
  {
    q: "Is HLM suitable for small hospitals?",
    a: "It can be particularly useful for smaller hospitals that require reliable routine and emergency diagnostics but cannot economically maintain every specialised technology onsite.",
  },
  {
    q: "How much does HLM cost?",
    a: "There is no sensible universal HLM price. Commercials depend on hospital volumes, onsite menu, equipment requirements, staffing, space, existing assets and the division of responsibilities between QXL and the hospital.",
  },
];

const onsiiteTests = [
  { area: "Haematology", examples: "CBC, platelet count" },
  { area: "Diabetes / Emergency", examples: "Glucose" },
  { area: "Renal / Electrolytes", examples: "Creatinine, urea, sodium, potassium" },
  { area: "Critical Care", examples: "ABG where ICU/ventilator services require it" },
  { area: "Cardiac", examples: "Troponin where clinically required" },
  { area: "Coagulation", examples: "PT/INR, aPTT according to surgical/critical-care need" },
  { area: "Routine Biochemistry", examples: "Frequently requested chemistry based on hospital volumes" },
  { area: "Urinalysis", examples: "Routine urine investigations" },
  { area: "Other Urgent Tests", examples: "Determined by emergency, ICU, OT and specialty requirements" },
];

const referenceTests = [
  { area: "Autoimmune Diagnostics", examples: "ANA IFA, ENA, ANCA, anti-CCP, dsDNA and related specialised immunology" },
  { area: "Advanced Immunoassays", examples: "Selected hormones, tumour markers and specialised endocrine investigations" },
  { area: "Protein Studies", examples: "Serum protein electrophoresis and related investigations" },
  { area: "Advanced Haematology / HPLC", examples: "Hb variant investigations and specialised testing" },
  { area: "Molecular Diagnostics", examples: "PCR and multiplex molecular panels according to clinical indication" },
  { area: "Advanced Microbiology", examples: "Selected identification, susceptibility or specialised infectious-disease testing" },
  { area: "Histopathology & Cytology", examples: "Biopsy, FNAC, special stains" },
  { area: "Immunohistochemistry", examples: "IHC panels for oncology and diagnostic purposes" },
  { area: "Allergy Testing", examples: "Phadiatop, food and inhalant IgE panels" },
  { area: "Maternal Screening", examples: "Double/Triple/Quadruple marker, AMH, full hormone panels" },
];

const hospitalTypes = [
  {
    beds: "20–100 bed hospitals",
    desc: "Hospitals requiring 24×7 basic laboratory support but without enough specialised volume to justify every analyser and department independently.",
  },
  {
    beds: "100–300 bed multispeciality hospitals",
    desc: "Facilities requiring stronger standardisation, broader test menus, controlled TAT and specialist laboratory support.",
  },
  {
    beds: "New hospitals",
    desc: "HLM can allow diagnostic services to launch without building the complete laboratory organisation from zero.",
  },
  {
    beds: "ICU / Emergency / Surgical expansion",
    desc: "Laboratory capacity can be redesigned around increased critical-care requirements.",
  },
  {
    beds: "Specialty hospitals",
    desc: "Orthopaedics, fertility, oncology, cardiology, nephrology, gastroenterology, neurology and rehabilitation facilities frequently require a combination of rapid routine investigations and specialised reference testing.",
  },
  {
    beds: "Nursing homes and day-care hospitals",
    desc: "A compact onsite laboratory can be supported by a larger reference laboratory instead of reproducing a full diagnostic laboratory.",
  },
  {
    beds: "Hospital chains",
    desc: "A common HLM partner can standardise equipment, reagents, SOPs, quality indicators, LIS, reporting and referral testing across multiple units.",
  },
  {
    beds: "Hospitals preparing for NABL",
    desc: "HLM can provide the operational discipline required to build an accreditation-ready laboratory quality system.",
  },
];

export default function HospitalLabManagementPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "For Hospitals", item: `${SITE_URL}/for-hospitals` },
      { "@type": "ListItem", position: 3, name: "Hospital Laboratory Management", item: `${SITE_URL}/hospital-laboratory-management` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hospital Laboratory Management (HLM)",
    description:
      "QXL Diagnostics provides Hospital Laboratory Management (HLM) for hospitals, nursing homes and healthcare groups across Bengaluru and Karnataka. Onsite emergency testing, specialised reference testing, staffing, equipment, quality systems and NABL readiness.",
    provider: {
      "@type": "Organization",
      name: "QXL Diagnostics",
      url: SITE_URL,
    },
    serviceType: "Hospital Laboratory Management",
    areaServed: {
      "@type": "State",
      name: "Karnataka",
    },
    url: `${SITE_URL}/hospital-laboratory-management`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#0f2d5e] to-[#164263] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #2563eb 0%, transparent 60%)" }} />
        <div className="max-w-[1260px] mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-[11px] text-sky-300 mb-6 font-semibold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/for-hospitals" className="hover:text-white transition-colors">For Hospitals</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Hospital Laboratory Management</span>
          </nav>

          <span className="inline-block bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-5 shadow-sm">
            For Hospitals | Nursing Homes | Day-Care Hospitals | Specialty Hospitals | Healthcare Groups
          </span>

          <div className="max-w-5xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 leading-tight !text-white tracking-tight" style={{ color: '#ffffff' }}>
              Hospital Laboratory Management for Hospitals in India
            </h1>
            <p className="text-slate-100 text-base md:text-lg leading-relaxed mb-4 font-medium max-w-4xl">
              Run a better hospital laboratory without carrying the entire operational burden yourself.
            </p>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-8 max-w-4xl font-medium">
              QXL Diagnostics Hospital Laboratory Management — HLM helps hospitals operate reliable, responsive and financially sustainable diagnostic services while retaining the tests that clinicians need immediately within the hospital.
            </p>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 mb-8 max-w-3xl">
              <p className="text-slate-100 text-sm font-medium leading-relaxed mb-3">
                Instead of choosing between an expensive fully self-operated laboratory and sending every sample to an outside laboratory, QXL builds a <strong className="text-white" style={{ color: '#ffffff' }}>hybrid hospital laboratory model</strong>:
              </p>
              <ul className="space-y-2">
                {[
                  "Emergency and high-frequency investigations remain close to the patient.",
                  "Specialised and lower-volume investigations are connected to QXL's NABL-accredited reference laboratory.",
                  "Staffing, equipment, quality systems, logistics, reporting and laboratory governance operate as one coordinated diagnostic service.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-sky-100 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#hlm-inquiry"
                className="bg-[#D69A18] hover:bg-[#b88313] text-white font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all active:scale-95"
              >
                <span>Request an HLM Feasibility Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`tel:${PHONE_E164}`}
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-black px-7 py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-[#D69A18]" />
                <span>Hospital Partnerships: {PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Trust Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8 mt-8 border-t border-white/15">
            {[
              { icon: ShieldCheck, color: "text-emerald-400", text: `NABL Accredited · ${NABL_CERTIFICATE} · ${ISO_STANDARD}` },
              { icon: Building2, color: "text-amber-400", text: "190+ B2B Hospital & Lab Clients" },
              { icon: Stethoscope, color: "text-purple-300", text: "Doctor-Led — MD Biochemistry Founder" },
              { icon: Star, color: "text-sky-300", text: "NABL Lead Assessor · 150+ Assessments" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs font-bold text-sky-100">
                <item.icon className={`w-5 h-5 ${item.color} shrink-0`} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS HLM ── */}
      <section className="py-16 max-w-[1260px] mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Definition</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1 mb-5">
            What is Hospital Laboratory Management?
          </h2>
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4">
            <p className="text-slate-700 text-sm leading-relaxed font-semibold">
              Hospital Laboratory Management, or HLM, is a partnership in which a specialist diagnostic laboratory manages part or all of a hospital&apos;s laboratory operations on behalf of the hospital.
            </p>
            <p className="text-slate-700 text-sm leading-relaxed font-semibold">
              Depending on the hospital&apos;s requirements, an HLM partner may manage laboratory equipment, reagents, technical manpower, laboratory doctors, quality control, inventory, LIS workflows, turnaround times, referral testing, logistics, documentation and accreditation readiness.
            </p>
            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5">
              <p className="text-slate-800 text-sm font-bold">
                The patient continues to receive laboratory services inside the hospital. The important difference is that the hospital does not have to independently build every layer of diagnostic infrastructure required to operate a modern laboratory.
              </p>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed font-semibold">
              <strong className="text-[#0f2d5e]">HLM is therefore not simply &quot;sending samples outside.&quot;</strong><br />
              A well-designed HLM model combines: Onsite hospital testing + reference laboratory capability + specialist medical oversight + quality systems + logistics + technology + commercial governance.
            </p>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              Hospital Laboratory Management is already used by major diagnostic organisations in India. Agilus, for example, reports managing more than 80 hospital laboratories, while other HLM providers describe hybrid systems that retain responsive onsite testing while moving appropriate non-urgent work into larger diagnostic networks.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY HOSPITALS RECONSIDER IN-HOUSE LABS ── */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">The Operational Reality</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1">
              Why hospitals are reconsidering the traditional fully in-house laboratory model
            </h2>
            <p className="text-slate-600 text-sm font-semibold mt-3 leading-relaxed">
              A hospital laboratory looks simple from outside: install analysers, hire technicians and start testing. In practice, laboratory medicine requires continuous management across twelve operational domains.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0f2d5e] text-white">
                  <th className="text-left px-5 py-4 font-black text-xs">Hospital Challenge</th>
                  <th className="text-left px-5 py-4 font-black text-xs">What It Can Create</th>
                  <th className="text-left px-5 py-4 font-black text-xs">HLM Approach</th>
                </tr>
              </thead>
              <tbody>
                {challengeTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                    <td className="px-5 py-3.5 text-xs font-semibold text-slate-700 border-b border-slate-100">{row.challenge}</td>
                    <td className="px-5 py-3.5 text-xs font-semibold text-red-600 border-b border-slate-100">{row.outcome}</td>
                    <td className="px-5 py-3.5 text-xs font-semibold text-emerald-700 border-b border-slate-100">{row.hlm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── HOW HLM WORKS ── */}
      <section className="py-16 max-w-[1260px] mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">QXL Process</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1">
            How does Hospital Laboratory Management work?
          </h2>
          <p className="text-slate-600 text-sm font-semibold mt-3 leading-relaxed">
            QXL first studies the hospital rather than immediately replacing its laboratory. The objective is not to maximise the number of samples sent to QXL.
          </p>
        </div>

        <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 max-w-3xl mx-auto mb-10">
          <p className="text-[#0f2d5e] text-sm font-bold text-center leading-relaxed">
            &ldquo;Which tests should clinically remain inside this hospital, which tests should economically remain inside this hospital, and which tests are safer or more efficient to perform at a specialised reference laboratory?&rdquo;
          </p>
          <p className="text-slate-600 text-xs text-center mt-2 font-semibold">That test-by-test decision is central to QXL&apos;s HLM approach.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { num: "1", title: "Laboratory Feasibility Study", desc: "QXL studies existing volumes, clinical services, equipment, staffing, referral tests, costs and TAT." },
            { num: "2", title: "Onsite Test Menu Design", desc: "Tests are categorised according to clinical urgency, frequency, economics and required technology." },
            { num: "3", title: "Infrastructure & Equipment Plan", desc: "Existing usable equipment is evaluated before recommending new systems. QXL can support equipment placement, reagents and maintenance." },
            { num: "4", title: "Staffing & Medical Governance", desc: "Technical staffing, laboratory supervision and access to QXL's consultant laboratory doctors are structured accordingly." },
            { num: "5", title: "Reference Laboratory Integration", desc: "Specialised investigations move through defined sample-transport and TAT pathways to QXL's NABL-accredited reference laboratory." },
            { num: "6", title: "Quality Management", desc: "QXL establishes the operational framework for IQC, EQAS, SOPs, training, documentation, quality indicators, audits and corrective actions." },
            { num: "7", title: "Digital Integration", desc: "Laboratory workflows can include barcode tracking, digital reporting and LIS/HIS interfaces according to technical feasibility." },
            { num: "8", title: "Performance Review", desc: "Hospital and QXL teams review agreed KPIs: TAT, sample rejection, equipment uptime, QC performance, critical-value communication and more." },
          ].map((step, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2 hover:border-blue-400 transition-all">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-black text-sm">
                {step.num}
              </div>
              <h3 className="font-extrabold text-[#0f2d5e] text-sm">{step.title}</h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HLM VS IN-HOUSE COMPARISON ── */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Comparison</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1">
              HLM vs Owning and Operating Your Own In-House Laboratory
            </h2>
            <p className="text-slate-600 text-sm font-semibold mt-3 leading-relaxed">
              HLM becomes attractive when the hospital wants to retain laboratory access and clinical responsiveness but reduce the complexity of operating the laboratory independently.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-slate-200">
                  <th className="text-left px-5 py-4 font-black text-xs text-[#0f2d5e] w-1/2">Feature</th>
                  <th className="text-left px-5 py-4 font-black text-xs text-slate-600 w-1/4">Fully In-House Lab</th>
                  <th className="text-left px-5 py-4 font-black text-xs text-[#0f2d5e] w-1/4">QXL HLM</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                    <td className="px-5 py-3.5 text-xs font-semibold text-slate-700 border-b border-slate-100">{row.feature}</td>
                    <td className="px-5 py-3.5 text-xs font-semibold text-slate-600 border-b border-slate-100">{row.inhouse}</td>
                    <td className="px-5 py-3.5 text-xs font-bold text-emerald-700 border-b border-slate-100">{row.hlm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 font-semibold mt-4 text-center">
            The answer is therefore not that HLM is universally better. The correct model depends on hospital volume, specialty mix, urgency, capital availability, clinical expectations and long-term strategy.
          </p>
        </div>
      </section>

      {/* ── WHICH HOSPITALS ── */}
      <section className="py-16 max-w-[1260px] mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Target Facilities</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1">
            Which Hospitals Can Benefit Most From HLM?
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {hospitalTypes.map((h, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-400 transition-all space-y-2">
              <h3 className="font-extrabold text-[#0f2d5e] text-sm">{h.beds}</h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ONSITE vs REFERENCE TESTS ── */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Onsite */}
            <div>
              <span className="text-emerald-600 font-black text-xs uppercase tracking-widest">Stays Onsite</span>
              <h2 className="text-xl md:text-2xl font-black text-[#0f2d5e] mt-1 mb-5">
                What Laboratory Tests Should Remain Onsite?
              </h2>
              <p className="text-slate-600 text-xs font-semibold mb-5 leading-relaxed">
                There is no universal HLM test menu. The onsite menu must be determined by the hospital&apos;s clinical services and the consequences of delaying a result.
              </p>
              <div className="space-y-2">
                {onsiiteTests.map((t, i) => (
                  <div key={i} className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 flex gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-extrabold text-[#0f2d5e]">{t.area}</p>
                      <p className="text-xs text-slate-600 font-semibold">{t.examples}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reference */}
            <div>
              <span className="text-blue-600 font-black text-xs uppercase tracking-widest">QXL Reference Lab</span>
              <h2 className="text-xl md:text-2xl font-black text-[#0f2d5e] mt-1 mb-5">
                What Tests Can Go to the QXL Reference Laboratory?
              </h2>
              <p className="text-slate-600 text-xs font-semibold mb-5 leading-relaxed">
                Tests suitable for centralised processing are generally investigations where specialised platforms, experienced interpretation or economies of scale outweigh the value of immediate onsite testing.
              </p>
              <div className="space-y-2">
                {referenceTests.map((t, i) => (
                  <div key={i} className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 flex gap-3">
                    <Microscope className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-extrabold text-[#0f2d5e]">{t.area}</p>
                      <p className="text-xs text-slate-600 font-semibold">{t.examples}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EMERGENCY TAT ── */}
      <section className="py-16 max-w-[1260px] mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Critical Care</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1 mb-6">
            How is Emergency Turnaround Time Managed?
          </h2>
          <div className="bg-red-50/60 border border-red-200 rounded-2xl p-6 mb-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-red-800">
                This is one of the most important questions a hospital should ask before entering an HLM agreement. QXL separates investigations into defined priority classes.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {[
              { label: "STAT / Critical", color: "bg-red-100 border-red-300 text-red-800", desc: "For immediate emergency, ICU, OT or acute clinical decisions — must remain onsite when result cannot tolerate transport." },
              { label: "Urgent", color: "bg-amber-100 border-amber-300 text-amber-800", desc: "Time-sensitive but not immediate. Defined turnaround targets within the HLM agreement." },
              { label: "Routine Onsite", color: "bg-emerald-100 border-emerald-300 text-emerald-800", desc: "Frequent, high-volume investigations processed within the hospital laboratory." },
              { label: "Routine Reference / Specialised", color: "bg-blue-100 border-blue-300 text-blue-800", desc: "Lower-volume or complex investigations processed at QXL's NABL-accredited reference laboratory." },
            ].map((p, i) => (
              <div key={i} className={`rounded-2xl border p-4 ${p.color}`}>
                <p className="font-extrabold text-sm mb-1">{p.label}</p>
                <p className="text-xs font-semibold leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-extrabold text-[#0f2d5e] text-sm mb-3">Emergency laboratory management can include:</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                "24×7 onsite testing capability where required",
                "STAT identification in the LIS",
                "Defined sample-to-result targets",
                "Equipment backup protocols",
                "Reagent buffer stock",
                "Critical-value escalation",
                "Documented communication to doctors/nursing teams",
                "Downtime procedures",
                "Regular monitoring of TAT compliance",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUALITY MANAGEMENT ── */}
      <section className="py-16 bg-[#0B2545] text-white">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Quality Systems</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
              How Does QXL Manage Laboratory Quality?
            </h2>
            <p className="text-sky-200 text-sm font-semibold mt-3 leading-relaxed">
              Modern laboratory quality extends from the moment a test is ordered until the clinically validated result reaches the treating team. ISO 15189:2022 covers requirements for the quality and competence of medical laboratories, and NABL accredits medical laboratories in India against ISO 15189.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Pre-Analytical Quality",
                items: ["Patient identification", "Sample identification", "Correct tube selection", "Sample collection SOPs", "Sample acceptance/rejection criteria", "Centrifugation & transport", "Temperature control", "Training of ward and laboratory staff"],
              },
              {
                title: "Analytical Quality",
                items: ["Internal Quality Control (IQC)", "Calibration", "Lot verification", "Reagent management", "Preventive maintenance", "Equipment logs", "Method verification/validation", "Equipment downtime procedures"],
              },
              {
                title: "Post-Analytical & Management",
                items: ["Result verification", "Critical-value communication", "Correct reference intervals", "TAT monitoring", "Document control", "Staff competency assessment", "Internal audits", "Non-conformity management & CAPA"],
              },
            ].map((section, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
                <h3 className="font-extrabold text-[#D69A18] text-base">{section.title}</h3>
                <ul className="space-y-1.5">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-sky-100 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NABL ── */}
      <section className="py-16 max-w-[1260px] mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Accreditation</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1 mb-6">
            Can an HLM Hospital Laboratory Become NABL Accredited?
          </h2>
          <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-5">
            <p className="text-slate-700 text-sm font-semibold leading-relaxed">
              Yes, an HLM-operated hospital laboratory can build toward NABL accreditation, provided it meets the applicable NABL and ISO 15189 requirements.
            </p>
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5">
              <p className="text-amber-900 text-sm font-bold leading-relaxed">
                <strong>Important:</strong> QXL&apos;s NABL accreditation does not automatically make every hospital laboratory managed by QXL NABL accredited. Accreditation applies to the accredited laboratory and its approved scope and arrangements.
              </p>
            </div>
            <p className="text-slate-700 text-sm font-semibold leading-relaxed">
              For an HLM partner seeking accreditation, QXL can support the hospital through:
            </p>
            <div className="flex flex-wrap gap-2">
              {["Gap assessment", "Quality system development", "SOP implementation", "Staff competency", "Equipment documentation", "IQC/EQAS", "Quality indicators", "Internal audit", "Management review", "NC/CAPA", "Assessment preparedness"].map((step, i) => (
                <span key={i} className="bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-xl">
                  {step}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HLM MODELS ── */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Partnership Models</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1">
              QXL HLM Is Not a One-Size-Fits-All Contract
            </h2>
            <p className="text-slate-600 text-sm font-semibold mt-3">Different hospitals need different models.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {hlmModels.map((model, i) => (
              <div key={i} className="bg-[#f8fafc] rounded-2xl border border-slate-200 p-6 space-y-3 hover:border-blue-400 hover:shadow-md transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  model.color === "blue" ? "bg-blue-50 text-blue-600" :
                  model.color === "emerald" ? "bg-emerald-50 text-emerald-600" :
                  model.color === "purple" ? "bg-purple-50 text-purple-600" :
                  "bg-amber-50 text-amber-600"
                }`}>
                  <model.icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-[#0f2d5e] text-sm">{model.title}</h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">{model.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECONOMICS ── */}
      <section className="py-16 max-w-[1260px] mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Economics</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1 mb-5">
            HLM Can Change Hospital Laboratory Economics
          </h2>
          <p className="text-slate-600 text-sm font-semibold mb-6 leading-relaxed">
            The real cost of operating a laboratory is more than the reagent cost per test. The better question is:
          </p>
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 mb-6">
            <p className="text-[#0f2d5e] text-sm font-bold text-center">
              &ldquo;At our actual test volume, what is the complete cost of producing a reliable result within the TAT our clinicians require?&rdquo;
            </p>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <p className="text-xs font-extrabold text-slate-700 mb-3">True laboratory operating costs include:</p>
            <div className="grid md:grid-cols-3 gap-2">
              {[
                "Equipment purchase or rental", "AMC/CMC", "Calibration",
                "Reagents", "Controls and calibrators", "Staff salaries",
                "Specialist medical oversight", "24×7 rostering", "Training",
                "Quality programmes", "Software", "Electricity",
                "UPS and power backup", "Refrigeration", "Biomedical waste management",
                "Inventory loss", "Reagent expiry", "Equipment downtime",
                "Repeat testing", "Accreditation", "Administrative oversight",
              ].map((cost, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{cost}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY QXL ── */}
      <section className="py-16 bg-[#0B2545] text-white">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Why QXL</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
              Why QXL Diagnostics for Hospital Laboratory Management?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Doctor-Led Diagnostic Organisation",
                desc: "QXL is led by Dr Shantakumar Muruda, MD Biochemistry, a clinical biochemist and NABL Lead/Technical Assessor with over 150 accreditation assessments across India.",
              },
              {
                title: "NABL-Accredited Reference Laboratory",
                desc: `QXL's principal laboratory operates under NABL accreditation ${NABL_CERTIFICATE} and ${ISO_STANDARD}. The applicable accredited scope should always be verified for the investigation concerned.`,
              },
              {
                title: "Existing Hospital Diagnostic Network",
                desc: "QXL already operates hospital laboratory partnerships and supports 190+ B2B hospital/laboratory clients in Bengaluru and Karnataka.",
              },
              {
                title: "Super-Speciality Reference Capability",
                desc: "QXL provides access to specialised diagnostics including advanced biochemistry, autoimmune testing, molecular diagnostics, microbiology, histopathology and related investigations.",
              },
              {
                title: "Local Bengaluru Reference Laboratory",
                desc: "For Bengaluru hospitals, specialised samples do not need to travel to another state or distant national laboratory.",
              },
              {
                title: "Direct Laboratory-Doctor Access",
                desc: "Clinicians can discuss complex or discordant results directly with QXL's laboratory medical specialists. Not a call-centre.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
                <h3 className="font-extrabold text-[#D69A18] text-base">{item.title}</h3>
                <p className="text-xs text-sky-100 font-semibold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HLM MEDIA AUTHORITY BLOCK ── */}
      <section className="qxl-hlm-media">
        <div className="qxl-container text-center">
          <p className="qxl-media-eyebrow">
            QXL HLM IN THE NEWS
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1 mb-3">
            QXL Diagnostics&apos; Hospital Laboratory Management Expansion
          </h2>
          <p className="text-slate-600 text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
            QXL Diagnostics has announced plans to expand its Hospital Laboratory Management network, targeting 60 hospital laboratory partnerships by 2028.
          </p>
          <div className="qxl-hlm-media-links">
            <a
              href="https://www.business-standard.com/content/press-releases-ani/qxl-diagnostics-targets-60-hospital-laboratory-partnerships-by-2028-126091600351_1.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#0f2d5e] text-white px-5 py-3 rounded-xl font-bold text-xs hover:bg-[#1e3a8a] transition-all"
            >
              <span>Read coverage in Business Standard →</span>
            </a>
            <Link
              href="/news/qxl-diagnostics-60-hospital-laboratory-partnerships-2028/"
              className="inline-flex items-center gap-1.5 bg-white border border-[#D69A18] text-[#0f2d5e] px-5 py-3 rounded-xl font-bold text-xs hover:bg-amber-50 transition-all"
            >
              <span>View All Media Coverage →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW TO PARTNER ── */}
      <section className="py-16 max-w-[1260px] mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Partnership Process</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1">
            How Can a Hospital Partner With QXL?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partnershipSteps.map((step, i) => (
            <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs text-center space-y-2">
              <span className="inline-block bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">{step.step}</span>
              <h3 className="font-extrabold text-[#0f2d5e] text-xs">{step.title}</h3>
              <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">FAQs</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1">
              Frequently Asked Questions About Hospital Laboratory Management
            </h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-[#f8fafc] border border-slate-200 p-6 rounded-2xl shadow-xs">
                <h3 className="font-extrabold text-[#0f2d5e] text-sm mb-2">{f.q}</h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="hlm-inquiry" className="py-16 bg-gradient-to-br from-slate-900 to-[#0B2545] text-white">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-block bg-[#D69A18] text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
              Request HLM Partnership
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Build Your Hospital Laboratory Around Patient Care — Not Around Equipment Ownership
            </h2>
            <p className="text-sky-200 text-sm font-semibold leading-relaxed max-w-2xl mx-auto">
              A hospital does not necessarily need to own every analyser required to give its clinicians access to excellent laboratory medicine. It needs the right tests available in the right place, at the right time, under the right quality system, with a laboratory specialist available when clinical interpretation matters.
            </p>
            <div className="bg-white/8 border border-white/15 rounded-2xl p-5 max-w-xl mx-auto text-left space-y-2">
              <p className="text-xs font-bold text-sky-100">QXL Diagnostics Super Speciality Lab</p>
              <p className="text-xs text-sky-200 font-semibold">NABL Accredited Medical Laboratory — {NABL_CERTIFICATE}</p>
              <p className="text-xs text-sky-200 font-semibold">Bengaluru, Karnataka</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/919964639639?text=Hi%20Dr.%20Muruda%2C%20I%20am%20interested%20in%20Hospital%20Laboratory%20Management%20(HLM)%20for%20our%20hospital.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1eb956] text-white font-black px-7 py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <MessageSquareText className="w-4 h-4" />
                <span>Request HLM Proposal via WhatsApp</span>
              </a>
              <a
                href={`tel:${PHONE_E164}`}
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-black px-7 py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-[#D69A18]" />
                <span>Hospital Partnerships: {PHONE_DISPLAY}</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-black px-7 py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <Mail className="w-4 h-4 text-sky-300" />
                <span>{EMAIL}</span>
              </a>
            </div>

            {/* Internal Links */}
            <div className="pt-6 border-t border-white/15">
              <p className="text-xs font-bold text-sky-200 mb-3">Related QXL Services</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/for-hospitals" className="text-xs text-sky-300 hover:text-white font-semibold transition-colors">Reference Laboratory for Hospitals →</Link>
                <Link href="/b2b-reference-lab" className="text-xs text-sky-300 hover:text-white font-semibold transition-colors">B2B Reference Lab →</Link>
                <Link href="/quality-and-accreditation" className="text-xs text-sky-300 hover:text-white font-semibold transition-colors">Quality & Accreditation →</Link>
                <Link href="/doctor-partnership" className="text-xs text-sky-300 hover:text-white font-semibold transition-colors">Doctor Partnership →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

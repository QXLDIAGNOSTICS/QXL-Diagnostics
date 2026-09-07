import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Phone,
  Mail,
  FileText,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Dna,
  Microscope,
  Stethoscope,
  Truck,
  Users,
  MessageSquareText,
  CheckSquare
} from "lucide-react";
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, EMAIL, NABL_CERTIFICATE, ISO_STANDARD } from "@/lib/businessInfo";
import B2bInquiryForm from "./B2bInquiryForm";

export const metadata: Metadata = {
  title: "Reference Laboratory for Hospitals & Clinics in Bengaluru | QXL Diagnostics",
  description:
    "NABL-accredited (MC-6849) reference lab for hospitals, nursing homes and clinics. Autoimmune, SPEP/IFE, IHC, molecular and cardiometabolic testing with consultant sign-off, scheduled pickups and fortnightly billing.",
  alternates: { canonical: `${SITE_URL}/for-hospitals` },
  openGraph: {
    title: "Reference Laboratory for Hospitals & Clinics in Bengaluru | QXL Diagnostics",
    description:
      "NABL-accredited reference laboratory services across Bengaluru. MD consultant sign-off, cold-chain pickups, custom report headers, and fortnightly billing.",
    url: `${SITE_URL}/for-hospitals`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

const disciplines = [
  {
    category: "Autoimmune Serology",
    highlights: "ANA by IFA (HEp-2), ENA profile, anti-dsDNA, anti-CCP, ANCA (PR3/MPO), immunoblot panels",
  },
  {
    category: "Protein Studies",
    highlights: "SPEP (Serum Protein Electrophoresis), Immunofixation (IFE), Serum Free Light Chains, Urine Bence Jones",
  },
  {
    category: "Cardiometabolic Risk",
    highlights: "ApoA1, ApoB, Lp(a), hs-CRP, Homocysteine, NT-proBNP, Fasting Insulin, C-Peptide",
  },
  {
    category: "Histo-cytopathology",
    highlights: "Biopsy, FNAC, LBC Pap Smear, Special Stains, Comprehensive IHC Panels",
  },
  {
    category: "Molecular & Infectious",
    highlights: "Multiplex PCR (FilmArray syndromic panels), TB CB-NAAT with NTM screen, HPV DNA PCR, HBV/HCV viral load",
  },
  {
    category: "Allergy",
    highlights: "Phadiatop, India-specific food & inhalant IgE panels, total IgE",
  },
  {
    category: "Coagulation",
    highlights: "Factor assays, Lupus Anticoagulant, Protein C/S, Antithrombin III",
  },
  {
    category: "Maternal & Fertility",
    highlights: "Double/Triple/Quadruple marker with software risk calculation, AMH, Full Hormone Panels",
  },
  {
    category: "Microbiology",
    highlights: "VITEK automated ID/AST, BacT/ALERT blood cultures, automated urine culture & sensitivity",
  },
  {
    category: "Stone Analysis",
    highlights: "FTIR spectroscopy renal stone composition report",
  },
];

const faqs = [
  {
    q: "Do you have a minimum monthly sample volume?",
    a: "No. Referral clients start with a single sample. Collection centre and HLM (Hospital Lab Management) models have commercial thresholds we will discuss on a call.",
  },
  {
    q: "Will the report carry my hospital's name?",
    a: "Yes. Reports are issued on your letterhead with QXL's NABL accreditation reference (MC-6849) and the signing consultant's details, as required under ISO 15189.",
  },
  {
    q: "How are samples transported?",
    a: "In temperature-controlled cold-chain boxes with tamper-evident bags, logged at pickup and receipt with chain-of-custody tracking. Rejected samples are reported to you immediately.",
  },
  {
    q: "What are the turnaround times?",
    a: "Routine chemistry and haematology are reported same-day; immunoassay same-day; autoimmune IFA/immunoblot 24–48 hrs; SPEP/IFE 24–48 hrs; histopathology 48–72 hrs; IHC 3–5 days; molecular PCR 24–48 hrs.",
  },
  {
    q: "How are critical values handled?",
    a: "Phoned directly to your designated medical contact immediately upon verification, followed by a written critical value record on the final digital report.",
  },
  {
    q: "How do you bill?",
    a: "Fortnightly itemised invoice. B2B rates are on our referral rate card, shared after a short onboarding call to match the menu to your facility's case mix.",
  },
  {
    q: "Can you take over our existing hospital lab?",
    a: "Yes — that is our Hospital Lab Management (HLM/LMS) model. We bring equipment, trained staff, SOPs, and quality governance to take your in-house lab to NABL accreditation.",
  },
  {
    q: "Are you NABL accredited for all the tests on this page?",
    a: "Our primary accreditation certificate is MC-6849 under ISO 15189:2022. Our scope document is available on request and searchable on the official NABL portal.",
  },
];

export default function ForHospitalsPage() {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── 2. HERO SECTION ── */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#0f2d5e] to-[#164263] text-white py-14 md:py-20 relative overflow-hidden">
        <div className="max-w-[1260px] mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">
              For Hospitals, Nursing Homes, Clinics &amp; Laboratories
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 leading-tight text-white tracking-tight">
              The reference laboratory your patients never see — and your clinicians rely on
            </h1>

            <p className="text-sky-100 text-base md:text-lg leading-relaxed mb-8 font-semibold max-w-3xl">
              QXL runs super-speciality testing for 190+ hospitals and labs across Bengaluru. Every report is signed by a consultant pathologist, biochemist or microbiologist. Your branding on the report, our accreditation behind it.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#b2b-form"
                className="bg-[#D69A18] hover:bg-[#b88313] text-white font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <span>Request a Rate Card</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`tel:${PHONE_E164}`}
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-black px-7 py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-[#D69A18]" />
                <span>Speak to Dr. Muruda — {PHONE_DISPLAY}</span>
              </a>
            </div>

            {/* Trust Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-white/15">
              <div className="flex items-center gap-2.5 text-xs font-bold text-sky-100">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>NABL Accredited · {NABL_CERTIFICATE} · {ISO_STANDARD}</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-bold text-sky-100">
                <Building2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>190+ B2B Clients in Bengaluru</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-bold text-sky-100">
                <Truck className="w-5 h-5 text-sky-300 shrink-0" />
                <span>13-Runner Pickup Network (4 Batch Windows Daily)</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-bold text-sky-100">
                <Stethoscope className="w-5 h-5 text-purple-300 shrink-0" />
                <span>Reports Signed by MD-Qualified Consultants</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHO THIS PAGE IS FOR ── */}
      <section className="py-16 max-w-[1260px] mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Partnership Models</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1">
            Built for the lab you don&apos;t want to build
          </h2>
          <p className="text-slate-600 text-sm font-semibold mt-2 leading-relaxed">
            You have the patients and the clinicians. You don&apos;t have the immunofluorescence bench, the electrophoresis unit, or a pathologist on call at 9 pm. Running that in-house costs more than it earns until you&apos;re doing several hundred samples a day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:border-blue-400 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center font-bold">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#0f2d5e]">1. Lab-to-Lab Referral</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-semibold">
              Route individual specialized tests or your entire super-speciality menu to us. No minimum monthly commitment. Cold-chain pickup, custom report branding, and consultant interpretation included.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:border-emerald-400 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#0f2d5e]">2. Collection Centre / Franchise</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-semibold">
              A QXL-branded front desk inside or near your clinic/nursing home, operated under our SOPs, NABL governance, and digital LIS software interface.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:border-purple-400 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#0f2d5e]">3. Hospital Lab Management (HLM)</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-semibold">
              We manage your in-house laboratory end-to-end — equipment, staffing, quality control, Westgard IQC, and take your facility lab to formal NABL accreditation with zero capex.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT YOU CAN ROUTE TO US ── */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Test Directory Highlights</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1">
              Tests worth referring — and the ones you&apos;d rather not run yourself
            </h2>
            <p className="text-slate-600 text-sm font-semibold mt-2">
              Super-speciality assays, immunofluorescence, and molecular diagnostics processed on Roche cobas c702/e801 and Sysmex XN platforms with daily Westgard IQC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {disciplines.map((d, i) => (
              <div key={i} className="bg-[#f8fafc] border border-slate-200 p-6 rounded-2xl flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#D69A18] flex items-center justify-center font-black text-sm shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0f2d5e] text-base mb-1">{d.category}</h3>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">{d.highlights}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center bg-blue-50/70 border border-blue-200 p-4 rounded-2xl max-w-2xl mx-auto">
            <p className="text-xs text-slate-700 font-bold">
              Routine chemistry, haematology, and immunoassay run on Roche cobas c702/e801 and Sysmex XN — with daily multi-rule Westgard IQC and EQAS participation.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ── */}
      <section className="py-16 max-w-[1260px] mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Operational Workflow</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1">
            From your collection room to a signed report
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: "Step 1", title: "Onboard in 48 hrs", desc: "Client ID set up, sample codes mapped, requisition format agreed, and report header formatted with your logo." },
            { step: "Step 2", title: "We Pick Up", desc: "13 geographically zoned runner routes, 4 batch windows daily, cold-chain boxes, tamper-evident bags, chain-of-custody log." },
            { step: "Step 3", title: "We Test & Sign", desc: "Every super-speciality result reviewed by MD consultant before release. Delta checks & immediate critical value phone calls." },
            { step: "Step 4", title: "Receive Reports", desc: "PDF on your letterhead by email/WhatsApp, or direct LIS portal integration. Interpretive comments included on complex panels." },
            { step: "Step 5", title: "Fortnightly Invoice", desc: "Itemised billing statement every 15 days. Clear B2B pricing, no prepayment, no deposits." },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl text-left space-y-2 shadow-2xs">
              <span className="inline-block bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                {s.step}
              </span>
              <h3 className="font-extrabold text-[#0f2d5e] text-sm">{s.title}</h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. WHY QXL AND NOT NATIONAL CHAINS ── */}
      <section className="py-16 bg-[#0B2545] text-white">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Differentiators</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
              A lab run by a NABL assessor, not a franchise sales team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
              <h3 className="font-extrabold text-[#D69A18] text-base">Assessor-Grade Quality</h3>
              <p className="text-xs text-sky-100 font-semibold leading-relaxed">
                QXL Founder Dr. Shantakumar Muruda (MD Biochemistry) is a NABL-empanelled Lead Assessor with 150+ accreditation assessments across India. Our quality system is built by someone who audits other labs for a living.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
              <h3 className="font-extrabold text-[#D69A18] text-base">Doctors on the Phone</h3>
              <p className="text-xs text-sky-100 font-semibold leading-relaxed">
                Your clinicians can speak directly to the pathologist or biochemist who signed the report, not a call-centre script agent. Direct doctor-to-doctor consultations.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
              <h3 className="font-extrabold text-[#D69A18] text-base">Local Turnaround</h3>
              <p className="text-xs text-sky-100 font-semibold leading-relaxed">
                Samples don&apos;t fly to another city. Same-day reporting on chemistry and immunoassay; rapid turnaround on IHC, histopathology and molecular PCR.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
              <h3 className="font-extrabold text-[#D69A18] text-base">No Competition with You</h3>
              <p className="text-xs text-sky-100 font-semibold leading-relaxed">
                We respect your clinician relationships. We don&apos;t run walk-in outlets competing directly in your immediate catchment area.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
              <h3 className="font-extrabold text-[#D69A18] text-base">Accreditation as a Service</h3>
              <p className="text-xs text-sky-100 font-semibold leading-relaxed">
                For Hospital Lab Management (HLM) partners, we commit to taking your in-house laboratory to formal NABL accreditation within a defined timeline.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
              <h3 className="font-extrabold text-[#D69A18] text-base">Clinical Interpretive Comments</h3>
              <p className="text-xs text-sky-100 font-semibold leading-relaxed">
                Autoimmune IFA patterns, serum protein electrophoretic bands, and complex tumour markers include actionable clinical notes for your treating physicians.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ SECTION ── */}
      <section className="py-16 max-w-[1260px] mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">B2B Clarifications</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1">
            Frequently Asked Questions by Medical Directors &amp; Lab In-charges
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs">
              <h3 className="font-extrabold text-[#0f2d5e] text-base mb-2">{f.q}</h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10 & 11. FINAL CTA BLOCK & B2B INQUIRY FORM ── */}
      <section id="b2b-form" className="py-16 bg-gradient-to-br from-slate-900 to-[#0B2545] text-white">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            
            <div className="md:col-span-6 space-y-6">
              <span className="inline-block bg-[#D69A18] text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                Start Referral Partnership
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                Send us one difficult sample this week
              </h2>
              <p className="text-sky-200 text-sm font-semibold leading-relaxed">
                The fastest way to evaluate a reference lab is to send it something you&apos;d rather not run yourself — an ANA with an odd pattern, an SPEP with a faint band, or an IHC panel. We&apos;ll return it signed, with doctor comments, and you decide from there.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs font-bold text-sky-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Onboarding completed within 48 hours</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-sky-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Referral rate card shared immediately after submission</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-sky-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Direct phone coordination with Dr. Muruda &amp; B2B desk</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="https://wa.me/919964639639?text=Hi%20Dr.%20Muruda%2C%20I%20am%20interested%20in%20a%20B2B%20Referral%20Rate%20Card%20for%20our%20facility."
                  target="_blank" rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1eb956] text-white font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
                >
                  <MessageSquareText className="w-4 h-4" />
                  <span>WhatsApp B2B Desk</span>
                </a>
              </div>
            </div>

            {/* B2B Interactive Form */}
            <div className="md:col-span-6">
              <B2bInquiryForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

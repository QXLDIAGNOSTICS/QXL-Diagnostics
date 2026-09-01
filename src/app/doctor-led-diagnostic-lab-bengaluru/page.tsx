import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  MessageCircle, 
  FileText, 
  Microscope, 
  Dna, 
  Activity, 
  Building2, 
  UserCheck,
  ChevronRight
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BookingFormWidget } from "../../components/BookingFormWidget";
import { WHATSAPP_LINK } from "../../lib/businessInfo";

export const metadata: Metadata = {
  title: "Doctor-Led Diagnostic Lab in Bengaluru | QXL Diagnostics",
  description: "Discover QXL Diagnostics, a NABL Accredited, doctor-led diagnostic lab in Bengaluru combining advanced technology, quality systems and specialist medical review.",
  keywords: [
    "doctor-led diagnostic lab in Bengaluru",
    "NABL Accredited diagnostic laboratory Bengaluru",
    "accurate blood test lab Bangalore",
    "super-speciality diagnostic lab Bengaluru",
    "advanced pathology and molecular diagnostics Bengaluru",
    "expert-reviewed lab reports",
    "clinical biochemistry laboratory Bengaluru",
    "home blood sample collection Bengaluru",
    "Dr. Shantakumar Muruda",
    "QXL Diagnostics"
  ],
  alternates: {
    canonical: "https://qxldiagnostics.com/doctor-led-diagnostic-lab-bengaluru",
  },
};

const disciplines = [
  {
    name: "Clinical Biochemistry",
    desc: "Quantitative measurement of metabolic markers, liver & kidney enzymes, lipids, hormones, and cardiac biomarkers.",
    icon: Activity,
    badge: "Specialist Supervised"
  },
  {
    name: "Pathology & Haematology",
    desc: "Complete blood count analysis, peripheral smear examination, coagulation studies, and bone marrow cell evaluation.",
    icon: Microscope,
    badge: "Pathologist Reviewed"
  },
  {
    name: "Microbiology & Serology",
    desc: "Bacterial culture & sensitivity, fungal identification, viral serology, and rapid pathogen detection.",
    icon: ShieldCheck,
    badge: "Infection Control"
  },
  {
    name: "Molecular Diagnostics",
    desc: "High-sensitivity RT-PCR, gene expression profiling, and advanced DNA/RNA molecular screenings.",
    icon: Dna,
    badge: "Advanced Tech"
  },
  {
    name: "Immunology & Hormones",
    desc: "Chemiluminescence immunoassays (CLIA) for thyroid, reproductive hormones, tumor markers, and autoimmune profiles.",
    icon: Award,
    badge: "CLIA Precision"
  },
  {
    name: "Histopathology & Cytology",
    desc: "Biopsy tissue processing, FNAC examination, PAP smears, and cancer diagnostic histopathology by senior pathologists.",
    icon: UserCheck,
    badge: "Expert Biopsy Review"
  }
];

const locationsList = [
  { name: "Kengeri Main Laboratory", address: "#297/3, Mysore Road, Opposite Kengeri Bus Station, Bengaluru - 560060", tag: "Super Speciality Lab" },
  { name: "Mysore Road Collection Center", address: "Opposite RV College of Engineering, Mysore Road, Bengaluru", tag: "Express Collection" },
  { name: "Yelahanka Partner Center", address: "Sector B, Yelahanka New Town, Bengaluru - 560064", tag: "Partner Facility" }
];

export default function DoctorLedSeoPage() {
  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-800">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0b132b] via-[#0f2d5e] to-[#1c3a6e] text-white py-14 lg:py-20 relative overflow-hidden">
          <div className="max-w-[1260px] mx-auto px-4 w-full relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              
              {/* Left Column Text */}
              <div className="flex-1 space-y-5 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-4 py-1.5 rounded-full text-sky-300 text-xs font-black uppercase tracking-wider">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>NABL Accredited Laboratory (MC-10025) | ISO 15189:2022</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                  QXL Diagnostics: Bengaluru’s <span className="text-sky-400">Doctor-Led Laboratory</span> for Smart, Clinically Accurate Testing
                </h1>

                <p className="text-slate-300 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
                  Founded by <strong className="text-white font-bold">Clinical Biochemist Dr. Shantakumar Muruda</strong>, QXL Diagnostics combines advanced automation, discipline-specific quality control, and direct specialist oversight to deliver reports doctors trust.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    href="/book"
                    className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-sky-500/50 transition-all text-xs uppercase tracking-wider"
                  >
                    Book a Test Online
                  </Link>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-md transition-all text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Booking</span>
                  </a>
                </div>
              </div>

              {/* Right Column: AI Answer Snippet Box (Search Engine Highlight) */}
              <div className="w-full lg:w-[420px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-left">
                <span className="bg-sky-500/30 text-sky-200 border border-sky-400/40 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-4">
                  AI & Search Overview
                </span>

                <h2 className="text-lg font-extrabold text-white mb-3 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-amber-400" />
                  What makes QXL Doctor-Led?
                </h2>

                <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                  QXL Diagnostics is a doctor-led, NABL Accredited super-speciality diagnostic laboratory in Bengaluru. Founded by Clinical Biochemist Dr. Shantakumar Muruda, QXL combines advanced laboratory technology, discipline-specific quality control and oversight by specialists in biochemistry, pathology, microbiology and histopathology to deliver clinically meaningful reports.
                </p>

                <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-semibold text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Medical Entity: Qualitify Healthtech Pvt. Ltd.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>NABL Accreditation: MC-10025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>ISO 15189:2022 Quality Standards</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 6 Disciplines Section */}
        <section className="py-14 max-w-[1260px] mx-auto px-4 w-full">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="bg-sky-100 text-[#0284c7] font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest border border-sky-200">
              Super-Speciality Disciplines
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f2d5e] mt-2">
              Discipline-Specific Medical Review
            </h2>
            <p className="text-slate-600 text-sm font-medium mt-2">
              Every blood sample and diagnostic assay undergoes rigorous multi-tier verification led by specialized medical consultants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplines.map((d, i) => {
              const Icon = d.icon;
              return (
                <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-extrabold bg-slate-100 text-slate-700 px-3 py-1 rounded-full uppercase tracking-wider">
                        {d.badge}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-[#0f2d5e] text-lg mb-2">{d.name}</h3>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">{d.desc}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2563eb]">
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Founder Bio Section */}
        <section className="py-14 bg-white border-y border-slate-100">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="w-full lg:w-1/3">
                <div className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-3xl p-8 border border-sky-200 text-center relative overflow-hidden">
                  <div className="w-32 h-32 rounded-full bg-white border-4 border-sky-400 mx-auto mb-4 overflow-hidden relative shadow-md flex items-center justify-center">
                    <UserCheck className="w-16 h-16 text-[#0f2d5e]" />
                  </div>
                  <h3 className="font-black text-[#0f2d5e] text-xl">Dr. Shantakumar Muruda</h3>
                  <p className="text-xs font-bold text-[#2563eb] mt-1">Founder & Lead Clinical Biochemist</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-2">QXL Diagnostics / Qualitify Healthtech</p>
                </div>
              </div>

              <div className="w-full lg:w-2/3 space-y-4 text-left">
                <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">
                  Leadership & Vision
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0f2d5e]">
                  "Precision diagnostics requires expert medical leadership, not just automated machines."
                </h2>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  Under the direction of Clinical Biochemist Dr. Shantakumar Muruda, QXL Diagnostics was built to bridge the gap between complex laboratory data and actionable clinical insights. By adhering to NABL MC-10025 and ISO 15189:2022 guidelines, our team ensures every result is validated for biological plausibility and clinical accuracy.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>NABL Accredited Quality Systems</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Daily Internal & External Quality Assays</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Consultant-Reviewed Critical Alerts</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Free Home Collection Across Bengaluru</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="py-14 max-w-[1260px] mx-auto px-4 w-full">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f2d5e]">
              QXL Lab Centres & Partner Facilities in Bengaluru
            </h2>
            <p className="text-slate-600 text-sm font-medium mt-1">
              Visit our state-of-the-art laboratory centers or request home sample collection in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locationsList.map((loc, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="bg-blue-50 text-[#2563eb] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                    {loc.tag}
                  </span>
                  <h3 className="font-extrabold text-[#0f2d5e] text-base mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#2563eb]" />
                    {loc.name}
                  </h3>
                  <p className="text-slate-600 text-xs font-medium leading-relaxed">{loc.address}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <a
                    href="tel:+919964639639"
                    className="text-xs font-bold text-[#2563eb] hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call +91 9964 639 639</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

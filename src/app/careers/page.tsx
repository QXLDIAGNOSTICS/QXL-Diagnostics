import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Microscope,
  GraduationCap,
  Users,
  Heart,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ChevronRight,
  MessageSquareText,
  Zap,
  ShieldCheck,
  FlaskConical,
  BookOpen,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, EMAIL, NABL_CERTIFICATE, ISO_STANDARD } from "@/lib/businessInfo";

export const metadata: Metadata = {
  title: "Careers at QXL Diagnostics | Lab Jobs Bengaluru | QXL Diagnostics",
  description:
    "Join QXL Diagnostics — NABL-accredited super speciality diagnostic laboratory in Bengaluru. Explore career opportunities for laboratory scientists, pathologists, biochemists, microbiologists, phlebotomists and support staff.",
  alternates: { canonical: `${SITE_URL}/careers` },
  openGraph: {
    title: "Careers at QXL Diagnostics | Lab Jobs Bengaluru",
    description:
      "Join QXL Diagnostics — NABL-accredited super speciality diagnostic laboratory in Bengaluru. Explore careers for laboratory scientists, pathologists, biochemists, microbiologists and phlebotomists.",
    url: `${SITE_URL}/careers`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
  keywords: [
    "lab jobs Bengaluru",
    "pathology jobs Bengaluru",
    "medical laboratory jobs Bangalore",
    "NABL lab jobs Bengaluru",
    "laboratory technician jobs Bangalore",
    "diagnostic lab jobs Bengaluru",
    "biochemistry jobs Bengaluru",
    "microbiology jobs Bangalore",
    "phlebotomist jobs Bengaluru",
    "QXL Diagnostics careers",
    "QXL Diagnostics jobs",
  ],
};

const openRoles = [
  {
    title: "Medical Laboratory Technician (MLT)",
    department: "Laboratory Operations",
    type: "Full-Time",
    location: "Kengeri Main Lab, Bengaluru",
    icon: FlaskConical,
    color: "blue",
    summary: "Perform routine and specialised testing across haematology, biochemistry, microbiology and immunology. Participate in IQC/EQAS and quality management activities.",
    requirements: [
      "DMLT or BMLT or equivalent qualification",
      "Experience in a NABL-accredited laboratory preferred",
      "Familiarity with LIS and QC protocols",
      "Ability to work rotational shifts including 24×7",
    ],
  },
  {
    title: "Phlebotomist / Home Collection Specialist",
    department: "Patient Services",
    type: "Full-Time",
    location: "Bengaluru (Home Collection Routes)",
    icon: Heart,
    color: "rose",
    summary: "Perform skilled venepuncture and sample collection at patient homes across Bengaluru. Ensure correct tube selection, sample integrity, patient communication and timely delivery to the laboratory.",
    requirements: [
      "DMLT / phlebotomy certification or equivalent",
      "Skilled in venepuncture across all age groups",
      "Own two-wheeler preferred",
      "Professional communication and patient-facing skills",
    ],
  },
  {
    title: "Laboratory Biochemist",
    department: "Biochemistry",
    type: "Full-Time",
    location: "Kengeri Main Lab, Bengaluru",
    icon: Microscope,
    color: "purple",
    summary: "Operate and maintain biochemistry analysers, perform IQC, validate results and support reference laboratory operations for our B2B and hospital partners.",
    requirements: [
      "MSc / BSc Biochemistry or related discipline",
      "Experience in clinical biochemistry laboratory operations",
      "Knowledge of analyser calibration, QC and troubleshooting",
      "Experience in a NABL laboratory is advantageous",
    ],
  },
  {
    title: "Quality Officer / NABL Documentation Executive",
    department: "Quality Assurance",
    type: "Full-Time",
    location: "Kengeri Main Lab, Bengaluru",
    icon: ShieldCheck,
    color: "emerald",
    summary: "Maintain QMS documentation, coordinate EQAS participation, prepare for NABL surveillance and re-assessment, manage non-conformity records and corrective actions.",
    requirements: [
      "BSc / MSc in MLT, Biochemistry or related discipline",
      "Knowledge of ISO 15189:2022 requirements",
      "Experience in NABL documentation or laboratory QA",
      "Strong organisational and documentation skills",
    ],
  },
  {
    title: "Microbiologist",
    department: "Microbiology",
    type: "Full-Time",
    location: "Kengeri Main Lab, Bengaluru",
    icon: Microscope,
    color: "amber",
    summary: "Perform bacteriology, mycology, serology and other microbiology investigations. Manage culture and sensitivity testing, report critical values and participate in IQC.",
    requirements: [
      "MSc Microbiology or equivalent",
      "Experience in clinical microbiology laboratory",
      "Knowledge of CLSI/EUCAST AST standards",
      "Experience in a NABL-accredited laboratory preferred",
    ],
  },
  {
    title: "Customer Service Executive (Laboratory)",
    department: "Client Services",
    type: "Full-Time",
    location: "Kengeri / Yelahanka, Bengaluru",
    icon: Users,
    color: "sky",
    summary: "Handle patient and B2B client enquiries, report delivery, complaint management and laboratory booking. Provide professional support to hospitals, doctors and patients.",
    requirements: [
      "Graduate in any discipline",
      "Excellent communication in Kannada and English (Hindi advantageous)",
      "Prior experience in healthcare or laboratory customer service preferred",
      "Ability to handle a fast-paced environment",
    ],
  },
];

const whyQxl = [
  {
    icon: ShieldCheck,
    title: "NABL-Accredited Laboratory",
    desc: `Work in a quality-driven environment accredited by NABL (${NABL_CERTIFICATE}) under ${ISO_STANDARD}.`,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: GraduationCap,
    title: "Expert Medical Leadership",
    desc: "Led by Dr. Shantakumar Muruda, MD Medical Biochemistry and NABL Lead/Technical Assessor with 150+ accreditation assessments — learn directly from one of India's leading laboratory medicine specialists.",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: TrendingUp,
    title: "Super-Speciality Reference Laboratory",
    desc: "Work with advanced diagnostic technologies including autoimmune testing, molecular diagnostics, HPLC, mass spectrometry and immunohistochemistry.",
    color: "text-purple-600 bg-purple-50",
  },
  {
    icon: Star,
    title: "Career Growth in Clinical Diagnostics",
    desc: "QXL supports continuing education, NABL process training and professional development in laboratory medicine.",
    color: "text-amber-600 bg-amber-50",
  },
  {
    icon: Users,
    title: "Purpose-Driven Team",
    desc: "Join a team that believes rigorous laboratory science, honest reporting and clinical integrity are the foundation of good healthcare.",
    color: "text-rose-600 bg-rose-50",
  },
  {
    icon: MapPin,
    title: "Bengaluru-Based — Growing Network",
    desc: "A growing diagnostic organisation with a main laboratory in Kengeri and a network hub in Yelahanka, serving hospitals, clinics and patients across Bengaluru and Karnataka.",
    color: "text-sky-600 bg-sky-50",
  },
];

const values = [
  { title: "Scientific Rigour", desc: "We believe in getting results right, not just getting them fast. Quality is non-negotiable." },
  { title: "Clinical Integrity", desc: "We do not manufacture false urgency or over-investigate. We report what is clinically true." },
  { title: "Patient First", desc: "Every result we produce is connected to a real patient. That responsibility guides everything." },
  { title: "Continuous Learning", desc: "Medicine and laboratory science evolve constantly. We encourage every team member to keep learning." },
  { title: "Teamwork", desc: "Good laboratory medicine is a team sport — from the phlebotomist to the pathologist." },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 border-blue-200",
  rose: "bg-rose-50 text-rose-600 border-rose-200",
  purple: "bg-purple-50 text-purple-600 border-purple-200",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
  amber: "bg-amber-50 text-amber-600 border-amber-200",
  sky: "bg-sky-50 text-sky-600 border-sky-200",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Careers", item: `${SITE_URL}/careers` },
  ],
};

const jobPostingSchemas = openRoles.map((role, i) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: role.title,
  description: role.summary,
  hiringOrganization: {
    "@type": "Organization",
    name: "QXL Diagnostics",
    sameAs: SITE_URL,
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
  },
  employmentType: "FULL_TIME",
  datePosted: "2026-09-01",
}));

export default function CareersPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {jobPostingSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#0f2d5e] to-[#164263] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 80% 70%, #2563eb 0%, transparent 50%)" }} />

        {/* Floating background shapes */}
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-[1260px] mx-auto px-4 relative z-10">
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-[11px] text-sky-300 mb-6 font-semibold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Careers</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-5 shadow-sm">
                We&apos;re Hiring · Bengaluru, Karnataka
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 leading-tight text-white tracking-tight">
                Build Your Career in Diagnostic Excellence
              </h1>
              <p className="text-sky-100 text-base md:text-lg font-semibold leading-relaxed mb-5">
                QXL Diagnostics is a NABL-accredited super speciality diagnostic laboratory. We are growing — and we are looking for talented, committed people who want to do diagnostic medicine the right way.
              </p>
              <p className="text-sky-200 text-sm font-semibold leading-relaxed mb-8">
                Every laboratory result we produce affects a real patient&apos;s care. That responsibility is why we take quality seriously — and why we want team members who do too.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#open-roles" className="bg-[#D69A18] hover:bg-[#b88313] text-white font-black px-7 py-4 rounded-2xl text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all active:scale-95">
                  <span>View Open Roles</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/919964639639?text=Hi%2C%20I%20am%20interested%20in%20a%20career%20at%20QXL%20Diagnostics.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1eb956] text-white font-black px-7 py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
                >
                  <MessageSquareText className="w-4 h-4" />
                  <span>Send CV on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, color: "text-emerald-400", stat: "NABL", label: `Accredited · ${NABL_CERTIFICATE}` },
                { icon: BookOpen, color: "text-amber-400", stat: "150+", label: "NABL Assessments by Founder" },
                { icon: Users, color: "text-purple-300", stat: "190+", label: "B2B Hospital & Lab Partners" },
                { icon: Zap, color: "text-sky-300", stat: "24×7", label: "Central Lab Operations" },
                { icon: FlaskConical, color: "text-rose-300", stat: "1500+", label: "Tests in Reference Menu" },
                { icon: MapPin, color: "text-teal-300", stat: "2", label: "Bengaluru Locations" },
              ].map((s, i) => (
                <div key={i} className="bg-white/8 border border-white/15 rounded-2xl p-5 space-y-2">
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                  <p className={`text-2xl font-black ${s.color}`}>{s.stat}</p>
                  <p className="text-xs text-sky-200 font-semibold leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY QXL ── */}
      <section className="py-16 max-w-[1260px] mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Why Join Us</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1">
            Why Build Your Career at QXL Diagnostics?
          </h2>
          <p className="text-slate-600 text-sm font-semibold mt-3 leading-relaxed">
            QXL is not a large, anonymous diagnostic chain. We are a speciality laboratory with a specific scientific philosophy — and every person in our team has a direct impact on the quality of our work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyQxl.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 hover:shadow-md hover:border-blue-300 transition-all group">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-[#0f2d5e] text-sm">{item.title}</h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OUR VALUES ── */}
      <section className="py-16 bg-[#0B2545] text-white">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Culture</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
              What We Believe
            </h2>
            <p className="text-sky-200 text-sm font-semibold mt-3">
              Our values are not a wall poster. They are the things we actually argue about in case discussions, quality meetings and daily laboratory work.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-5">
            {values.map((v, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#D69A18]/20 border border-[#D69A18]/40 text-[#D69A18] flex items-center justify-center text-sm font-black mx-auto">
                  {i + 1}
                </div>
                <h3 className="font-extrabold text-white text-sm">{v.title}</h3>
                <p className="text-xs text-sky-200 font-semibold leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Who We Are</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1 mb-6">
              About QXL Diagnostics
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm text-slate-700 font-semibold leading-relaxed">
                <p>
                  QXL Diagnostics Super Speciality Lab is a NABL-accredited ({NABL_CERTIFICATE}) medical laboratory based in Bengaluru, Karnataka. We operate under {ISO_STANDARD}.
                </p>
                <p>
                  We are led by Dr. Shantakumar Muruda — MD Medical Biochemistry, Founder &amp; CEO — one of India&apos;s experienced laboratory medicine specialists and a NABL Lead/Technical Assessor who has conducted over 150 accreditation assessments across the country.
                </p>
                <p>
                  Our laboratory provides routine, specialised and super-speciality diagnostic services to patients directly, and operates as a reference laboratory for hospitals, clinics and laboratories across Bengaluru and Karnataka.
                </p>
                <p>
                  Our test menu spans haematology, clinical biochemistry, autoimmune diagnostics, molecular diagnostics, microbiology, histopathology, cytology and allergy testing — among many other specialised areas.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { icon: MapPin, label: "Kengeri Main Lab — Open 24×7", detail: "3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru 560060" },
                  { icon: MapPin, label: "Yelahanka North Hub — Mon–Sun 7AM–8PM", detail: "L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru 560064" },
                  { icon: Clock, label: "24×7 Central Laboratory Operations", detail: "Round-the-clock sample processing for hospitals and critical care" },
                  { icon: Users, label: "190+ B2B Clients", detail: "Hospitals, nursing homes and reference laboratories across Karnataka" },
                ].map((item, i) => (
                  <div key={i} className="bg-[#f8fafc] rounded-xl border border-slate-200 p-4 flex gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-[#0f2d5e]">{item.label}</p>
                      <p className="text-xs text-slate-500 font-semibold">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section id="open-roles" className="py-16 max-w-[1260px] mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Open Positions</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1">
            Current Career Opportunities at QXL Diagnostics
          </h2>
          <p className="text-slate-600 text-sm font-semibold mt-3 leading-relaxed">
            All roles are based in Bengaluru. We welcome applications from qualified candidates across Karnataka and India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {openRoles.map((role, i) => {
            const colors = colorMap[role.color] || colorMap.blue;
            return (
              <div key={i} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${colors}`}>
                    <role.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-[#0f2d5e] text-base leading-tight">{role.title}</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">{role.department}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> {role.type}
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {role.location}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-4">{role.summary}</p>

                <div className="space-y-1.5 mb-5">
                  <p className="text-xs font-extrabold text-[#0f2d5e]">Key Requirements:</p>
                  {role.requirements.map((req, j) => (
                    <div key={j} className="flex items-start gap-2 text-xs text-slate-600 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex gap-2">
                  <a
                    href={`https://wa.me/919964639639?text=Hi%2C%20I%20would%20like%20to%20apply%20for%20the%20${encodeURIComponent(role.title)}%20position%20at%20QXL%20Diagnostics.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#1eb956] text-white font-black px-4 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MessageSquareText className="w-3.5 h-3.5" />
                    <span>Apply via WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:${EMAIL}?subject=Application: ${role.title}&body=Dear Dr. Muruda,%0D%0A%0D%0AI am writing to apply for the ${role.title} position at QXL Diagnostics.%0D%0A%0D%0APlease find my CV attached.%0D%0A%0D%0ARegards`}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-black px-4 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email CV</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── INTERNSHIPS / TRAINING ── */}
      <section className="py-14 bg-white border-y border-slate-200">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Students & Trainees</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1 mb-4">
                Internships, Traineeships and NABL Exposure
              </h2>
              <p className="text-slate-600 text-sm font-semibold leading-relaxed mb-4">
                QXL Diagnostics welcomes students from DMLT, BMLT, BSc and MSc programmes in biochemistry, microbiology, pathology and related disciplines for internships and project work in a live NABL-accredited laboratory environment.
              </p>
              <p className="text-slate-600 text-sm font-semibold leading-relaxed mb-6">
                We also support laboratory professionals looking to build specific skills in quality management, NABL documentation, autoimmune testing or molecular diagnostics through short-term placements and training opportunities.
              </p>
              <div className="space-y-2">
                {[
                  "Hands-on experience in a NABL ISO 15189:2022 laboratory",
                  "Exposure to advanced specialised investigations",
                  "Quality management and documentation experience",
                  "Mentorship from a NABL Lead Assessor and laboratory medicine specialist",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0B2545] to-[#0f2d5e] rounded-3xl p-8 text-white space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D69A18]/20 border border-[#D69A18]/40 text-[#D69A18] flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-black text-xl">Apply for Internship</h3>
              <p className="text-xs text-sky-200 font-semibold leading-relaxed">
                Send your CV and a brief note explaining your programme, institution and what you hope to gain from a placement at QXL.
              </p>
              <div className="space-y-3 pt-2">
                <a
                  href={`mailto:${EMAIL}?subject=Internship / Traineeship Enquiry — QXL Diagnostics&body=Dear Dr. Muruda,%0D%0A%0D%0AI am a student of [Programme/Institution] and I am interested in an internship / traineeship at QXL Diagnostics.%0D%0A%0D%0APlease find my CV attached.%0D%0A%0D%0ARegards`}
                  className="w-full bg-[#D69A18] hover:bg-[#b88313] text-white font-black px-4 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email: {EMAIL}</span>
                </a>
                <a
                  href={`https://wa.me/919964639639?text=Hi%2C%20I%20am%20a%20student%20of%20[programme/institution]%20and%20I%20am%20interested%20in%20an%20internship%20at%20QXL%20Diagnostics.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-black px-4 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquareText className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GENERAL APPLICATION ── */}
      <section className="py-16 max-w-[1260px] mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest">Open Application</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mt-1 mb-4">
            Don&apos;t See Your Role Listed?
          </h2>
          <p className="text-slate-600 text-sm font-semibold leading-relaxed mb-8">
            We are always interested in meeting talented people. If you have a background in laboratory medicine, quality management, pathology, molecular diagnostics, bioinformatics, medical technology, healthcare operations or related fields — send us your CV with a note explaining your background and interest.
          </p>
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-5">
            <h3 className="font-extrabold text-[#0f2d5e] text-base">How to Apply</h3>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              {[
                { step: "1", title: "Prepare Your CV", desc: "Ensure your qualifications, laboratory experience, relevant certifications and technical skills are clearly listed." },
                { step: "2", title: "Write a Brief Cover Note", desc: "Tell us which role or area interests you and why. A specific, honest note is more useful than a generic template." },
                { step: "3", title: "Send to QXL", desc: "Email your CV and cover note to our careers address, or send on WhatsApp if email is inconvenient." },
              ].map((item, i) => (
                <div key={i} className="bg-[#f8fafc] rounded-2xl p-4 space-y-2 border border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-black text-sm">
                    {item.step}
                  </div>
                  <h4 className="font-extrabold text-[#0f2d5e] text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <a
                href={`mailto:${EMAIL}?subject=Career Enquiry — QXL Diagnostics`}
                className="bg-[#0f2d5e] hover:bg-[#0B2545] text-white font-black px-7 py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Email: {EMAIL}</span>
              </a>
              <a
                href={`https://wa.me/919964639639?text=Hi%2C%20I%20am%20interested%20in%20a%20career%20at%20QXL%20Diagnostics.%20Please%20let%20me%20know%20if%20there%20are%20suitable%20openings.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1eb956] text-white font-black px-7 py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <MessageSquareText className="w-4 h-4" />
                <span>WhatsApp: {PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-14 bg-gradient-to-br from-[#0B2545] to-slate-900 text-white">
        <div className="max-w-[1260px] mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-3">
            Where Good Laboratory Medicine Matters Every Day
          </h2>
          <p className="text-sky-200 text-sm font-semibold max-w-2xl mx-auto leading-relaxed mb-6">
            We are proud of the work we do. Every specimen, every result, every patient interaction is a chance to make diagnostic medicine more reliable, more honest and more useful.
          </p>
          <p className="text-[#D69A18] font-extrabold text-base mb-8">
            If that matters to you, we want to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${EMAIL}?subject=Career Enquiry — QXL Diagnostics`}
              className="bg-[#D69A18] hover:bg-[#b88313] text-white font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Send Your CV to {EMAIL}</span>
            </a>
          </div>
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap justify-center gap-5">
            <Link href="/" className="text-xs text-sky-300 hover:text-white font-semibold transition-colors">Home</Link>
            <Link href="/for-hospitals" className="text-xs text-sky-300 hover:text-white font-semibold transition-colors">For Hospitals</Link>
            <Link href="/quality-and-accreditation" className="text-xs text-sky-300 hover:text-white font-semibold transition-colors">Quality & Accreditation</Link>
            <Link href="/about" className="text-xs text-sky-300 hover:text-white font-semibold transition-colors">About QXL</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

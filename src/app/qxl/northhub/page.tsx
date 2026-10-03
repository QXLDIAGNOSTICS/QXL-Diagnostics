import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Navigation,
  Sparkles,
  Calendar,
  Award,
  FlaskConical,
  HeartPulse,
  Microscope,
  FileText,
  ChevronRight
} from "lucide-react";
import {
  BUSINESS_NAME,
  ISO_STANDARD,
  NABL_CERTIFICATE,
  PHONE_DISPLAY,
  PHONE_E164,
  WHATSAPP_LINK,
} from "@/lib/businessInfo";

export const metadata: Metadata = {
  title: "QXL Diagnostics — Yelahanka North Hub | NABL Accredited Laboratory",
  description:
    "Visit QXL Diagnostics Yelahanka North Hub at L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru. NABL Accredited (MC-6849) pathology, blood tests, full body checkups & express sample processing.",
  alternates: {
    canonical: "https://qxldiagnostics.com/qxl/northhub",
  },
  openGraph: {
    title: "QXL Diagnostics — Yelahanka North Hub",
    description:
      "NABL Accredited (MC-6849) express diagnostic laboratory hub in Yelahanka, Bengaluru. Walk-in diagnostics & doorstep sample collection.",
    url: "https://qxldiagnostics.com/qxl/northhub",
    locale: "en_IN",
    type: "website",
  },
};

export default function QXlNorthHubPage() {
  const hubSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "DiagnosticLab", "LocalBusiness"],
    "@id": "https://qxldiagnostics.com/qxl/northhub#hub",
    "name": "QXL Diagnostics — Yelahanka North Hub",
    "alternateName": "QXL North Hub Yelahanka",
    "description":
      "NABL Accredited (MC-6849) super speciality diagnostic laboratory hub located opposite RMZ Galleria Mall, Yelahanka, Bengaluru. Specializing in pathology, clinical biochemistry, hormones, and express home collection.",
    "url": "https://qxldiagnostics.com/qxl/northhub",
    "telephone": PHONE_E164,
    "email": "info@qxldiagnostics.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "L Square, opposite RMZ Galleria Mall, Yelahanka",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560064",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.1007,
      "longitude": 77.5963
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "07:00",
        "closes": "20:00"
      }
    ],
    "parentOrganization": {
      "@type": "Organization",
      "name": BUSINESS_NAME,
      "url": "https://qxldiagnostics.com"
    }
  };

  const popularPackages = [
    {
      name: "Quick Fit Package",
      badge: "MOST POPULAR",
      price: "₹1,770",
      mrp: "₹4,696",
      discount: "62% OFF",
      params: "12+ Key Health Parameters",
      desc: "Includes Fasting Sugar, HbA1c, Lipid Profile, LFT, KFT, Vitamin D & Complete Blood Count (CBC).",
    },
    {
      name: "Executive Health Checkup",
      badge: "FULL BODY",
      price: "₹1,999",
      mrp: "₹8,500",
      discount: "76% OFF",
      params: "80+ Master Parameters",
      desc: "Comprehensive head-to-toe checkup including Vitamin D3, B12, Thyroid, HbA1c, Cardiac Markers & Urine profile.",
    },
    {
      name: "Senior Citizen Wellness Profile",
      badge: "SENIOR SPECIAL",
      price: "₹2,499",
      mrp: "₹9,200",
      discount: "72% OFF",
      params: "85+ Parameters",
      desc: "Tailored for senior citizens with comprehensive Organ Function tests, Joint/Bone Markers, HbA1c & Electrolytes.",
    },
  ];

  const routineTests = [
    "Complete Blood Count (CBC)",
    "HbA1c & Fasting Glucose",
    "Thyroid Profile (T3, T4, TSH)",
    "Lipid Profile (Cholesterol)",
    "Liver Function Test (LFT)",
    "Kidney Function Test (KFT)",
    "Vitamin D3 & B12 Panel",
    "Fever Profile (Dengue, Malaria, Typhoid)",
    "Serum Electrolytes (Na, K, Cl)",
    "Uric Acid & Serum Calcium",
    "Hormones (AMH, FSH, LH, Prolactin)",
    "Prostate Specific Antigen (PSA)",
  ];

  const faqs = [
    {
      q: "Where is QXL Diagnostics North Hub located?",
      a: "Our North Hub is located at L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560064. It is easily accessible from Yelahanka New Town, Old Town, Sahakarnagar, and Hebbal.",
    },
    {
      q: "What are the walk-in and sample processing hours at North Hub?",
      a: "Walk-in patient appointments and sample collection are available from 7:00 AM to 8:00 PM (Monday to Sunday). Laboratory processing operates with express turnaround times for rapid report delivery.",
    },
    {
      q: "Does North Hub provide doorstep home sample collection?",
      a: "Yes! North Hub dispatches trained phlebotomists across Yelahanka, Hebbal, Sahakarnagar, Vidyaranyapura, Jakkur, Thanisandra, and surrounding North Bengaluru localities from 7:00 AM to 9:00 PM daily.",
    },
    {
      q: "Is QXL North Hub NABL Accredited?",
      a: "Yes, QXL Diagnostics is NABL Accredited (Certificate MC-6849) adhering strictly to ISO 15189:2022 medical quality standards with MD doctor review for all clinical results.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-14 lg:py-20 relative overflow-hidden border-b border-sky-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-60"></div>
        <div className="max-w-[1260px] mx-auto px-4 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="bg-[#D69A18] text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> NABL ACCREDITED ({NABL_CERTIFICATE})
                </span>
                <span className="bg-white/10 text-sky-200 border border-white/20 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  EXPRESS DIAGNOSTIC HUB
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black mb-4 leading-tight !text-white" style={{ color: "#ffffff" }}>
                QXL Diagnostics — Yelahanka North Hub
              </h1>

              <p className="text-sky-100 text-sm sm:text-base font-medium leading-relaxed mb-8 max-w-2xl">
                State-of-the-art diagnostic laboratory hub located opposite RMZ Galleria Mall. Serving Yelahanka, Sahakarnagar, Hebbal, Vidyaranyapura, Jakkur, and North Bengaluru with doctor-led accuracy &amp; same-day digital reports.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/book"
                  className="bg-[#2563eb] hover:bg-blue-700 text-white font-black px-8 py-3.5 rounded-full transition-all shadow-lg text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book Walk-In / Home Test →
                </Link>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-7 py-3.5 rounded-full transition-all shadow-md text-xs sm:text-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> WhatsApp Booking
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=QXL+Diagnostics+Yelahanka+Bengaluru"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold px-6 py-3.5 rounded-full transition-all text-xs sm:text-sm flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-amber-400" /> Get Directions
                </a>
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="w-full lg:w-[380px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-white shadow-2xl shrink-0">
              <h3 className="text-base font-extrabold mb-4 pb-3 border-b border-white/15 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-amber-400" /> Hub Highlights
              </h3>
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-sky-200 uppercase font-black tracking-wider text-[10px] block mb-1">
                    Location Address
                  </span>
                  <p className="font-semibold text-white leading-relaxed">
                    L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560064
                  </p>
                </div>
                <div>
                  <span className="text-sky-200 uppercase font-black tracking-wider text-[10px] block mb-1">
                    Walk-In &amp; Sample Desk Hours
                  </span>
                  <p className="font-semibold text-white">7:00 AM – 8:00 PM (Mon–Sun)</p>
                </div>
                <div>
                  <span className="text-sky-200 uppercase font-black tracking-wider text-[10px] block mb-1">
                    Doorstep Home Collection
                  </span>
                  <p className="font-semibold text-white">7:00 AM – 9:00 PM (All 7 Days)</p>
                </div>
                <div>
                  <span className="text-sky-200 uppercase font-black tracking-wider text-[10px] block mb-1">
                    Direct Hub Helpline
                  </span>
                  <a href={`tel:${PHONE_E164}`} className="font-black text-sm text-amber-300 hover:underline">
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4 w-full space-y-10">

          {/* Key Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#0f2d5e] text-sm mb-1.5">NABL Accredited Lab</h3>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                Adhering strictly to {ISO_STANDARD} quality standards with multi-stage quality control.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center mb-4">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#0f2d5e] text-sm mb-1.5">Doctor-Led Diagnostics</h3>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                Consultant Pathologists and Biochemists review every test before report release.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#0f2d5e] text-sm mb-1.5">Same-Day Digital Reports</h3>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                Receive doctor-validated PDF reports via WhatsApp &amp; email in as fast as 6 hours.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#0f2d5e] text-sm mb-1.5">Free Home Collection</h3>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                Painless doorstep sample collection with sterile equipment and cold-chain transport.
              </p>
            </div>
          </div>

          {/* Popular Packages */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  HEALTH PACKAGES
                </span>
                <h2 className="text-2xl font-black text-[#0f2d5e] mt-1">
                  Popular Health Checkup Packages at North Hub
                </h2>
              </div>
              <Link href="/packages" className="text-xs font-black text-[#2563eb] hover:underline flex items-center gap-1">
                View All Packages <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {popularPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="border border-sky-100 bg-gradient-to-b from-sky-50/50 to-white p-6 rounded-2xl flex flex-col justify-between hover:border-blue-300 transition-all shadow-2xs"
                >
                  <div>
                    <span className="bg-[#2563eb] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {pkg.badge}
                    </span>
                    <h3 className="font-black text-[#0f2d5e] text-lg mt-3">{pkg.name}</h3>
                    <p className="text-xs text-blue-700 font-bold mt-1">{pkg.params}</p>
                    <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed">{pkg.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-emerald-600">{pkg.price}</span>
                      <span className="text-xs text-slate-400 line-through ml-2">{pkg.mrp}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full ml-1">
                        {pkg.discount}
                      </span>
                    </div>
                    <Link
                      href={`/book?package=${encodeURIComponent(pkg.name)}`}
                      className="bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-black px-4 py-2.5 rounded-xl uppercase tracking-wider"
                    >
                      Book →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Routine & Speciality Tests */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-6">
            <h2 className="text-2xl font-black text-[#0f2d5e]">
              Routine &amp; Speciality Tests Available at North Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-3xl">
              Over 300+ pathology, biochemistry, endocrine, and microbiology tests processed under NABL-certified cold chain and quality assurance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {routineTests.map((t) => (
                <Link
                  key={t}
                  href="/book"
                  className="bg-slate-50 border border-slate-200 text-slate-800 font-extrabold text-xs p-3.5 rounded-xl hover:bg-sky-50 hover:border-blue-300 hover:text-[#2563eb] transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{t}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Location Map & Catchment Areas */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Address Details */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="bg-sky-50 text-[#2563eb] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  VISIT OUR HUB
                </span>
                <h2 className="text-2xl font-black text-[#0f2d5e] mt-2 mb-4">Location &amp; Directions</h2>
                <div className="space-y-4 text-xs text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-extrabold text-sm mb-1">
                        QXL Diagnostics North Hub
                      </strong>
                      <p className="leading-relaxed">
                        L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru, Karnataka 560064
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-extrabold text-sm mb-1">Timings</strong>
                      <p>Walk-in Desk: 7:00 AM – 8:00 PM (Mon–Sun)</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Lab processing operates 24×7</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-extrabold text-sm mb-1">Contact &amp; Bookings</strong>
                      <p className="font-bold text-slate-900">{PHONE_DISPLAY}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h4 className="font-black text-xs text-[#0f2d5e] uppercase tracking-wider mb-2">
                    Catchment Localities Covered:
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Yelahanka New Town, Yelahanka Old Town, RMZ Galleria area, Kogilu, Jakkur, Sahakarnagar, Hebbal, Vidyaranyapura, Thanisandra, Devanahalli, Airport Road &amp; North Bengaluru.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=QXL+Diagnostics+Yelahanka+Bengaluru"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center bg-[#2563eb] hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Right Map Embed */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-3 border border-slate-200 shadow-2xs h-[400px] lg:h-auto overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=QXL+Diagnostics+Yelahanka+Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "1.25rem" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="QXL Diagnostics Yelahanka North Hub Map"
              />
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-6">
            <h2 className="text-2xl font-black text-[#0f2d5e]">Frequently Asked Questions (FAQs)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <h3 className="text-[#0f2d5e] font-black text-sm mb-2 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-slate-600 text-xs font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

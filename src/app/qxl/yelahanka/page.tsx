import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Award,
  FlaskConical,
  Microscope,
  Sparkles,
  ChevronRight,
  Navigation,
  FileCheck
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
  title: "QXL Diagnostics Yelahanka | Blood Test & Home Collection Centre",
  description:
    "Book blood test & full body checkups at QXL Diagnostics Yelahanka, Bengaluru. NABL Accredited (MC-6849) lab tests, 100% free doorstep sample collection across Yelahanka, same-day reports.",
  alternates: {
    canonical: "https://qxldiagnostics.com/qxl/yelahanka",
  },
  openGraph: {
    title: "QXL Diagnostics Yelahanka | Blood Test & Diagnostic Centre",
    description:
      "NABL Accredited (MC-6849) diagnostic centre and home blood collection hub in Yelahanka, Bengaluru. Free doorstep collection, same-day reports.",
    url: "https://qxldiagnostics.com/qxl/yelahanka",
    locale: "en_IN",
    type: "website",
  },
};

export default function QXlYelahankaPage() {
  const yelahankaSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "DiagnosticLab", "LocalBusiness"],
    "@id": "https://qxldiagnostics.com/qxl/yelahanka#centre",
    "name": "QXL Diagnostics — Yelahanka Centre & Home Collection Hub",
    "alternateName": ["QXL Yelahanka", "QXL Diagnostics Yelahanka"],
    "description":
      "NABL Accredited (MC-6849) diagnostic lab centre offering walk-in blood collection, pathology, full body checkups, and free home sample collection in Yelahanka, Bengaluru.",
    "url": "https://qxldiagnostics.com/qxl/yelahanka",
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

  const topPackages = [
    {
      name: "Quick Fit Full Body Package",
      price: "₹1,770",
      mrp: "₹4,696",
      discount: "62% OFF",
      params: "12+ Parameters",
      desc: "Fast Sugar, HbA1c, Lipid Profile, LFT, KFT, Vitamin D & CBC.",
    },
    {
      name: "Executive Health Package",
      price: "₹1,999",
      mrp: "₹8,500",
      discount: "76% OFF",
      params: "80+ Parameters",
      desc: "Comprehensive checkup with Vitamin D3, B12, Thyroid, HbA1c & Cardiac profile.",
    },
    {
      name: "Diabetes Care & HbA1c Package",
      price: "₹899",
      mrp: "₹2,200",
      discount: "59% OFF",
      params: "6 Parameters",
      desc: "HbA1c, Fasting Blood Glucose, Post Prandial Glucose & Urine Microalbumin.",
    },
  ];

  const popularTests = [
    "Complete Blood Count (CBC)",
    "Fasting Blood Sugar & HbA1c",
    "Thyroid Profile (T3, T4, TSH)",
    "Lipid Profile (Cholesterol)",
    "Liver Function Test (LFT)",
    "Kidney Function Test (KFT)",
    "Vitamin D3 & B12 Panel",
    "Fever Profile (Dengue, Typhoid)",
    "Senior Citizen Health Check",
    "Hormones (AMH, FSH, LH)",
  ];

  const pincodes = ["560064", "560065", "560097", "560092", "560094"];

  const faqs = [
    {
      q: "Where can I walk in for blood tests in Yelahanka?",
      a: "You can walk in at our primary centre at L Square, opposite RMZ Galleria Mall, Yelahanka (7:00 AM – 8:00 PM) or at our partner collection centre Shushrusha Hospital in Yelahanka Old Town.",
    },
    {
      q: "Is home sample collection free in Yelahanka?",
      a: "Yes! QXL Diagnostics provides 100% free home blood sample collection across Yelahanka New Town, Yelahanka Old Town, Kogilu, Sahakarnagar, and surrounding pin codes.",
    },
    {
      q: "When will I get my blood test reports?",
      a: "Most routine pathology and blood test reports are delivered on the same day via WhatsApp and email within 6 to 12 hours of sample collection.",
    },
    {
      q: "How can I book a test in Yelahanka?",
      a: "You can book online at qxldiagnostics.com/book or WhatsApp / Call our helpline at +91 9964 639 639.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(yelahankaSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-14 lg:py-20 relative overflow-hidden border-b border-sky-900">
        <div className="max-w-[1260px] mx-auto px-4 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="bg-[#D69A18] text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> NABL ACCREDITED ({NABL_CERTIFICATE})
                </span>
                <span className="bg-emerald-500 text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  FREE HOME COLLECTION
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black mb-4 leading-tight !text-white" style={{ color: "#ffffff" }}>
                QXL Diagnostics — Yelahanka
              </h1>

              <p className="text-sky-100 text-sm sm:text-base font-medium leading-relaxed mb-8 max-w-2xl">
                NABL Accredited blood tests, pathology, and comprehensive health checkup packages in Yelahanka. Walk-in at RMZ Galleria Mall opposite or book free doorstep sample collection with same-day digital reports.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/book"
                  className="bg-[#2563eb] hover:bg-blue-700 text-white font-black px-8 py-3.5 rounded-full transition-all shadow-lg text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book Home Collection →
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

            {/* Quick Details Card */}
            <div className="w-full lg:w-[380px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-white shadow-2xl shrink-0">
              <h3 className="text-base font-extrabold mb-4 pb-3 border-b border-white/15 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-amber-400" /> Yelahanka Centre Info
              </h3>
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-sky-200 uppercase font-black tracking-wider text-[10px] block mb-1">
                    Galleria Hub Address
                  </span>
                  <p className="font-semibold text-white leading-relaxed">
                    L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560064
                  </p>
                </div>
                <div>
                  <span className="text-sky-200 uppercase font-black tracking-wider text-[10px] block mb-1">
                    Old Town Walk-in Partner
                  </span>
                  <p className="font-semibold text-white leading-relaxed">
                    Shushrusha Hospital, Yelahanka Old Town, Bengaluru – 560064
                  </p>
                </div>
                <div>
                  <span className="text-sky-200 uppercase font-black tracking-wider text-[10px] block mb-1">
                    Walk-In Hours
                  </span>
                  <p className="font-semibold text-white">7:00 AM – 8:00 PM (Mon–Sun)</p>
                </div>
                <div>
                  <span className="text-sky-200 uppercase font-black tracking-wider text-[10px] block mb-1">
                    Helpline &amp; Bookings
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

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4 w-full space-y-10">

          {/* Key Advantages */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#0f2d5e] text-sm mb-1.5">NABL Accredited Lab</h3>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                ISO 15189:2022 medical quality system with high-precision automated analyzers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#0f2d5e] text-sm mb-1.5">Fast WhatsApp Reports</h3>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                Doctor-reviewed PDF test reports delivered directly to your phone within 6 to 12 hours.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#0f2d5e] text-sm mb-1.5">Free Home Collection</h3>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                Doorstep sample collection across Yelahanka New Town, Old Town &amp; Kogilu.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center mb-4">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#0f2d5e] text-sm mb-1.5">300+ Medical Tests</h3>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                From routine CBC &amp; HbA1c to advanced hormone panels, allergy &amp; vitamin tests.
              </p>
            </div>
          </div>

          {/* Top Packages */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  YELAHANKA SPECIAL OFFERS
                </span>
                <h2 className="text-2xl font-black text-[#0f2d5e] mt-1">
                  Most Booked Health Checkup Packages
                </h2>
              </div>
              <Link href="/packages" className="text-xs font-black text-[#2563eb] hover:underline flex items-center gap-1">
                Explore All Packages <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {topPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="border border-sky-100 bg-gradient-to-b from-sky-50/50 to-white p-6 rounded-2xl flex flex-col justify-between hover:border-blue-300 transition-all shadow-2xs"
                >
                  <div>
                    <span className="bg-[#2563eb] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {pkg.params}
                    </span>
                    <h3 className="font-black text-[#0f2d5e] text-lg mt-3">{pkg.name}</h3>
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

          {/* Popular Tests & Pincodes Covered */}
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-6">
              <h2 className="text-2xl font-black text-[#0f2d5e]">
                Popular Routine Blood Tests in Yelahanka
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {popularTests.map((t) => (
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

            <div className="lg:col-span-4 bg-[#0f2d5e] text-white rounded-3xl p-7 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-amber-400 uppercase font-black tracking-wider block mb-2">
                  COVERAGE &amp; PINCODES
                </span>
                <h3 className="text-xl font-black mb-4 border-b border-white/10 pb-3">
                  Pincodes Covered in Yelahanka
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {pincodes.map((pin) => (
                    <span key={pin} className="bg-white/15 border border-white/20 px-3 py-1.5 rounded-xl text-xs font-black">
                      {pin}
                    </span>
                  ))}
                </div>
                <div className="space-y-3 text-xs text-sky-100">
                  <p>✓ Yelahanka New Town (Sectors A-B, 4th-5th Phase)</p>
                  <p>✓ Yelahanka Old Town &amp; Kogilu Cross</p>
                  <p>✓ RMZ Galleria Mall &amp; L Square Area</p>
                  <p>✓ Sahakarnagar &amp; Vidyaranyapura</p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <Link
                  href="/book"
                  className="w-full bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-black py-3 rounded-xl block text-center uppercase tracking-wider transition-all"
                >
                  Book Doorstep Sample Collection →
                </Link>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="bg-white rounded-3xl p-3 border border-slate-200 shadow-2xs h-[400px] overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=QXL+Diagnostics+Yelahanka+Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "1.25rem" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="QXL Diagnostics Yelahanka Map"
            />
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-6">
            <h2 className="text-2xl font-black text-[#0f2d5e]">Yelahanka Diagnostics FAQs</h2>
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

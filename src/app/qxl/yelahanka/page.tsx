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
  MessageSquare
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
    <div className="bg-slate-50 min-h-screen pb-24 md:pb-16 antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(yelahankaSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-10 sm:py-16 lg:py-20 relative overflow-hidden border-b border-sky-900">
        <div className="max-w-[1260px] mx-auto px-4 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl w-full">
              <div className="flex flex-wrap items-center gap-2 mb-3.5">
                <span className="bg-[#D69A18] text-white text-[9.5px] sm:text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
                  <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> NABL ACCREDITED ({NABL_CERTIFICATE})
                </span>
                <span className="bg-emerald-500 text-white text-[9.5px] sm:text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  FREE HOME COLLECTION
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3.5 leading-tight text-white" style={{ color: "#ffffff" }}>
                QXL Diagnostics — Yelahanka
              </h1>

              <p className="text-sky-100 text-xs sm:text-base font-medium leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                NABL Accredited blood tests, pathology, and comprehensive health checkup packages in Yelahanka. Walk-in at RMZ Galleria Mall opposite or book free doorstep sample collection with same-day digital reports.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <Link
                  href="/book"
                  className="bg-[#2563eb] hover:bg-blue-700 text-white font-black px-6 py-3.5 rounded-2xl sm:rounded-full transition-all shadow-lg text-xs sm:text-sm uppercase tracking-wide flex items-center justify-center gap-2 text-center"
                >
                  <Calendar className="w-4 h-4 shrink-0" /> Book Home Collection →
                </Link>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3.5 rounded-2xl sm:rounded-full transition-all shadow-md text-xs sm:text-sm flex items-center justify-center gap-2 text-center"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" /> WhatsApp Booking
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=QXL+Diagnostics+Yelahanka+Bengaluru"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold px-5 py-3.5 rounded-2xl sm:rounded-full transition-all text-xs sm:text-sm flex items-center justify-center gap-2 text-center"
                >
                  <Navigation className="w-4 h-4 text-amber-400 shrink-0" /> Get Directions
                </a>
              </div>
            </div>

            {/* Quick Details Card */}
            <div className="w-full lg:w-[380px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white shadow-2xl shrink-0">
              <h3 className="text-sm sm:text-base font-extrabold mb-3 sm:mb-4 pb-2.5 border-b border-white/15 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" /> Yelahanka Centre Info
              </h3>
              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-sky-200 uppercase font-black tracking-wider text-[9.5px] block mb-0.5">
                    Galleria Hub Address
                  </span>
                  <p className="font-semibold text-white leading-relaxed">
                    L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560064
                  </p>
                </div>
                <div>
                  <span className="text-sky-200 uppercase font-black tracking-wider text-[9.5px] block mb-0.5">
                    Old Town Walk-in Partner
                  </span>
                  <p className="font-semibold text-white leading-relaxed">
                    Shushrusha Hospital, Yelahanka Old Town, Bengaluru – 560064
                  </p>
                </div>
                <div>
                  <span className="text-sky-200 uppercase font-black tracking-wider text-[9.5px] block mb-0.5">
                    Walk-In Hours
                  </span>
                  <p className="font-semibold text-white">7:00 AM – 8:00 PM (Mon–Sun)</p>
                </div>
                <div>
                  <span className="text-sky-200 uppercase font-black tracking-wider text-[9.5px] block mb-0.5">
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
      <section className="py-8 sm:py-12 px-3 sm:px-4">
        <div className="max-w-[1260px] mx-auto w-full space-y-8 sm:space-y-10">

          {/* Key Advantages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs flex items-start sm:flex-col gap-4 sm:gap-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center shrink-0 sm:mb-4">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-black text-[#0f2d5e] text-xs sm:text-sm mb-1">NABL Accredited Lab</h3>
                <p className="text-slate-600 text-[11px] sm:text-xs font-medium leading-relaxed">
                  ISO 15189:2022 medical quality system with high-precision automated analyzers.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs flex items-start sm:flex-col gap-4 sm:gap-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center shrink-0 sm:mb-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-black text-[#0f2d5e] text-xs sm:text-sm mb-1">Fast WhatsApp Reports</h3>
                <p className="text-slate-600 text-[11px] sm:text-xs font-medium leading-relaxed">
                  Doctor-reviewed PDF test reports delivered directly to your phone in 6 to 12 hours.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs flex items-start sm:flex-col gap-4 sm:gap-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center shrink-0 sm:mb-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-black text-[#0f2d5e] text-xs sm:text-sm mb-1">Free Home Collection</h3>
                <p className="text-slate-600 text-[11px] sm:text-xs font-medium leading-relaxed">
                  Doorstep sample collection across Yelahanka New Town, Old Town &amp; Kogilu.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs flex items-start sm:flex-col gap-4 sm:gap-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center shrink-0 sm:mb-4">
                <Microscope className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-black text-[#0f2d5e] text-xs sm:text-sm mb-1">300+ Medical Tests</h3>
                <p className="text-slate-600 text-[11px] sm:text-xs font-medium leading-relaxed">
                  From routine CBC &amp; HbA1c to advanced hormone panels, allergy &amp; vitamin tests.
                </p>
              </div>
            </div>
          </div>

          {/* Top Packages */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-2xs space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
              <div>
                <span className="bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[9.5px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  YELAHANKA SPECIAL OFFERS
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#0f2d5e] mt-1">
                  Most Booked Health Checkup Packages
                </h2>
              </div>
              <Link href="/packages" className="text-xs font-black text-[#2563eb] hover:underline flex items-center gap-1">
                Explore All Packages <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {topPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="border border-sky-100 bg-gradient-to-b from-sky-50/50 to-white p-5 sm:p-6 rounded-2xl flex flex-col justify-between hover:border-blue-300 transition-all shadow-2xs"
                >
                  <div>
                    <span className="bg-[#2563eb] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {pkg.params}
                    </span>
                    <h3 className="font-black text-[#0f2d5e] text-base sm:text-lg mt-2.5">{pkg.name}</h3>
                    <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed">{pkg.desc}</p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-emerald-600">{pkg.price}</span>
                      <span className="text-xs text-slate-400 line-through ml-1.5">{pkg.mrp}</span>
                      <span className="text-[9.5px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full ml-1">
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
          <div className="grid lg:grid-cols-12 gap-5 sm:gap-8">
            <div className="lg:col-span-8 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-2xs space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-black text-[#0f2d5e]">
                Popular Routine Blood Tests in Yelahanka
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {popularTests.map((t) => (
                  <Link
                    key={t}
                    href="/book"
                    className="bg-slate-50 border border-slate-200 text-slate-800 font-extrabold text-xs p-3 sm:p-3.5 rounded-xl hover:bg-sky-50 hover:border-blue-300 hover:text-[#2563eb] transition-all flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{t}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#0f2d5e] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[9.5px] sm:text-[10px] text-amber-400 uppercase font-black tracking-wider block mb-1.5">
                  COVERAGE &amp; PINCODES
                </span>
                <h3 className="text-lg sm:text-xl font-black mb-3.5 border-b border-white/10 pb-2.5">
                  Pincodes Covered in Yelahanka
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
                  {pincodes.map((pin) => (
                    <span key={pin} className="bg-white/15 border border-white/20 px-2.5 py-1 rounded-xl text-xs font-black">
                      {pin}
                    </span>
                  ))}
                </div>
                <div className="space-y-2.5 text-xs text-sky-100">
                  <p>✓ Yelahanka New Town (Sectors A-B, 4th-5th Phase)</p>
                  <p>✓ Yelahanka Old Town &amp; Kogilu Cross</p>
                  <p>✓ RMZ Galleria Mall &amp; L Square Area</p>
                  <p>✓ Sahakarnagar &amp; Vidyaranyapura</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
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
          <div className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 border border-slate-200 shadow-2xs h-[300px] sm:h-[400px] overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=QXL+Diagnostics+Yelahanka+Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "1rem" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="QXL Diagnostics Yelahanka Map"
            />
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-2xs space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-[#0f2d5e]">Yelahanka Diagnostics FAQs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
                  <h3 className="text-[#0f2d5e] font-black text-xs sm:text-sm mb-1.5 flex items-start gap-2">
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

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 flex items-center justify-between gap-2 md:hidden shadow-lg">
        <a
          href={`tel:${PHONE_E164}`}
          className="flex-1 bg-slate-100 text-[#0f2d5e] font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-[#2563eb]" /> Call Centre
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-emerald-600 text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
        </a>
        <Link
          href="/book"
          className="flex-1 bg-[#2563eb] text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all uppercase tracking-wider"
        >
          <Calendar className="w-3.5 h-3.5" /> Book Test
        </Link>
      </div>
    </div>
  );
}

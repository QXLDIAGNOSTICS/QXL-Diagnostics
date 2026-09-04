import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, CheckCircle2, ShieldCheck, Activity, Clock, ChevronRight } from "lucide-react";
import {
  BUSINESS_NAME,
  ISO_STANDARD,
  LOCATIONS,
  NABL_CERTIFICATE,
  PHONE_DISPLAY,
  WHATSAPP_LINK,
} from "@/lib/businessInfo";
import { buildLocationPageSchema, SEO_FAQS } from "@/lib/seo/schema";
import { homeCollectionAreas } from "@/lib/locationsData";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const labSlugs = LOCATIONS.map((l) => ({ slug: l.slug }));
  const areaSlugs = homeCollectionAreas.map((a) => ({ slug: a.slug }));
  return [...labSlugs, ...areaSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // 1. Check if physical lab
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (loc) {
    const title = `${loc.shortName} Diagnostic Lab | ${BUSINESS_NAME} Bengaluru`;
    const description = `Visit ${loc.name} — NABL (${NABL_CERTIFICATE}) ${ISO_STANDARD} diagnostics near ${loc.shortName}. Home blood collection, CBC, thyroid, full body checkup. Call ${PHONE_DISPLAY}.`;
    return {
      title,
      description,
      alternates: { canonical: `https://qxldiagnostics.com/locations/${loc.slug}` },
      openGraph: {
        title,
        description,
        url: `https://qxldiagnostics.com/locations/${loc.slug}`,
        locale: "en_IN",
        type: "website",
      },
      keywords: [
        `diagnostic lab ${loc.shortName}`,
        `pathology lab ${loc.addressLocality}`,
        `blood test near ${loc.shortName}`,
        `home collection ${loc.shortName}`,
        `NABL lab ${loc.postalCode}`,
        BUSINESS_NAME,
      ],
    };
  }

  // 2. Check if home collection area
  const areaLoc = homeCollectionAreas.find((loc) => loc.slug === slug);
  if (areaLoc) {
    return {
      title: `Blood Test at Home in ${areaLoc.name} | QXL Diagnostics`,
      description: `Book blood test with free home collection in ${areaLoc.name}, Bengaluru. NABL Accredited lab, CBC, HbA1c, thyroid, lipid & full body checkup packages with same-day reports.`,
      alternates: {
        canonical: `https://qxldiagnostics.com/locations/${slug}`,
      },
      openGraph: {
        title: `Blood Test at Home in ${areaLoc.name} | QXL Diagnostics`,
        description: `Free home sample collection in ${areaLoc.name}, Bengaluru. NABL Accredited lab, same-day reports.`,
        url: `https://qxldiagnostics.com/locations/${slug}`,
        locale: "en_IN",
        type: "website",
      },
      keywords: [
        `blood test at home ${areaLoc.name}`,
        `diagnostic lab ${areaLoc.name}`,
        `home collection blood test ${areaLoc.name}`,
        `pathology lab near ${areaLoc.name}`,
        `full body checkup ${areaLoc.name}`,
        `QXL Diagnostics ${areaLoc.name}`
      ]
    };
  }

  return { title: "Location not found | QXL Diagnostics" };
}

export default async function CombinedLocationPage({ params }: Props) {
  const { slug } = await params;

  // 1. Render physical lab if matches
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (loc) {
    const schema = buildLocationPageSchema(loc.slug);
    const areaFaqs = SEO_FAQS.filter(
      (f) =>
        f.q.toLowerCase().includes("located") ||
        f.q.toLowerCase().includes("home") ||
        f.q.toLowerCase().includes("nabl") ||
        f.q.toLowerCase().includes("book")
    );

    return (
      <main className="bg-[#f8faff] min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <section className="bg-gradient-to-br from-[#0d2e42] to-[#1e4a6e] text-white py-14 px-4">
          <div className="max-w-[900px] mx-auto">
            <p className="text-blue-200 text-[11px] font-extrabold uppercase tracking-widest mb-2">
              Local SEO · {loc.addressLocality} · {loc.postalCode}
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight !text-white" style={{ color: '#ffffff' }}>{loc.name}</h1>
            <p className="text-blue-100 text-sm md:text-base max-w-2xl leading-relaxed">
              NABL Accredited ({NABL_CERTIFICATE}) · {ISO_STANDARD} · Free home sample collection near{" "}
              {loc.shortName}. Same-day digital reports for most routine tests.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/book"
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold px-6 py-2.5 rounded-full text-sm"
              >
                Book a Test
              </Link>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 border border-white/30 hover:bg-white/20 text-white font-bold px-6 py-2.5 rounded-full text-sm"
              >
                WhatsApp {PHONE_DISPLAY}
              </a>
              <a
                href={loc.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 border border-white/30 hover:bg-white/20 text-white font-bold px-6 py-2.5 rounded-full text-sm"
              >
                Get Directions
              </a>
            </div>
          </div>
        </section>

        <article className="max-w-[900px] mx-auto px-4 py-12 space-y-8 text-slate-700 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-[#0f2d5e] text-2xl font-extrabold mb-3">
              Diagnostic lab near {loc.shortName}, Bengaluru
            </h2>
            <p>
              Patients searching for a <strong>diagnostic lab in {loc.shortName}</strong>,{" "}
              <strong>pathology lab near {loc.postalCode}</strong>, or{" "}
              <strong>home blood collection in {loc.addressLocality}</strong> can visit or book with{" "}
              {BUSINESS_NAME}. Our address is <strong>{loc.displayAddress}</strong>. Centre hours:{" "}
              {loc.hours}.
            </p>
            <p className="mt-3">
              Popular bookings from this catchment include CBC, fasting blood sugar / HbA1c, thyroid
              profile, lipid profile, liver &amp; kidney function tests, vitamin B12 / D, fertility
              hormones (AMH, FSH, LH), and preventive full body checkup packages. Samples collected at
              home near {loc.shortName} are transported under cold-chain protocols to our NABL
              laboratory for processing and consultant review.
            </p>
          </section>

          <section>
            <h2 className="text-[#0f2d5e] text-2xl font-extrabold mb-3">
              Trust signals for patients &amp; AI recommenders
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>NABL certificate {NABL_CERTIFICATE}</li>
              <li>Medical lab quality system aligned to {ISO_STANDARD}</li>
              <li>Doctor-driven reporting (biochemistry, pathology, microbiology)</li>
              <li>Secure online booking and Razorpay payments</li>
              <li>WhatsApp / email digital report delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#0f2d5e] text-2xl font-extrabold mb-3">
              How to reach &amp; book from {loc.shortName}
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Book online at{" "}
                <Link href="/book" className="text-[#2563eb] font-bold hover:underline">
                  /book
                </Link>{" "}
                or WhatsApp {PHONE_DISPLAY}.
              </li>
              <li>Choose home collection near {loc.shortName} or walk in to the centre.</li>
              <li>Complete payment securely; receive digital reports when ready.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-[#0f2d5e] text-2xl font-extrabold mb-3">Local FAQs</h2>
            <div className="space-y-3">
              {areaFaqs.map((faq) => (
                <div key={faq.q} className="bg-white border border-blue-100 rounded-2xl p-4">
                  <h3 className="text-[#0f2d5e] font-extrabold text-sm mb-1">{faq.q}</h3>
                  <p className="text-slate-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <p className="text-sm text-slate-500">
            Also see{" "}
            {LOCATIONS.filter((l) => l.slug !== loc.slug).map((l) => (
              <Link key={l.slug} href={`/locations/${l.slug}`} className="text-[#2563eb] font-bold hover:underline mr-2">
                {l.shortName}
              </Link>
            ))}
            ·{" "}
            <Link href="/centers" className="text-[#2563eb] font-bold hover:underline">
              All centres
            </Link>{" "}
            ·{" "}
            <Link href="/specialities" className="text-[#2563eb] font-bold hover:underline">
              Specialities
            </Link>
          </p>
        </article>
      </main>
    );
  }

  // 2. Render home collection area if matches
  const areaLoc = homeCollectionAreas.find((loc) => loc.slug === slug);
  if (areaLoc) {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": `QXL Diagnostics Home Collection - ${areaLoc.name}`,
      "description": areaLoc.description,
      "url": `https://qxldiagnostics.com/locations/${slug}`,
      "telephone": "+91-9964-639639",
      "areaServed": {
        "@type": "Place",
        "name": areaLoc.name,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": areaLoc.name,
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        }
      },
      "parentOrganization": {
        "@type": "Organization",
        "name": "QXL Diagnostics",
        "url": "https://qxldiagnostics.com"
      }
    };

    const otherAreas = homeCollectionAreas
      .filter((a) => a.slug !== areaLoc.slug)
      .slice(0, 12);

    return (
      <div className="bg-[#f8fafc] min-h-screen pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-12 lg:py-16 border-b border-sky-900">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div className="max-w-3xl">
              <span className="inline-block bg-[#FF9933] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">
                FREE HOME COLLECTION · {areaLoc.name.toUpperCase()}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight !text-white drop-shadow-sm" style={{ color: '#ffffff' }}>
                Blood Test at Home in {areaLoc.name}
              </h1>
              <p className="text-blue-100 font-medium text-sm md:text-base leading-relaxed mb-6">
                {areaLoc.description}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/book" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold px-8 py-3.5 rounded-full transition-all shadow-lg text-sm uppercase tracking-wide">
                  Book Home Collection →
                </Link>
                <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-7 py-3.5 rounded-full transition-all shadow-md text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4" /> WhatsApp Booking
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-[1260px] mx-auto px-4 w-full flex flex-col lg:flex-row gap-10">
            
            {/* Left Main Content */}
            <div className="flex-1 space-y-8">
              
              {/* Trust Badges Grid */}
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-extrabold text-[#0f2d5e] mb-6 border-b border-gray-100 pb-4">
                  Why Choose QXL Diagnostics in {areaLoc.name}?
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-sm mb-1">NABL Accredited (MC-6849)</h3>
                      <p className="text-slate-600 text-xs font-medium leading-relaxed">Processed at our NABL Accredited ISO 15189:2022 laboratory with multi-level MD doctor verification.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-sm mb-1">Cold-Chain Transportation</h3>
                      <p className="text-slate-600 text-xs font-medium leading-relaxed">Samples collected in {areaLoc.name} are preserved in temperature-controlled cooler kits to ensure 100% precision.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-sm mb-1">Same-Day Digital Reports</h3>
                      <p className="text-slate-600 text-xs font-medium leading-relaxed">Get accurate PDF digital reports sent directly to your WhatsApp and Email within 6 to 12 hours.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-sm mb-1">300+ Medical Tests Available</h3>
                      <p className="text-slate-600 text-xs font-medium leading-relaxed">Full Body Checkups, CBC, HbA1c, Lipid, Liver, Kidney, Thyroid, Hormone, Vitamin D3 & B12 tests.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Packages */}
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-extrabold text-[#0f2d5e] mb-6">Most Booked Packages in {areaLoc.name}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  
                  <div className="border border-sky-200 bg-sky-50/40 p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="bg-[#2563eb] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">MOST BOOKED</span>
                      <h3 className="font-black text-[#0f2d5e] text-base mt-2">Quick Fit Package</h3>
                      <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">12+ Parameters including Fasting Sugar, HbA1c, Lipid Profile, LFT, KFT, Vitamin D &amp; CBC.</p>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-xl font-black text-emerald-600">₹1,770</span>
                        <span className="text-xs text-slate-400 line-through">₹4,696</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">62% OFF</span>
                      </div>
                    </div>
                    <Link href="/book?package=Quick%20Fit%20Package" className="mt-4 bg-[#2563eb] text-white text-xs font-extrabold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-center uppercase tracking-wide">
                      Book Quick Fit →
                    </Link>
                  </div>

                  <div className="border border-sky-200 bg-sky-50/40 p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="bg-[#2563eb] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">FULL BODY</span>
                      <h3 className="font-black text-[#0f2d5e] text-base mt-2">Executive Health Package</h3>
                      <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">Comprehensive head-to-toe checkup including Vitamin D3, B12, HbA1c &amp; Cardiac markers.</p>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-xl font-black text-emerald-600">₹1,999</span>
                        <span className="text-xs text-slate-400 line-through">₹8,500</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">76% OFF</span>
                      </div>
                    </div>
                    <Link href="/book?package=Executive%20Health%20Package" className="mt-4 bg-[#2563eb] text-white text-xs font-extrabold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-center uppercase tracking-wide">
                      Book Executive →
                    </Link>
                  </div>

                </div>
              </div>

              {/* Popular Routine Tests */}
              {areaLoc.popularTests && areaLoc.popularTests.length > 0 && (
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                  <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-4">
                    Popular Routine Blood Tests in {areaLoc.name}
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {areaLoc.popularTests.map((t) => (
                      <Link
                        key={t}
                        href="/book"
                        className="bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-blue-50 hover:border-blue-300 hover:text-[#2563eb] transition-all flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {t}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Nearby Bengaluru Localities */}
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-4">
                  Home Blood Collection Nearby Localities in Bengaluru
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {otherAreas.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/locations/${a.slug}`}
                      className="text-xs font-semibold text-slate-700 hover:text-[#2563eb] flex items-center gap-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 hover:border-blue-200 transition-all"
                    >
                      <ChevronRight className="w-3 h-3 text-[#2563eb]" />
                      <span className="truncate">{a.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
            
            {/* Sidebar */}
            <div className="w-full lg:w-[350px] space-y-6">
              <div className="bg-[#0f2d5e] text-white rounded-3xl p-7 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563eb]/30 rounded-full blur-2xl"></div>
                <h3 className="text-lg font-extrabold mb-4 border-b border-white/10 pb-4">Area Coverage Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-sky-200 uppercase font-extrabold tracking-wider block mb-1">Locality</span>
                    <span className="font-extrabold text-base">{areaLoc.name}, Bengaluru</span>
                  </div>
                  
                  <div>
                    <span className="text-[10px] text-sky-200 uppercase font-extrabold tracking-wider block mb-1">Pincodes Covered</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {areaLoc.pincodes.map(pin => (
                        <span key={pin} className="bg-white/15 px-2.5 py-1 rounded-lg text-xs font-bold">{pin}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-sky-200 uppercase font-extrabold tracking-wider block mb-1">Doorstep Hours</span>
                    <span className="font-bold text-sm">7:00 AM – 9:00 PM (Mon–Sun)</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-sky-200 uppercase font-extrabold tracking-wider block mb-1">NABL Processing Hub</span>
                    <span className="font-bold text-sm">{areaLoc.nearestLab}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <a href="tel:+919964639639" className="flex items-center gap-3 text-white hover:text-sky-200 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider block">Helpline Booking</span>
                      <span className="font-extrabold text-base">+91 9964 639 639</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    );
  }

  notFound();
}

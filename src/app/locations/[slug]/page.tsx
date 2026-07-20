import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BUSINESS_NAME,
  ISO_STANDARD,
  LOCATIONS,
  NABL_CERTIFICATE,
  PHONE_DISPLAY,
  WHATSAPP_LINK,
} from "@/lib/businessInfo";
import { buildLocationPageSchema, SEO_FAQS } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (!loc) return { title: "Location not found" };
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

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (!loc) notFound();

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
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">{loc.name}</h1>
          <p className="text-blue-100 text-sm md:text-base max-w-2xl leading-relaxed">
            NABL-accredited ({NABL_CERTIFICATE}) · {ISO_STANDARD} · Free home sample collection near{" "}
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

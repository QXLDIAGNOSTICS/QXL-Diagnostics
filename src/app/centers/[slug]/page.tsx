import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, Phone, Clock, Shield, ExternalLink } from "lucide-react";
import { serverApi } from "@/lib/serverApi";
import { SITE_URL, EMAIL } from "@/lib/businessInfo";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const centers = await serverApi.centers.list();
  return centers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const center = await serverApi.centers.get(slug);
  if (!center) {
    return { title: "Center Not Found | QXL Diagnostics" };
  }
  const title = `${center.name} — Diagnostic Centre in ${center.city}`;
  const description = `Visit QXL Diagnostics' ${center.name} at ${center.address}, ${center.city}. NABL-accredited testing, home sample collection, and same-day reports. Call ${center.phone || ""}.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/centers/${center.slug}` },
    openGraph: {
      title: `${title} | QXL Diagnostics`,
      description,
      url: `${SITE_URL}/centers/${center.slug}`,
    },
  };
}

export default async function CenterDetailPage({ params }: Props) {
  const { slug } = await params;
  const center = await serverApi.centers.get(slug);
  if (!center) notFound();

  const hasCoords = center.lat !== null && center.lng !== null;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/centers/${center.slug}#location`,
    name: center.name,
    url: `${SITE_URL}/centers/${center.slug}`,
    telephone: center.phone || undefined,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: center.address,
      addressLocality: center.city,
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    geo: hasCoords
      ? { "@type": "GeoCoordinates", latitude: center.lat, longitude: center.lng }
      : undefined,
    openingHours: center.hours || undefined,
    parentOrganization: {
      "@type": "MedicalOrganization",
      name: "QXL Diagnostics",
      url: SITE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Centers", item: `${SITE_URL}/centers` },
      { "@type": "ListItem", position: 3, name: center.name, item: `${SITE_URL}/centers/${center.slug}` },
    ],
  };

  const mapEmbedSrc = hasCoords
    ? `https://www.google.com/maps?q=${center.lat},${center.lng}&z=15&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(`${center.address}, ${center.city}`)}&z=14&output=embed`;
  const directionsUrl = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${center.name}, ${center.address}, ${center.city}`)}`;

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-[1000px] mx-auto px-4 pt-6">
        <div className="flex items-center text-xs text-slate-500 gap-1 font-semibold flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/centers" className="hover:text-[#2563eb]">Centers</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#2563eb]">{center.name}</span>
        </div>
      </div>

      <section className="py-10">
        <div className="max-w-[1000px] mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-2 mb-2">
              {center.is_nabl && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  <Shield className="w-3 h-3" /> NABL Accredited
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0f2d5e] mb-1">{center.name}</h1>
            <p className="text-slate-500 text-sm font-medium mb-6">{center.city}, Karnataka</p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                <p className="text-slate-700 text-sm leading-relaxed">{center.address}, {center.city}</p>
              </div>
              {center.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                  <a href={`tel:${center.phone.replace(/\s+/g, "")}`} className="text-slate-700 text-sm font-semibold hover:text-[#2563eb]">
                    {center.phone}
                  </a>
                </div>
              )}
              {center.hours && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm">{center.hours}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/book"
                className="bg-[#2563eb] text-white font-bold px-5 py-2.5 rounded-full hover:bg-[#1d4ed8] transition-colors text-sm"
              >
                Book a Test Here
              </Link>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-[#2563eb] text-[#2563eb] font-bold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors text-sm"
              >
                Get Directions <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm min-h-[320px]">
            <iframe
              src={mapEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 320 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map to ${center.name}`}
            />
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto px-4 mt-6">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
            <p className="text-slate-600 text-sm">
              Looking for a different location?{" "}
              <Link href="/centers" className="text-[#2563eb] font-bold hover:underline">
                View all centers
              </Link>{" "}
              or use our nearest-centre finder with live GPS distance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

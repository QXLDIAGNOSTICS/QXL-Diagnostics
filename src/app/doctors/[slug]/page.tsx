import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, GraduationCap, Stethoscope, Phone } from "lucide-react";
import { serverApi } from "@/lib/serverApi";
import { SITE_URL, PHONE_DISPLAY, PHONE_E164 } from "@/lib/businessInfo";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const doctors = await serverApi.doctors.list();
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await serverApi.doctors.get(slug);
  if (!doctor) {
    return { title: "Doctor Not Found | QXL Diagnostics" };
  }
  const title = `${doctor.name}${doctor.qualification ? ` — ${doctor.qualification}` : ""}`;
  const description =
    doctor.bio ||
    `${doctor.name} is a ${doctor.specialization || "consultant"} at QXL Diagnostics, a NABL-accredited diagnostic laboratory in Bengaluru.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/doctors/${doctor.slug}` },
    openGraph: {
      title: `${title} | QXL Diagnostics`,
      description,
      url: `${SITE_URL}/doctors/${doctor.slug}`,
      images: doctor.image_url ? [{ url: `${SITE_URL}${doctor.image_url}` }] : undefined,
    },
  };
}

export default async function DoctorDetailPage({ params }: Props) {
  const { slug } = await params;
  const doctor = await serverApi.doctors.get(slug);
  if (!doctor) notFound();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/doctors/${doctor.slug}#physician`,
    name: doctor.name,
    url: `${SITE_URL}/doctors/${doctor.slug}`,
    image: doctor.image_url ? `${SITE_URL}${doctor.image_url}` : undefined,
    jobTitle: doctor.qualification || undefined,
    medicalSpecialty: doctor.specialization || undefined,
    description: doctor.bio || undefined,
    worksFor: {
      "@type": "MedicalOrganization",
      name: "QXL Diagnostics",
      url: SITE_URL,
      telephone: PHONE_E164,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Doctors", item: `${SITE_URL}/doctors` },
      { "@type": "ListItem", position: 3, name: doctor.name, item: `${SITE_URL}/doctors/${doctor.slug}` },
    ],
  };

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-[1000px] mx-auto px-4 pt-6">
        <div className="flex items-center text-xs text-slate-500 gap-1 font-semibold flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/doctors" className="hover:text-[#2563eb]">Doctors</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#2563eb]">{doctor.name}</span>
        </div>
      </div>

      <section className="py-10">
        <div className="max-w-[1000px] mx-auto px-4 w-full">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-36 h-36 rounded-full overflow-hidden bg-blue-50 relative flex-shrink-0 mx-auto md:mx-0">
              {doctor.image_url ? (
                <Image src={doctor.image_url} alt={doctor.name} fill sizes="144px" className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Stethoscope className="w-14 h-14 text-[#2563eb]" />
                </div>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#0f2d5e]">{doctor.name}</h1>
              {doctor.qualification && (
                <p className="text-sm font-bold text-[#2563eb] uppercase tracking-wide mt-1">
                  {doctor.qualification}
                </p>
              )}
              {doctor.specialization && (
                <p className="flex items-center justify-center md:justify-start gap-1.5 text-slate-600 text-sm font-medium mt-3">
                  <GraduationCap className="w-4 h-4 flex-shrink-0" />
                  {doctor.specialization}
                </p>
              )}
              {doctor.bio && (
                <p className="text-slate-600 text-base leading-relaxed mt-5">{doctor.bio}</p>
              )}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-7">
                <Link
                  href="/book"
                  className="bg-[#2563eb] text-white font-bold px-5 py-2.5 rounded-full hover:bg-[#1d4ed8] transition-colors text-sm"
                >
                  Book a Test
                </Link>
                <a
                  href={`tel:${PHONE_E164}`}
                  className="flex items-center gap-2 border-2 border-[#2563eb] text-[#2563eb] font-bold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
            <p className="text-slate-600 text-sm">
              Looking for more of our medical team?{" "}
              <Link href="/doctors" className="text-[#2563eb] font-bold hover:underline">
                View all doctors
              </Link>{" "}
              or read about our{" "}
              <Link href="/founder" className="text-[#2563eb] font-bold hover:underline">
                founder &amp; consultants
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

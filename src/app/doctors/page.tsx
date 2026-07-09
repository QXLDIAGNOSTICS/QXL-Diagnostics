import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, GraduationCap, Stethoscope } from "lucide-react";
import { serverApi } from "@/lib/serverApi";
import { SITE_URL } from "@/lib/businessInfo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Expert Doctors & Pathologists in Bengaluru",
  description:
    "Meet the NABL-accredited pathologists, microbiologists, and clinical biochemists behind every QXL Diagnostics report — decades of combined expertise in diagnostic medicine.",
  alternates: {
    canonical: `${SITE_URL}/doctors`,
  },
  openGraph: {
    title: "Our Expert Doctors & Pathologists | QXL Diagnostics",
    description:
      "Meet the NABL-accredited pathologists, microbiologists, and clinical biochemists behind every QXL Diagnostics report.",
    url: `${SITE_URL}/doctors`,
  },
};

export default async function DoctorsPage() {
  const doctors = await serverApi.doctors.list();
  const activeDoctors = doctors.filter((d) => d.is_active);

  const doctorsGraph = {
    "@context": "https://schema.org",
    "@graph": activeDoctors.map((doc) => ({
      "@type": "Physician",
      "@id": `${SITE_URL}/doctors/${doc.slug}#physician`,
      name: doc.name,
      url: `${SITE_URL}/doctors/${doc.slug}`,
      image: doc.image_url ? `${SITE_URL}${doc.image_url}` : undefined,
      medicalSpecialty: doc.specialization || undefined,
      description: doc.bio || undefined,
      worksFor: {
        "@type": "MedicalOrganization",
        name: "QXL Diagnostics",
        url: SITE_URL,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Doctors", item: `${SITE_URL}/doctors` },
    ],
  };

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorsGraph) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#eff6ff] py-14 border-b border-gray-100">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase mb-4 shadow-sm">
            Expert Authority
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0f2d5e] mb-3 leading-tight">
            Our Expert Doctors &amp; Pathologists
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-3xl font-medium leading-relaxed mb-4">
            Every QXL Diagnostics report is reviewed by consultant pathologists, microbiologists, and clinical
            biochemists with decades of combined experience in Bengaluru&apos;s diagnostic industry.
          </p>
          <div className="flex items-center text-xs text-slate-500 gap-1 font-semibold">
            <Link href="/" className="hover:text-[#2563eb]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#2563eb]">Doctors</span>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          {activeDoctors.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-slate-600 font-medium">
                Doctor profiles are being updated. Meanwhile, meet our founder and consultants on the{" "}
                <Link href="/founder" className="text-[#2563eb] font-bold hover:underline">
                  Founder &amp; Consultants
                </Link>{" "}
                page.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeDoctors.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/doctors/${doc.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-[#2563eb] hover:shadow-lg transition-all p-6 flex flex-col items-center text-center"
                >
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-blue-50 mb-4 relative flex-shrink-0">
                    {doc.image_url ? (
                      <Image src={doc.image_url} alt={doc.name} fill sizes="112px" className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Stethoscope className="w-10 h-10 text-[#2563eb]" />
                      </div>
                    )}
                  </div>
                  <h2 className="font-extrabold text-[#0f2d5e] text-lg group-hover:text-[#2563eb] transition-colors">
                    {doc.name}
                  </h2>
                  {doc.qualification && (
                    <p className="text-[11px] font-bold text-[#2563eb] uppercase tracking-wide mt-1">
                      {doc.qualification}
                    </p>
                  )}
                  {doc.specialization && (
                    <p className="flex items-center gap-1.5 text-slate-500 text-sm mt-3">
                      <GraduationCap className="w-4 h-4 flex-shrink-0" />
                      {doc.specialization}
                    </p>
                  )}
                  {doc.bio && (
                    <p className="text-slate-500 text-xs mt-3 line-clamp-3 leading-relaxed">{doc.bio}</p>
                  )}
                  <span className="mt-4 text-xs font-bold text-[#2563eb] flex items-center gap-1">
                    View Profile <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

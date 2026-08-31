import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, GraduationCap, Stethoscope, Phone, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { serverApi } from "@/lib/serverApi";
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, NABL_CERTIFICATE, ISO_STANDARD } from "@/lib/businessInfo";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

interface DoctorLeadershipProfile {
  qualification: string;
  specialtyTitle: string;
  accreditationRole: string;
  expertise: string;
  supervisionScope: string;
  institutionAlumni?: string;
}

const DOCTOR_LEADERSHIP: Record<string, DoctorLeadershipProfile> = {
  "dr-pritilata-rout": {
    qualification: "MD (Pathology) · NIMHANS Alumna",
    specialtyTitle: "Senior Consultant Histopathologist & Cytopathologist",
    accreditationRole: `NABL ${ISO_STANDARD} Histopathology Quality Sign-Off (${NABL_CERTIFICATE})`,
    expertise: "Surgical Biopsies, FNAC, Pap Smears, Neuropathology & IHC Staining",
    supervisionScope: "Directs Histopathology, Surgical Biopsy & Cytopathology Reporting",
    institutionAlumni: "National Institute of Mental Health and Neurosciences (NIMHANS)"
  },
  "dr-shantakumar-muruda": {
    qualification: "MD (Biochemistry) · NABL Lead Assessor",
    specialtyTitle: "Founder & Senior Consultant Clinical Biochemist",
    accreditationRole: `Head of NABL ${ISO_STANDARD} Quality Governance (${NABL_CERTIFICATE})`,
    expertise: "Clinical Biochemistry, Metabolic Profiles, Automated Immunoassays & EQAS",
    supervisionScope: "Directs Clinical Biochemistry, Delta Checks & Laboratory Quality Systems",
    institutionAlumni: "KMC Manipal / Rajiv Gandhi University of Health Sciences"
  },
  "dr-naveen-kumar-n": {
    qualification: "DCP, DNB (Pathology)",
    specialtyTitle: "Consultant Pathologist & Diagnostic Validation Lead",
    accreditationRole: `NABL ${ISO_STANDARD} Clinical Pathology Validator (${NABL_CERTIFICATE})`,
    expertise: "Haematology, Peripheral Blood Smears, Clinical Pathology & Chemistry",
    supervisionScope: "Validates Routine Pathology, Haematology & Speciality Assays",
  },
  "dr-ajitha-pillai": {
    qualification: "MD (Microbiology)",
    specialtyTitle: "Senior Consultant Microbiologist",
    accreditationRole: `NABL ${ISO_STANDARD} Microbiology & Serology Lead (${NABL_CERTIFICATE})`,
    expertise: "Infectious Disease Serology, Culture & Sensitivity, Molecular Diagnostics",
    supervisionScope: "Directs Microbiological Assays, Antibiotic Stewardship & Serology",
  }
};

export async function generateStaticParams() {
  const doctors = await serverApi.doctors.list();
  const apiSlugs = doctors.map((d) => ({ slug: d.slug }));
  const knownSlugs = Object.keys(DOCTOR_LEADERSHIP).map((slug) => ({ slug }));
  return Array.from(new Set([...apiSlugs.map(s => s.slug), ...knownSlugs.map(s => s.slug)])).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctorFromApi = await serverApi.doctors.get(slug);
  const profile = DOCTOR_LEADERSHIP[slug];

  const name = doctorFromApi?.name || (slug === 'dr-pritilata-rout' ? 'Dr. Pritilata Rout' : slug === 'dr-shantakumar-muruda' ? 'Dr. Shantakumar Muruda' : slug === 'dr-naveen-kumar-n' ? 'Dr. Naveen Kumar N' : 'Dr. Ajitha Pillai');
  const qualification = profile?.qualification || doctorFromApi?.qualification || '';

  const title = `${name}${qualification ? ` — ${qualification}` : ""}`;
  const description =
    doctorFromApi?.bio ||
    `${name} is a ${profile?.specialtyTitle || "consultant specialist"} at QXL Diagnostics, a doctor-led NABL accredited diagnostic laboratory in Bengaluru.`;
  
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/doctors/${slug}` },
    openGraph: {
      title: `${title} | QXL Diagnostics`,
      description,
      url: `${SITE_URL}/doctors/${slug}`,
      images: doctorFromApi?.image_url ? [{ url: `${SITE_URL}${doctorFromApi.image_url}` }] : undefined,
    },
  };
}

export default async function DoctorDetailPage({ params }: Props) {
  const { slug } = await params;
  const doctorFromApi = await serverApi.doctors.get(slug);
  const profile = DOCTOR_LEADERSHIP[slug];

  if (!doctorFromApi && !profile) notFound();

  const name = doctorFromApi?.name || (slug === 'dr-pritilata-rout' ? 'Dr. Pritilata Rout' : slug === 'dr-shantakumar-muruda' ? 'Dr. Shantakumar Muruda' : slug === 'dr-naveen-kumar-n' ? 'Dr. Naveen Kumar N' : 'Dr. Ajitha Pillai');
  const qualification = profile?.qualification || doctorFromApi?.qualification || 'Medical Consultant';
  const specialtyTitle = profile?.specialtyTitle || doctorFromApi?.specialization || 'Diagnostic Specialist';
  const bio = doctorFromApi?.bio || (profile ? `${name} is a ${specialtyTitle} at QXL Diagnostics Super Speciality Laboratory.` : undefined);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/doctors/${slug}#physician`,
    name: name,
    url: `${SITE_URL}/doctors/${slug}`,
    image: doctorFromApi?.image_url ? `${SITE_URL}${doctorFromApi.image_url}` : undefined,
    jobTitle: specialtyTitle,
    medicalSpecialty: [specialtyTitle, "Diagnostic Pathology", "Laboratory Medicine"],
    description: bio,
    worksFor: {
      "@type": "MedicalOrganization",
      name: "QXL Diagnostics Super Speciality Lab",
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
      { "@type": "ListItem", position: 3, name: name, item: `${SITE_URL}/doctors/${slug}` },
    ],
  };

  return (
    <div className="bg-[#f8faff] min-h-screen pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-[1000px] mx-auto px-4 pt-6">
        <div className="flex items-center text-xs text-slate-500 gap-1 font-semibold flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/team" className="hover:text-[#2563eb]">Medical Team</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#2563eb]">{name}</span>
        </div>
      </div>

      <section className="py-8">
        <div className="max-w-[1000px] mx-auto px-4 w-full">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-36 h-36 rounded-full overflow-hidden bg-blue-50 relative flex-shrink-0 mx-auto md:mx-0 border-4 border-sky-100 shadow-md">
              {doctorFromApi?.image_url ? (
                <Image src={doctorFromApi.image_url} alt={name} fill sizes="144px" className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0d2e42] to-[#2563eb] text-white font-extrabold text-3xl">
                  {name.split(' ').map(n => n[0]).join('').slice(0, 3)}
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <span className="inline-block bg-blue-50 text-[#2563eb] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                {specialtyTitle}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#0f2d5e]">{name}</h1>
              
              <p className="text-sm font-bold text-sky-700 tracking-wide mt-1">
                {qualification}
              </p>

              {bio && (
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mt-4">{bio}</p>
              )}

              {/* Dynamic Doctor-Specific Clinical & Quality Leadership Section */}
              <div className="mt-8 border-t border-slate-100 pt-6 space-y-4 text-left">
                <h2 className="text-base font-extrabold text-[#0f2d5e] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  Clinical &amp; Quality Governance Role
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <span className="font-extrabold text-slate-900 block">Qualifications &amp; Training</span>
                    <span className="text-slate-600 font-medium mt-0.5 block">{qualification}</span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <span className="font-extrabold text-slate-900 block">Accreditation Leadership</span>
                    <span className="text-slate-600 font-medium mt-0.5 block">
                      {profile?.accreditationRole || `NABL ${ISO_STANDARD} Quality Sign-Off (${NABL_CERTIFICATE})`}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <span className="font-extrabold text-slate-900 block">Clinical Expertise</span>
                    <span className="text-slate-600 font-medium mt-0.5 block">
                      {profile?.expertise || "Diagnostic Pathology & Clinical Interpretation"}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <span className="font-extrabold text-slate-900 block">Report Verification Scope</span>
                    <span className="text-slate-600 font-medium mt-0.5 block">
                      {profile?.supervisionScope || "Review & Authorization of Diagnostic Reports"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-7">
                <Link
                  href="/book"
                  className="bg-[#2563eb] text-white font-bold px-6 py-2.5 rounded-full hover:bg-[#1d4ed8] transition-colors text-xs uppercase tracking-wider"
                >
                  Book a Test
                </Link>
                <a
                  href={`tel:${PHONE_E164}`}
                  className="flex items-center gap-2 border-2 border-[#2563eb] text-[#2563eb] font-bold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors text-xs uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-sky-50 border border-sky-200 rounded-2xl p-5 text-center">
            <p className="text-slate-700 text-xs sm:text-sm font-medium">
              Want to meet all of our consultant specialists?{" "}
              <Link href="/team" className="text-[#2563eb] font-bold hover:underline">
                View QXL Consultant Medical Team
              </Link>{" "}
              or read about our{" "}
              <Link href="/quality-accreditation" className="text-[#2563eb] font-bold hover:underline">
                NABL Quality &amp; Accreditation Systems
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

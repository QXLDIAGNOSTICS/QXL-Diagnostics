import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serverApi } from "@/lib/serverApi";
import { SITE_URL } from "@/lib/businessInfo";
import type { Speciality } from "@/lib/api";
import fallbackSpecialities from "@/data/specialitiesFallback.json";
import SpecialityView from "./SpecialityView";

// New content from the admin panel shows up within five minutes.
export const revalidate = 300;

const LOGO_URL =
  "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Specialities come from the CMS; the bundled snapshot is used only if the API is unreachable. */
async function loadSpecialities(): Promise<Speciality[]> {
  const live = await serverApi.specialities.list();
  return live.length > 0 ? live : (fallbackSpecialities as unknown as Speciality[]);
}

export async function generateStaticParams() {
  return (await loadSpecialities()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const spec = (await loadSpecialities()).find((s) => s.slug === slug);
  if (!spec) return { title: "Speciality not found" };
  const title = spec.seo_title || `${spec.name} Testing in Bengaluru`;
  const description = spec.seo_description || spec.hero_description || undefined;
  const url = `${SITE_URL}/specialities/${spec.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | QXL Diagnostics`, description, url },
  };
}

export default async function SpecialityPage({ params }: Props) {
  const { slug } = await params;
  const all = await loadSpecialities();
  const spec = all.find((s) => s.slug === slug);
  if (!spec) notFound();
  return (
    <SpecialityView
      speciality={spec}
      others={[...all]
        .sort((a, b) => (a.directory?.order ?? a.sort_order) - (b.directory?.order ?? b.sort_order))
        .map(({ name, slug: s }) => ({ name, slug: s }))}
      logoUrl={LOGO_URL}
    />
  );
}

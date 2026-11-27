import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnPage from "@/components/kn/KnPage";
import { knMetadata } from "@/content/kn/common";
import { getSpecialityPage, SPECIALITY_SLUGS } from "@/content/kn/specialities";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SPECIALITY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getSpecialityPage((await params).slug);
  return page ? knMetadata(page) : {};
}

export default async function Page({ params }: Props) {
  const page = getSpecialityPage((await params).slug);
  if (!page) notFound();
  return <KnPage page={page} />;
}

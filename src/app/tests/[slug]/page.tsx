import { redirect, notFound } from "next/navigation";
import { getDynamicPageData } from "@/lib/seoPages/dynamicPageResolver";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [];
}

export default async function TestRedirectPage({ params }: Props) {
  const { slug } = await params;
  const data = getDynamicPageData(slug);
  if (!data) {
    notFound();
  }
  redirect(`/${slug}`);
}

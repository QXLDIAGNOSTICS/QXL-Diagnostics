import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnArticle from "@/components/kn/KnArticle";
import KnPage from "@/components/kn/KnPage";
import { KN_BLOG_POSTS } from "@/content/kn/blog/posts";
import { pillarPage } from "@/content/kn/blog/pillar";
import { SITE_URL } from "@/lib/businessInfo";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return KN_BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = KN_BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const url = `${SITE_URL}/kn/blog/${post.slug}`;
  // No hreflang: these articles have no equivalent English article (the English
  // test pages are booking pages with a different intent).
  return {
    title: post.seoTitle,
    description: post.description,
    alternates: { canonical: url },
    openGraph: { title: post.seoTitle, description: post.description, url, type: "article", locale: "kn_IN", siteName: "QXL Diagnostics" },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = KN_BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const url = `${SITE_URL}/kn/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.seoTitle.replace(/\s*\|\s*QXL$/, ""),
    description: post.description,
    inLanguage: "kn-IN",
    mainEntityOfPage: url,
    author: { "@type": "Person", name: "Dr. Shantakumar Muruda", jobTitle: "Founder & CEO, MD (Biochemistry)", url: `${SITE_URL}/dr-shantakumar-muruda` },
    publisher: { "@type": "Organization", name: "QXL Diagnostics", url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {post.markdown ? <KnArticle post={{ ...post, markdown: post.markdown }} /> : <KnPage page={pillarPage} />}
    </>
  );
}

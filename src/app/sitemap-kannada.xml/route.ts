import { SITE_CONTENT_DATETIME } from "@/lib/dateUtils";
import { NextResponse } from "next/server";
import { KN_PATHS } from "@/content/kn/common";
import { KN_BLOG_POSTS } from "@/content/kn/blog/posts";

const BASE_URL = "https://qxldiagnostics.com";

/**
 * Kannada pages. Translated pages carry en-IN/kn-IN hreflang pairs; the Kannada
 * blog articles have no English equivalent, so they are listed without hreflang.
 */
export async function GET() {
  const lastmod = new Date(SITE_CONTENT_DATETIME).toISOString();
  const pairs = Object.entries(KN_PATHS).filter(([en]) => en !== "/home-collection");
  const translated = pairs.map(([en, kn]) => {
    const enUrl = `${BASE_URL}${en === "/" ? "" : en}`;
    return `  <url>
    <loc>${BASE_URL}${kn}</loc>
    <lastmod>${lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="kn-IN" href="${BASE_URL}${kn}"/>
    <xhtml:link rel="alternate" hreflang="en-IN" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>
  </url>`;
  });
  const blogs = KN_BLOG_POSTS.map(
    (p) => `  <url>
    <loc>${BASE_URL}/kn/blog/${p.slug}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...translated, ...blogs].join("\n")}
</urlset>`;
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=86400, s-maxage=86400" },
  });
}

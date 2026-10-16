import { NextResponse } from "next/server";
import { defaultBlogs, getBlogCategory } from "@/lib/blogsData";

const BASE_URL = "https://qxldiagnostics.com";

function escapeXml(unsafe: string): string {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const now = new Date().toUTCString();

  const itemsXml = defaultBlogs
    .map((b) => {
      const category = getBlogCategory(b);
      const rawDate = (b as any).created_at || (b as any).date;
      let pubDate = now;
      if (rawDate) {
        const parsed = new Date(rawDate);
        if (!isNaN(parsed.getTime())) {
          pubDate = parsed.toUTCString();
        }
      }

      return `    <item>
      <title>${escapeXml(b.title)}</title>
      <link>${BASE_URL}/blog/${b.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${b.slug}</guid>
      <description>${escapeXml(b.excerpt)}</description>
      <category>${escapeXml(category)}</category>
      <author>editorial@qxldiagnostics.com (${escapeXml(b.author)})</author>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>QXL Diagnostics | Clinical Diagnostics &amp; Prenatal Health Guides Bengaluru</title>
    <link>${BASE_URL}/blog</link>
    <description>Evidence-based laboratory guides, prenatal testing timelines, cardiac markers, liver health, and diagnostic advances reviewed by consultant pathologists at QXL Bengaluru.</description>
    <language>en-IN</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}

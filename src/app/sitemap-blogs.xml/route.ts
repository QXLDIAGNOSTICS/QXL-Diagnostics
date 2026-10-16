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
  const now = new Date().toISOString();

  // Root blog index entry
  const blogIndexEntry = `  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  // Individual blog article entries with Google Image sitemap extension
  const blogEntries = defaultBlogs.map((b) => {
    const rawDate = (b as any).created_at || (b as any).date;
    let lastmod = now;
    if (rawDate) {
      const parsed = new Date(rawDate);
      if (!isNaN(parsed.getTime())) {
        lastmod = parsed.toISOString();
      }
    }

    const priority =
      b.slug === "personalised-pregnancy-testing-bengaluru"
        ? "0.95"
        : b.slug === "apob-vs-ldl-c-atherogenic-cardiovascular-risk-guide" ||
          b.slug === "your-liver-works-in-silence-simple-blood-test"
        ? "0.90"
        : "0.85";

    const imageUrl = (b as any).image;
    const imageBlock = imageUrl
      ? `\n    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(b.title)}</image:title>
      <image:caption>${escapeXml(b.excerpt)}</image:caption>
    </image:image>`
      : "";

    return `  <url>
    <loc>${BASE_URL}/blog/${b.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>${imageBlock}
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${blogIndexEntry}
${blogEntries.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}

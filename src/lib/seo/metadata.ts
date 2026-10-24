/**
 * Canonical Metadata Helper for QXL Diagnostics
 * Guarantees standard canonical URL, clean title deduplication, and OpenGraph/Twitter consistency.
 */

const SITE = "https://qxldiagnostics.com";

export function buildMetadata({
  title,
  description,
  path
}: {
  title: string;
  description: string;
  path: string;
}) {
  const cleanedTitle = title
    .replace(/\s*\|\s*QXL Diagnostics.*$/i, "")
    .trim();

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = `${SITE}${normalizedPath === "/" ? "" : normalizedPath}`;

  return {
    title: `${cleanedTitle} | QXL Diagnostics`,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${cleanedTitle} | QXL Diagnostics`,
      description,
      siteName: "QXL Diagnostics",
      locale: "en_IN"
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${cleanedTitle} | QXL Diagnostics`,
      description
    }
  };
}

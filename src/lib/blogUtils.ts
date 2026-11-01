import { optimizeCloudinaryUrl } from "./cloudinary";
export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Recursively extracts plain text string from any string, number, array, or React element tree.
 */
export function getNodeText(node: any): string {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (typeof node === "object") {
    if (node.props && node.props.children) {
      return getNodeText(node.props.children);
    }
    if ("value" in node) {
      return String(node.value || "");
    }
  }
  return "";
}

/**
 * Converts heading text to a clean URL-friendly anchor slug.
 */
export function slugifyHeading(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Strip markdown link syntax: [text](url) -> text
    .replace(/[*_`]/g, "") // Strip markdown styling bold/italic/code
    .replace(/[^\w\s-]/g, "") // Remove punctuation & special characters
    .trim()
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}

/**
 * Extracts all h2 (##) and h3 (###) headings from markdown text.
 */
export function extractHeadings(markdown: string): HeadingItem[] {
  if (!markdown) return [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const rawText = match[2];
    const cleanText = rawText
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();

    if (cleanText) {
      headings.push({
        id: slugifyHeading(cleanText),
        text: cleanText,
        level,
      });
    }
  }

  return headings;
}


/** Maps a blog post published from the admin panel (backend shape:
 * `image_url`, `created_at`) onto the fields the site's blog cards and
 * article view read (`image`, `date`). */
export function normalizeApiBlogPost<T extends { image_url?: string | null; created_at?: string }>(
  post: T
): T & { image?: string; date?: string } {
  return {
    ...post,
    image: post.image_url ? optimizeCloudinaryUrl(post.image_url, { w: 1200 }) : undefined,
    date: post.created_at
      ? new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
      : undefined,
  };
}

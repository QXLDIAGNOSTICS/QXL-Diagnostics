export interface HeadingItem {
  id: string;
  text: string;
  level: number;
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

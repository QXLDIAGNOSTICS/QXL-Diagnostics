/**
 * Kannada (ಕನ್ನಡ) site content model.
 *
 * Source: "QXL ಡಯಾಗ್ನೋಸ್ಟಿಕ್ಸ್ ಜಾಲತಾಣದ ಕನ್ನಡ ಅನುವಾದ" — Draft 1, text captured 27 Nov 2026.
 * Test names, package brand names, NABL numbers, phone and e-mail stay in English
 * on purpose (patients see them that way on prescriptions and reports).
 */

export type KnLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "whatsapp" | "call";
};

export type KnInline = string | { text: string; href: string };

export type KnBlock =
  | { type: "p"; text: string; strong?: boolean }
  | { type: "bullets"; items: KnInline[] }
  | { type: "steps"; items: string[] }
  | { type: "chips"; items: KnInline[] }
  | { type: "buttons"; items: KnLink[] }
  | { type: "kv"; items: { k: string; v: string }[] }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string }
  | { type: "faq"; items: { q: string; a?: string }[]; footer?: string }
  | {
      type: "notice";
      tone: "warning" | "info" | "success";
      title?: string;
      text: string;
      links?: KnLink[];
    }
  | {
      type: "cards";
      cols?: 2 | 3 | 4;
      items: {
        title: string;
        badge?: string;
        body?: string;
        lines?: string[];
        kv?: { k: string; v: string }[];
        href?: string;
        cta?: KnLink;
      }[];
    }
  | {
      type: "profiles";
      items: {
        title: string;
        includes: string;
        tat?: string;
        sample?: string;
        price?: string;
        cta?: KnLink;
      }[];
    }
  | { type: "callback" };

export type KnSection = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  tone?: "white" | "muted" | "blue";
  blocks: KnBlock[];
};

export type KnPageData = {
  /** Path of the matching English page (used for hreflang and the language switch). */
  enPath: string;
  /** Path of this Kannada page. */
  knPath: string;
  seoTitle: string;
  description: string;
  breadcrumb?: { label: string; href?: string }[];
  hero: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    body?: string[];
    ctas?: KnLink[];
    badges?: string[];
    stats?: { k: string; v: string }[];
  };
  sections: KnSection[];
};

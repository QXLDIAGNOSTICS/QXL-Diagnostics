/**
 * Shared content model for SEO landing pages.
 * Each page supplies a SeoLandingData object; the shared
 * <SeoLandingPage /> template renders it with structured data.
 */

export type IconName =
  | "award"
  | "shield"
  | "check"
  | "mapPin"
  | "phone"
  | "whatsapp"
  | "fileText"
  | "microscope"
  | "dna"
  | "activity"
  | "building"
  | "userCheck"
  | "home"
  | "clock"
  | "heart"
  | "droplet"
  | "flaskConical"
  | "stethoscope"
  | "calendarCheck"
  | "truck"
  | "vial"
  | "brain"
  | "baby"
  | "apple"
  | "sun"
  | "thermometer"
  | "testTube"
  | "syringe";

export interface SeoHighlight {
  icon: IconName;
  title: string;
  desc: string;
}

export interface SeoSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface SeoFeatureGroup {
  title: string;
  subtitle?: string;
  items: { title: string; desc: string }[];
}

export interface SeoStep {
  title: string;
  desc: string;
}

export interface SeoFaq {
  q: string;
  a: string;
}

export interface SeoLinkCard {
  label: string;
  href: string;
  desc?: string;
}

export interface SeoLandingData {
  /** URL path, e.g. "/cbc-test" — used for canonical + JSON-LD */
  slug: string;
  breadcrumbLabel: string;

  heroBadge: string;
  h1Lead: string;
  h1Highlight: string;
  heroIntro: string;

  aiOverviewTitle: string;
  aiOverview: string;
  aiOverviewPoints: string[];

  highlights: SeoHighlight[];
  sections: SeoSection[];
  featureGroup?: SeoFeatureGroup;
  steps?: { title: string; desc: string }[];
  faqs: SeoFaq[];
  relatedLinks: SeoLinkCard[];

  /** JSON-LD page type */
  pageType: "service" | "test";
  /** For test pages: the MedicalTest name used in structured data */
  medicalTestName?: string;

  /** Structured Test Metadata for Above-the-fold display & AEO/SEO */
  price?: number;
  originalPrice?: number;
  synonyms?: string[];
  reportTat?: string;
  fastingRequired?: boolean;
  fastingDuration?: string;
  sampleType?: string;
  parametersCount?: number;
  reviewerName?: string;
  reviewerSlug?: string;
  reviewerQuals?: string;
  publishedDate?: string;
  lastReviewedDate?: string;
  references?: string[];
}


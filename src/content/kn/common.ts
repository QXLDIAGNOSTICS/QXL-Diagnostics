import { PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK, EMAIL, SITE_URL } from "@/lib/businessInfo";
import type { KnLink, KnPageData } from "./types";
import type { Metadata } from "next";

export const KN = {
  phone: PHONE_DISPLAY,
  tel: `tel:${PHONE_E164}`,
  wa: WHATSAPP_LINK,
  email: EMAIL,
  nabl: "NABLM1126KA10694",
  nablNorth: "MC-10025",
  iso: "ISO 15189:2022",
  kengeriAddress:
    "3ನೇ ಮಹಡಿ, SLN ಕಾಂಪ್ಲೆಕ್ಸ್, ಮೈಸೂರು ರಸ್ತೆ, ಕೆಂಗೇರಿ, ಬೆಂಗಳೂರು – 560060 (ಕೆಂಗೇರಿ ಬಸ್ ನಿಲ್ದಾಣದ ಎದುರು)",
};

export const callBtn = (label = `ಕರೆ ಮಾಡಿ ${PHONE_DISPLAY}`): KnLink => ({
  label,
  href: KN.tel,
  variant: "call",
});
export const waBtn = (label = "WhatsApp ಮಾಡಿ"): KnLink => ({ label, href: KN.wa, variant: "whatsapp" });
export const homeCollectionBtn = (label = "ಮನೆ ಮಾದರಿ ಸಂಗ್ರಹ ಬುಕ್ ಮಾಡಿ"): KnLink => ({
  label,
  href: "/home-blood-collection-bangalore",
  variant: "primary",
});

/** Shared metadata for every Kannada page: Kannada canonical + en/kn hreflang pair. */
export function knMetadata(page: KnPageData): Metadata {
  const knUrl = `${SITE_URL}${page.knPath}`;
  const enUrl = `${SITE_URL}${page.enPath === "/" ? "" : page.enPath}`;
  return {
    title: page.seoTitle,
    description: page.description,
    alternates: {
      canonical: knUrl,
      languages: { "en-IN": enUrl, "kn-IN": knUrl, "x-default": enUrl },
    },
    openGraph: {
      title: page.seoTitle,
      description: page.description,
      url: knUrl,
      locale: "kn_IN",
      alternateLocale: ["en_IN"],
      siteName: "QXL Diagnostics",
      type: "website",
    },
  };
}

/** English path → Kannada path, for the header language switch and English-page hreflang. */
export const KN_PATHS: Record<string, string> = {
  "/": "/kn",
  "/about": "/kn/about",
  "/team": "/kn/team",
  "/packages": "/kn/packages",
  "/home-collection": "/kn/home-collection",
  "/home-blood-collection-bangalore": "/kn/home-collection",
  "/upload-prescription": "/kn/upload-prescription",
  "/centers": "/kn/centers",
  "/specialities": "/kn/specialities",
  "/specialities/cardiology": "/kn/specialities/cardiology",
  "/specialities/endocrinology": "/kn/specialities/endocrinology",
  "/specialities/neurology": "/kn/specialities/neurology",
  "/specialities/oncology": "/kn/specialities/oncology",
  "/specialities/womens-health": "/kn/specialities/womens-health",
  "/specialities/infectious-diseases": "/kn/specialities/infectious-diseases",
  "/specialities/gastroenterology": "/kn/specialities/gastroenterology",
  "/specialities/hematology": "/kn/specialities/hematology",
  "/specialities/bone-disorders": "/kn/specialities/bone-disorders",
  "/specialities/urology": "/kn/specialities/urology",
  "/sexual-health": "/kn/sexual-health",
};

export const KN_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(KN_PATHS)
    .filter(([en]) => en !== "/home-collection")
    .map(([en, kn]) => [kn, en]),
);

/** hreflang alternates for an English page that has a Kannada version. */
export function enAlternates(enPath: string, canonical?: string): NonNullable<Metadata["alternates"]> {
  const enUrl = canonical ?? `${SITE_URL}${enPath === "/" ? "" : enPath}`;
  const kn = KN_PATHS[enPath];
  return {
    canonical: enUrl,
    languages: kn
      ? { "en-IN": enUrl, "kn-IN": `${SITE_URL}${kn}`, "x-default": enUrl }
      : { "en-IN": enUrl, "x-default": enUrl },
  };
}

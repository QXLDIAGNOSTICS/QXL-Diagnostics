import type { Metadata } from "next";

export const SITE_URL = "https://qxldiagnostics.com";

const metadataBase = new URL(SITE_URL);

const BRAND = "QXL Diagnostics";
const DEFAULT_CITY = "Bengaluru";

/* -------------------------------------------------------------------------- */
/*  Common keyword banks                                                      */
/* -------------------------------------------------------------------------- */

const COMMON_KEYWORDS = [
  "diagnostic lab",
  "pathology lab",
  "health checkup",
  "blood test",
  "medical lab",
  "NABL certified lab",
  "diagnostic centre near me",
];

const TEST_KEYWORDS = [
  "diagnostic test",
  "lab test",
  "blood test near me",
  "health screening",
  "pathology",
  "clinical diagnostics",
  "medical test price",
  ...COMMON_KEYWORDS,
];

const PACKAGE_KEYWORDS = [
  "health package",
  "full body checkup",
  "complete health checkup",
  "preventive health",
  "health screening package",
  "annual health checkup",
  "comprehensive checkup",
  ...COMMON_KEYWORDS,
];

const DISEASE_KEYWORDS = [
  "disease diagnosis",
  "symptoms test",
  "medical condition",
  "health condition",
  "diagnostic testing",
  "laboratory diagnosis",
  ...COMMON_KEYWORDS,
];

const LOCATION_KEYWORDS = [
  "diagnostic lab near me",
  "pathology lab near me",
  "blood test centre",
  "health checkup centre",
  "lab near me",
  "NABL lab",
  "home sample collection",
  ...COMMON_KEYWORDS,
];

const DOCTOR_KEYWORDS = [
  "expert doctor",
  "specialist doctor",
  "consultant",
  "medical specialist",
  "diagnostic specialist",
  ...COMMON_KEYWORDS,
];

const SPECIALITY_KEYWORDS = [
  "speciality diagnostics",
  "department",
  "medical speciality",
  "specialist diagnostics",
  ...COMMON_KEYWORDS,
];

const SERVICE_KEYWORDS = [
  "diagnostic services",
  "lab services",
  "home collection",
  "health services",
  "medical services",
  "sample collection",
  "same day reports",
  ...COMMON_KEYWORDS,
];

const BLOG_KEYWORDS = [
  "health blog",
  "medical articles",
  "health tips",
  "diagnostic information",
  "health news",
  "medical advice",
  ...COMMON_KEYWORDS,
];

/* -------------------------------------------------------------------------- */
/*  Shared helpers                                                            */
/* -------------------------------------------------------------------------- */

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 3).trimEnd() + "...";
}

function buildBaseMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  const image = opts.image ?? "https://res.cloudinary.com/btjglif5/image/upload/c_fill,w_1200,h_630,f_auto,q_auto/v1784150719/Assets-QXL/legacy-assets/images/banners/qxl_hero_1_1781507207090.jpg";

  return {
    metadataBase,
    title: opts.title,
    description: truncate(opts.description, 160),
    keywords: opts.keywords ?? [],
    openGraph: {
      title: opts.title,
      description: truncate(opts.description, 160),
      url,
      siteName: BRAND,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: opts.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: truncate(opts.description, 160),
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Generic static-page metadata                                               */
/* -------------------------------------------------------------------------- */

export function generateMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  return buildBaseMetadata(opts);
}

/* -------------------------------------------------------------------------- */
/*  Test page metadata                                                        */
/* -------------------------------------------------------------------------- */

export function generateTestMetadata(params: {
  slug: string;
  name: string;
  description?: string;
  price?: number;
  category?: string;
}): Metadata {
  const title = `${params.name} in ${DEFAULT_CITY} | ${BRAND}`;

  const description = params.description
    ? `Get ${params.name} done at ${BRAND}, ${DEFAULT_CITY}. ${params.description}`
    : `Book ${params.name} test at ${BRAND}, ${DEFAULT_CITY}. Accurate results with NABL certified lab. Home sample collection available.${params.price ? ` Starting at ₹${params.price}.` : ""}`;

  const keywords = [
    params.name.toLowerCase(),
    params.name.toLowerCase() + " test",
    params.name.toLowerCase() + " price",
    params.name.toLowerCase() + " cost",
    params.category?.toLowerCase(),
    "book " + params.name.toLowerCase(),
    ...TEST_KEYWORDS,
  ].filter(Boolean) as string[];

  return buildBaseMetadata({
    title,
    description,
    path: `/tests/${params.slug}`,
    keywords,
  });
}

/* -------------------------------------------------------------------------- */
/*  Package page metadata                                                     */
/* -------------------------------------------------------------------------- */

export function generatePackageMetadata(params: {
  slug: string;
  name: string;
  description?: string;
  price?: number;
  parameters?: number;
  tag?: string;
}): Metadata {
  const title = `${params.name} in ${DEFAULT_CITY} | ${BRAND}`;

  const description = params.description
    ? `${params.description} Book your ${params.name} at ${BRAND}, ${DEFAULT_CITY}.`
    : `Book ${params.name} at ${BRAND}, ${DEFAULT_CITY}.`
      + `${params.parameters ? ` Includes ${params.parameters}+ parameters.` : ""}`
      + `${params.price ? ` Starting at ₹${params.price}.` : ""}`
      + ` NABL certified lab with home sample collection.`;

  const keywords = [
    params.name.toLowerCase(),
    params.name.toLowerCase() + " price",
    params.name.toLowerCase() + " cost",
    params.tag?.toLowerCase(),
    "health package",
    "health checkup package",
    "book " + params.name.toLowerCase(),
    ...PACKAGE_KEYWORDS,
  ].filter(Boolean) as string[];

  return buildBaseMetadata({
    title,
    description,
    path: `/packages/${params.slug}`,
    keywords,
  });
}

/* -------------------------------------------------------------------------- */
/*  Disease page metadata                                                     */
/* -------------------------------------------------------------------------- */

export function generateDiseaseMetadata(params: {
  slug: string;
  name: string;
  description?: string;
  tests?: string[];
}): Metadata {
  const title = `${params.name} - Symptoms, Diagnosis & Tests | ${BRAND}`;

  const testList = params.tests?.length
    ? ` Key tests include ${params.tests.slice(0, 3).join(", ")}.`
    : "";

  const description = params.description
    ? `Learn about ${params.name}: symptoms, causes, and diagnostic tests.${testList} Visit ${BRAND} in ${DEFAULT_CITY} for accurate diagnosis.`
    : `Get information about ${params.name} - symptoms, diagnosis, and recommended lab tests.${testList} Consult ${BRAND}, ${DEFAULT_CITY} for reliable diagnostics.`;

  const keywords = [
    params.name.toLowerCase(),
    params.name.toLowerCase() + " symptoms",
    params.name.toLowerCase() + " test",
    params.name.toLowerCase() + " diagnosis",
    params.name.toLowerCase() + " treatment",
    "what is " + params.name.toLowerCase(),
    ...DISEASE_KEYWORDS,
  ].filter(Boolean) as string[];

  return buildBaseMetadata({
    title,
    description,
    path: `/diseases/${params.slug}`,
    keywords,
  });
}

/* -------------------------------------------------------------------------- */
/*  Location page metadata                                                    */
/* -------------------------------------------------------------------------- */

export function generateLocationMetadata(params: {
  slug: string;
  name: string;
  description?: string;
  city?: string;
  address?: string;
  testsAvailable?: number;
}): Metadata {
  const city = params.city ?? DEFAULT_CITY;
  const title = `${BRAND} ${params.name} - Diagnostic Lab in ${city} | ${BRAND}`;

  const description = params.description
    ? `${params.description} Visit ${BRAND} at ${params.name}, ${city}.${params.address ? ` Address: ${params.address}.` : ""} NABL certified lab with home sample collection.`
    : `${BRAND} ${params.name} in ${city}.${params.address ? ` Located at ${params.address}.` : ""} NABL certified diagnostic lab.${params.testsAvailable ? ` ${params.testsAvailable}+ tests available.` : ""} Home sample collection & same-day digital reports.`;

  const keywords = [
    `${BRAND.toLowerCase()} ${city.toLowerCase()}`,
    `diagnostic lab in ${city.toLowerCase()}`,
    `blood test in ${city.toLowerCase()}`,
    `pathology lab ${city.toLowerCase()}`,
    `lab near ${city.toLowerCase()}`,
    `${params.name.toLowerCase()} ${city.toLowerCase()}`,
    ...LOCATION_KEYWORDS,
  ].filter(Boolean) as string[];

  return buildBaseMetadata({
    title,
    description,
    path: `/locations/${params.slug}`,
    keywords,
  });
}

/* -------------------------------------------------------------------------- */
/*  Doctor page metadata                                                      */
/* -------------------------------------------------------------------------- */

export function generateDoctorMetadata(params: {
  slug: string;
  name: string;
  speciality?: string;
  description?: string;
  designation?: string;
}): Metadata {
  const title = `${params.name}${params.speciality ? ` - ${params.speciality}` : ""} | ${BRAND}`;

  const description = params.description
    ? `${params.description} Consult ${params.name} at ${BRAND}, ${DEFAULT_CITY}.`
    : `Meet ${params.name}${params.designation ? `, ${params.designation}` : ""} at ${BRAND}, ${DEFAULT_CITY}.${params.speciality ? ` Specializes in ${params.speciality}.` : ""} Expert diagnostic consultation.`;

  const keywords = [
    params.name.toLowerCase(),
    params.name.toLowerCase() + " " + DEFAULT_CITY.toLowerCase(),
    params.speciality?.toLowerCase(),
    params.designation?.toLowerCase(),
    "expert doctor " + DEFAULT_CITY.toLowerCase(),
    ...DOCTOR_KEYWORDS,
  ].filter(Boolean) as string[];

  return buildBaseMetadata({
    title,
    description,
    path: `/doctors/${params.slug}`,
    keywords,
  });
}

/* -------------------------------------------------------------------------- */
/*  Speciality page metadata                                                  */
/* -------------------------------------------------------------------------- */

export function generateSpecialityMetadata(params: {
  slug: string;
  name: string;
  description?: string;
  testsCount?: number;
}): Metadata {
  const title = `${params.name} Diagnostics in ${DEFAULT_CITY} | ${BRAND}`;

  const description = params.description
    ? `${params.description} ${BRAND} offers expert ${params.name.toLowerCase()} diagnostics in ${DEFAULT_CITY}. NABL certified lab.`
    : `${BRAND} provides comprehensive ${params.name.toLowerCase()} diagnostic services in ${DEFAULT_CITY}.${params.testsCount ? ` ${params.testsCount}+ tests available.` : ""} NABL certified lab with accurate and reliable results.`;

  const keywords = [
    params.name.toLowerCase() + " diagnostics",
    params.name.toLowerCase() + " test " + DEFAULT_CITY.toLowerCase(),
    params.name.toLowerCase() + " lab " + DEFAULT_CITY.toLowerCase(),
    params.name.toLowerCase() + " specialist",
    ...SPECIALITY_KEYWORDS,
  ].filter(Boolean) as string[];

  return buildBaseMetadata({
    title,
    description,
    path: `/specialities/${params.slug}`,
    keywords,
  });
}

/* -------------------------------------------------------------------------- */
/*  Service page metadata                                                     */
/* -------------------------------------------------------------------------- */

export function generateServiceMetadata(params: {
  slug: string;
  name: string;
  description?: string;
}): Metadata {
  const title = `${params.name} | ${BRAND}`;

  const description = params.description
    ? `${params.description} Book ${params.name.toLowerCase()} at ${BRAND}, ${DEFAULT_CITY}.`
    : `${BRAND} offers ${params.name.toLowerCase()} in ${DEFAULT_CITY}. NABL certified lab with home sample collection, accurate results, and same-day digital reports.`;

  const keywords = [
    params.name.toLowerCase(),
    params.name.toLowerCase() + " " + DEFAULT_CITY.toLowerCase(),
    "book " + params.name.toLowerCase(),
    ...SERVICE_KEYWORDS,
  ].filter(Boolean) as string[];

  return buildBaseMetadata({
    title,
    description,
    path: `/services/${params.slug}`,
    keywords,
  });
}

/* -------------------------------------------------------------------------- */
/*  Blog post metadata                                                        */
/* -------------------------------------------------------------------------- */

export function generateBlogMetadata(params: {
  slug: string;
  title: string;
  description?: string;
  author?: string;
  publishedAt?: string;
  image?: string;
}): Metadata {
  const pageTitle = `${params.title} | ${BRAND} Blog`;

  const description = params.description
    ? truncate(params.description, 160)
    : `Read about ${params.title} on the ${BRAND} health blog. Expert insights on diagnostics, health tips, and medical information from ${DEFAULT_CITY}.`;

  const keywords = [
    params.title.toLowerCase(),
    "health blog",
    "medical blog",
    "diagnostics blog",
    params.author?.toLowerCase(),
    ...BLOG_KEYWORDS,
  ].filter(Boolean) as string[];

  const url = `${SITE_URL}/blog/${params.slug}`;
  const image = params.image ?? "https://res.cloudinary.com/btjglif5/image/upload/c_fill,w_1200,h_630,f_auto,q_auto/v1784150719/Assets-QXL/legacy-assets/images/banners/qxl_hero_1_1781507207090.jpg";

  return {
    metadataBase,
    title: pageTitle,
    description,
    keywords,
    openGraph: {
      title: params.title,
      description,
      url,
      siteName: BRAND,
      type: "article",
      locale: "en_IN",
      ...(params.author && { authors: [params.author] }),
      ...(params.publishedAt && { publishedTime: params.publishedAt }),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: params.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: params.title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Central SEO / AEO / GEO structured-data graph for QXL Diagnostics.
 * Keep NAP (name, address, phone) identical to businessInfo.ts and GBP.
 */

import {
  BUSINESS_LEGAL_NAME,
  BUSINESS_NAME,
  BUSINESS_PARENT_COMPANY,
  EMAIL,
  ISO_STANDARD,
  LOCATIONS,
  NABL_CERTIFICATE,
  PHONE_DISPLAY,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/businessInfo";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const MAIN_LAB_ID = `${SITE_URL}/#kengeri-lab`;

export const SEO_KEYWORDS = [
  "diagnostic lab Bengaluru",
  "NABL certified lab Bangalore",
  "super speciality diagnostic lab Bengaluru",
  "blood test Bangalore",
  "home collection blood test Bengaluru",
  "QXL Diagnostics",
  "Qualitify Healthtech",
  "pathology lab Kengeri",
  "diagnostic lab Kengeri",
  "diagnostic lab Yelahanka",
  "full body checkup Bangalore",
  "thyroid test Bangalore",
  "cancer markers Bangalore",
  "health packages Bengaluru",
  "AI-powered diagnostics Bengaluru",
  "precision diagnostics Bengaluru",
  "expert-reviewed lab reports",
  "molecular diagnostics Bengaluru",
  "histopathology Bengaluru",
  "home sample collection Bengaluru",
  "advanced cardiac risk testing Bangalore",
  "AMH test Bengaluru",
  "PCOS testing Bengaluru",
  "allergy testing Bengaluru",
  "autoimmune testing Bengaluru",
  "infectious disease lab Bengaluru",
  "FilmArray PCR Bengaluru",
  "NABL accredited lab Mysore Road",
  "ISO 15189 lab Bengaluru",
  "best diagnostic lab Bangalore",
  "same day blood test report Bangalore",
  "CBC test home collection Bengaluru",
  "HbA1c test Bangalore",
  "lipid profile test Bengaluru",
  "vitamin D test Bangalore",
  "hormone test lab Bengaluru",
  "pathology lab near me Bengaluru",
  "NABL lab near Kengeri",
  "diagnostic centre Yelahanka",
  "health checkup package Bangalore price",
];

export const PRIMARY_SERVICES = [
  {
    name: "Home Sample Collection",
    description:
      "Free certified phlebotomist home blood sample collection across Bengaluru with cold-chain transport to QXL’s NABL lab.",
    url: `${SITE_URL}/home-collection`,
  },
  {
    name: "Full Body Health Checkup Packages",
    description:
      "Doctor-curated preventive health packages including diabetes, cardiac, oncology screening, and executive checkups with same-day digital reports.",
    url: `${SITE_URL}/packages`,
  },
  {
    name: "Super Speciality Lab Tests",
    description:
      "Advanced panels across neurology, hematology, cardiology, endocrinology, oncology, infectious diseases, women’s health, gastroenterology, and bone disorders.",
    url: `${SITE_URL}/specialities`,
  },
  {
    name: "Molecular & Infectious Disease Diagnostics",
    description:
      "PCR and infectious disease testing including rapid molecular panels for accurate pathogen detection.",
    url: `${SITE_URL}/specialities/infectious-diseases`,
  },
  {
    name: "Pathology & Histopathology",
    description:
      "Expert-reviewed histopathology, cytopathology, and hematology reporting by senior consultants.",
    url: `${SITE_URL}/doctors`,
  },
  {
    name: "Corporate & Hospital Lab Partnerships",
    description:
      "B2B diagnostic support for clinics, hospitals, and corporate wellness programs across Karnataka.",
    url: `${SITE_URL}/franchise`,
  },
];

/** Expanded AEO FAQ set — answers phrased as direct, citable sentences. */
export const SEO_FAQS = [
  {
    q: "Which is a good NABL certified diagnostic lab in Bengaluru for home blood collection?",
    a: `QXL Diagnostics (${BUSINESS_LEGAL_NAME}) is a NABL-accredited (${NABL_CERTIFICATE}) and ${ISO_STANDARD} medical laboratory in Bengaluru offering free home sample collection, 300+ tests, and same-day digital reports. Call or WhatsApp ${PHONE_DISPLAY}.`,
  },
  {
    q: "Does QXL Diagnostics provide home sample collection in Bengaluru?",
    a: `Yes. QXL Diagnostics provides free home sample collection across Bengaluru with certified phlebotomists and temperature-controlled transport. Book online, via WhatsApp, or call ${PHONE_DISPLAY}.`,
  },
  {
    q: "Is QXL Diagnostics NABL certified?",
    a: `Yes. QXL Diagnostics is NABL accredited under certificate ${NABL_CERTIFICATE} and follows ${ISO_STANDARD} medical laboratory quality standards for accurate, reliable results.`,
  },
  {
    q: "How quickly does QXL Diagnostics provide lab reports?",
    a: "QXL Diagnostics provides same-day digital reports for most routine tests such as CBC, thyroid, and blood sugar. Reports are shared by email and WhatsApp and can be downloaded from the patient portal.",
  },
  {
    q: "Where is QXL Diagnostics located in Bengaluru?",
    a: "QXL Diagnostics Main Lab is at 3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru 560060. The North Hub is at L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru 560064.",
  },
  {
    q: "What tests does QXL Diagnostics offer?",
    a: "QXL Diagnostics offers 300+ tests and packages spanning CBC, thyroid, diabetes (HbA1c), lipid profile, vitamin panels, hormone assays, cancer markers, molecular PCR, histopathology, and specialty panels for neurology, cardiology, oncology, and women’s health.",
  },
  {
    q: "How do I book a blood test with QXL Diagnostics?",
    a: `Book at ${SITE_URL}/book, upload a prescription at ${SITE_URL}/upload-prescription, or WhatsApp ${PHONE_DISPLAY}. Choose home collection or visit the Kengeri or Yelahanka centre.`,
  },
  {
    q: "Is QXL Diagnostics good for advanced or molecular testing in Bangalore?",
    a: "Yes. QXL is a doctor-driven super speciality lab with AI-assisted workflows, molecular/infectious disease capabilities, and senior pathologist review—positioned for advanced diagnostics beyond routine pathology.",
  },
  {
    q: "What are QXL Diagnostics lab hours?",
    a: "Centre hours are typically Monday–Saturday 7:00 AM–9:00 PM and Sunday 7:00 AM–2:00 PM. Home collection is generally available daily from early morning through evening across Bengaluru; confirm slots while booking.",
  },
  {
    q: "Who founded QXL Diagnostics?",
    a: "QXL Diagnostics was founded by Dr. Shantakumar Muruda, MD (Biochemistry), a Clinical Biochemist, Laboratory Director, and NABL Lead Assessor with extensive assessment experience across Indian laboratories.",
  },
];

function postalAddress(loc: (typeof LOCATIONS)[number]) {
  return {
    "@type": "PostalAddress",
    streetAddress: loc.streetAddress,
    addressLocality: loc.addressLocality,
    addressRegion: loc.addressRegion,
    postalCode: loc.postalCode,
    addressCountry: loc.addressCountry,
  };
}

/** Root JSON-LD @graph for Organization + MedicalBusiness + LocalBusiness + Services + FAQ + People. */
export function buildRootSchemaGraph() {
  const kengeri = LOCATIONS[0];
  const yelahanka = LOCATIONS[1];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: BUSINESS_NAME,
        legalName: BUSINESS_LEGAL_NAME,
        parentOrganization: { "@type": "Organization", name: BUSINESS_PARENT_COMPANY },
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto,w_512/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png",
        },
        image:
          "https://res.cloudinary.com/btjglif5/image/upload/c_fill,w_1200,h_630,f_auto,q_auto/v1784150719/Assets-QXL/legacy-assets/images/banners/qxl_hero_1_1781507207090.jpg",
        sameAs: Object.values(SOCIAL_LINKS),
        email: EMAIL,
        telephone: PHONE_DISPLAY,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: PHONE_DISPLAY,
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: ["en", "hi", "kn"],
          },
          {
            "@type": "ContactPoint",
            telephone: PHONE_DISPLAY,
            contactType: "reservations",
            areaServed: "Bengaluru",
            availableLanguage: ["en", "hi", "kn"],
          },
        ],
        foundingLocation: {
          "@type": "Place",
          name: "Bengaluru, Karnataka, India",
        },
        knowsAbout: [
          "Clinical pathology",
          "NABL ISO 15189 laboratory medicine",
          "Home phlebotomy",
          "Molecular diagnostics",
          "Preventive health screening",
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: BUSINESS_NAME,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/tests?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": ["MedicalBusiness", "MedicalClinic", "DiagnosticLab", "LocalBusiness"],
        "@id": MAIN_LAB_ID,
        name: BUSINESS_LEGAL_NAME,
        alternateName: BUSINESS_NAME,
        description:
          "NABL certified super speciality diagnostic laboratory in Bengaluru offering 300+ tests, free home sample collection, AI-assisted workflows, and same-day digital reports.",
        url: SITE_URL,
        telephone: PHONE_DISPLAY,
        email: EMAIL,
        image:
          "https://res.cloudinary.com/btjglif5/image/upload/c_fill,w_1200,h_630,f_auto,q_auto/v1784150719/Assets-QXL/legacy-assets/images/banners/qxl_hero_1_1781507207090.jpg",
        logo: "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto,w_512/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png",
        parentOrganization: { "@id": ORG_ID },
        medicalSpecialty: [
          "Pathology",
          "LaboratoryMedicine",
          "Hematology",
          "Cardiology",
          "Endocrinology",
          "Oncology",
          "InfectiousDisease",
          "Neurology",
          "Urology",
          "Gastroenterology",
        ],
        address: postalAddress(kengeri),
        geo: {
          "@type": "GeoCoordinates",
          latitude: kengeri.lat,
          longitude: kengeri.lng,
        },
        hasMap: kengeri.googleMapsUrl,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "07:00",
            closes: "21:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Sunday",
            opens: "07:00",
            closes: "14:00",
          },
        ],
        priceRange: "₹₹",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, UPI, Credit Card, Debit Card, Razorpay",
        areaServed: [
          { "@type": "City", name: "Bengaluru" },
          { "@type": "AdministrativeArea", name: "Karnataka" },
        ],
        availableService: PRIMARY_SERVICES.map((s) => ({
          "@type": "MedicalTest" as const,
          name: s.name,
          url: s.url,
        })),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          bestRating: "5",
          worstRating: "1",
          reviewCount: "500",
          ratingCount: "500",
        },
        review: [
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Priya S." },
            datePublished: "2026-03-12",
            reviewBody:
              "Home collection was on time and reports came the same day. Clear communication on WhatsApp.",
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          },
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Ramesh K." },
            datePublished: "2026-01-28",
            reviewBody:
              "NABL lab with careful sample handling. Doctor-reviewed reports gave our family confidence.",
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          },
        ],
        identifier: [
          { "@type": "PropertyValue", name: "NABL Certificate", value: NABL_CERTIFICATE },
          { "@type": "PropertyValue", name: "Quality Standard", value: ISO_STANDARD },
        ],
      },
      {
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": `${SITE_URL}/#yelahanka-hub`,
        name: yelahanka.name,
        url: `${SITE_URL}/centers/yelahanka-north-hub`,
        telephone: PHONE_DISPLAY,
        parentOrganization: { "@id": ORG_ID },
        address: postalAddress(yelahanka),
        geo: {
          "@type": "GeoCoordinates",
          latitude: yelahanka.lat,
          longitude: yelahanka.lng,
        },
        hasMap: yelahanka.googleMapsUrl,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "07:00",
            closes: "21:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Sunday",
            opens: "07:00",
            closes: "14:00",
          },
        ],
      },
      ...PRIMARY_SERVICES.map((s, i) => ({
        "@type": "Service",
        "@id": `${SITE_URL}/#service-${i + 1}`,
        name: s.name,
        description: s.description,
        url: s.url,
        provider: { "@id": MAIN_LAB_ID },
        areaServed: { "@type": "City", name: "Bengaluru" },
        serviceType: "MedicalDiagnosticService",
      })),
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: SEO_FAQS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#founder`,
        name: "Dr. Shantakumar Muruda",
        jobTitle: "Founder & CEO, Clinical Biochemist",
        url: `${SITE_URL}/founder`,
        worksFor: { "@id": ORG_ID },
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Rajiv Gandhi University of Health Sciences",
        },
        description:
          "Dr. Shantakumar Muruda, MD, is Founder & CEO of QXL Diagnostics. Clinical Biochemist, Laboratory Director, and NABL Lead Assessor with extensive laboratory assessment experience.",
        knowsAbout: ["Clinical biochemistry", "NABL accreditation", "Laboratory quality systems"],
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#dr-ajitha`,
        name: "Dr. Ajitha Pillai",
        jobTitle: "Senior Consultant Clinical Microbiologist",
        worksFor: { "@id": ORG_ID },
        description:
          "Senior Consultant Clinical Microbiologist with expertise in microbiology, molecular biology, infection serology, autoimmune serology, and infection control.",
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#dr-pritilata`,
        name: "Dr. Pritilata Rout",
        jobTitle: "Senior Consultant Histopathologist",
        worksFor: { "@id": ORG_ID },
        description:
          "Senior Consultant Histopathologist with expertise in neuropathology, cytopathology, endocrine pathology, and onco-pathology.",
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#dr-naveen`,
        name: "Dr. Naveen Kumar N",
        jobTitle: "Consultant Pathologist",
        worksFor: { "@id": ORG_ID },
        description:
          "Consultant Pathologist and hematology specialist with multi-year diagnostic experience.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Book a Test", item: `${SITE_URL}/book` },
          { "@type": "ListItem", position: 3, name: "Packages", item: `${SITE_URL}/packages` },
          { "@type": "ListItem", position: 4, name: "Centers", item: `${SITE_URL}/centers` },
        ],
      },
    ],
  };
}

export function buildLocationPageSchema(slug: string) {
  const loc = LOCATIONS.find((l) => l.slug === slug) || LOCATIONS[0];
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness", "DiagnosticLab"],
    "@id": `${SITE_URL}/locations/${loc.slug}#place`,
    name: loc.name,
    description: `NABL-aligned QXL Diagnostics collection centre / lab serving ${loc.shortName}, Bengaluru. Home collection available nearby.`,
    url: `${SITE_URL}/locations/${loc.slug}`,
    telephone: loc.phone,
    address: postalAddress(loc),
    geo: { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lng },
    hasMap: loc.googleMapsUrl,
    parentOrganization: { "@id": ORG_ID },
    openingHours: loc.hours,
    priceRange: "₹₹",
    areaServed: { "@type": "City", name: "Bengaluru" },
  };
}

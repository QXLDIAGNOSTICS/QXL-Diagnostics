import type { Metadata } from "next";
import RakshaBandhanClientPage from "./RakshaBandhanClientPage";

export const metadata: Metadata = {
  title: "Full Body Health Checkup (80 Params - ₹800) in Bengaluru | QXL Diagnostics",
  description: "Comprehensive 80-parameter full body health checkup package from QXL Diagnostics (₹800). Includes free doorstep home sample collection across Bengaluru.",
  keywords: [
    "full body checkup Bangalore",
    "full body health checkup 80 parameters",
    "health checkup offer Bengaluru",
    "QXL Diagnostics health check",
    "NABL lab home sample collection Bengaluru",
    "preventive health checkup package",
  ],
  alternates: {
    canonical: "https://qxldiagnostics.com/raksha-bandhan-health-checkup-bangalore",
  },
  openGraph: {
    title: "Full Body Health Checkup (80 Params - ₹800) in Bengaluru | QXL Diagnostics",
    description: "Special ₹800 preventive full body health checkup (80 Health Parameters · 8 Major Health Areas) from QXL Diagnostics. Free home sample collection across Bengaluru.",
    url: "https://qxldiagnostics.com/raksha-bandhan-health-checkup-bangalore",
    siteName: "QXL Diagnostics",
    images: [
      {
        url: "https://qxldiagnostics.com/images/posters/165a1294-8527-4943-ba13-ac45a6139251.jpeg",
        width: 1200,
        height: 630,
        alt: "Full Body Health Checkup Offer - QXL Diagnostics",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Body Health Checkup (80 Params - ₹800) in Bengaluru | QXL Diagnostics",
    description: "An 80-parameter preventive full body health checkup for ₹800 from QXL Diagnostics with free home collection.",
    images: ["https://qxldiagnostics.com/images/posters/165a1294-8527-4943-ba13-ac45a6139251.jpeg"],
  },
};

export default function Page() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "QXL Diagnostics",
    "alternateName": "QXL Diagnostics Super Speciality Lab",
    "url": "https://qxldiagnostics.com",
    "logo": "https://qxldiagnostics.com/icon.png",
    "image": "https://qxldiagnostics.com/images/raksha_bandhan_hero.png",
    "telephone": "+91 9964 639 639",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3rd Floor, SLN Complex, Mysore Road, Kengeri",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560060",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9113827,
      "longitude": 77.4850301,
    },
    "medicalSpecialty": ["Pathology", "LaboratoryMedicine", "DiagnosticLab"],
    "accreditation": "NABL Accredited Laboratory (MC-10025)",
    "areaServed": "Bengaluru",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://qxldiagnostics.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Raksha Bandhan Health Offer",
        "item": "https://qxldiagnostics.com/raksha-bandhan-health-checkup-bangalore",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RakshaBandhanClientPage />
    </>
  );
}

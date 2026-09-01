import { NextResponse } from 'next/server';
import { SITE_URL, BUSINESS_NAME, NABL_CERTIFICATE, ISO_STANDARD, EMAIL } from '@/lib/businessInfo';
import { MASTER_CATALOGUE } from '@/lib/masterCatalogue';

/**
 * GET /api/tests-catalogue
 *
 * Machine-readable JSON catalogue of QXL Diagnostics test offerings.
 * Generated dynamically from single source of truth MASTER_CATALOGUE.
 */

export async function GET() {
  const catalogue = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${BUSINESS_NAME} — Complete Diagnostic Test Catalogue`,
    "description": `Full list of laboratory tests offered by ${BUSINESS_NAME}, a NABL Accredited (${NABL_CERTIFICATE}, ${ISO_STANDARD}) super-speciality diagnostic laboratory in Bengaluru, Karnataka, India.`,
    "url": `${SITE_URL}/api/tests-catalogue`,
    "numberOfItems": MASTER_CATALOGUE.length,
    "provider": {
      "@type": "DiagnosticLab",
      "name": BUSINESS_NAME,
      "alternateName": "QXL Diagnostics Super Speciality Lab",
      "legalName": "Qualitify Healthtech Pvt Ltd",
      "url": SITE_URL,
      "telephone": "+919964639639",
      "email": EMAIL,
      "hasCredential": `NABL ${NABL_CERTIFICATE}`,
      "iso": ISO_STANDARD,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3rd Floor, SLN Complex, Mysore Road, Kengeri",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560060",
        "addressCountry": "IN"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 12.9113827, "longitude": 77.4850301 },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "07:00",
        "closes": "21:00"
      }
    },
    "itemListElement": MASTER_CATALOGUE.map((test, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "MedicalTest",
        "name": test.name,
        "url": `${SITE_URL}${test.slug}`,
        "description": `${test.name} at QXL Diagnostics Bangalore. Price: ₹${test.price}. Category: ${test.category}. Sample: ${test.sampleType}. Reports in ${test.tat}. ${test.homeCollectionAvailable ? 'Free home collection available across Bengaluru.' : ''}`,
        "offers": {
          "@type": "Offer",
          "price": test.price,
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2027-12-31",
          "seller": { "@type": "Organization", "name": BUSINESS_NAME }
        },
        "preparation": test.fastingInstruction,
        "relevantSpecialty": { "@type": "MedicalSpecialty", "name": test.category },
        "howPerformed": `Blood sample collected at your home across Bengaluru or at QXL lab, processed at NABL Accredited laboratory (${NABL_CERTIFICATE}). Accreditation applies to tests included within our current accredited scope.`,
        "normalRange": "Refer to test page for reference ranges",
        "usesDevice": { "@type": "MedicalDevice", "name": "Automated Clinical Chemistry / Immunoassay Analyser" }
      }
    })),
    "meta": {
      "generated": new Date().toISOString(),
      "version": "2.0",
      "totalTestsOffered": "300+",
      "note": "Official pricing from QXL Diagnostics master catalogue."
    }
  };

  return NextResponse.json(catalogue, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'X-Robots-Tag': 'index, follow',
    }
  });
}


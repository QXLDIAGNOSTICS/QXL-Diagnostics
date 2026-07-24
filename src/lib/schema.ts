/**
 * Centralized JSON-LD Schema Builder for QXL Diagnostics
 * Used across all pages for consistent structured data.
 */

const BASE_URL = 'https://qxldiagnostics.com';
const ORG_LOGO = 'https://res.cloudinary.com/btjglif5/image/upload/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png';

/** Root organization identity */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': `${BASE_URL}/#organization`,
    name: 'QXL Diagnostics',
    alternateName: 'QXL Diagnostics Super Speciality Lab',
    url: BASE_URL,
    logo: ORG_LOGO,
    telephone: '+91-99646-39639',
    email: 'qxldiagnostics@gmail.com',
    foundingDate: '2019',
    description:
      'NABL certified super speciality diagnostic lab in Bengaluru offering 300+ tests, home sample collection, and same-day digital reports.',
    medicalSpecialty: [
      'Neurology', 'Hematology', 'Cardiology', 'Urology', 'Endocrinology',
      'Oncology', 'Infectious Disease', "Women's Health", 'Gastroenterology', 'Bone Disorders',
    ],
    sameAs: [
      'https://www.facebook.com/qxldiagnostics',
      'https://www.linkedin.com/company/qxl-diagnostics',
      'https://www.instagram.com/qxldiagnostics',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-99646-39639',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi', 'kn'],
        contactOption: 'TollFree',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-99646-39639',
        contactType: 'sales',
        areaServed: 'IN',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3rd Floor, SLN Complex, Mysore Road, Kengeri',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560060',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9113827,
      longitude: 77.4850301,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Diagnostic Tests and Health Packages',
      url: `${BASE_URL}/packages`,
    },
  };
}

/** Local Business / MedicalClinic for a specific center */
export function buildLocalBusinessSchema(opts?: {
  name?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  lat?: number;
  lng?: number;
  phone?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'LocalBusiness'],
    name: opts?.name ?? 'QXL Diagnostics Super Speciality Lab',
    url: BASE_URL,
    telephone: opts?.phone ?? '+91-99646-39639',
    logo: ORG_LOGO,
    image: 'https://res.cloudinary.com/btjglif5/image/upload/c_fill,w_1200,h_630,f_auto,q_auto/v1784150719/Assets-QXL/legacy-assets/images/banners/qxl_hero_1_1781507207090.jpg',
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '07:00',
        closes: '14:00',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: opts?.address ?? '3rd Floor, SLN Complex, Mysore Road, Kengeri',
      addressLocality: opts?.city ?? 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: opts?.postalCode ?? '560060',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: opts?.lat ?? 12.9113827,
      longitude: opts?.lng ?? 77.4850301,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
    hasMap: `https://maps.google.com/?q=${opts?.lat ?? 12.9113827},${opts?.lng ?? 77.4850301}`,
  };
}

/** FAQPage schema from an array of Q&A pairs */
export function buildFAQSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

/** BreadcrumbList schema from an array of {name, url} items */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** MedicalTest schema for individual test pages */
export function buildMedicalTestSchema(opts: {
  name: string;
  url: string;
  description: string;
  preparation?: string;
  bodyLocation?: string;
  relevantSpecialty?: string;
  price?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalTest',
    name: opts.name,
    url: opts.url,
    description: opts.description,
    ...(opts.preparation && { preparation: opts.preparation }),
    ...(opts.bodyLocation && { bodyLocation: opts.bodyLocation }),
    ...(opts.relevantSpecialty && { relevantSpecialty: opts.relevantSpecialty }),
    usedToDiagnose: {
      '@type': 'MedicalCondition',
      name: 'Various conditions',
    },
    ...(opts.price && {
      offers: {
        '@type': 'Offer',
        price: opts.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/book`,
        seller: {
          '@type': 'MedicalOrganization',
          name: 'QXL Diagnostics',
        },
      },
    }),
    recognizingAuthority: {
      '@type': 'Organization',
      name: 'NABL — National Accreditation Board for Testing and Calibration Laboratories',
    },
    legalStatus: 'NABL Accredited',
  };
}

/** MedicalCondition schema for disease pages */
export function buildMedicalConditionSchema(opts: {
  name: string;
  url: string;
  description: string;
  code?: string;
  symptom?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name: opts.name,
    url: opts.url,
    description: opts.description,
    ...(opts.code && {
      code: {
        '@type': 'MedicalCode',
        codeValue: opts.code,
        codingSystem: 'ICD-10',
      },
    }),
    ...(opts.symptom && {
      signOrSymptom: opts.symptom.map((s) => ({
        '@type': 'MedicalSymptom',
        name: s,
      })),
    }),
    recognizingAuthority: {
      '@type': 'Organization',
      name: 'World Health Organization',
    },
  };
}

/** Health package as a Product + Offer schema */
export function buildPackageProductSchema(opts: {
  name: string;
  url: string;
  description: string;
  price: number;
  originalPrice?: number;
  parameters?: string;
  tag?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    brand: {
      '@type': 'Brand',
      name: 'QXL Diagnostics',
    },
    category: 'Diagnostic Health Package',
    ...(opts.tag && { additionalType: opts.tag }),
    offers: {
      '@type': 'Offer',
      price: opts.price,
      priceCurrency: 'INR',
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/book`,
      seller: {
        '@type': 'Organization',
        name: 'QXL Diagnostics',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '120',
      bestRating: '5',
    },
  };
}

/** WebSite with SearchAction (enables Google Sitelinks Searchbox) */
export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'QXL Diagnostics',
    description: 'NABL certified super speciality diagnostic lab in Bengaluru',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/packages?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Physician / Doctor schema */
export function buildPhysicianSchema(opts: {
  id: string;
  name: string;
  jobTitle: string;
  description: string;
  imageUrl?: string;
  education?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${BASE_URL}/#${opts.id}`,
    name: opts.name,
    jobTitle: opts.jobTitle,
    description: opts.description,
    ...(opts.imageUrl && { image: opts.imageUrl }),
    ...(opts.education && {
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: opts.education,
      },
    }),
    worksFor: {
      '@type': 'MedicalOrganization',
      name: 'QXL Diagnostics',
      url: BASE_URL,
    },
    memberOf: {
      '@type': 'MedicalOrganization',
      name: 'QXL Diagnostics Medical Review Board',
    },
  };
}

/** Article / Blog Post schema */
export function buildArticleSchema(opts: {
  title: string;
  url: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: opts.title,
    url: opts.url,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      '@type': 'Person',
      name: opts.author,
    },
    reviewedBy: {
      '@type': 'Person',
      name: 'Dr. Shantakumar Muruda',
      jobTitle: 'MD, Clinical Biochemist, NABL Lead Assessor',
    },
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    ...(opts.imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: opts.imageUrl,
        width: 1200,
        height: 630,
      },
    }),
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patient',
    },
  };
}

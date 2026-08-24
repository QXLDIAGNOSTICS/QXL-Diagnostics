import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import InitializeApp from "@/components/InitializeApp";
import AiChat from "@/components/AiChat";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = { variable: "font-sans" };
const geistMono = { variable: "font-mono" };


export const viewport = {
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://qxldiagnostics.com"),
  title: {
    default: "QXL Diagnostics | NABL Accredited Lab Bengaluru",
    template: "%s | QXL Diagnostics Bengaluru",
  },
  alternates: {
    canonical: "https://qxldiagnostics.com",
  },
  description:
    "QXL Diagnostics — NABL-accredited super speciality diagnostic lab in Bengaluru (MC-6849). 300+ tests, home collection, same-day reports. Book now.",
  manifest: "/manifest.json",
  authors: [{ name: "QXL Diagnostics" }],
  creator: "QXL Diagnostics",
  publisher: "Qualitify Healthtech Pvt Ltd",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://qxldiagnostics.com",
    siteName: "QXL Diagnostics",
    title: "QXL Diagnostics | NABL Accredited Diagnostic Lab Bengaluru",
    description:
      "Advanced diagnostic testing in Bengaluru. NABL accredited (MC-6849), home collection, 300+ tests, same-day digital reports. Book now at +91 9964 639 639.",
    images: [
      {
        url: "https://res.cloudinary.com/btjglif5/image/upload/c_fill,w_1200,h_630,f_auto,q_auto/v1784150719/Assets-QXL/legacy-assets/images/banners/qxl_hero_1_1781507207090.jpg",
        width: 1200,
        height: 630,
        alt: "QXL Diagnostics Lab Bengaluru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QXL Diagnostics | NABL Accredited Lab Bengaluru",
    description:
      "NABL accredited diagnostic lab in Bengaluru. Home collection, 300+ tests, same-day reports.",
    images: [
      "https://res.cloudinary.com/btjglif5/image/upload/c_fill,w_1200,h_630,f_auto,q_auto/v1784150719/Assets-QXL/legacy-assets/images/banners/qxl_hero_1_1781507207090.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

// JSON-LD Structured Data
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "QXL Diagnostics Super Speciality Lab",
  alternateName: "QXL Diagnostics",
  description:
    "NABL accredited diagnostic super speciality lab in Bengaluru offering 300+ tests, home sample collection, and same-day digital reports.",
  url: "https://qxldiagnostics.com",
  telephone: "+91-9964-639639",
  email: "care@qxldiagnostics.com",
  logo: "https://res.cloudinary.com/btjglif5/image/upload/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png",
  medicalSpecialty: [
    "Neurology", "Hematology", "Cardiology", "Urology", "Endocrinology",
    "Oncology", "Infectious Disease", "Women's Health", "Gastroenterology", "Bone Disorders"
  ],
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
  address: {
    "@type": "PostalAddress",
    streetAddress: "3rd Floor, SLN Complex, Mysore Road, Kengeri",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560060",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.9113827,
    longitude: 77.4850301,
  },
  priceRange: "₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "500",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does QXL Diagnostics provide home sample collection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, QXL Diagnostics provides free home sample collection across Bengaluru. Our trained phlebotomists will visit at your preferred time. Book via WhatsApp or call +91 9964 639 639.",
      },
    },
    {
      "@type": "Question",
      name: "Is QXL Diagnostics NABL accredited?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, QXL Diagnostics is NABL accredited and follows ISO 15189 standards for medical laboratory testing, ensuring the highest quality and accuracy of results.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly does QXL Diagnostics provide reports?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QXL Diagnostics provides same-day digital reports for most routine tests. Reports are delivered via email and WhatsApp, and can also be downloaded from the patient portal.",
      },
    },
    {
      "@type": "Question",
      name: "Where is QXL Diagnostics located in Bengaluru?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QXL Diagnostics has two centers: Main Lab at 3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru 560060, and North Hub at L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru 560064.",
      },
    },
    {
      "@type": "Question",
      name: "Which is the best diagnostic lab in Bangalore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QXL Diagnostics is considered one of the best diagnostic labs in Bangalore, offering NABL accredited, doctor-led super speciality testing.",
      },
    },
    {
      "@type": "Question",
      name: "Which diagnostic labs in Bangalore are NABL accredited?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QXL Diagnostics is fully NABL accredited, ensuring all pathology and diagnostic tests meet strict national and international quality standards.",
      },
    },
    {
      "@type": "Question",
      name: "Which lab provides home blood collection in Bangalore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QXL Diagnostics provides free and fast home blood collection across Bangalore. Our trained phlebotomists collect samples from the comfort of your home.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I get a blood test at home in Bangalore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book a blood test at home anywhere in Bangalore with QXL Diagnostics by calling +91 9964 639 639 or booking online.",
      },
    },
    {
      "@type": "Question",
      name: "Which is a doctor-led diagnostic laboratory in Bangalore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QXL Diagnostics is a doctor-led diagnostic laboratory, with all critical reports reviewed by our expert team of consultant pathologists and microbiologists.",
      },
    },
    {
      "@type": "Question",
      name: "Which lab does speciality tests in Bangalore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QXL Diagnostics offers over 300 speciality tests including autoimmune panels, molecular diagnostics, allergy testing, and oncology markers.",
      },
    },
    {
      "@type": "Question",
      name: "Which is the best reference laboratory in Bangalore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QXL Diagnostics serves as a trusted reference laboratory in Bangalore for many clinics and hospitals, thanks to our advanced molecular and histopathology capabilities.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I get autoimmune tests in Bangalore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QXL Diagnostics performs comprehensive autoimmune testing in Bangalore, including ANA profile, ANA IFA, ANCA, and ENA profile tests.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I get an ANA IFA test in Bangalore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can get an accurate ANA IFA test done at QXL Diagnostics, which uses advanced immunofluorescence techniques for autoimmune disease detection.",
      },
    },
    {
      "@type": "Question",
      name: "Which lab does allergy testing in Bangalore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QXL Diagnostics offers extensive allergy testing in Bangalore, including IgE panels, food allergy, and food intolerance testing.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I get histopathology and biopsy testing in Bangalore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QXL Diagnostics has a dedicated histopathology department led by Senior Consultant Histopathologist Dr. Pritilata Rout for highly accurate biopsy reporting.",
      },
    },
    {
      "@type": "Question",
      name: "Which lab performs advanced oncology testing in Bangalore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QXL Diagnostics provides advanced oncology testing, including tumor markers like CEA, CA 125, CA 19-9, and PSA tests in Bangalore.",
      },
    },
    {
      "@type": "Question",
      name: "Which lab provides molecular diagnostic testing in Bangalore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QXL Diagnostics is equipped with state-of-the-art molecular diagnostic testing, including PCR testing for rapid detection of infectious diseases.",
      },
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://qxldiagnostics.com/#organization",
  "name": "QXL Diagnostics",
  "url": "https://qxldiagnostics.com",
  "logo": "https://res.cloudinary.com/btjglif5/image/upload/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png",
  "sameAs": [
    "https://www.facebook.com/qxldiagnostics",
    "https://www.linkedin.com/company/qxl-diagnostics",
    "https://twitter.com/qxldiagnostics",
    "https://www.instagram.com/qxldiagnostics"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9964-639639",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["en", "hi", "kn"]
  }
};

const doctorsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://qxldiagnostics.com/#founder",
      "name": "Dr. Shantakumar Muruda",
      "jobTitle": "Founder & CEO, Clinical Biochemist",
      "worksFor": {
        "@type": "MedicalOrganization",
        "name": "QXL Diagnostics",
        "url": "https://qxldiagnostics.com"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Rajiv Gandhi University of Health Sciences"
      },
      "description": "Dr. Shantakumar Muruda, MD, is the Founder & CEO of QXL Diagnostics. He has over two decades of experience as a Clinical Biochemist, Laboratory Director, and NABL Lead Assessor, having completed over 150 NABL assessments."
    },
    {
      "@type": "Person",
      "@id": "https://qxldiagnostics.com/#dr-ajitha",
      "name": "Dr. Ajitha Pillai",
      "jobTitle": "Senior Consultant Clinical Microbiologist",
      "worksFor": {
        "@type": "MedicalOrganization",
        "name": "QXL Diagnostics",
        "url": "https://qxldiagnostics.com"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Medical College Trivandrum, University of Kerala"
      },
      "description": "Dr. Ajitha Pillai is an experienced Clinical Microbiologist with extensive expertise in Microbiology, Molecular Biology, Infection Serology, Autoimmune Serology, and Infection Control."
    },
    {
      "@type": "Person",
      "@id": "https://qxldiagnostics.com/#dr-pritilata",
      "name": "Dr. Pritilata Rout",
      "jobTitle": "Senior Consultant Histopathologist",
      "worksFor": {
        "@type": "MedicalOrganization",
        "name": "QXL Diagnostics",
        "url": "https://qxldiagnostics.com"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "National Institute of Mental Health and Neurosciences (NIMHANS)"
      },
      "description": "Dr. Pritilata Rout is a Senior Consultant Histopathologist with advanced expertise in Neuropathology, Cytopathology, Endocrine Pathology, and Onco-Pathology."
    },
    {
      "@type": "Person",
      "@id": "https://qxldiagnostics.com/#dr-naveen",
      "name": "Dr. Naveen Kumar N",
      "jobTitle": "Consultant Pathologist",
      "worksFor": {
        "@type": "MedicalOrganization",
        "name": "QXL Diagnostics",
        "url": "https://qxldiagnostics.com"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "M.S. Ramaiah Medical College, Bangalore"
      },
      "description": "Dr. Naveen Kumar N is a Consultant Pathologist and hematology specialist with 8 years of diagnostic experience."
    }
  ]
};

const rakshaOfferSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Raksha Bandhan Special Full Body Health Checkup",
  "image": "https://qxldiagnostics.com/images/posters/165a1294-8527-4943-ba13-ac45a6139251.jpeg",
  "description": "Comprehensive 80 Health Parameters full body preventive checkup in Bengaluru including CBC (26), HbA1c & Fasting Glucose (3), Heart & Lipid Profile (8), Liver Function (11), Kidney Function (8), Thyroid Profile (3), Bone & Urinary Markers (21). Free home sample collection across Bengaluru.",
  "brand": {
    "@type": "Brand",
    "name": "QXL Diagnostics"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://qxldiagnostics.com/raksha-bandhan-health-checkup-bangalore",
    "priceCurrency": "INR",
    "price": "800",
    "priceValidUntil": "2026-08-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "QXL Diagnostics Super Speciality Lab"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "620"
  }
};

import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script id="pwa-init">
          {`
            window.deferredPWAInstallPrompt = null;
            window.addEventListener('beforeinstallprompt', (e) => {
              e.preventDefault();
              window.deferredPWAInstallPrompt = e;
            });
          `}
        </Script>
        {/* ── Google Translate: define init callback BEFORE the script loads ── */}
        <Script id="google-translate-init">
          {`
            window.googleTranslateElementInit = function() {
              try {
                new window.google.translate.TranslateElement(
                  {
                    pageLanguage: 'en',
                    includedLanguages: 'en,hi,kn,ta,te,ml',
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false,
                    multilanguagePage: false,
                  },
                  'google_translate_element'
                );
                // Apply the stored language preference
                var saved = '';
                try { saved = localStorage.getItem('qxl_language') || 'en'; } catch(e){}
                if (saved && saved !== 'en') {
                  var apply = function(retries) {
                    var sel = document.querySelector('.goog-te-combo');
                    if (sel) {
                      sel.value = saved;
                      sel.dispatchEvent(new Event('change'));
                    } else if (retries > 0) {
                      setTimeout(function(){ apply(retries - 1); }, 250);
                    }
                  };
                  setTimeout(function(){ apply(12); }, 400);
                }
              } catch(e) { console.warn('Google Translate init failed', e); }
            };
          `}
        </Script>
        {/* ── Load Google Translate widget ── */}
        <Script
          id="google-translate-script"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Noto+Sans:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans+Kannada:wght@400;600;700&family=Noto+Sans+Tamil:wght@400;600;700&family=Noto+Sans+Telugu:wght@400;600;700&family=Noto+Sans+Malayalam:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorsSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rakshaOfferSchema) }}
        />
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `}
          </Script>
        )}
        {/* Google Tag Manager (GTM-NFP66HTL) */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NFP66HTL');`}
        </Script>
        {/* Google Tag (gtag.js) G-S8YBD78451 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S8YBD78451"
          strategy="afterInteractive"
        />
        <Script id="google-gtag-g-s8ybd78451" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-S8YBD78451');
          `}
        </Script>
        {/* Google Ads Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18394072893"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18394072893');
          `}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "y5shgsd4y7");
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col relative selection:bg-amber-200 selection:text-amber-900">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NFP66HTL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
         {/* Global Tricolour Background */}
         <div className="fixed inset-0 -z-50 pointer-events-none bg-gradient-to-br from-[#f0fdf4] via-white to-[#fff7ed]">
            {/* Soft Green Glow (Top Left - Logo Side) */}
            <div className="absolute top-0 left-0 w-[80vw] h-[50vh] bg-emerald-500/6 blur-[120px] rounded-full -translate-x-1/4 -translate-y-1/4" />
            {/* Soft Saffron Glow (Bottom Right) */}
            <div className="absolute bottom-0 right-0 w-[80vw] h-[50vh] bg-amber-500/6 blur-[120px] rounded-full translate-x-1/4 translate-y-1/4" />
         </div>

        {/* Hidden Google Translate mount point — must be first in body */}
        <div
          id="google_translate_element"
          style={{ position: "absolute", top: "-9999px", left: "-9999px", visibility: "hidden" }}
          aria-hidden="true"
        />
        <InitializeApp />
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        <Script src="/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}


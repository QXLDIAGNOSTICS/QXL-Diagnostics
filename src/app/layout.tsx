import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import InitializeApp from "@/components/InitializeApp";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import { buildRootSchemaGraph, SEO_KEYWORDS } from "@/lib/seo/schema";
import { PHONE_DISPLAY, SITE_URL } from "@/lib/businessInfo";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "QXL Diagnostics | NABL Certified Super Speciality Lab Bengaluru",
    template: "%s | QXL Diagnostics Bengaluru",
  },
  alternates: {
    canonical: SITE_URL,
  },
  description:
    "QXL Diagnostics — NABL accredited (MC-10025) ISO 15189:2022 super speciality diagnostic lab in Bengaluru (Kengeri & Yelahanka). 300+ tests, free home sample collection, same-day digital reports. Book CBC, thyroid, full body checkup & more.",
  keywords: SEO_KEYWORDS,
  authors: [{ name: "QXL Diagnostics", url: SITE_URL }],
  creator: "QXL Diagnostics",
  publisher: "Qualitify Healthtech Pvt Ltd",
  category: "healthcare",
  classification: "Medical Diagnostic Laboratory",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "QXL Diagnostics",
    title: "QXL Diagnostics | NABL Certified Diagnostic Lab Bengaluru",
    description: `Advanced diagnostic testing in Bengaluru. NABL certified, home collection, 300+ tests, same-day digital reports. Book now at ${PHONE_DISPLAY}.`,
    images: [
      {
        url: "https://res.cloudinary.com/btjglif5/image/upload/c_fill,w_1200,h_630,f_auto,q_auto/v1784150719/Assets-QXL/legacy-assets/images/banners/qxl_hero_1_1781507207090.jpg",
        width: 1200,
        height: 630,
        alt: "QXL Diagnostics NABL Lab Bengaluru — home collection and same-day reports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QXL Diagnostics | NABL Certified Lab Bengaluru",
    description:
      "NABL certified diagnostic lab in Bengaluru. Home collection, 300+ tests, same-day reports.",
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
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bengaluru",
    "geo.position": "12.9113827;77.4850301",
    ICBM: "12.9113827, 77.4850301",
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

const rootSchema = buildRootSchemaGraph();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${jakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <InitializeApp />
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        <Script src="/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

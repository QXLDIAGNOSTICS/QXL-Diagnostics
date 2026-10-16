import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinical Diagnostics Blog & Evidence-Based Health Guides | QXL Bengaluru",
  description:
    "Evidence-based laboratory guides, prenatal testing timelines, cardiac markers, liver health, and diagnostic advances reviewed by consultant pathologists at QXL Bengaluru.",
  alternates: {
    canonical: "https://qxldiagnostics.com/blog",
    types: {
      "application/rss+xml": "https://qxldiagnostics.com/blog/feed.xml",
    },
  },
  keywords: [
    "clinical diagnostics blog Bengaluru",
    "pregnancy blood tests Bangalore",
    "ApoB cholesterol test Bangalore",
    "liver function test Bangalore",
    "NABL accredited laboratory Bangalore",
    "home blood collection Bengaluru",
    "QXL Diagnostics health guides",
    "diagnostic tests Bangalore price list",
    "best blood test lab Bangalore",
  ],
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bengaluru",
    "geo.position": "12.9177;77.4835",
    "ICBM": "12.9177, 77.4835",
    "nabl-accreditation": "MC-6849",
    "dc.coverage": "Bengaluru, Karnataka, India",
  },
  openGraph: {
    title: "Clinical Diagnostics Blog & Evidence-Based Health Guides | QXL Bengaluru",
    description:
      "Doctor-reviewed laboratory guides, prenatal screening timelines, cardiac markers, and diagnostic testing in Bengaluru from QXL Diagnostics.",
    url: "https://qxldiagnostics.com/blog",
    siteName: "QXL Diagnostics",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg",
        width: 1200,
        height: 675,
        alt: "QXL Diagnostics Clinical Blog & Evidence-Based Health Guides Bengaluru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinical Diagnostics Blog & Evidence-Based Health Guides | QXL Bengaluru",
    description:
      "Doctor-reviewed laboratory guides, prenatal screening timelines, cardiac markers, and diagnostic testing in Bengaluru from QXL Diagnostics.",
    images: [
      "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg",
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
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health & Wellness Blog",
  description:
    "Read the latest medical insights, wellness tips, and diagnostic health news from QXL Diagnostics' medical review team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Health & Wellness Blog | QXL Diagnostics",
    description: "Medical insights, wellness tips, and diagnostic health news from QXL Diagnostics.",
    url: "https://qxldiagnostics.com/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab Test Directory | Individual Blood & Diagnostic Tests",
  description:
    "Browse QXL Diagnostics' full catalog of individual lab tests with prices, preparation instructions, and turnaround times. NABL certified, home sample collection in Bengaluru.",
  alternates: { canonical: "/tests" },
  openGraph: {
    title: "Lab Test Directory | QXL Diagnostics",
    description: "Browse individual lab tests with prices, preparation instructions, and turnaround times.",
    url: "https://qxldiagnostics.com/tests",
  },
};

export default function TestsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

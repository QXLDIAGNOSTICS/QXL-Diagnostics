import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Nearest Diagnostic Centre in Bengaluru",
  description:
    "Locate the nearest QXL Diagnostics collection centre in Bengaluru. NABL-accredited labs with GPS-based distance sorting to find the closest centre to you.",
  alternates: { canonical: "/centers" },
  openGraph: {
    title: "Find Nearest Diagnostic Centre | QXL Diagnostics",
    description: "Locate the nearest NABL-accredited QXL Diagnostics collection centre in Bengaluru.",
    url: "https://qxldiagnostics.com/centers",
  },
};

export default function CentersLayout({ children }: { children: React.ReactNode }) {
  return children;
}

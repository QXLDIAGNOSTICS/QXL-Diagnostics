import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Diagnostic Reports | QXL Diagnostics",
  description: "Secure authenticated patient report retrieval portal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

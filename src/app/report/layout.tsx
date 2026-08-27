import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Diagnostic Reports | QXL Diagnostics",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}

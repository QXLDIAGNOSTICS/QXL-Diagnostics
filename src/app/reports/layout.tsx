import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Reports Portal | QXL Diagnostics",
  description: "Secure authenticated patient report retrieval portal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

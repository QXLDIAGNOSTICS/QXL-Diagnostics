import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gastroenterology Testing | Liver & Gut Health Diagnostics",
  description:
    "Advanced hepatology and gastroenterology panels for liver disease, inflammatory bowel disease, celiac disease, and H. pylori infection in Bengaluru.",
  alternates: { canonical: "/specialities/gastroenterology" },
  openGraph: {
    title: "Gastroenterology Testing | QXL Diagnostics",
    description: "Liver function, IBD, and H. pylori testing in Bengaluru.",
    url: "https://qxldiagnostics.com/specialities/gastroenterology",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

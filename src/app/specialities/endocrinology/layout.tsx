import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Endocrinology Testing | Thyroid, Diabetes & Hormone Diagnostics",
  description:
    "Advanced hormonal and metabolic testing for thyroid, diabetes, PCOS, fertility hormones, and adrenal disorders — including AMH, TSH, HbA1c panels in Bengaluru.",
  alternates: { canonical: "/specialities/endocrinology" },
  openGraph: {
    title: "Endocrinology Testing | QXL Diagnostics",
    description: "Thyroid, diabetes, PCOS, and hormone testing in Bengaluru.",
    url: "https://qxldiagnostics.com/specialities/endocrinology",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

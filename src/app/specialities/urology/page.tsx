import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SpecialityContent from "./SpecialityContent";

const TITLE = "Urology Testing: Renal Function & Prostate Screening Bengaluru";
const DESCRIPTION =
  "Enzymatic kidney function profiles, microalbuminuria screening, urinary stone risk evaluations, and high-precision Free/Total PSA ratios — NABL-certified lab in Bengaluru.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/specialities/urology` },
  openGraph: {
    title: `${TITLE} | QXL Diagnostics`,
    description: DESCRIPTION,
    url: `${SITE_URL}/specialities/urology`,
  },
};

export default function Page() {
  return <SpecialityContent />;
}

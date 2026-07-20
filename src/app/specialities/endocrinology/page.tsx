import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SpecialityContent from "./SpecialityContent";

const TITLE = "Endocrinology Testing: Hormone & Thyroid Panels Bengaluru";
const DESCRIPTION =
  "Highly sensitive assays for thyroid function, diabetes monitoring, adrenal outputs, and reproductive health — advanced immunoassays with expert biochemist reporting in Bengaluru.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/specialities/endocrinology` },
  openGraph: {
    title: `${TITLE} | QXL Diagnostics`,
    description: DESCRIPTION,
    url: `${SITE_URL}/specialities/endocrinology`,
  },
};

export default function Page() {
  return <SpecialityContent />;
}

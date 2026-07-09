import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SpecialityContent from "./SpecialityContent";

const TITLE = "Oncology Testing: Tumor Marker & Cancer Risk Assays Bengaluru";
const DESCRIPTION =
  "Highly sensitive tumor marker screening, ovarian malignancy risk index (ROMA), and post-therapy cancer surveillance testing reviewed by consultant pathologists in Bengaluru.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/specialities/oncology` },
  openGraph: {
    title: `${TITLE} | QXL Diagnostics`,
    description: DESCRIPTION,
    url: `${SITE_URL}/specialities/oncology`,
  },
};

export default function Page() {
  return <SpecialityContent />;
}

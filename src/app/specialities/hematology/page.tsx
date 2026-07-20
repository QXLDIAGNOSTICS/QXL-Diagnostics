import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SpecialityContent from "./SpecialityContent";

const TITLE = "Hematology Testing: Blood & Coagulation Diagnostics Bengaluru";
const DESCRIPTION =
  "Complete blood count profiling, hemoglobin variant screening via HPLC, clotting/PT-INR assays, and consultant-reviewed peripheral smears for precise hematology care in Bengaluru.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/specialities/hematology` },
  openGraph: {
    title: `${TITLE} | QXL Diagnostics`,
    description: DESCRIPTION,
    url: `${SITE_URL}/specialities/hematology`,
  },
};

export default function Page() {
  return <SpecialityContent />;
}

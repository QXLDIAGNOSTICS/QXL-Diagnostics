import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SpecialityContent from "./SpecialityContent";

const TITLE = "Gastroenterology Testing: Liver Disease Panels Bengaluru";
const DESCRIPTION =
  "Liver function, IBD markers, celiac disease, H. pylori, malabsorption workup, viral hepatitis, autoimmune liver panels, and pancreatic assessment — expert-reviewed reports in Bengaluru.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/specialities/gastroenterology` },
  openGraph: {
    title: `${TITLE} | QXL Diagnostics`,
    description: DESCRIPTION,
    url: `${SITE_URL}/specialities/gastroenterology`,
  },
};

export default function Page() {
  return <SpecialityContent />;
}

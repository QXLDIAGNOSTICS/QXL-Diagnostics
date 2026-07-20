import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SpecialityContent from "./SpecialityContent";

const TITLE = "Women's Health Testing: Fertility, Pregnancy & Hormones Bengaluru";
const DESCRIPTION =
  "AMH, PCOS screening, antenatal panels, pregnancy markers, fertility hormones, thyroid, menopause testing, and cervical cancer screening — expert-reviewed, home sample collection in Bengaluru.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/specialities/womens-health` },
  openGraph: {
    title: `${TITLE} | QXL Diagnostics`,
    description: DESCRIPTION,
    url: `${SITE_URL}/specialities/womens-health`,
  },
};

export default function Page() {
  return <SpecialityContent />;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women's Health Testing | Fertility, PCOS & Antenatal Diagnostics",
  description:
    "Specialised diagnostic panels for women — fertility evaluation (AMH), PCOS workup, antenatal screening, hormonal profiling, and cervical cancer prevention in Bengaluru.",
  alternates: { canonical: "/specialities/womens-health" },
  openGraph: {
    title: "Women's Health Testing | QXL Diagnostics",
    description: "Fertility, PCOS, and antenatal diagnostic testing in Bengaluru.",
    url: "https://qxldiagnostics.com/specialities/womens-health",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

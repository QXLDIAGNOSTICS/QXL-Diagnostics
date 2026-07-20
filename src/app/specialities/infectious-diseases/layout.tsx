import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infectious Disease Testing | Fever, TB & Rapid Pathogen Panels",
  description:
    "Advanced molecular and serological testing for infectious diseases using FilmArray Multiplex PCR, CB-NAAT for TB, and rapid pathogen identification in Bengaluru.",
  alternates: { canonical: "/specialities/infectious-diseases" },
  openGraph: {
    title: "Infectious Disease Testing | QXL Diagnostics",
    description: "FilmArray PCR, TB testing, and rapid pathogen identification in Bengaluru.",
    url: "https://qxldiagnostics.com/specialities/infectious-diseases",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

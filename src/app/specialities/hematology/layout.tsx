import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hematology Testing | Blood Disorder & Coagulation Diagnostics",
  description:
    "Complete blood disorder diagnostics including advanced coagulation studies, hemoglobin electrophoresis, and specialised hematological panels for anaemia, thrombosis, and bleeding disorders in Bengaluru.",
  alternates: { canonical: "/specialities/hematology" },
  openGraph: {
    title: "Hematology Testing | QXL Diagnostics",
    description: "Coagulation studies, hemoglobin electrophoresis, and hematology panels in Bengaluru.",
    url: "https://qxldiagnostics.com/specialities/hematology",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

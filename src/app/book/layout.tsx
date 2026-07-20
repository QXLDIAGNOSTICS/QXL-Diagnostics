import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Lab Test Online | Home Collection & Center Visit",
  description:
    "Book blood tests and health packages online with QXL Diagnostics. Choose home sample collection or a walk-in visit to our NABL-certified lab in Bengaluru. Same-day digital reports.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a Lab Test Online | QXL Diagnostics",
    description:
      "Book blood tests and health packages online — home sample collection or walk-in lab visit in Bengaluru.",
    url: "https://qxldiagnostics.com/book",
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}

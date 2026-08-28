import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Sample Collection | Blood Test at Your Doorstep",
  description:
    "Book a free home sample collection with QXL Diagnostics in Bengaluru. Trained phlebotomy specialists, sterile equipment, cold-chain logistics, and same-day digital reports.",
  alternates: { canonical: "/home-collection" },
  openGraph: {
    title: "Home Sample Collection | QXL Diagnostics",
    description: "Free home sample collection in Bengaluru with trained phlebotomy specialists and same-day reports.",
    url: "https://qxldiagnostics.com/home-collection",
  },
};

export default function HomeCollectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}

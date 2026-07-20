import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with QXL Diagnostics for lab test bookings, home sample collection queries, corporate enquiries, or support. Call +91 99646 39639.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact QXL Diagnostics",
    description: "Get in touch for lab test bookings, home sample collection, or support.",
    url: "https://qxldiagnostics.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

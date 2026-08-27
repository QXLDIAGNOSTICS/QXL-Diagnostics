import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Login | QXL Diagnostics",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

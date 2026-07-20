import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart | QXL Diagnostics",
  description: "Review your selected health packages and tests before scheduling your slot.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

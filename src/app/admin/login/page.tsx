import { redirect } from "next/navigation";

const ADMIN_URL =
  process.env.NEXT_PUBLIC_ADMIN_URL || "https://admin.qxldiagnostics.com";

export default function LegacyAdminLoginRedirect() {
  redirect(`${ADMIN_URL}/login`);
}

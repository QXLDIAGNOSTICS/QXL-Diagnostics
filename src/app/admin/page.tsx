import { redirect } from "next/navigation";

const ADMIN_URL =
  process.env.NEXT_PUBLIC_ADMIN_URL || "https://admin.qxldiagnostics.com";

/** Legacy /admin → dedicated admin app */
export default function LegacyAdminRedirect() {
  redirect(ADMIN_URL);
}

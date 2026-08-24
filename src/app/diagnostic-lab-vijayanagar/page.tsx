import CombinedLocationPage, { generateMetadata as getLocMetadata } from "../locations/[slug]/page";

export async function generateMetadata() {
  return getLocMetadata({ params: Promise.resolve({ slug: "vijayanagar" }) });
}

export default async function Page() {
  return CombinedLocationPage({ params: Promise.resolve({ slug: "vijayanagar" }) });
}

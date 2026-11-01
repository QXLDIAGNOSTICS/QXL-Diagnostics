import { serverApi } from "@/lib/serverApi";
import type { Speciality } from "@/lib/api";
import fallbackSpecialities from "@/data/specialitiesFallback.json";
import SpecialityTestsView, { type DirectorySpeciality } from "./SpecialityTestsView";

// Edits made in the admin panel show up within five minutes.
export const revalidate = 300;

export default async function SpecialityTestsPage() {
  const live = await serverApi.specialities.list();
  // Use the bundled snapshot when the API is down or hasn't got this content yet.
  const source = live.some((s) => s.directory) ? live : (fallbackSpecialities as unknown as Speciality[]);
  const specialities: DirectorySpeciality[] = source
    // A speciality appears on this page once it has a position in the tab list.
    .filter((s) => s.directory && s.directory.order != null)
    .sort((a, b) => a.directory!.order! - b.directory!.order!)
    .map((s) => ({
      id: s.slug,
      title: s.name.toUpperCase(),
      icon: s.card_image_url ?? "",
      color: s.directory!.color,
      description: s.directory!.description,
      whoShouldTake: s.directory!.who_should_take,
      tests: s.directory!.tests,
      benefits: s.directory!.benefits,
      packages: s.directory!.packages,
    }));
  return <SpecialityTestsView specialities={specialities} />;
}

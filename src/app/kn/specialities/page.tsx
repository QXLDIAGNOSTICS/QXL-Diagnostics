import KnPage from "@/components/kn/KnPage";
import { knMetadata } from "@/content/kn/common";
import { specialitiesOverview } from "@/content/kn/specialities";

export const metadata = knMetadata(specialitiesOverview);

export default function Page() {
  return <KnPage page={specialitiesOverview} />;
}

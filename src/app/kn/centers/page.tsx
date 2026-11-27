import KnPage from "@/components/kn/KnPage";
import { knMetadata } from "@/content/kn/common";
import { centersPage } from "@/content/kn/services";

export const metadata = knMetadata(centersPage);

export default function Page() {
  return <KnPage page={centersPage} />;
}

import KnPage from "@/components/kn/KnPage";
import { knMetadata } from "@/content/kn/common";
import { homeCollectionPage } from "@/content/kn/services";

export const metadata = knMetadata(homeCollectionPage);

export default function Page() {
  return <KnPage page={homeCollectionPage} />;
}

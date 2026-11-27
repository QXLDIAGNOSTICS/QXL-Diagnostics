import KnPage from "@/components/kn/KnPage";
import { knMetadata } from "@/content/kn/common";
import { packagesPage } from "@/content/kn/packages";

export const metadata = knMetadata(packagesPage);

export default function Page() {
  return <KnPage page={packagesPage} />;
}

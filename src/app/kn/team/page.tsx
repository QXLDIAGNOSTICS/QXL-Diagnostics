import KnPage from "@/components/kn/KnPage";
import { knMetadata } from "@/content/kn/common";
import { teamPage } from "@/content/kn/about-team";

export const metadata = knMetadata(teamPage);

export default function Page() {
  return <KnPage page={teamPage} />;
}

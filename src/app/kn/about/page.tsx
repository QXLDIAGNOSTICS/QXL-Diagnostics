import KnPage from "@/components/kn/KnPage";
import { knMetadata } from "@/content/kn/common";
import { aboutPage } from "@/content/kn/about-team";

export const metadata = knMetadata(aboutPage);

export default function Page() {
  return <KnPage page={aboutPage} />;
}

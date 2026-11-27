import KnPage from "@/components/kn/KnPage";
import { knMetadata } from "@/content/kn/common";
import { homePage } from "@/content/kn/home";

export const metadata = knMetadata(homePage);

export default function Page() {
  return <KnPage page={homePage} />;
}

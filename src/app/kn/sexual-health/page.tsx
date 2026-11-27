import KnPage from "@/components/kn/KnPage";
import { knMetadata } from "@/content/kn/common";
import { sexualHealthPage } from "@/content/kn/sexual-health";

export const metadata = knMetadata(sexualHealthPage);

export default function Page() {
  return <KnPage page={sexualHealthPage} />;
}

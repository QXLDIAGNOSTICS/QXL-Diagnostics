import KnPage from "@/components/kn/KnPage";
import { knMetadata } from "@/content/kn/common";
import { uploadPrescriptionPage } from "@/content/kn/services";

export const metadata = knMetadata(uploadPrescriptionPage);

export default function Page() {
  return <KnPage page={uploadPrescriptionPage} />;
}

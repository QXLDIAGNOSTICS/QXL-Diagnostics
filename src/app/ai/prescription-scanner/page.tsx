import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiPrescriptionScannerPage() {
  return (
    <AiFeaturePage
      title="AI Prescription Scanner & Reader"
      subtitle="Extract handwritten or printed medical prescriptions instantly with clinical OCR."
      badge="Prescription OCR AI"
      featureKey="scanner"
      iconName="file"
      sampleInputPlaceholder="Upload a prescription image or enter handwritten test notes"
      defaultPrompt="Extract tests from prescription: CBC, Lipid Profile, FBS, LFT"
      actionText="Upload Prescription Image"
      actionLink="/upload-prescription"
    />
  );
}

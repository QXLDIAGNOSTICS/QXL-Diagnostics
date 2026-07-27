import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiImageAnalysisPage() {
  return (
    <AiFeaturePage
      title="AI Medical Image Analysis"
      subtitle="Analyze diagnostic scan images, skin spot photographs, or pathology slides for preliminary clinical insights."
      badge="Computer Vision AI"
      featureKey="image"
      iconName="file"
      sampleInputPlaceholder="Upload an image of a lab test report or prescription"
      defaultPrompt="Analyze attached medical document for diagnostic test extraction"
      actionText="Upload Image"
      actionLink="/upload-prescription"
    />
  );
}

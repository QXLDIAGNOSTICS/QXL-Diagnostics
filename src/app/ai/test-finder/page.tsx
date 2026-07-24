import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiTestFinderPage() {
  return (
    <AiFeaturePage
      title="AI Test Finder"
      subtitle="Find the exact laboratory test panel matching your health symptoms or doctor's recommendations."
      badge="Test Discovery AI"
      featureKey="finder"
      iconName="stethoscope"
      sampleInputPlaceholder="e.g. Need a test for joint inflammation and uric acid"
      defaultPrompt="Search for comprehensive diabetes and kidney screening tests"
      actionText="Book Test Now"
      actionLink="/book"
    />
  );
}

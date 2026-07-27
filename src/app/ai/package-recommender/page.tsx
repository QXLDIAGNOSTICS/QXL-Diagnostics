import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiPackageRecommenderPage() {
  return (
    <AiFeaturePage
      title="AI Health Package Recommender"
      subtitle="Get tailored full body checkup recommendations based on age, gender, lifestyle, and medical history."
      badge="Package Matching Engine"
      featureKey="recommender"
      iconName="stethoscope"
      sampleInputPlaceholder="e.g. 45 year old male, desk job, history of high cholesterol"
      defaultPrompt="Recommend a full body checkup package for annual health evaluation"
      actionText="View Health Packages"
      actionLink="/packages"
    />
  );
}

import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiFitnessPage() {
  return (
    <AiFeaturePage
      title="AI Clinical Fitness Advisor"
      subtitle="Tailored physical exercise recommendations mapped to your cardiac, joint, and metabolic biomarker health profile."
      badge="Metabolic Activity Advisor"
      featureKey="fitness"
      iconName="fitness"
      sampleInputPlaceholder="e.g. Mild knee stiffness, goal: improve insulin sensitivity"
      defaultPrompt="Recommend low-impact aerobic exercise plan for metabolic health"
      actionText="Book Health Checkup"
      actionLink="/packages"
    />
  );
}

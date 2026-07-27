import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiSymptomCheckerPage() {
  return (
    <AiFeaturePage
      title="AI Clinical Symptom Checker"
      subtitle="Input your current symptoms to evaluate potential diagnostic indicators and recommended blood panels."
      badge="Clinical Triage AI"
      featureKey="symptom"
      iconName="heart"
      sampleInputPlaceholder="e.g. Mild fever, body aches, loss of appetite for 3 days"
      defaultPrompt="Check symptoms of persistent fatigue, dizziness, and low energy"
      actionText="Schedule Diagnostic Panel"
      actionLink="/book"
    />
  );
}

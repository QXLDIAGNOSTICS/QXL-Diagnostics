import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiHealthRiskPage() {
  return (
    <AiFeaturePage
      title="AI Health Risk Predictor"
      subtitle="Calculate 10-year risk probabilities for cardiovascular, diabetic, and metabolic conditions based on blood biomarkers."
      badge="Predictive Clinical Analytics"
      featureKey="risk"
      iconName="heart"
      sampleInputPlaceholder="e.g. Age: 42, BMI: 27, Systolic BP: 130, HbA1c: 6.1%"
      defaultPrompt="Calculate cardiovascular and metabolic risk score"
      actionText="Book Cardiac & Lipid Panel"
      actionLink="/book"
    />
  );
}

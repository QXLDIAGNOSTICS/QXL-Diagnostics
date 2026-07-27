import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiNutritionPage() {
  return (
    <AiFeaturePage
      title="AI Clinical Nutrition Planner"
      subtitle="Customized dietary recommendations tailored to your lab test results (e.g. lipid profile, fasting glucose, uric acid)."
      badge="Nutritional Diagnostics AI"
      featureKey="nutrition"
      iconName="apple"
      sampleInputPlaceholder="e.g. High triglycerides (210 mg/dL), Vegetarian diet preference"
      defaultPrompt="Generate a 7-day low glycemic index meal plan"
      actionText="Book Lipid & Metabolic Panel"
      actionLink="/book"
    />
  );
}

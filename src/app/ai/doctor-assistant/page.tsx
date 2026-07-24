import AiFeaturePage from "@/components/AiFeaturePage";

export default function AiDoctorAssistantPage() {
  return (
    <AiFeaturePage
      title="AI Clinical Co-Pilot for Doctors"
      subtitle="Synthesize patient lab histories, highlight critical abnormal biomarkers, and draft clinical summary notes for physicians."
      badge="Physician Co-Pilot"
      featureKey="doctor"
      iconName="stethoscope"
      sampleInputPlaceholder="Paste patient lab values or clinical summary"
      defaultPrompt="Summarize abnormal lab values and differential diagnostic notes"
      actionText="View Doctor Partnerships"
      actionLink="/doctor-partnership"
    />
  );
}

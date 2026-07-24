import GenericPage from "@/components/GenericPage";

export default function DisclaimerPage() {
  return (
    <GenericPage
      title="Medical & Clinical Disclaimer"
      subtitle="Important disclosure regarding diagnostic testing, AI recommendations, and medical advice."
      badge="Medical Disclaimer"
      contentParagraphs={[
        "The information and AI summaries provided on QXL Diagnostics are intended for educational and diagnostic reference purposes.",
        "Diagnostic reports and AI outputs should be reviewed with a qualified medical professional for definitive clinical diagnosis and treatment planning.",
      ]}
      ctaText="View NABL Accreditations"
      ctaLink="/about"
    />
  );
}

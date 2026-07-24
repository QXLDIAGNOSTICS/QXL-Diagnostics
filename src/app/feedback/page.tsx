import GenericPage from "@/components/GenericPage";

export default function FeedbackPage() {
  return (
    <GenericPage
      title="Patient Feedback & Quality Survey"
      subtitle="Share your experience regarding home collection, phlebotomist behavior, and report delivery."
      badge="Patient Feedback"
      contentParagraphs={[
        "At QXL Diagnostics, we strive to maintain 100% patient satisfaction. Your feedback helps us continuously enhance our laboratory services across Bengaluru.",
      ]}
      ctaText="Submit Feedback"
      ctaLink="/contact"
    />
  );
}

import GenericPage from "@/components/GenericPage";

export default function RefundPolicyPage() {
  return (
    <GenericPage
      title="Cancellation & Refund Policy"
      subtitle="Transparent policies regarding appointment cancellations, failed sample collection, and refunds."
      badge="Refund Policy"
      contentParagraphs={[
        "Full refunds are issued for cancellations requested at least 2 hours prior to the scheduled home collection slot.",
        "If a sample cannot be processed due to hemolysis or laboratory quality rejection, free sample re-collection will be arranged immediately.",
      ]}
      ctaText="Contact Customer Care"
      ctaLink="/contact"
    />
  );
}

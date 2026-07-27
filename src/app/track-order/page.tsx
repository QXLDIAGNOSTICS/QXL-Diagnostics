import GenericPage from "@/components/GenericPage";

export default function TrackOrderPage() {
  return (
    <GenericPage
      title="Track Diagnostic Order"
      subtitle="Check the real-time status of your test order and phlebotomist assignment."
      badge="Order Tracking"
      contentParagraphs={[
        "Track phlebotomist arrival times, sample processing progress, and report generation status.",
      ]}
      ctaText="My Orders Dashboard"
      ctaLink="/dashboard/orders"
    />
  );
}

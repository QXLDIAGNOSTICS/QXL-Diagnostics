import GenericPage from "@/components/GenericPage";

export default function TrackSamplePage() {
  return (
    <GenericPage
      title="Live Sample Tracking"
      subtitle="Track your blood sample collection status from home pickup to laboratory analysis and report sign-off."
      badge="Sample Tracking"
      contentParagraphs={[
        "Real-time cold-chain sample tracking system ensuring 100% specimen security, barcode identification, and NABL standard analysis stages.",
      ]}
      ctaText="View Order Status"
      ctaLink="/dashboard/orders"
    />
  );
}

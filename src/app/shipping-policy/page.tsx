import GenericPage from "@/components/GenericPage";

export default function ShippingPolicyPage() {
  return (
    <GenericPage
      title="Sample Collection & Delivery Policy"
      subtitle="Information on home sample collection dispatch, phlebotomist logistics, and digital report delivery."
      badge="Logistics Policy"
      contentParagraphs={[
        "Sample collection phlebotomists are dispatched to your specified address across Bengaluru within the chosen time window.",
        "Physical hard-copy reports can be collected from our Kengeri lab or dispatched via courier upon request.",
      ]}
      ctaText="Book Sample Collection"
      ctaLink="/book"
    />
  );
}

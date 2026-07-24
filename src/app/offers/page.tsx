import GenericPage from "@/components/GenericPage";

export default function OffersPage() {
  return (
    <GenericPage
      title="Special Diagnostic Offers & Discounts"
      subtitle="Exclusive discount offers on preventative health packages and diagnostic blood tests."
      badge="Special Offers"
      contentParagraphs={[
        "Enjoy up to 50% discount on comprehensive full-body health checkup packages at QXL Diagnostics.",
        "All promotional offers include free home sample collection across Bengaluru, zero hidden fees, and same-day NABL digital reports.",
      ]}
      ctaText="Book Discounted Package"
      ctaLink="/packages"
    />
  );
}

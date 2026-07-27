import GenericPage from "@/components/GenericPage";

export default function MembershipPage() {
  return (
    <GenericPage
      title="QXL Health Membership & Subscription"
      subtitle="Annual diagnostic membership plans offering unlimited free home sample collection and family discounts."
      badge="Health Membership"
      contentParagraphs={[
        "Join QXL Care Membership for your family: Enjoy free quarterly blood sugar checks, 20% discount on all specialized tests, and priority phlebotomist dispatch.",
      ]}
      ctaText="Join Membership"
      ctaLink="/packages"
    />
  );
}

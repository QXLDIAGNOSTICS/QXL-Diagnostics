import GenericPage from "@/components/GenericPage";

export default function ReferralsPage() {
  return (
    <GenericPage
      title="Refer a Friend & Earn Rewards"
      subtitle="Refer family and friends to QXL Diagnostics and earn health checkup vouchers."
      badge="Referral Program"
      contentParagraphs={[
        "Share your unique referral link with family or friends across Bengaluru. When they book a health package, both of you receive ₹200 off your next booking.",
      ]}
      ctaText="Refer Now"
      ctaLink="/dashboard"
    />
  );
}

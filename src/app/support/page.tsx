import GenericPage from "@/components/GenericPage";

export default function SupportPage() {
  return (
    <GenericPage
      title="24/7 Patient Support & Contact Desk"
      subtitle="Direct contact channels for appointment modifications, report queries, and emergency lab requests."
      badge="24x7 Support Desk"
      contentParagraphs={[
        "Phone Hotline: +91 99646 39639 (Call or WhatsApp)\nEmail Support: qxldiagnostics@gmail.com",
        "Laboratory Location: 3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560060 (Open 24x7).",
      ]}
      ctaText="Contact Us"
      ctaLink="/contact"
    />
  );
}

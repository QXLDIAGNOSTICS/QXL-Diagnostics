import GenericPage from "@/components/GenericPage";

export default function TestimonialsPage() {
  return (
    <GenericPage
      title="Patient Testimonials & Reviews"
      subtitle="Read feedback from over 500+ satisfied patients and consulting physicians in Bengaluru."
      badge="Patient Ratings"
      contentParagraphs={[
        "\"The home collection service was prompt, painless, and my reports arrived via WhatsApp the same evening.\" — Ananya S., Indiranagar",
        "\"QXL Diagnostics' AI report summary helped me understand my lipid levels clearly before consulting my cardiologist.\" — Rajesh K., Kengeri",
        "Rated 4.8/5.0 across Google Reviews and verified patient feedback.",
      ]}
      ctaText="Book Your Test Today"
      ctaLink="/book"
    />
  );
}

import GenericPage from "@/components/GenericPage";

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const formattedSlug = params?.slug ? params.slug.replace(/-/g, " ").toUpperCase() : "SPECIALITY";
  return (
    <GenericPage
      title={`${formattedSlug} Testing Panel`}
      subtitle={`Comprehensive NABL certified diagnostic testing for ${formattedSlug.toLowerCase()} conditions.`}
      badge="Speciality Category"
      contentParagraphs={[
        `QXL Diagnostics provides advanced ${formattedSlug.toLowerCase()} testing utilizing ISO 15189 standard automated analyzers and molecular assays.`,
        `All reports are reviewed by senior consultant pathologists with same-day digital delivery via WhatsApp and email.`,
      ]}
      ctaText="Book Category Test Panel"
      ctaLink="/book"
    />
  );
}

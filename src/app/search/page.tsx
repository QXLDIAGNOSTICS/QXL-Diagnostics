import GenericPage from "@/components/GenericPage";

export default function SearchPage() {
  return (
    <GenericPage
      title="Search Diagnostic Catalog & Services"
      subtitle="Search 300+ laboratory tests, checkup packages, specialist doctors, and lab centers in Bengaluru."
      badge="Catalog Search"
      contentParagraphs={[
        "Type any test name (e.g., CBC, Thyroid Profile, Lipid, Vitamin D) or condition (e.g., Diabetes, Fatigue, Fever) to find instant pricing and home collection availability.",
      ]}
      ctaText="Search Tests Catalog"
      ctaLink="/tests"
    />
  );
}

import GenericPage from "@/components/GenericPage";

export default function LocationCityPage({ params }: { params: { city: string } }) {
  const city = params?.city ? params.city.replace(/-/g, " ").toUpperCase() : "BENGALURU";
  return (
    <GenericPage
      title={`QXL Diagnostics Centers in ${city}`}
      subtitle={`NABL certified diagnostic laboratory centers and home sample collection services in ${city}.`}
      badge="Location Center Directory"
      contentParagraphs={[
        `QXL Diagnostics provides free home sample collection and walk-in laboratory testing services across all major hubs in ${city}.`,
        `Our certified phlebotomists are equipped with cold-chain sample transport containers ensuring 100% sample integrity and same-day digital reporting.`,
      ]}
      ctaText="Find Nearest Lab Center"
      ctaLink="/centers"
    />
  );
}

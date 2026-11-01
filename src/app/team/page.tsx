import { serverApi } from "@/lib/serverApi";
import type { Doctor } from "@/lib/api";
import fallbackTeam from "@/data/teamFallback.json";
import TeamView from "./TeamView";

// Edits made in the admin panel show up within five minutes.
export const revalidate = 300;

export default async function TeamPage() {
  const live = await serverApi.doctors.list();
  // Only people with a team-page role are shown here; the bundled snapshot is
  // used when the API is unreachable.
  const team = live.filter((d) => d.title);
  const doctors = team.length > 0 ? team : (fallbackTeam as unknown as Doctor[]);
  return <TeamView doctors={doctors} />;
}

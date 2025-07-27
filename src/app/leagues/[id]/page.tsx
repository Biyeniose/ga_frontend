import { LeagueMatches } from "@/components/custom/leagues/LeagueMatches";
import { LeagueStandings } from "@/components/custom/leagues/LeagueStandings";
import LeagueTopStats from "@/components/custom/leagues/LeagueTopStats";
import { LeagueInfoProvider } from "@/context/LeagueDataContext";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const leagueId = Number(id);

  return (
    <div className="min-h-screen p-2 sm:p-2 m-6 border-3 rounded-lg font-[family-name:var(--font-ibm-plex)]">
      <LeagueInfoProvider leagueId={leagueId}>
        <LeagueMatches />

        {/* Grid for the two LeagueStandings components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <LeagueStandings sort_type="goalsConceded" />
          <LeagueStandings sort_type="goalsFor" />
        </div>

        <LeagueTopStats league_id={id} />
        <LeagueStandings sort_type="default" />
      </LeagueInfoProvider>
    </div>
  );
}

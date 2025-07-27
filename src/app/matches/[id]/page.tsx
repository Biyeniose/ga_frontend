"use client";
import { useContext } from "react";
import { MatchDataContext } from "@/context/matches/MatchDataProvider";
import { Lineups } from "@/components/custom/matches/Lineups";
import { MatchStats } from "@/components/custom/matches/MatchStats";
import TeamsH2H from "@/components/custom/matches/TeamsH2H";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params.id;
  const { matchData, isLoading, error } = useContext(MatchDataContext);

  // Handle loading and error states
  if (isLoading) return <div className="p-4">Loading match data...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  if (!matchData?.data) return <div className="p-4">Match data not found</div>;

  const result = matchData.data.match_info.result;
  const home_id = matchData.data.teams.home.info.team.team_id;
  const away_id = matchData.data.teams.away.info.team.team_id;
  const homeLineups = matchData.data.teams.home.lineups;
  const awayLineups = matchData.data.teams.away.lineups;

  // Check if lineups exist for both teams
  const hasLineups =
    homeLineups &&
    awayLineups &&
    homeLineups.length > 0 &&
    awayLineups.length > 0;

  return (
    <div className="min-h-screen flex flex-col items-center  p-2 rounded-lg font-[family-name:var(--font-ibm-plex)]">
      <div className="w-[95vw] sm:w-4/5 md:w-2/3 lg:w-1/2">
        {result === null ? (
          // If result is null, show only TeamsH2H (upcoming match)
          <TeamsH2H team1Id={home_id} team2Id={away_id} />
        ) : (
          // If result is not null, show available components (completed match)
          <>
            {hasLineups && (
              <>
                <Lineups />
                <MatchStats />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

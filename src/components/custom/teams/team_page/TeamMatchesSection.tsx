// src/components/custom/teams/team_page/TeamMatchesSection.tsx
"use client";

import { useContext } from "react";
import { TeamPageContext } from "@/context/teams/TeamPageProvider";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Match } from "@/types/TeamTypes";
import { formatDate } from "@/lib/methods";

export function TeamMatchesSection() {
  const { teamData, isLoading, error } = useContext(TeamPageContext);

  if (isLoading) return <div className="p-4">Loading team info...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  if (!teamData || !teamData.data) {
    return <div className="p-4">Team data not found</div>;
  }

  const matches = teamData.data.matches;
  const currentTeamId = teamData.data.info.team_id;
  const now = new Date();

  // Separate past and upcoming matches
  const pastMatches = matches
    .filter((match) => new Date(match.match_info.match_date) < now)
    .sort(
      (a, b) =>
        new Date(b.match_info.match_date).getTime() -
        new Date(a.match_info.match_date).getTime(),
    )
    .slice(0, 5);

  const upcomingMatches = matches
    .filter((match) => new Date(match.match_info.match_date) >= now)
    .sort(
      (a, b) =>
        new Date(a.match_info.match_date).getTime() -
        new Date(b.match_info.match_date).getTime(),
    )
    .slice(0, 5);

  const getMatchResult = (match: Match, teamId: number) => {
    const isHome = match.teams.home.team.team_id === teamId;
    const homeGoals = match.teams.home.stats.goals;
    const awayGoals = match.teams.away.stats.goals;

    if (homeGoals === null || awayGoals === null) return null;

    if (homeGoals === awayGoals) return "D";
    if ((isHome && homeGoals > awayGoals) || (!isHome && awayGoals > homeGoals))
      return "W";
    return "L";
  };

  const MatchItem = ({ match, isPast }: { match: Match; isPast: boolean }) => {
    const isHome = match.teams.home.team.team_id === currentTeamId;
    const opponent = isHome ? match.teams.away.team : match.teams.home.team;
    const currentTeamGoals = isHome
      ? match.teams.home.stats.goals
      : match.teams.away.stats.goals;
    const opponentGoals = isHome
      ? match.teams.away.stats.goals
      : match.teams.home.stats.goals;
    const result = getMatchResult(match, currentTeamId);

    return (
      <Link href={`/matches/${match.match_info.match_id}`}>
        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors gap-x-6">
          {/* Date & Competition */}
          <div className="flex flex-col gap-1 min-w-0 w-20">
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(match.match_info.match_date)}
            </div>
            <Badge variant="outline" className="text-xs w-fit">
              {match.match_info.comp}
            </Badge>
          </div>

          {/* Match */}
          <div className="flex items-center gap-4 flex-1 justify-center">
            {/* Home Team */}
            <div className="relative w-8 h-8">
              <Image
                src={match.teams.home.team.logo}
                alt={`${match.teams.home.team.team_name} logo`}
                fill
                className="object-contain"
              />
            </div>

            {/* Score or Time */}
            <div className="flex items-center gap-2 min-w-0">
              {isPast && currentTeamGoals !== null && opponentGoals !== null ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">
                    {match.teams.home.stats.goals}-
                    {match.teams.away.stats.goals}
                  </span>
                  {result && (
                    <Badge
                      variant={
                        result === "W"
                          ? "default"
                          : result === "D"
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-xs w-4 h-4 rounded-full p-0 flex items-center justify-center"
                    >
                      {result}
                    </Badge>
                  )}
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {new Date(match.match_info.date_time_utc).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    },
                  )}
                </span>
              )}
            </div>

            {/* Away Team */}
            <div className="relative w-8 h-8">
              <Image
                src={match.teams.away.team.logo}
                alt={`${match.teams.away.team.team_name} logo`}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Home/Away indicator */}
        </div>
      </Link>
    );
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Upcoming Matches */}
      {upcomingMatches.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Upcoming</h2>
          <div className="space-y-2">
            {upcomingMatches.map((match) => (
              <MatchItem
                key={match.match_info.match_id}
                match={match}
                isPast={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recent Matches */}
      {pastMatches.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Recent</h2>
          <div className="space-y-2">
            {pastMatches.map((match) => (
              <MatchItem
                key={match.match_info.match_id}
                match={match}
                isPast={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* No matches */}
      {upcomingMatches.length === 0 && pastMatches.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No matches found
        </div>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useH2HData } from "@/hooks/stats/statRoutes";
import { Match } from "@/types/StatTypes";
import Link from "next/link";
import { Calendar, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TeamRecord } from "@/types/StatTypes";

interface MyComponentProps {
  team1Id: number;
  team2Id: number;
}

const TeamsH2H = ({ team1Id, team2Id }: MyComponentProps) => {
  const { data, isLoading, error } = useH2HData(team1Id, team2Id);

  if (isLoading)
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-red-500 flex items-center gap-2">
        <span>⚠️</span>
        <span>Error: {error.message}</span>
      </div>
    );

  if (!data || !data.data)
    return (
      <div className="p-4 flex items-center gap-2">
        <span>🔍</span>
        <span>MH2H data not found</span>
      </div>
    );

  const matches = data.data.matches;
  const record = data.data.record;

  // Helper function to check if URL is valid
  const isValidUrl = (url: string | null | undefined): url is string => {
    return url !== null && url !== undefined && url.trim() !== "";
  };

  const MatchItem = ({ match }: { match: Match }) => {
    const team1Goals = match.teams.home.stats.goals;
    const team2Goals = match.teams.away.stats.goals;

    return (
      <Link href={`/matches/${match.match_info.match_id}`}>
        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors gap-x-6">
          {/* Date & Competition */}
          <div className="flex flex-col gap-1 min-w-0 w-20">
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(match.match_info.match_date).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                },
              )}
            </div>
            <Badge variant="outline" className="text-xs w-fit">
              {match.match_info.comp}
            </Badge>
          </div>

          {/* Match */}
          <div className="flex items-center gap-4 flex-1 justify-center">
            {/* Home Team */}
            <div className="relative w-8 h-8 flex items-center justify-center bg-muted rounded">
              {isValidUrl(match.teams.home.team.logo) ? (
                <Image
                  src={match.teams.home.team.logo}
                  alt={`${match.teams.home.team.team_name} logo`}
                  fill
                  className="object-contain"
                />
              ) : (
                <Shield className="w-4 h-4 text-muted-foreground" />
              )}
            </div>

            {/* Score */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">
                  {team1Goals}-{team2Goals}
                </span>
              </div>
            </div>

            {/* Away Team */}
            <div className="relative w-8 h-8 flex items-center justify-center bg-muted rounded">
              {isValidUrl(match.teams.away.team.logo) ? (
                <Image
                  src={match.teams.away.team.logo}
                  alt={`${match.teams.away.team.team_name} logo`}
                  fill
                  className="object-contain"
                />
              ) : (
                <Shield className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const RecordItem = ({ teamRecord }: { teamRecord: TeamRecord }) => {
    return (
      <div className="flex items-center justify-between p-4 border rounded-lg">
        {/* Team Info */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex items-center justify-center bg-muted rounded">
            {isValidUrl(teamRecord.team.logo) ? (
              <Image
                src={teamRecord.team.logo}
                alt={`${teamRecord.team.team_name} logo`}
                fill
                className="object-contain"
              />
            ) : (
              <Shield className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-sm">
              {teamRecord.team.team_name}
            </h3>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="text-center">
            <div className="font-bold text-green-600">{teamRecord.wins}</div>
            <div className="text-xs text-muted-foreground">W</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-600">{teamRecord.draws}</div>
            <div className="text-xs text-muted-foreground">D</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-red-600">{teamRecord.losses}</div>
            <div className="text-xs text-muted-foreground">L</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-blue-600">{teamRecord.goals_f}</div>
            <div className="text-xs text-muted-foreground">GF</div>
          </div>

          <div className="text-center">
            <div className="font-bold">{teamRecord.win_pct.toFixed(0)}%</div>
            <div className="text-xs text-muted-foreground">Win%</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Head-to-Head Record */}
      {record && record.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Head-to-Head Record</h2>
          <div className="space-y-2">
            {record.map((teamRecord: TeamRecord) => (
              <RecordItem
                key={teamRecord.team.team_id}
                teamRecord={teamRecord}
              />
            ))}
          </div>
        </div>
      )}

      {/* Past Matches */}
      {matches.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Past 5 Matches</h2>
          <div className="space-y-2">
            {matches.map((match) => (
              <MatchItem key={match.match_info.match_id} match={match} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsH2H;

"use client";

import * as React from "react";
import { useTopLeagueStats } from "@/hooks/leagueRoutes";
import TeamStatsCard from "@/components/custom/teams/team_page/TeamStatsCard";

interface MyComponentProps {
  league_id: string;
}

const LeagueTopStats: React.FC<MyComponentProps> = ({ league_id }) => {
  const { data, isLoading, error } = useTopLeagueStats(league_id as string);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || data.length === 0) return <div>No player data found</div>;

  // Sort players by goals in descending order
  const sortedByGoals = [...data]
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 10);
  // Sort players by assists in descending order
  const sortedByAssists = [...data]
    .sort((a, b) => b.assists - a.assists)
    .slice(0, 10);

  return (
    <div className="min-h-screen mt-3 p-4 bg-white dark:bg-zinc-900 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Stat Leaders</h2>
      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Most Goals Column */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow border-3">
          <div className="space-y-1">
            {sortedByGoals.map((player) => (
              <TeamStatsCard
                isLeague={true}
                stat="goals"
                key={`goals-${player.player_id}`}
                player={player}
              />
            ))}
          </div>
        </div>

        {/* Most Assists Column */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow border-3">
          <div className="space-y-1">
            {sortedByAssists.map((player) => (
              <TeamStatsCard
                isLeague={true}
                stat="assists"
                key={`assists-${player.player_id}`}
                player={player}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueTopStats;

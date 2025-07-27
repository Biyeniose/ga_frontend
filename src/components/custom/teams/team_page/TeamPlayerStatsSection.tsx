// src/components/custom/teams/team_page/TeamPlayerStatsSection.tsx
"use client";

import { useContext } from "react";
import { TeamPageContext } from "@/context/teams/TeamPageProvider";
import { Badge } from "@/components/ui/badge";
import { User, Clock, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlayerStats } from "@/types/TeamTypes";

export function TeamPlayerStatsSection() {
  const { teamData, isLoading, error } = useContext(TeamPageContext);

  if (isLoading) return <div className="p-4">Loading team info...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  if (!teamData || !teamData.data) {
    return <div className="p-4">Team data not found</div>;
  }

  const players = teamData.data.stats;

  // Get current season stats and sort by goals + assists (ga)
  const topPlayers = players
    .filter((player) => player.comp.comp_name === "All Competitions")
    .sort((a, b) => (b.ga || 0) - (a.ga || 0))
    .slice(0, 5);

  const PlayerItem = ({ player }: { player: PlayerStats }) => {
    return (
      <Link href={`/players/${player.player.player_id}`}>
        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
          {/* Player Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Player Image */}
            <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
              {player.player.img && player.player.img !== null ? (
                <Image
                  src={player.player.img}
                  alt={`${player.player.player_name} photo`}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Hide image and show fallback if image fails to load
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : null}
              {/* Always show fallback, but it will be covered by image if image loads */}
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            {/* Player Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm truncate">
                  {player.player.player_name}
                </h3>
                {player.age && (
                  <Badge variant="outline" className="text-xs">
                    {player.age}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            {/* Goals + Assists */}
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{player.ga || 0}</span>
              <span className="text-xs text-muted-foreground">G+A</span>
            </div>

            {/* Minutes per game */}
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">
                {Math.round(player.minutes_pg || 0)}
              </span>
              <span className="text-xs text-muted-foreground">min/g</span>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Top Players</h2>
        <Badge variant="outline" className="text-xs">
          {players[0]?.season_year} Season
        </Badge>
      </div>

      {topPlayers.length > 0 ? (
        <div className="space-y-2">
          {topPlayers.map((player) => (
            <PlayerItem key={player.stats_id} player={player} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No player stats available
        </div>
      )}

      {/* View all link */}
      {players.length > 8 && (
        <div className="text-center pt-2">
          <Link
            href={`/teams/${teamData.data.info.team_id}/stats`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all players →
          </Link>
        </div>
      )}
    </div>
  );
}

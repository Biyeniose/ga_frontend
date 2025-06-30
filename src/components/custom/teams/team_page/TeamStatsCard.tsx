// src/components/custom/teams/team_page/TeamStatsCard.tsx
"use client";

import { useContext } from "react";
import { DataContext } from "@/context/TeamPageDataContext";
import { PlayerStats } from "@/types/TeamTypes";
import Image from "next/image";
import Link from "next/link";

interface StatsCardProps {
  stat: "goals" | "assists" | "minutes" | "ga";
  isLeague: boolean;
}

export default function TeamStatsCard({ stat, isLeague }: StatsCardProps) {
  const { teamData, isLoading, error } = useContext(DataContext);

  if (isLoading) return <div className="p-4">Loading stats...</div>;
  if (error)
    return <div className="p-10 text-red-500">Error: {error.message}</div>;
  if (!teamData?.stats) return <div className="p-4">No stats available</div>;

  // Make a shallow copy of the stats array to avoid direct mutation
  const stats = [...teamData.stats];

  // --- Sorting Logic START ---
  stats.sort((a, b) => {
    let statA = 0;
    let statB = 0;

    switch (stat) {
      case "goals":
        statA = a.goals ?? 0; // Use nullish coalescing to handle potential null/undefined
        statB = b.goals ?? 0;
        break;
      case "assists":
        statA = a.assists ?? 0;
        statB = b.assists ?? 0;
        break;
      case "minutes":
        statA = a.minutes ?? 0;
        statB = b.minutes ?? 0;
        break;
      case "ga":
        statA = a.ga ?? 0;
        statB = b.ga ?? 0;
        break;
      default:
        // Fallback, though 'stat' type should prevent this
        statA = 0;
        statB = 0;
    }
    return statB - statA; // Sort in descending order (highest value first)
  });
  // --- Sorting Logic END ---

  // Helper function to get the numeric value for the selected stat
  const getStatValue = (player: PlayerStats) => {
    switch (stat) {
      case "goals":
        return player.goals;
      case "assists":
        return player.assists;
      case "minutes":
        return player.minutes;
      case "ga":
        return player.ga;
      default:
        return 0;
    }
  };

  // Helper function to get the label for the selected stat
  const getStatLabel = () => {
    switch (stat) {
      case "goals":
        return "G";
      case "assists":
        return "A";
      case "minutes":
        return "MIN";
      case "ga":
        return "GA";
      default:
        return "STAT";
    }
  };

  const getTitle = () => {
    switch (stat) {
      case "goals":
        return "Goals";
      case "assists":
        return "Assists";
      case "minutes":
        return "Minutes";
      case "ga":
        return "Goals+A";
      default:
        return "STAT";
    }
  };

  return (
    <div className="p-1 mb-2 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
      <div className="text-2xl font-bold text-white bg-zinc-900 p-3 rounded-lg ">
        {" "}
        {/* Changed to rounded-t-lg */}
        Most {getTitle()}
      </div>
      <div className="space-y-1 rounded-lg bg-zinc-200 dark:bg-zinc-900 overflow-hidden">
        {" "}
        {/* Added rounded-b-lg and overflow-hidden for a clean look */}
        {stats.slice(0, 5).map((player) => (
          <div
            key={player.player_id}
            className="dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" /* Added border-b for separation */
          >
            <div className="p-2">
              <div className="flex items-center justify-between">
                {/* Left Side - Player Info (80% width) */}
                <div className="flex items-center gap-2 w-[80%] min-w-0">
                  {/* Logo Section - Team logo if isLeague, Nation flags if not */}
                  <div className="flex-shrink-0">
                    {isLeague ? (
                      player.team_logo && (
                        <div className="relative w-6 h-6 overflow-hidden">
                          <Image
                            src={player.team_logo}
                            alt={player.team_name || "Team logo"}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                      )
                    ) : (
                      <div className="flex flex-col items-center gap-0.5">
                        {player.nations?.nation1_url && (
                          <div className="relative w-6 h-6 overflow-hidden">
                            <Image
                              src={player.nations.nation1_url}
                              alt={player.nations.nation1 || "Nation 1 flag"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        {player.nations?.nation2_url && (
                          <div className="relative w-6 h-6 overflow-hidden border -mt-0.5">
                            <Image
                              src={player.nations.nation2_url}
                              alt={player.nations.nation2 || "Nation 2 flag"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Player Name and Details */}
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <h3 className="text-sm font-medium truncate">
                      <Link
                        href={`/players/${player.player_id}`}
                        className="hover:underline hover:underline-offset-3 text-gray-800 dark:text-gray-200"
                      >
                        {player.player_name}
                      </Link>
                    </h3>
                    <p className="text-xs text-gray-900 dark:text-gray-400 truncate">
                      {isLeague ? (
                        <Link
                          href={`/teams/${player.team_id}`}
                          className="hover:underline hover:underline-offset-2"
                        >
                          {player.team_name}
                        </Link>
                      ) : (
                        player.position
                      )}
                    </p>
                  </div>
                </div>

                {/* Right Side - Stats (20% width) */}
                <div className="flex-shrink-0 w-[20%]">
                  <div className="grid grid-cols-1 items-baseline">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400 leading-none">
                        {getStatValue(player)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {getStatLabel()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

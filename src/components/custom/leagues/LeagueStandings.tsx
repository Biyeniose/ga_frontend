// src/components/LeagueStandings.tsx
"use client";

import { useContext } from "react";
import { DataContext } from "@/context/LeagueDataContext";
import { TeamRank } from "@/types/LeagueTypes";
import Image from "next/image";

type SortType = "default" | "goalsConceded" | "goalsFor";

interface LeagueStandingsProps {
  sort_type: SortType;
}

export function LeagueStandings({ sort_type }: LeagueStandingsProps) {
  const { leagueData, isLoading, error } = useContext(DataContext);

  if (isLoading) return <div className="p-4">Loading standings...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  if (!leagueData || !leagueData.ranks || leagueData.ranks.length === 0) {
    return <div className="p-4">No standings data found.</div>;
  }

  let sortedRanks: TeamRank[];
  let tableTitle: string;
  let mainColumnHeader: string;
  let getMainColumnValue: (teamRank: TeamRank) => number | string;

  const baseRanks = [...leagueData.ranks];

  switch (sort_type) {
    case "goalsConceded":
      sortedRanks = baseRanks.sort((a, b) => a.goals_a - b.goals_a);
      tableTitle = "Top 5 - Goals Conceded";
      mainColumnHeader = "GA"; // Abbreviated for narrower column
      getMainColumnValue = (team) => team.goals_a;
      break;
    case "goalsFor":
      sortedRanks = baseRanks.sort((a, b) => b.goals_f - a.goals_f);
      tableTitle = "Top 5 - Goals For";
      mainColumnHeader = "GF"; // Abbreviated for narrower column
      getMainColumnValue = (team) => team.goals_f;
      break;
    default:
      sortedRanks = baseRanks;
      tableTitle = "League Standings";
      mainColumnHeader = "Pts"; // Abbreviated for narrower column
      getMainColumnValue = (team) => team.points;
      break;
  }

  const ranksToDisplay =
    sort_type !== "default" ? sortedRanks.slice(0, 5) : sortedRanks;

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-md shadow-lg mt-4 border border-gray-100 dark:border-zinc-800">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        {tableTitle}
      </h2>
      <div className="overflow-x-auto border border-gray-100 rounded-lg dark:border-gray-700">
        <table className="w-full dark:bg-zinc-950">
          <thead className="bg-gray-50 dark:bg-zinc-800">
            <tr className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {/* Rank Column */}
              <th className="px-4 py-3 text-left w-12">#</th>

              {/* Team Column */}
              <th className="px-4 py-3 text-left min-w-[180px]">Team</th>

              {/* Main Dynamic Column */}
              <th className="px-4 py-3 text-left w-24">{mainColumnHeader}</th>

              {/* GP Column */}
              <th className="px-4 py-3 text-left w-16">GP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
            {ranksToDisplay.map((teamRank) => (
              <tr
                key={teamRank.team_id}
                className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
              >
                {/* Rank */}
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 font-medium">
                  {teamRank.rank}
                </td>

                {/* Team with Logo */}
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    {teamRank.team_logo && (
                      <div className="flex-shrink-0 h-6 w-6 rounded-full overflow-hidden bg-gray-100 dark:bg-zinc-700">
                        <Image
                          src={teamRank.team_logo}
                          alt={teamRank.team_name}
                          width={24}
                          height={24}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="text-gray-900 dark:text-gray-100 font-medium truncate">
                      {teamRank.team_name}
                    </span>
                  </div>
                </td>

                {/* Main Value */}
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100 font-medium">
                  {getMainColumnValue(teamRank)}
                </td>

                {/* Games Played */}
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {teamRank.gp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

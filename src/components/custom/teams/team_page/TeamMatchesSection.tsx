// src/components/custom/teams/team_page/TeamMatchesSection.tsx
"use client";

import { useContext } from "react";
import { DataContext } from "@/context/TeamPageDataContext";
import Image from "next/image";
import Link from "next/link";
import { Match, MatchTeamInfo } from "@/types/TeamTypes"; // Import Match and MatchTeamInfo interfaces

export function TeamMatchesSection() {
  const { teamData, isLoading, error } = useContext(DataContext);

  if (isLoading) {
    return <div className="p-4 text-center">Loading matches...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading matches: {error.message}
      </div>
    );
  }

  if (!teamData || !teamData.matches || teamData.matches.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No recent match data available for this team.
      </div>
    );
  }

  const matches = teamData.matches; // All matches for the team

  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Determine if the match is a win, loss, or draw for the current team
  const getMatchOutcomeClass = (match: Match, currentTeamId: number) => {
    if (match.result.isDraw) {
      return "text-yellow-500"; // Draw
    } else if (match.result.win_team === currentTeamId) {
      return "text-green-500"; // Win
    } else if (match.result.loss_team === currentTeamId) {
      return "text-red-500"; // Loss
    }
    return "text-gray-500"; // Default
  };

  return (
    <section className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Recent Matches
      </h2>
      <div className="space-y-4">
        {matches.map((match) => (
          <div
            key={match.match_id}
            className="p-3 bg-zinc-900 dark:bg-zinc-850 rounded-lg shadow-md border border-zinc-700 hover:border-blue-500 transition-colors duration-200 text-sm overflow-hidden"
          >
            {/* CONTAINER FOR COMPETITION AND DATE/ROUND */}
            <div className="flex text-xs mb-2 gap-x-2 items-start">
              {/* Competition Name and Logo (Optional Link) */}
              {match.comp_name && (
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  {match.comp_url && (
                    <Image
                      src={match.comp_url}
                      alt={match.comp_name}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  )}
                  <span className="text-xs md:hidden">{match.comp_name}</span>
                </div>
              )}

              {/* Match Date and Round */}
              <div className="text-gray-400">
                <span>
                  {formatDate(match.match_date)} - MD: {match.round}
                </span>
              </div>
            </div>

            {/* UPDATED MATCH SCORE LAYOUT TO MATCH IMAGE */}
            <div className="flex items-center justify-between text-white ">
              {/* Home Team */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/teams/${match.home_team.team_id || ""}`}
                  className="hover:underline hover:underline-offset-4 text-sm"
                >
                  {match.home_team.team_name}
                </Link>
                {match.home_team.team_logo && (
                  <div className="relative w-6 h-6 flex-shrink-0 overflow-hidden">
                    <Image
                      src={match.home_team.team_logo}
                      alt={match.home_team.team_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Score */}
              <div className="flex items-center gap-1 mx-2">
                <span
                  className={`font-bold text-base ${getMatchOutcomeClass(
                    match,
                    teamData?.info.team_id || 0,
                  )}`}
                >
                  {match.home_team.goals}
                </span>
                <span className="text-gray-400">-</span>
                <span
                  className={`font-bold text-base ${getMatchOutcomeClass(
                    match,
                    teamData?.info.team_id || 0,
                  )}`}
                >
                  {match.away_team.goals}
                </span>
              </div>

              {/* Away Team */}
              <div className="flex items-center gap-2">
                {match.away_team.team_logo && (
                  <div className="relative w-6 h-6 flex-shrink-0 overflow-hidden">
                    <Image
                      src={match.away_team.team_logo}
                      alt={match.away_team.team_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <Link
                  href={`/teams/${match.away_team.team_id || ""}`}
                  className="hover:underline hover:underline-offset-4 text-sm"
                >
                  {match.away_team.team_name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

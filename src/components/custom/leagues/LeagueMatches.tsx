// src/components/LeagueMatches.tsx
"use client";

import { useContext } from "react";
import { DataContext } from "@/context/LeagueDataContext";
import Image from "next/image";
import Link from "next/link";

export function LeagueMatches() {
  const { leagueData, isLoading, error } = useContext(DataContext);

  if (isLoading) return <div className="p-4">Loading matches...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  if (!leagueData || !leagueData.matches || leagueData.matches.length === 0) {
    return <div className="p-4">No recent matches found.</div>;
  }

  const matches = leagueData.matches;

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg shadow mt-4">
      <h2 className="text-xl font-semibold mb-4">Recent Matches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <div
            key={match.match_id}
            className="border dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-zinc-950"
          >
            <p className="text-sm text-gray-500">
              {new Date(match.match_date).toLocaleDateString()} - Round:{" "}
              {match.round}
            </p>
            <div className="text-sm font-medium">
              {/* Home Team */}
              <div className="flex gap-x-1 items-center">
                <div className="relative w-6 h-6 overflow-hidden">
                  <Image
                    src={match.home_logo}
                    alt={match.home_team_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span>{match.home_goals}</span>
                <span>-</span>
                <Link
                  href={`/teams/${match?.home_id || ""}`}
                  className="hover:underline hover:underline-offset-4"
                >
                  {match.home_team_name}
                </Link>
              </div>

              {/* Away Team */}
              <div className="flex gap-x-1 items-center mt-1">
                <div className="relative w-6 h-6 overflow-hidden">
                  <Image
                    src={match.away_logo}
                    alt={match.away_team_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span>{match.away_goals}</span>
                <span>-</span>
                <Link
                  href={`/teams/${match?.away_id || ""}`}
                  className="hover:underline hover:underline-offset-4"
                >
                  {match.away_team_name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// src/components/custom/MatchHeader.tsx
"use client";
import { useContext } from "react";
import { MatchDataContext } from "@/context/matches/MatchDataProvider";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

export function MatchHeader() {
  const { matchData, isLoading, error } = useContext(MatchDataContext);

  if (isLoading) return <div className="p-4">Loading matches...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  if (!matchData || !matchData.data)
    return <div className="p-4">No match data found.</div>;

  const match_info = matchData.data.match_info;
  const home = matchData.data.teams.home;
  const away = matchData.data.teams.away;

  const home_id = home.info.team.team_id;
  const home_name = home.info.team.team_name;
  const home_logo = home.info.team.team_logo;
  const home_manager = home.info.manager.name;
  const home_goals = home.team_stats.goals;

  const away_id = away.info.team.team_id;
  const away_name = away.info.team.team_name;
  const away_logo = away.info.team.team_logo;
  const away_manager = away.info.manager.name;
  const away_goals = away.team_stats.goals;

  // Format date and time
  const matchDate = format(
    new Date(match_info.date_time_utc),
    "EEEE, MMMM d, yyyy",
  );
  const matchTime = format(new Date(match_info.date_time_utc), "h:mm a");

  return (
    <div className="bg-card border rounded-lg shadow-sm">
      {/* Competition Header */}
      <div className="flex items-center justify-center p-4 bg-muted/50">
        <div className="flex items-center gap-2">
          {match_info.comp_logo && (
            <Image
              src={match_info.comp_logo}
              alt={match_info.comp}
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
          )}
          <h1 className="font-bold text-lg">{match_info.comp}</h1>
        </div>
      </div>

      {/* Match Info */}
      <div className="p-4 text-center">
        <div className="text-sm text-muted-foreground">
          {match_info.round} • {matchDate}
        </div>
        <div className="text-sm font-medium mt-1">{matchTime} UTC</div>
      </div>

      {/* Teams and Score */}
      <div className="grid grid-cols-3 items-center p-4 gap-4">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-2">
          <Link
            href={`/teams/${home_id}`}
            className="flex flex-col items-center hover:underline"
          >
            <Image
              src={home_logo}
              alt={home_name}
              width={60}
              height={60}
              className="w-12 h-12 object-contain"
            />
            <span className="font-bold text-center">{home_name}</span>
          </Link>
          <div className="text-xs text-muted-foreground">{home_manager}</div>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold">
            {home_goals} - {away_goals}
          </div>
          {match_info.et && (
            <div className="text-xs text-muted-foreground mt-1">
              After Extra Time
            </div>
          )}
          {match_info.pens && (
            <div className="text-xs text-muted-foreground">(Penalties)</div>
          )}
          <div className="mt-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {match_info.result}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-2">
          <Link
            href={`/teams/${away_id}`}
            className="flex flex-col items-center hover:underline"
          >
            <Image
              src={away_logo}
              alt={away_name}
              width={60}
              height={60}
              className="w-12 h-12 object-contain"
            />
            <span className="font-bold text-center">{away_name}</span>
          </Link>
          <div className="text-xs text-muted-foreground">{away_manager}</div>
        </div>
      </div>

      {/* Additional Match Info */}
      <div className="p-4 border-t text-sm text-center text-muted-foreground">
        <Image
          src="/icons/others/stadium.svg" // Path relative to public folder
          alt="Competition Logo"
          width={24} // Set your desired width
          height={24} // Set your desired height
          className="w-7 h-7 dark:invert" // Optional: Tailwind classes for additional sizing
        />
        Season {match_info.season_year}
      </div>
    </div>
  );
}

// src/components/LeagueHeader.tsx
"use client";

import { useContext } from "react";
import { DataContext } from "@/context/LeagueDataContext";
import Image from "next/image";
import Link from "next/link";

export function LeagueHeader() {
  const { leagueData, isLoading, error } = useContext(DataContext);

  if (isLoading) return <header className="p-4">Loading league info...</header>;
  if (error)
    return <header className="p-4 text-red-500">Error: {error.message}</header>;

  // Check if leagueData and leagueData.info are available
  if (!leagueData || !leagueData.info) {
    return <header className="p-4">No league info found.</header>;
  }

  const leagueInfo = leagueData.info;

  return (
    <header className="font-[family-name:var(--font-geist-mono)] bg-zinc-200 dark:bg-zinc-800 rounded-lg p-2 mt-15 mx-6 p-4">
      <h1 className="flex text-2xl font-bold">{leagueInfo.league_name}</h1>
      <div className="flex">
        <Image
          src={leagueInfo.league_logo}
          alt={leagueInfo.league_name}
          width={70}
          height={70}
        />
      </div>

      <div className="flex mt-4 space-x-4">
        {/*
          Example links (adjust based on your actual routing and data availability)
          These links might need the leagueId directly from params if they aren't
          fully derivable from leagueInfo.
        */}
        <Link
          href={`/leagues/${leagueInfo.comp_id}/overview`}
          className="hover:underline hover:underline-offset-4"
        >
          Overview
        </Link>
        <Link
          href={`/leagues/${leagueInfo.comp_id}/standings`}
          className="hover:underline hover:underline-offset-4"
        >
          Standings
        </Link>
        <Link
          href={`/leagues/${leagueInfo.comp_id}/matches`}
          className="hover:underline hover:underline-offset-4"
        >
          Matches
        </Link>
        {/* ... other league-specific links */}
      </div>
    </header>
  );
}

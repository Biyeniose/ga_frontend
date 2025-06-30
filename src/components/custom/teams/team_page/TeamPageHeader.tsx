"use client";

import { DataContext } from "@/context/TeamPageDataContext";
import { useContext } from "react";

import Image from "next/image";
import Link from "next/link";

export function TeamPageHeader() {
  const { teamData, isLoading, error } = useContext(DataContext);

  if (isLoading) return <div className="p-4">Loading team info...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  if (!teamData || !teamData.info) {
    return <div className="p-4">Team data not found</div>;
  }

  // destructure the api response here
  const teamInfo = teamData.info;

  return (
    <header className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6 mb-6 mt-9">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-shrink-0">
          <Image
            src={teamInfo.logo_url}
            alt={teamInfo.team_name}
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {teamInfo.team_name2}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {teamInfo.stadium} - {teamInfo.city}
          </p>

          <div className="flex text-gray-600 dark:text-gray-300 mt-1 gap-x-2 items-center">
            <div className="flex-shrink-0">
              <Image
                src={teamInfo.nation_url}
                alt={teamInfo.current_league_name}
                width={30}
                height={30}
                className="rounded-lg"
              />
            </div>
            <Link
              href={`/leagues/${teamInfo.curr_league_id}`}
              className="text-gray-600 dark:text-gray-400 hover:underline"
            >
              {teamInfo.current_league_name}
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              href={`/teams/${teamInfo.team_id}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Home
            </Link>
            <Link
              href={`/teams/${teamInfo.team_id}/allplayers`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Squads
            </Link>
            <Link
              href={`/teams/${teamInfo.team_id}/standings`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Standings
            </Link>
            <Link
              href={`/teams/${teamInfo.team_id}/matches`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Matches
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

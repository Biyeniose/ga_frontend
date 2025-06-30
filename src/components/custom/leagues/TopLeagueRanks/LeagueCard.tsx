"use client";

import Image from "next/image";
import Link from "next/link";
import { League } from "@/types/LeagueTypes";
import { TeamRow } from "./TeamRow";

interface LeagueCardProps {
  league: League;
}

export const LeagueCard: React.FC<LeagueCardProps> = ({ league }) => {
  return (
    <div className="grid grid-cols-8 gap-3 rounded-lg border border-gray-500 dark:border-gray-400 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* League Header Box */}
      <div className="col-span-8 p-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
        <div className="flex items-center gap-3">
          <div className="relative aspect-square w-8 h-8 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
            <Image
              src={league.country_url}
              alt="Country flag"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              <Link
                href={`/leagues/${league.comp_id}`}
                className="hover:underline hover:underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {league.league_name}
              </Link>
            </h2>
          </div>
        </div>
      </div>

      {/* Stats Header */}
      <div className="col-span-8 px-2 pt-2">
        <div className="grid grid-cols-8 gap-3">
          <div className="col-span-5"></div> {/* Spacer */}
          <div className="col-span-3">
            <div className="flex gap-2 h-full">
              {["PTS", "GP", "GD"].map((stat) => (
                <div
                  key={stat}
                  className="flex-1 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300 py-1"
                >
                  {stat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Teams List */}
      <div className="col-span-8">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {league.ranks.slice(0, 20).map((team) => (
            <TeamRow key={team.team_id} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
};

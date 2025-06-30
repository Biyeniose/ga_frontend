"use client";

// components/TeamRow.tsx
import Image from "next/image";
import Link from "next/link";
import { TeamRank } from "@/types/LeagueTypes";

interface TeamRowProps {
  team: TeamRank;
}

export const TeamRow: React.FC<TeamRowProps> = ({ team }) => {
  const getRankColor = (rank: string) => {
    const rankNum = parseInt(rank);
    if (rankNum === 1) return "dark:text-green-500 text-green-600";
    if (rankNum <= 4) return "dark:blue-white-400 text-blue-500";
    return "dark:gray-500 text-gray";
  };

  return (
    <div className="grid grid-cols-8 gap-3 items-center py-2 px-2 min-h-[2rem]">
      {" "}
      {/* Fixed row height */}
      {/* Rank Column (1) */}
      {/* Team Info Columns (2-5) */}
      {/* Team Info Columns (1-5) */}
      <div className="col-span-5 flex items-center gap-2">
        <div className={`text-sm font-bold ${getRankColor(team.rank)}`}>
          {team.rank}
        </div>
        <div className="relative w-8 h-8">
          <Image
            src={team.team_logo}
            alt={`${team.team_name} logo`}
            fill
            className="object-contain"
          />
        </div>
        <h2 className="font-medium text-sm dark:gray-500 text-gray">
          <Link
            href={`/teams/${team.team_id}`}
            className="hover:underline hover:underline-offset-4"
          >
            {team.team_name}
          </Link>
        </h2>
      </div>
      {/* Stats Columns (6-9) - Aligned with your PTS/GP/GD headers */}
      <div className="col-span-3 grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className="mt-1 font-medium text-sm">{team.points}</div>
        </div>
        <div className="text-center">
          <div className="mt-1 font-medium text-sm">{team.gp}</div>
        </div>
        <div className="text-center">
          <div
            className={`mt-1 font-medium text-sm ${
              team.gd >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {team.gd > 0 ? "+" : ""}
            {team.gd}
          </div>
        </div>
      </div>
    </div>
  );
};

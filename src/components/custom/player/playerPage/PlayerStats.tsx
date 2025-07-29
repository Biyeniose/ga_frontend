"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PlayerLatestStats } from "@/types/PlayerTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";

interface PlayerStatsProps {
  stats: PlayerLatestStats[];
}

type SortKey =
  | "gp"
  | "minutes_per_game"
  | "goals"
  | "assists"
  | "ga"
  | "minutes_per_ga"
  | "games_per_ga";
type SortDirection = "asc" | "desc";

export function PlayerStats({ stats }: PlayerStatsProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  } | null>(null);

  // Filter out "All Competitions" data
  const filteredStats = stats.filter((stat) => stat.comp.comp_id !== 9999);

  // Calculate totals
  const totals = filteredStats.reduce(
    (acc, stat) => ({
      gp: acc.gp + (stat.gp || 0),
      minutes: acc.minutes + (stat.minutes || 0),
      goals: acc.goals + (stat.goals || 0),
      assists: acc.assists + (stat.assists || 0),
      ga: acc.ga + (stat.ga || 0),
      yellows: acc.yellows + (stat.yellows || 0),
      reds: acc.reds + (stat.reds || 0),
    }),
    { gp: 0, minutes: 0, goals: 0, assists: 0, ga: 0, yellows: 0, reds: 0 },
  );

  const calculateMinutesPerGame = (minutes: number, gp: number) => {
    if (gp === 0) return 0;
    return minutes / gp;
  };

  const calculateMinutesPerGA = (minutes: number, ga: number) => {
    if (ga === 0) return 0;
    return minutes / ga;
  };

  const calculateGamesPerGA = (gp: number, ga: number) => {
    if (ga === 0) return 0;
    return gp / ga;
  };

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedStats = () => {
    if (!sortConfig) return filteredStats;

    return [...filteredStats].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortConfig.key) {
        case "gp":
          aValue = a.gp || 0;
          bValue = b.gp || 0;
          break;
        case "minutes_per_game":
          aValue = calculateMinutesPerGame(a.minutes || 0, a.gp || 0);
          bValue = calculateMinutesPerGame(b.minutes || 0, b.gp || 0);
          break;
        case "goals":
          aValue = a.goals || 0;
          bValue = b.goals || 0;
          break;
        case "assists":
          aValue = a.assists || 0;
          bValue = b.assists || 0;
          break;
        case "ga":
          aValue = a.ga || 0;
          bValue = b.ga || 0;
          break;
        case "minutes_per_ga":
          aValue = calculateMinutesPerGA(a.minutes || 0, a.ga || 0);
          bValue = calculateMinutesPerGA(b.minutes || 0, b.ga || 0);
          break;
        case "games_per_ga":
          aValue = calculateGamesPerGA(a.gp || 0, a.ga || 0);
          bValue = calculateGamesPerGA(b.gp || 0, b.ga || 0);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedStats = getSortedStats();

  const truncateText = (text: string, maxLength: number = 20) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const SortableHeader = ({
    children,
    sortKey,
    className = "",
  }: {
    children: React.ReactNode;
    sortKey: SortKey;
    className?: string;
  }) => (
    <TableHead
      className={`cursor-pointer hover:bg-gray-700 text-center text-white border border-gray-700 hover:border-blue-500 ${className}`}
      onClick={() => requestSort(sortKey)}
    >
      <div className="flex items-center justify-center">
        {children}
        <ArrowUpDown className="ml-1 h-3 w-3" />
        {sortConfig?.key === sortKey && (
          <span className="ml-1 text-xs">
            {sortConfig.direction === "asc" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </TableHead>
  );

  return (
    <section className="bg-black rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Season Statistics</h2>

      <div className="rounded-md border border-gray-700 hover:border-blue-500">
        <Table className="text-white">
          <TableHeader>
            <TableRow className="border border-gray-700 hover:border-blue-500">
              <TableHead className="w-[35%] md:w-[35%] min-w-[120px] text-white border border-gray-700 hover:border-blue-500">
                Competition
              </TableHead>
              <TableHead className="w-[15%] md:w-[8%] text-center text-white border border-gray-700 hover:border-blue-500">
                Team
              </TableHead>
              <SortableHeader sortKey="gp" className="w-[15%] md:w-[8%]">
                GP
              </SortableHeader>
              <SortableHeader
                sortKey="minutes_per_game"
                className="hidden md:table-cell w-[10%]"
              >
                Min/Game
              </SortableHeader>
              <SortableHeader sortKey="goals" className="w-[15%] md:w-[8%]">
                G
              </SortableHeader>
              <SortableHeader sortKey="assists" className="w-[15%] md:w-[8%]">
                A
              </SortableHeader>
              <SortableHeader sortKey="ga" className="w-[15%] md:w-[8%]">
                G+A
              </SortableHeader>
              <SortableHeader
                sortKey="minutes_per_ga"
                className="hidden md:table-cell w-[8%]"
              >
                Min/G+A
              </SortableHeader>
              <SortableHeader
                sortKey="games_per_ga"
                className="hidden md:table-cell w-[7%]"
              >
                Games/G+A
              </SortableHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStats.map((stat) => (
              <TableRow
                key={stat.stats_id}
                className="hover:bg-gray-800 border border-gray-700 hover:border-blue-500"
              >
                <TableCell className="font-medium text-white border border-gray-700 hover:border-blue-500">
                  <div className="flex items-center gap-2">
                    {stat.comp.comp_url ? (
                      <div className="relative w-4 h-4 md:w-5 md:h-5 flex-shrink-0">
                        <Image
                          src={stat.comp.comp_url}
                          alt={stat.comp.comp_name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-gray-600 rounded-full flex-shrink-0" />
                    )}
                    <Link
                      href={`/leagues/${stat.comp.comp_id}`}
                      className="truncate text-xs md:text-sm hover:text-blue-400 transition-colors duration-200"
                      title={stat.comp.comp_name}
                    >
                      <span className="md:hidden">
                        {truncateText(stat.comp.comp_name, 8)}
                      </span>
                      <span className="hidden md:inline">
                        {truncateText(stat.comp.comp_name, 25)}
                      </span>
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="text-center border border-gray-700 hover:border-blue-500">
                  <Link
                    href={`/teams/${stat.team.team_id}`}
                    className="flex justify-center hover:opacity-80 transition-opacity duration-200"
                  >
                    <div className="relative w-5 h-5 md:w-6 md:h-6">
                      <Image
                        src={stat.team.logo}
                        alt={stat.team.team_name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-center font-medium text-white text-sm md:text-base border border-gray-700 hover:border-blue-500">
                  {stat.gp || 0}
                </TableCell>
                <TableCell className="hidden md:table-cell text-center text-sm text-white border border-gray-700 hover:border-blue-500">
                  {calculateMinutesPerGame(
                    stat.minutes || 0,
                    stat.gp || 0,
                  ).toFixed(1)}
                </TableCell>
                <TableCell className="text-center font-medium text-white text-sm md:text-base border border-gray-700 hover:border-blue-500">
                  {stat.goals || 0}
                </TableCell>
                <TableCell className="text-center font-medium text-white text-sm md:text-base border border-gray-700 hover:border-blue-500">
                  {stat.assists || 0}
                </TableCell>
                <TableCell className="text-center font-medium text-white text-sm md:text-base border border-gray-700 hover:border-blue-500">
                  {stat.ga || 0}
                </TableCell>
                <TableCell className="hidden md:table-cell text-center font-bold text-blue-400 border border-gray-700 hover:border-blue-500">
                  {calculateMinutesPerGA(
                    stat.minutes || 0,
                    stat.ga || 0,
                  ).toFixed(1)}
                </TableCell>
                <TableCell className="hidden md:table-cell text-center font-bold text-green-400 border border-gray-700 hover:border-blue-500">
                  {calculateGamesPerGA(stat.gp || 0, stat.ga || 0).toFixed(1)}
                </TableCell>
              </TableRow>
            ))}

            {/* Totals Row */}
            <TableRow className="border-t-2 border-blue-400/20 bg-gray-800/50 font-semibold hover:bg-gray-800/70 border border-gray-700 hover:border-blue-500">
              <TableCell className="font-bold text-blue-400 border border-gray-700 hover:border-blue-500">
                Total
              </TableCell>
              <TableCell className="border border-gray-700 hover:border-blue-500"></TableCell>
              <TableCell className="text-center font-bold text-white text-sm md:text-base border border-gray-700 hover:border-blue-500">
                {totals.gp}
              </TableCell>
              <TableCell className="hidden md:table-cell text-center text-sm font-bold text-white border border-gray-700 hover:border-blue-500">
                {calculateMinutesPerGame(totals.minutes, totals.gp).toFixed(1)}
              </TableCell>
              <TableCell className="text-center font-bold text-white text-sm md:text-base border border-gray-700 hover:border-blue-500">
                {totals.goals}
              </TableCell>
              <TableCell className="text-center font-bold text-white text-sm md:text-base border border-gray-700 hover:border-blue-500">
                {totals.assists}
              </TableCell>
              <TableCell className="text-center font-bold text-white text-sm md:text-base border border-gray-700 hover:border-blue-500">
                {totals.ga}
              </TableCell>
              <TableCell className="hidden md:table-cell text-center font-bold text-blue-400 border border-gray-700 hover:border-blue-500">
                {calculateMinutesPerGA(totals.minutes, totals.ga).toFixed(1)}
              </TableCell>
              <TableCell className="hidden md:table-cell text-center font-bold text-green-400 border border-gray-700 hover:border-blue-500">
                {calculateGamesPerGA(totals.gp, totals.ga).toFixed(1)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

"use client";
import { useContext, useState } from "react";
import { MatchDataContext } from "@/context/matches/MatchDataProvider";
import { LineupPlayer, PlayerStats } from "@/types/MatchTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export function MatchStats() {
  const { matchData, isLoading, error } = useContext(MatchDataContext);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PlayerStats;
    direction: "asc" | "desc";
  } | null>(null);

  if (isLoading) return <div className="p-4 text-xs">Loading...</div>;
  if (error)
    return (
      <div className="p-4 text-red-500 text-xs">Error: {error.message}</div>
    );
  if (!matchData?.data) return <div className="p-4 text-xs">No data</div>;

  const { home, away } = matchData.data.teams;

  const requestSort = (key: keyof PlayerStats) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedPlayers = (players: LineupPlayer[]) => {
    if (!sortConfig) return players;
    return [...players].sort((a, b) => {
      const aValue = a.stats?.[sortConfig.key];
      const bValue = b.stats?.[sortConfig.key];

      // Handle null/undefined values - they should come after actual numbers (including 0)
      const aIsNull = aValue === null || aValue === undefined;
      const bIsNull = bValue === null || bValue === undefined;

      if (aIsNull && bIsNull) return 0;
      if (aIsNull) return 1; // null values go to the end
      if (bIsNull) return -1; // null values go to the end

      // Both values are numbers (including 0)
      const aNum = Number(aValue);
      const bNum = Number(bValue);

      if (aNum < bNum) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aNum > bNum) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const safeStatValue = (
    value: number | null | undefined,
    isPercentage = false,
  ) => {
    if (value === null || value === undefined) return "-";
    if (isPercentage) return `${value}%`;
    if (typeof value === "number" && !Number.isInteger(value))
      return value.toFixed(2);
    return value;
  };

  const renderPlayersTable = (
    players: LineupPlayer[],
    showTeamColumn = false,
  ) => {
    const sorted = sortedPlayers(players);

    return (
      <div className="relative overflow-hidden rounded-md border ">
        <div className="overflow-x-auto text-xs">
          <Table className="relative">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 z-20 min-w-[150px] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-xs">
                  Player
                </TableHead>
                {showTeamColumn && (
                  <TableHead className="min-w-[60px] text-xs">Team</TableHead>
                )}
                <SortableHeader
                  title="Min"
                  sortKey="minutes"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                />
                <SortableHeader
                  title="Gls"
                  sortKey="goals"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                />
                <SortableHeader
                  title="Ast"
                  sortKey="assists"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                />
                <SortableHeader
                  title="Shts"
                  sortKey="shots"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                />
                <SortableHeader
                  title="Pass %"
                  sortKey="passes_pct"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                />
                <SortableHeader
                  title="Tkls"
                  sortKey="tackles"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                />
                <SortableHeader
                  title="Intps"
                  sortKey="interceptions"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                />
                <SortableHeader
                  title="xG"
                  sortKey="xg"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                />
                <SortableHeader
                  title="xA"
                  sortKey="xg_assist"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                />
                <SortableHeader
                  title="Fls"
                  sortKey="fouls"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                />
                <SortableHeader
                  title="Cds"
                  sortKey="cards_yellow"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="sticky left-0 z-10 font-medium border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-xs">
                    <Link
                      href={`/players/${player.player.id}`}
                      className="hover:text-blue-600 transition-colors duration-200"
                    >
                      {player.player.name}
                    </Link>
                  </TableCell>
                  {showTeamColumn && (
                    <TableCell className="min-w-[60px]">
                      <img
                        src={
                          player.team_id === home.info.team.team_id
                            ? home.info.team.team_logo
                            : away.info.team.team_logo
                        }
                        alt={
                          player.team_id === home.info.team.team_id
                            ? home.info.team.team_name
                            : away.info.team.team_name
                        }
                        className="w-5 h-5 object-contain"
                      />
                    </TableCell>
                  )}
                  <TableCell className="text-xs">
                    {safeStatValue(player.stats?.minutes)}
                  </TableCell>
                  <TableCell className="text-xs">
                    {safeStatValue(player.stats?.goals)}
                  </TableCell>
                  <TableCell className="text-xs">
                    {safeStatValue(player.stats?.assists)}
                  </TableCell>
                  <TableCell className="text-xs">
                    {safeStatValue(player.stats?.shots)}
                  </TableCell>
                  <TableCell className="text-xs">
                    {safeStatValue(player.stats?.passes_pct, true)}
                  </TableCell>
                  <TableCell className="text-xs">
                    {safeStatValue(player.stats?.tackles)}
                  </TableCell>
                  <TableCell className="text-xs">
                    {safeStatValue(player.stats?.interceptions)}
                  </TableCell>
                  <TableCell className="text-xs">
                    {safeStatValue(player.stats?.xg)}
                  </TableCell>
                  <TableCell className="text-xs">
                    {safeStatValue(player.stats?.xg_assist)}
                  </TableCell>
                  <TableCell className="text-xs">
                    {safeStatValue(player.stats?.fouls)}
                  </TableCell>
                  <TableCell className="text-xs">
                    {(player.stats?.cards_yellow ?? 0) > 0 && "🟨"}
                    {(player.stats?.cards_red ?? 0) > 0 && "🟥"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  // Combine all players for the "both" tab - handle null lineups
  const homeLineups = home.lineups || []A;
  const awayLineups = away.lineups || [];
  const allPlayers = [...homeLineups, ...awayLineups];

  return (
    <div className="p-2 sm:p-4 text-xs">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Match Player Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="home" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="home" className="text-xs">
                {home.info.team.team_name}
              </TabsTrigger>
              <TabsTrigger value="away" className="text-xs">
                {away.info.team.team_name}
              </TabsTrigger>
              <TabsTrigger value="both" className="text-xs">
                Both Teams
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="mt-4">
              {renderPlayersTable(home.lineups, false)}
            </TabsContent>

            <TabsContent value="away" className="mt-4">
              {renderPlayersTable(away.lineups, false)}
            </TabsContent>

            <TabsContent value="both" className="mt-4">
              {renderPlayersTable(allPlayers, true)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function SortableHeader({
  title,
  sortKey,
  sortConfig,
  onSort,
}: {
  title: string;
  sortKey: keyof PlayerStats;
  sortConfig: { key: keyof PlayerStats; direction: "asc" | "desc" } | null;
  onSort: (key: keyof PlayerStats) => void;
}) {
  return (
    <TableHead
      className="cursor-pointer hover:bg-muted/50 text-xs"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center text-xs">
        {title}
        <ArrowUpDown className="ml-2 h-3 w-3" />
        {sortConfig?.key === sortKey && (
          <span className="text-xs">
            {sortConfig.direction === "asc" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </TableHead>
  );
}

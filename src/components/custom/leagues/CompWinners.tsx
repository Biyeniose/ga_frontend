"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useTopCompWinners } from "@/hooks/leagues/leagueRoutes";
import { Stat } from "@/types/LeagueTypes";
import Link from "next/link";

export function CompWinners() {
  const { data, isLoading, error } = useTopCompWinners();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading league winners: {error.message}
      </div>
    );
  }

  if (!data?.data.stats.length) {
    return (
      <div className="text-gray-500">No league winners data available</div>
    );
  }

  return (
    <div className="space-y-6">
      {data.data.stats.map((stat) => (
        <LeagueWinnerCard key={stat.comp.comp_id} stat={stat} />
      ))}
    </div>
  );
}

function LeagueWinnerCard({ stat }: { stat: Stat }) {
  // Sort winners by season in descending order
  const sortedWinners = [...stat.win_teams].sort((a, b) => b.season - a.season);

  return (
    <Card className="w-full max-w-4xl">
      {" "}
      {/* or max-w-7xl, max-w-screen-lg, etc */}{" "}
      <CardHeader className="flex flex-row items-center space-x-4 space-y-0">
        {stat.comp.league_logo && (
          <Image
            src={stat.comp.league_logo}
            alt={`${stat.comp.league_name} logo`}
            width={40}
            height={40}
            className="rounded-md flex-shrink-0"
          />
        )}
        <div className="min-w-0">
          {" "}
          {/* Add this container for text truncation */}
          <CardTitle className="truncate">
            <Link
              href={`/leagues/${stat.comp.comp_id}`}
              className="hover:underline truncate"
            >
              {stat.comp.league_name}
            </Link>
          </CardTitle>
          <p className="text-sm text-muted-foreground truncate">
            {stat.comp.country} • {stat.comp.type}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Team</TableHead>
              <TableHead className="w-[150px]">Season</TableHead>
              <TableHead className="w-[150px]">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedWinners.map((winner) => (
              <TableRow key={winner.rank_id}>
                <TableCell className="flex items-center space-x-3 min-w-0">
                  {winner.team.logo && (
                    <Image
                      src={winner.team.logo}
                      alt={`${winner.team.team_name} logo`}
                      width={30}
                      height={30}
                      className="rounded-md flex-shrink-0"
                    />
                  )}
                  <Link
                    href={`/teams/${winner.team.team_id}`}
                    className="hover:underline truncate"
                  >
                    <span className="truncate">{winner.team.team_name}</span>
                  </Link>
                </TableCell>
                <TableCell className="truncate">{winner.season}</TableCell>
                <TableCell className="truncate">{winner.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

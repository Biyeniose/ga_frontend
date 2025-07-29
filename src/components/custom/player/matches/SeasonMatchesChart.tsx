"use client";
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { usePlayerMatches } from "@/hooks/players/playerRoutes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MyComponentProps {
  playerId: number;
  season: number;
}

interface ChartDataPoint {
  date: string;
  month: string;
  minutes: number;
  ga: number;
  formattedDate: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string | null | undefined;
  awayLogo: string | null | undefined;
  result: string;
  matchDate: string;
  isPlaceholder?: boolean;
}

const SeasonMatchesChart = ({ playerId, season }: MyComponentProps) => {
  const [viewMode, setViewMode] = React.useState<"minutes" | "ga">("minutes");
  const { data, isLoading, error } = usePlayerMatches(playerId, season);

  if (isLoading)
    return (
      <div className="flex justify-center items-center p-8 bg-black rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-red-400 bg-black rounded-lg flex items-center gap-2">
        <span>⚠️</span>
        <span>Error: {error.message}</span>
      </div>
    );

  if (!data || !data.data)
    return (
      <div className="p-6 bg-black rounded-lg flex items-center gap-2 text-white">
        <span>🔍</span>
        <span>Player season matches not found</span>
      </div>
    );

  const matches = data.data.matches;

  const createSeasonMonths = (seasonYear: number) => {
    const months = [];
    for (let month = 7; month <= 11; month++) {
      months.push(new Date(seasonYear, month, 1));
    }
    for (let month = 0; month <= 6; month++) {
      months.push(new Date(seasonYear + 1, month, 1));
    }
    return months;
  };

  const createFullSeasonData = (matches: any[], seasonYear: number) => {
    const seasonMonths = createSeasonMonths(seasonYear);
    const result: ChartDataPoint[] = [];

    const matchData = matches
      .filter((match) => match.player_stats?.basic?.minutes !== undefined)
      .map((match) => {
        const matchDate = new Date(
          match.match_info.date_time_utc || match.match_info.match_date,
        );
        const goals = match.player_stats?.basic?.goals || 0;
        const assists = match.player_stats?.basic?.assists || 0;
        return {
          date: match.match_info.date_time_utc || match.match_info.match_date,
          month: matchDate.toLocaleDateString("en-US", { month: "short" }),
          minutes: match.player_stats?.basic?.minutes || 0,
          ga: goals + assists,
          formattedDate: matchDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          homeTeam: match.teams.home.team.team_name,
          awayTeam: match.teams.away.team.team_name,
          homeLogo: match.teams.home.team.logo,
          awayLogo: match.teams.away.team.logo,
          result: match.match_info.result,
          matchDate: matchDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          isPlaceholder: false,
        };
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    seasonMonths.forEach((monthDate) => {
      const monthStr = monthDate.toLocaleDateString("en-US", {
        month: "short",
      });
      const monthMatches = matchData.filter(
        (match) => match.month === monthStr,
      );

      if (monthMatches.length > 0) {
        result.push(...monthMatches);
      } else {
        result.push({
          date: monthDate.toISOString(),
          month: monthStr,
          minutes: 0,
          ga: 0,
          formattedDate: monthStr,
          homeTeam: "",
          awayTeam: "",
          homeLogo: null,
          awayLogo: null,
          result: "",
          matchDate: monthStr,
          isPlaceholder: true,
        });
      }
    });

    return result;
  };

  const chartData = createFullSeasonData(matches, season);

  const totalMinutes = chartData.reduce(
    (acc, curr) => acc + (curr.isPlaceholder ? 0 : curr.minutes),
    0,
  );
  const averageMinutes =
    matches.length > 0 ? Math.round(totalMinutes / matches.length) : 0;

  const totalGA = chartData.reduce(
    (acc, curr) => acc + (curr.isPlaceholder ? 0 : curr.ga),
    0,
  );
  const averageGA =
    matches.length > 0 ? Math.round(totalGA / matches.length) : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartDataPoint;
      if (data.isPlaceholder && data.minutes === 0 && data.ga === 0)
        return null;

      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm mb-2">{data.formattedDate}</p>
          {!data.isPlaceholder && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <img
                src={data.homeLogo || "/default-team-logo.png"}
                alt={data.homeTeam}
                className="w-6 h-6"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="text-white font-semibold">{data.result}</span>
              <img
                src={data.awayLogo || "/default-team-logo.png"}
                alt={data.awayTeam}
                className="w-6 h-6"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
          {viewMode === "minutes" ? (
            <p className="text-red-400 font-medium">
              {data.minutes} minutes played
            </p>
          ) : (
            <p className="text-red-400 font-medium">
              {data.ga} goal contributions
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-black border-gray-800 text-white">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="text-white text-lg sm:text-xl">
              Season {season} - Player Performance
            </CardTitle>
            <CardDescription className="text-gray-400">
              {viewMode === "minutes"
                ? "Match by match minutes throughout the season"
                : "Match by match goal contributions (goals + assists)"}
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "minutes" | "ga")}
              className="w-full sm:w-auto"
            >
              <TabsList className="bg-gray-800">
                <TabsTrigger
                  value="minutes"
                  className="data-[state=active]:bg-gray-700"
                >
                  Minutes
                </TabsTrigger>
                <TabsTrigger
                  value="ga"
                  className="data-[state=active]:bg-gray-700"
                >
                  GA
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              {viewMode === "minutes" ? (
                <>
                  <div className="text-center sm:text-right">
                    <div className="text-gray-400">Total Minutes</div>
                    <div className="text-red-400 font-bold text-lg">
                      {totalMinutes.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className="text-gray-400">Average</div>
                    <div className="text-red-400 font-bold text-lg">
                      {averageMinutes}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center sm:text-right">
                    <div className="text-gray-400">Total GA</div>
                    <div className="text-red-400 font-bold text-lg">
                      {totalGA.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className="text-gray-400">Average</div>
                    <div className="text-red-400 font-bold text-lg">
                      {averageGA}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <ChartContainer
          config={{
            [viewMode]: {
              label:
                viewMode === "minutes"
                  ? "Minutes Played"
                  : "Goal Contributions",
              color: "#ef4444",
            },
          }}
          className="aspect-auto h-[250px] sm:h-[300px] lg:h-[350px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 10,
                left: 1,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ff0000"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                angle={-90}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "#9CA3AF", fontSize: 9 }}
                interval={0}
                type="category"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                domain={[
                  0,
                  viewMode === "minutes" ? "dataMax + 10" : "dataMax + 1",
                ]}
                label={{
                  value: viewMode === "minutes" ? "Minutes" : "GA",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fill: "#9CA3AF" },
                }}
              />
              <ChartTooltip content={<CustomTooltip />} />
              <Bar
                dataKey={viewMode}
                fill="#ef4444"
                radius={[2, 2, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SeasonMatchesChart;

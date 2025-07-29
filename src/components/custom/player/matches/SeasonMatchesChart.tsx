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
  ChartTooltipContent,
} from "@/components/ui/chart";
import { usePlayerMatches } from "@/hooks/players/playerRoutes";

interface MyComponentProps {
  playerId: number;
  season: number;
}

interface ChartDataPoint {
  date: string;
  month: string;
  minutes: number;
  formattedDate: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string | null | undefined;
  awayLogo: string | null | undefined;
  result: string;
  matchDate: string;
  isPlaceholder?: boolean;
}

const chartConfig = {
  minutes: {
    label: "Minutes Played",
    color: "#ef4444", // red-500
  },
} satisfies ChartConfig;

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartDataPoint;

    // Don't show tooltip for placeholder months with no matches
    if (data.isPlaceholder && data.minutes === 0) {
      return null;
    }

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
        <p className="text-red-400 font-medium">
          {data.minutes} minutes played
        </p>
      </div>
    );
  }
  return null;
};

const SeasonMatchesChart = ({ playerId, season }: MyComponentProps) => {
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

  // Create all months from August to July of next year for x-axis
  const createSeasonMonths = (seasonYear: number) => {
    const months = [];
    // August to December of current season year
    for (let month = 7; month <= 11; month++) {
      months.push(new Date(seasonYear, month, 1));
    }
    // January to July of next year
    for (let month = 0; month <= 6; month++) {
      months.push(new Date(seasonYear + 1, month, 1));
    }
    return months;
  };

  // Create data points for all months in the season
  const createFullSeasonData = (matches: any[], seasonYear: number) => {
    const seasonMonths = createSeasonMonths(seasonYear);
    const result: ChartDataPoint[] = [];

    // First add all actual matches
    const matchData = matches
      .filter((match) => match.player_stats?.basic?.minutes !== undefined)
      .map((match) => {
        const matchDate = new Date(
          match.match_info.date_time_utc || match.match_info.match_date,
        );
        return {
          date: match.match_info.date_time_utc || match.match_info.match_date,
          month: matchDate.toLocaleDateString("en-US", { month: "short" }),
          minutes: match.player_stats?.basic?.minutes || 0,
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

    // Then add placeholder months with 0 minutes
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

  return (
    <Card className="bg-black border-gray-800 text-white">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="text-white text-lg sm:text-xl">
              Season {season} - Minutes Played
            </CardTitle>
            <CardDescription className="text-gray-400">
              Match by match minutes throughout the season
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
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
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
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
                stroke="#374151"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                angle={-90}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "#9CA3AF", fontSize: 9 }}
                interval={0} // Show all months
                type="category"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                domain={[0, "dataMax + 10"]}
                label={{
                  value: "Minutes",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fill: "#9CA3AF" },
                }}
              />
              <ChartTooltip content={<CustomTooltip />} />
              <Bar
                dataKey="minutes"
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

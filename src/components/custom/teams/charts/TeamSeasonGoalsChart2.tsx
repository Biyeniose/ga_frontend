"use client";
import * as React from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useTeamMatchesbyYear } from "@/hooks/teams/teamRoutes";

interface MyComponentProps {
  teamId: number;
  season: number;
}

const TeamSeasonGoalsChart = ({ teamId, season }: MyComponentProps) => {
  const [activeTab, setActiveTab] = React.useState<"scored" | "conceded">(
    "scored",
  );
  const { data, isLoading, error } = useTeamMatchesbyYear(teamId, season);

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
        <span>Team season matches not found</span>
      </div>
    );

  const matches = data.data.matches;

  // Process data for the chart
  const chartData = matches
    .map((match) => {
      // Determine if team is home or away and get their goals
      const isHome = match.teams.home.team.team_id === teamId;
      const goals = isHome
        ? match.teams.home.stats.goals
        : match.teams.away.stats.goals;
      const conceded = isHome
        ? match.teams.away.stats.goals
        : match.teams.home.stats.goals;

      // Format date for display
      const matchDate = new Date(match.match_info.match_date);
      const month = String(matchDate.getMonth() + 1).padStart(2, "0");
      const day = String(matchDate.getDate()).padStart(2, "0");
      const formattedDate = `${month}-${day}`;

      return {
        date: formattedDate,
        goals: goals,
        conceded: conceded,
        rawDate: match.match_info.match_date,
        homeLogo: match.teams.home.team.logo,
        awayLogo: match.teams.away.team.logo,
        homeTeam: match.teams.home.team.team_name,
        awayTeam: match.teams.away.team.team_name,
        result: match.match_info.result,
        isHome: isHome,
      };
    })
    .sort(
      (a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime(),
    );

  const chartConfig = {
    goals: {
      label: "Goals Scored",
      color: "#22c55e",
    },
    conceded: {
      label: "Goals Conceded",
      color: "#ef4444",
    },
  } satisfies ChartConfig;

  // Calculate some stats for the footer
  const totalGoals = chartData.reduce((sum, match) => sum + match.goals, 0);
  const totalConceded = chartData.reduce(
    (sum, match) => sum + match.conceded,
    0,
  );
  const averageGoals = totalGoals / chartData.length || 0;
  const averageConceded = totalConceded / chartData.length || 0;

  // Custom tooltip content
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length && payload[0]?.payload) {
      const data = payload[0].payload;
      return (
        <div className="bg-black border border-gray-700 rounded-lg p-2 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={data.homeLogo}
              alt={data.homeTeam}
              className="w-6 h-6 object-contain"
            />
            <span className="text-white text-sm font-medium">
              {data.result}
            </span>
            <img
              src={data.awayLogo}
              alt={data.awayTeam}
              className="w-6 h-6 object-contain"
            />
          </div>
          <div className="text-center space-y-1">
            {activeTab === "scored" ? (
              <p className="text-green-400 font-semibold">
                Scored: {data.goals} goal{data.goals !== 1 ? "s" : ""}
              </p>
            ) : (
              <p className="text-red-400 font-semibold">
                Conceded: {data.conceded} goal{data.conceded !== 1 ? "s" : ""}
              </p>
            )}
            <p className="text-gray-400 text-xs">{label}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const currentDataKey = activeTab === "scored" ? "goals" : "conceded";
  const currentColor = activeTab === "scored" ? "#22c55e" : "#ef4444";
  const currentStrokeWidth = activeTab === "scored" ? 3 : 2;
  const currentDotSize = activeTab === "scored" ? 4 : 3;
  const currentActiveDotSize = activeTab === "scored" ? 6 : 5;

  return (
    <Card className="bg-black border-gray-800 text-white w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-white text-lg sm:text-xl">
              {activeTab === "scored" ? "Goals Scored" : "Goals Conceded"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              Season {season}/{season + 1} Performance
            </CardDescription>
          </div>

          {/* Tab Buttons */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("scored")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "scored"
                  ? "bg-green-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              Goals Scored
            </button>
            <button
              onClick={() => setActiveTab("conceded")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "conceded"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              Goals Conceded
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-2 sm:p-2 lg:p-4">
        <ChartContainer
          config={chartConfig}
          className="min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 1,
              right: 8,
              top: 4,
              bottom: 8,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#374151"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              interval="preserveStartEnd"
              className="text-xs sm:text-sm"
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              className="text-xs sm:text-sm"
            />
            <ChartTooltip
              cursor={{
                stroke: currentColor,
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
              content={<CustomTooltip />}
            />
            <Line
              dataKey={currentDataKey}
              type="monotone"
              stroke={currentColor}
              strokeWidth={currentStrokeWidth}
              dot={false} // Removes regular dots
              activeDot={{
                r: currentActiveDotSize,
                stroke: currentColor,
                strokeWidth: activeTab === "scored" ? 2 : 1,
                fill: "#000",
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm pt-0">
        {activeTab === "scored" ? (
          <div className="flex items-center gap-2 text-green-400 font-medium">
            <div className="w-3 h-0.5 bg-green-400"></div>
            Goals Scored: {averageGoals.toFixed(1)} avg ({totalGoals} total)
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-400 font-medium">
            <div className="w-3 h-0.5 bg-red-400"></div>
            Goals Conceded: {averageConceded.toFixed(1)} avg ({totalConceded}{" "}
            total)
          </div>
        )}
        <div className="text-gray-400 leading-none">
          Showing data for {chartData.length} matches
        </div>
      </CardFooter>
    </Card>
  );
};

export default TeamSeasonGoalsChart;

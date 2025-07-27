"use client";

import { useContext } from "react";
import { DataContext } from "@/context/PlayerPageDataContext";
import Image from "next/image";
import Link from "next/link";
import { GoalDist } from "@/types/PlayerTypes";
import { Badge } from "@/components/ui/badge";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  gaAgainst: {
    label: "Goals + Assists",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

const PlayerGADist = () => {
  const { gaDistData, gaDistLoading, gaDistError } = useContext(DataContext);

  if (gaDistLoading) {
    return (
      <div className="bg-black border border-gray-700 rounded-lg p-6 w-full">
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (gaDistError) {
    return (
      <div className="bg-black border border-gray-700 rounded-lg p-6 w-full">
        <div className="p-4 text-red-500 flex items-center gap-2">
          <span>⚠️</span>
          <span>Error: {gaDistError.message}</span>
        </div>
      </div>
    );
  }

  if (
    !gaDistData ||
    !gaDistData.goal_dist ||
    gaDistData.goal_dist.length === 0
  ) {
    return (
      <div className="bg-black border border-gray-700 rounded-lg p-6 w-full">
        <h2 className="text-xl font-bold text-white mb-4">
          Goals + Assists Distribution
        </h2>
        <div className="flex items-center justify-center p-8 text-gray-400">
          <span>No goal distribution data available</span>
        </div>
      </div>
    );
  }

  const totalStats = gaDistData.total;
  const info = gaDistData.info;

  // Transform data for the chart
  const chartData = gaDistData.goal_dist
    .map((item: GoalDist) => ({
      teamId: item.teams.team.team_id,
      teamName: item.teams.team.team_name,
      teamLogo: item.teams.team.logo,
      gaAgainst: item.teams.stats.ga_against ?? 0,
      goalsAgainst: item.teams.stats.goals_against ?? 0,
      assistsAgainst: item.teams.stats.assists_against ?? 0,
      gaAgainstPct: item.teams.stats.ga_against_pct ?? 0,
    }))
    .filter((item) => item.gaAgainst > 0)
    .sort((a, b) => b.gaAgainst - a.gaAgainst)
    .slice(0, 10);

  return (
    <div className="bg-black border border-gray-700 rounded-lg p-4 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4">
          Goals + Assists Distribution
        </h2>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-900/30 text-blue-400 border border-blue-700">
            Season {info?.season_year ?? 2024}
          </Badge>
          <Badge className="bg-green-900/30 text-green-400 border border-green-700">
            Total G+A: {totalStats?.ga ?? 0}
          </Badge>
          <Badge className="bg-purple-900/30 text-purple-400 border border-purple-700">
            Goals: {totalStats?.goals ?? 0}
          </Badge>
          <Badge className="bg-yellow-900/30 text-yellow-400 border border-yellow-700">
            Assists: {totalStats?.assists ?? 0}
          </Badge>
          {gaDistData?.pens?.pens_scored && (
            <Badge className="bg-orange-900/30 text-orange-400 border border-orange-700">
              Penalties: {gaDistData.pens.pens_scored}
            </Badge>
          )}
        </div>
      </div>

      {/* Vertical Bar Chart */}
      <ChartContainer config={chartConfig} className="w-full h-100">
        <BarChart
          data={chartData}
          margin={{ top: 60, right: 1, left: -18, bottom: 20 }}
        >
          <XAxis
            dataKey="teamName"
            angle={-55}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 11, fill: "#ffffff" }}
            axisLine={{ stroke: "#ffffff" }}
            tickLine={{ stroke: "#ffffff" }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#ffffff" }}
            axisLine={{ stroke: "#ffffff" }}
            tickLine={{ stroke: "#ffffff" }}
          />
          <ChartTooltip
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
            content={({ active, payload }) => {
              if (!active || !payload || !payload[0]) return null;
              const data = payload[0].payload;
              return (
                <div className="bg-black border border-gray-600 rounded-lg shadow-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="relative w-6 h-6">
                      <Image
                        src={data.teamLogo}
                        alt={data.teamName}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-medium text-white">
                      {data.teamName}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300 space-y-1">
                    <div>
                      Total G+A:{" "}
                      <span className="text-blue-400 font-medium">
                        {data.gaAgainst}
                      </span>
                    </div>
                    <div>
                      Goals:{" "}
                      <span className="text-green-400 font-medium">
                        {data.goalsAgainst}
                      </span>
                    </div>
                    <div>
                      Assists:{" "}
                      <span className="text-yellow-400 font-medium">
                        {data.assistsAgainst}
                      </span>
                    </div>
                    <div>
                      Percentage:{" "}
                      <span className="text-purple-400 font-medium">
                        {data.gaAgainstPct.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            }}
          />
          <Bar
            dataKey="gaAgainst"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            stroke="#1e40af"
            strokeWidth={1}
            shape={(props) => {
              const { x, y, width, height, payload } = props;
              return (
                <g>
                  {/* Regular bar */}
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill="#3b82f6"
                    stroke="#1e40af"
                    strokeWidth={1}
                    rx={4}
                    ry={4}
                  />
                  {/* Team logo at top of bar */}
                  <foreignObject
                    x={x + width / 2 - 20}
                    y={y - 50}
                    width="40"
                    height="40"
                  >
                    <div className="flex items-center justify-center w-9 h-9 bg-white rounded-full p-1">
                      <Image
                        src={payload.teamLogo}
                        alt={payload.teamName}
                        width={25}
                        height={25}
                        className="object-contain"
                      />
                    </div>
                  </foreignObject>
                </g>
              );
            }}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default PlayerGADist;

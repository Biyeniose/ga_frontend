"use client";

import { useContext } from "react";
import { DataContext } from "@/context/PlayerPageDataContext";
import Image from "next/image";
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
    color: "#ffffff", // Changed to white
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

  const goalDists = gaDistData.goal_dist;
  const totalStats = gaDistData.total;
  const info = gaDistData.info;
  const pens = gaDistData.pens;

  // Transform and sort data for the chart
  const chartData = goalDists
    .map((item: GoalDist) => ({
      teamId: item.teams.team.team_id,
      teamName: item.teams.team.team_name,
      teamLogo: item.teams.team.logo,
      gaAgainst: item.teams.stats.ga_against ?? 0,
      goalsAgainst: item.teams.stats.goals_against ?? 0,
      assistsAgainst: item.teams.stats.assists_against ?? 0,
      gaAgainstPct: item.teams.stats.ga_against_pct ?? 0,
    }))
    .sort((a, b) => b.gaAgainst - a.gaAgainst)
    .slice(0, 10);

  return (
    <div className="bg-black border border-gray-700 rounded-lg p-6 w-full">
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
          <Badge className="bg-red-900/30 text-red-400 border border-red-700">
            Pens: {pens?.pens_scored ?? 0}
          </Badge>
        </div>
      </div>

      {/* Horizontal Bar Chart shifted left */}
      <div className="ml-[-20px]">
        {" "}
        {/* Shift the whole chart left */}
        <ChartContainer config={chartConfig} className="h-[500px] w-full">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{
              left: 40, // Reduced left margin
              right: 20,
              top: 20,
              bottom: 60,
            }}
          >
            <YAxis
              type="category"
              dataKey="teamName"
              tick={false}
              axisLine={false}
              tickLine={false}
              width={0} // Reduced to 0 since we're using logos inside bars
            />
            <XAxis
              type="number"
              domain={[0, "dataMax"]}
              tick={{ fontSize: 12, fill: "#ffffff" }}
              axisLine={{ stroke: "#ffffff" }}
              tickLine={{ stroke: "#ffffff" }}
              label={{
                value: "Goals + Assists",
                position: "insideBottom",
                offset: -10,
                style: { fill: "#ffffff" },
              }}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
              content={({ active, payload }) => {
                if (!active || !payload || !payload[0]) return null;

                const data = payload[0].payload;
                return (
                  <div className="bg-black border border-gray-600 rounded-lg shadow-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      {data.teamLogo && (
                        <div className="relative w-6 h-6">
                          <Image
                            src={data.teamLogo}
                            alt={data.teamName}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="font-medium text-white">
                        {data.teamName}
                      </span>
                    </div>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>
                        Total G+A:{" "}
                        <span className="text-white font-medium">
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
                        <span className="text-blue-400 font-medium">
                          {data.assistsAgainst}
                        </span>
                      </div>
                      <div>
                        Percentage:{" "}
                        <span className="text-yellow-400 font-medium">
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
              fill="#ffffff" // White bars
              radius={[0, 4, 4, 0]}
              stroke="#ffffff" // White border
              strokeWidth={1}
              shape={(props) => {
                const { x, y, width, height, payload } = props;
                return (
                  <g>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill="#ffffff"
                      stroke="#ffffff"
                      strokeWidth={1}
                      rx={4}
                      ry={4}
                    />
                    {payload.teamLogo && (
                      <foreignObject
                        x={x + 8}
                        y={y + height / 2 - 12}
                        width={24}
                        height={24}
                      >
                        <div className="relative w-6 h-6">
                          <Image
                            src={payload.teamLogo}
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                      </foreignObject>
                    )}
                  </g>
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default PlayerGADist;

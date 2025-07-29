import { useContext } from "react";
import { TeamPageContext } from "@/context/teams/TeamPageProvider";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const chartConfig = {
  points: {
    label: "Points",
    color: "#ef4444", // Red color for both light and dark mode
  },
} satisfies ChartConfig;

const DomesticRanksChart = () => {
  const { domesticData, domesticLoading, domesticError } =
    useContext(TeamPageContext);

  if (domesticLoading) {
    return (
      <div className="w-full h-48 bg-black border border-gray-800 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-600 border-t-red-500"></div>
      </div>
    );
  }

  if (domesticError || !domesticData?.data.seasons) {
    return (
      <div className="w-full h-48 bg-black border border-gray-800 rounded-lg flex items-center justify-center">
        <span className="text-gray-400 text-sm">
          No domestic data available
        </span>
      </div>
    );
  }

  // Prepare data for the chart
  const chartData = domesticData.data.seasons
    .map((season) => ({
      season: season.season.toString(),
      points: season.rank.points,
      rank: season.rank.rank,
      competition: season.comp.comp_name,
      wins: season.rank.wins,
      losses: season.rank.losses,
      draws: season.rank.draws,
      goalsFor: season.rank.goals_f,
      goalsAgainst: season.rank.goals_a,
      goalDifference: season.rank.gd,
      gamesPlayed: season.rank.gp,
    }))
    .sort((a, b) => parseInt(a.season) - parseInt(b.season));

  const renderLabel = (props: any) => {
    const { x, y, value } = props;
    return (
      <text
        x={x}
        y={y - 10}
        fill="#ef4444"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
        fontWeight="500"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="w-full bg-black border border-gray-800 rounded-lg p-1 md:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">
          Domestic League Performance
        </h3>
        <p className="text-sm text-gray-400">Points earned across seasons</p>
      </div>

      <ChartContainer
        config={chartConfig}
        className="h-[200px] sm:h-[250px] md:h-[300px] w-full"
      >
        <LineChart
          data={chartData}
          margin={{
            top: 30,
            right: 12,
            left: 12,
            bottom: 12,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="season"
            className="text-xs"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            className="text-xs"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
            domain={["dataMin - 5", "dataMax + 5"]}
          />
          <Line
            type="monotone"
            dataKey="points"
            stroke="#ef4444"
            strokeWidth={2.5}
            dot={{
              r: 4,
              strokeWidth: 2,
              fill: "#ef4444",
              stroke: "#ef4444",
            }}
            label={renderLabel}
            connectNulls={true}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default DomesticRanksChart;

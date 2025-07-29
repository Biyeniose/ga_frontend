//import Image from "next/image";
"use client";

import * as React from "react";
import TeamSeasonGoalsChart from "@/components/custom/teams/charts/TeamSeasonGoalsChart";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function TeamMatchesPage() {
  const params = useParams();
  const id = params.id;
  const idAsNumber: number = Number(id);

  // State for selected season
  const [selectedSeason, setSelectedSeason] = React.useState<number>(2024);

  // Generate year options (from current year down to 2000)
  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const yearOptions = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i,
  );

  return (
    <div className="mb-5 space-y-6">
      {/* Year Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
        <Label htmlFor="season-select" className="text-white font-medium">
          Select Season:
        </Label>
        <Select
          value={selectedSeason.toString()}
          onValueChange={(value) => setSelectedSeason(Number(value))}
        >
          <SelectTrigger className="w-full sm:w-[200px] bg-black border-gray-700 text-white">
            <SelectValue placeholder="Select a season" />
          </SelectTrigger>
          <SelectContent className="bg-black border-gray-700">
            {yearOptions.map((year) => (
              <SelectItem
                key={year}
                value={year.toString()}
                className="text-white hover:bg-gray-800 focus:bg-gray-800"
              >
                {year}/{year + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chart Component */}
      <TeamSeasonGoalsChart teamId={idAsNumber} season={selectedSeason} />
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import { usePlayerStats } from "@/hooks/teamRoutes";
import TeamStatsCard from "@/components/custom/teams/team_page/TeamStatsCard";
import { TeamTransfersSection } from "@/components/custom/teams/team_page/TeamTransfersSection";
import { TeamMatchesSection } from "@/components/custom/teams/team_page/TeamMatchesSection";

export default function TeamsPage() {
  const params = useParams();
  const teamId = params.id;

  const { data, isLoading, error } = usePlayerStats(teamId as string);

  if (!teamId) return <div>Team ID is required</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || data.length === 0) return <div>No player data found</div>;

  return (
    <div className="min-h-screen mx-6 mt-3 p-4 bg-zinc-100 dark:bg-zinc-950 rounded-lg font-[family-name:var(--font-opensans)]">
      {/* Main Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Team Transfers (will take full width on small/medium, then 1/3 on large) */}
        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-lg shadow-sm">
          <TeamMatchesSection />
        </div>

        {/* Column 2: Stats Cards (will take full width on small, then 1/2 on medium, then 1/3 on large) */}
        {/* This single div now holds both stats cards and ensures they stack on small screens */}
        <div className="flex flex-col gap-6">
          {" "}
          {/* Using flex-col and gap to stack children */}
          <div className="bg-zinc-100 dark:bg-zinc-950 rounded-lg shadow-sm">
            <TeamStatsCard stat="ga" isLeague={false} />
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-950 rounded-lg shadow-sm">
            <TeamStatsCard stat="minutes" isLeague={false} />
          </div>
        </div>

        {/* Column 3: You can add another column here if needed for lg:grid-cols-3,
          or simply let the previous "stats cards" column take up the space
          based on your responsive needs. For example, if you want a third *different* stat card: */}
        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-lg shadow-sm">
          <TeamTransfersSection />
        </div>
      </div>
    </div>
  );
}

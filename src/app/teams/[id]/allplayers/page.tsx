"use client";

import { TeamSquad } from "@/components/custom/teams/all_players/TeamSquad";
import { useTeamSquadData } from "@/hooks/teamRoutes";
import { useParams } from "next/navigation";

export default function AllPlayersPage() {
  const params = useParams();
  const teamId = Number(params.id);
  const { data, isLoading, error } = useTeamSquadData(teamId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error</div>;
  }

  if (!data || data.data.squad.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          No players found in the squad
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Squad</h1>
        <p className="text-sm text-gray-500">
          {data.data.squad.length} players
        </p>
      </div>
      <TeamSquad squad={data.data.squad} />
    </div>
  );
}

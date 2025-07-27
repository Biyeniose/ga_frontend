"use client"; // Add this at the very top
//import Image from "next/image";
import { useContext } from "react";
import { DataContext } from "@/context/PlayerPageDataContext";

import { PlayerTransfers } from "@/components/custom/player/playerPage/PlayerTransfers";
import PlayerGADist from "@/components/custom/player/PlayerGADist";
import { PlayerStats } from "@/components/custom/player/playerPage/PlayerStats";
//import { useParams } from "next/navigation";

export default function PlayerPage() {
  //const params = useParams();
  //const id = params.id;
  //const idAsNumber: number = Number(id);
  const { playerData, isLoading, error } = useContext(DataContext);
  if (isLoading) return <div className="p-6">Loading player data...</div>;
  if (error)
    return <div className="p-6 text-red-500">Error: {error.message}</div>;
  if (!playerData) return <div className="p-6">Player not found</div>;

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      {playerData.stats && playerData.stats.length > 0 && (
        <section className="bg-white dark:bg-zinc-950 rounded-lg shadow-sm p-2 border-1 border-gray-800">
          <PlayerStats stats={playerData.stats} />
        </section>
      )}

      <section>
        <PlayerGADist />
      </section>

      {/* Transfers Section */}
      {playerData.transfers && playerData.transfers.length > 0 && (
        <section className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6">
          <PlayerTransfers transfers={playerData.transfers} />
        </section>
      )}
    </div>
  );
}

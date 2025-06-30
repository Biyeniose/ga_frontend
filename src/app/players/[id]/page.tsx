"use client"; // Add this at the very top
//import Image from "next/image";
import { useContext } from "react";
import { DataContext } from "@/context/PlayerPageDataContext";
import { PlayerGoalsCarousel } from "@/components/custom/player/playerPage/PlayerGoalsCarousel";
import { PlayerTransfers } from "@/components/custom/player/playerPage/PlayerTransfers";
import { PlayerStats } from "@/components/custom/player/playerPage/PlayerStats";

export default function PlayerPage() {
  const { playerData, isLoading, error } = useContext(DataContext);

  if (isLoading) return <div className="p-6">Loading player data...</div>;
  if (error)
    return <div className="p-6 text-red-500">Error: {error.message}</div>;
  if (!playerData) return <div className="p-6">Player not found</div>;

  return (
    <div className="space-y-6">
      {/* Goals Carousel Section */}
      {playerData.goal_data && playerData.goal_data.length > 0 && (
        <section className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Recent Goals & Assists</h2>
          <PlayerGoalsCarousel goal_data={playerData.goal_data} />
        </section>
      )}

      {/* Stats Section */}
      {playerData.stats && playerData.stats.length > 0 && (
        <section className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6">
          <PlayerStats stats={playerData.stats} />
        </section>
      )}

      {/* Transfers Section */}
      {playerData.transfers && playerData.transfers.length > 0 && (
        <section className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6">
          <PlayerTransfers transfers={playerData.transfers} />
        </section>
      )}

      {/* Additional sections can be added here */}
    </div>
  );
}

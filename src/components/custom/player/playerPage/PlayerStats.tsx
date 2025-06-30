"use client";

import Image from "next/image";
import { PlayerLatestStats } from "@/types/PlayerTypes";

interface PlayerStatsProps {
  stats: PlayerLatestStats[];
}

export function PlayerStats({ stats }: PlayerStatsProps) {
  return (
    <section className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Season Statistics</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-2 pl-2">Competition</th>
              <th className="text-center py-2">G</th>
              <th className="text-center py-2">A</th>
              <th className="text-center py-2">G+A</th>
              <th className="text-center py-2 pr-2">GP</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr
                key={stat.stats_id}
                className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                <td className="py-3 pl-2">
                  <div className="flex items-center gap-2">
                    {stat.comp_url ? (
                      <div className="relative w-6 h-6">
                        <Image
                          src={stat.comp_url}
                          alt={stat.comp_name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
                    )}
                    <span>{stat.comp_name}</span>
                  </div>
                </td>
                <td className="text-center py-3">{stat.goals || 0}</td>
                <td className="text-center py-3">{stat.assists || 0}</td>
                <td className="text-center py-3">{stat.ga || 0}</td>
                <td className="text-center py-3 pr-2">{stat.gp || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

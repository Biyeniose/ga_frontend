"use client";

import Image from "next/image";
import Link from "next/link";
import { SquadPlayer } from "@/types/TeamTypes";

export function TeamSquad({ squad }: { squad: SquadPlayer[] }) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Team Squad</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-2 pl-2">Player</th>
              <th className="text-center py-2">Age</th>
              <th className="text-center py-2">GP</th>
              <th className="text-center py-2">G/A</th>
              <th className="text-center py-2">GA</th>

              <th className="text-center py-2">Y</th>
              <th className="text-center py-2">R</th>

              <th className="text-center py-2 pr-2">Contract</th>
            </tr>
          </thead>
          <tbody>
            {squad.map((player) => (
              <tr
                key={player.squad_id}
                className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                <td className="py-3 pl-2">
                  <Link
                    href={`/players/${player.player_id}`}
                    className="flex items-center gap-3"
                  >
                    <div>
                      {player.pic_url ? (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={player.pic_url}
                            alt={player.player_name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                          <span className="text-xs">-</span>
                        </div>
                      )}

                      {player.number ? (
                        <div className="text-xs flex items-center justify-center">
                          #{player.number}
                        </div>
                      ) : (
                        <div className="text-xs flex items-center justify-center">
                          -
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-base">{player.player_name}</div>

                      <div className="flex">
                        {player.nations.nation1_url && (
                          <div className="text-xs text-gray-500 flex justify-end">
                            <div className="relative w-7 h-5 mx-auto">
                              <Image
                                src={player.nations.nation1_url}
                                alt={player.nations.nation1 || "Nation"}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        )}

                        {player.nations.nation2_url && (
                          <div className="text-xs text-gray-500 flex justify-end">
                            <div className="relative w-7 h-5 mx-auto">
                              <Image
                                src={player.nations.nation2_url}
                                alt={player.nations.nation2 || "Nation"}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="text-center py-3">{player.age}</td>

                <td className="text-center py-3">{player.stats.gp || 0}</td>
                <td className="text-center py-3">
                  {player.stats.goals || 0}/{player.stats.assists || 0}
                </td>
                <td className="text-center py-3 ">{player.stats.ga || 0}</td>
                <td className="text-center py-3">
                  {player.stats.yellows || 0}
                </td>
                <td className="text-center py-3 ">{player.stats.reds || 0}</td>
                <td className="text-center py-3 pr-2 ">
                  {formatDate(player.contract_end)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

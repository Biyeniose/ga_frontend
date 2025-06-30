"use client";

import Image from "next/image";
import Link from "next/link";
import { Transfer } from "@/types/TeamTypes";

interface PlayerTransfersProps {
  transfers: Transfer[];
}

export function PlayerTransfers({ transfers }: PlayerTransfersProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatFee = (fee: number | null) => {
    if (fee === null) return "Loan";
    if (fee === 0) return "Free Transfer";
    return `€${(fee / 1000000).toFixed(1)}M`;
  };

  return (
    <section className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Transfer History</h2>
      <div className="space-y-4">
        {transfers.map((transfer) => (
          <div
            key={transfer.transfer_id}
            className="p-4 border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(transfer.date)} • {transfer.season}
              </div>
              <div className="text-sm font-medium px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-700">
                {formatFee(transfer.fee)}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              {/* From Team */}
              <div className="flex items-center gap-2 flex-1">
                {transfer.from_team.team_url && (
                  <div className="relative w-8 h-8">
                    <Image
                      src={transfer.from_team.team_url}
                      alt={transfer.from_team.team_name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <Link
                  href={`/teams/${transfer.from_team.team_id}`}
                  className="hover:underline font-medium"
                >
                  {transfer.from_team.team_name}
                </Link>
                <div className="relative w-5 h-3.5 ml-auto">
                  <Image
                    src={transfer.from_team.nation_url}
                    alt={transfer.from_team.nation}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Transfer Arrow */}
              <div className="text-gray-400 mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>

              {/* To Team */}
              <div className="flex items-center gap-2 flex-1">
                {transfer.to_team.team_url && (
                  <div className="relative w-8 h-8">
                    <Image
                      src={transfer.to_team.team_url}
                      alt={transfer.to_team.team_name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <Link
                  href={`/teams/${transfer.to_team.team_id}`}
                  className="hover:underline font-medium"
                >
                  {transfer.to_team.team_name}
                </Link>
                {transfer.to_team.nation && transfer.to_team.nation_url && (
                  <div className="relative w-5 h-3.5 ml-auto">
                    <Image
                      src={transfer.to_team.nation_url}
                      alt={transfer.to_team.nation}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {transfer.isLoan && (
              <div className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                Loan Transfer
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

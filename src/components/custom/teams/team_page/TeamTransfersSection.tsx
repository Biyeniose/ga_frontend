"use client";

import { useContext } from "react";
import { DataContext } from "@/context/TeamPageDataContext";
import Image from "next/image";
import Link from "next/link";

export function TeamTransfersSection() {
  const { teamData, isLoading, error } = useContext(DataContext);

  // Handle loading, error, and no data states
  if (isLoading) {
    return <div className="p-4 text-center">Loading transfers...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading transfers: {error.message}
      </div>
    );
  }

  if (!teamData || !teamData.transfers || teamData.transfers.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No transfer data available for this team.
      </div>
    );
  }

  // Filter transfers to remove reciprocal loans
  const filteredTransfers = teamData.transfers.filter(
    (transfer, index, allTransfers) => {
      if (!transfer.isLoan) return true; // Keep all permanent transfers

      // Check if there's a reciprocal loan later in the array
      const hasReciprocal = allTransfers.some((laterTransfer, laterIndex) => {
        return (
          laterIndex > index && // Only look at transfers after this one
          laterTransfer.isLoan &&
          laterTransfer.from_team.team_id === transfer.to_team.team_id &&
          laterTransfer.to_team.team_id === transfer.from_team.team_id
        );
      });

      return !hasReciprocal; // Keep if no reciprocal found
    },
  );

  if (filteredTransfers.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No relevant transfers to display.
      </div>
    );
  }

  return (
    <section className="p-1 mb-6">
      <div className="text-2xl font-bold border-2 border-zinc-500 text-white mb-2 bg-zinc-900 dark:bg-zinc-900 p-3 rounded-lg">
        Transfers
      </div>
      <div className="space-y-3">
        {filteredTransfers.map((transfer) => (
          <div
            key={transfer.transfer_id}
            className="p-4 bg-zinc-200 dark:bg-zinc-900 border-2 rounded-md transition-all duration-200 hover:shadow-md grid grid-cols-1 gap-4"
          >
            {/* Player Name and Link */}
            <div className="flex-1 min-w-0">
              <Link
                href={`/players/${transfer.player_id}`}
                className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {transfer.player_name}
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {transfer.isLoan ? "Loan" : "Permanent"}{" "}
                {transfer.date
                  ? new Date(transfer.date).toLocaleDateString()
                  : ""}
              </p>
              {transfer.fee && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Fee: ${transfer.fee.toLocaleString()}
                </p>
              )}
            </div>

            {/* Transfer Direction and Teams */}
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              {/* From Team */}
              <Link
                href={`/teams/${transfer.from_team.team_id}`}
                className="flex flex-col items-center text-center"
              >
                {transfer.from_team.team_url && (
                  <Image
                    src={transfer.from_team.team_url}
                    alt={transfer.from_team.team_name}
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                )}
                <span className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                  {transfer.from_team.team_name}
                </span>
              </Link>

              {/* Arrow */}
              <span className="text-xl mx-2 text-gray-600 dark:text-gray-400">
                →
              </span>

              {/* To Team */}
              <Link
                href={`/teams/${transfer.to_team.team_id}`}
                className="flex flex-col items-center text-center"
              >
                {transfer.to_team.team_url && (
                  <Image
                    src={transfer.to_team.team_url}
                    alt={transfer.to_team.team_name}
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                )}
                <span className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                  {transfer.to_team.team_name}
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

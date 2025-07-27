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
    if (fee === 0) return "Free";
    return `€${(fee / 1000000).toFixed(1)}M`;
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  // Helper function to check if URL is valid
  const isValidUrl = (url: string | null | undefined): url is string => {
    return url !== null && url !== undefined && url.trim() !== "";
  };

  return (
    <section className="bg-black rounded-lg shadow-sm p-4 md:p-6">
      <h2 className="text-xl font-bold mb-6 text-white">Transfer History</h2>

      <div className="flex flex-col items-center space-y-3">
        {transfers.map((transfer) => (
          <div
            key={transfer.transfer_id}
            className="bg-black border border-gray-700 hover:border-blue-500 rounded-lg p-4 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 w-full max-w-2xl"
          >
            {/* Header with Date and Fee */}
            <div className="flex items-center justify-between mb-4 text-sm">
              <div className="bg-green-900/30 text-green-400 border border-green-700 font-semibold px-3 py-1 rounded-full text-xs">
                {formatDate(transfer.date)} • {transfer.season}
              </div>
              <div
                className={`font-semibold px-3 py-1 rounded-full text-xs ${
                  transfer.fee === null
                    ? "bg-yellow-900/30 text-yellow-400 border border-yellow-700"
                    : transfer.fee === 0
                    ? "bg-green-900/30 text-green-400 border border-green-700"
                    : "bg-blue-900/30 text-blue-400 border border-blue-700"
                }`}
              >
                {formatFee(transfer.fee)}
              </div>
            </div>

            {/* Transfer Details */}
            <div className="flex items-center justify-between px-4">
              {/* From Team */}
              <div className="flex flex-col items-center text-center space-y-2 flex-1">
                <div className="flex items-center gap-1">
                  {isValidUrl(transfer.from_team.team_url) && (
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <Image
                        src={transfer.from_team.team_url}
                        alt={transfer.from_team.team_name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  {isValidUrl(transfer.from_team.nation_url) && (
                    <div className="relative w-4 h-3 flex-shrink-0">
                      <Image
                        src={transfer.from_team.nation_url}
                        alt={transfer.from_team.nation}
                        fill
                        className="object-cover rounded-sm"
                      />
                    </div>
                  )}
                </div>
                <Link
                  href={`/teams/${transfer.from_team.team_id}`}
                  className="hover:text-blue-400 transition-colors duration-200 text-white text-sm font-medium"
                  title={transfer.from_team.team_name}
                >
                  <span className="sm:hidden">
                    {truncateText(transfer.from_team.team_name, 10)}
                  </span>
                  <span className="hidden sm:block">
                    {truncateText(transfer.from_team.team_name, 18)}
                  </span>
                </Link>
              </div>

              {/* Transfer Arrow */}
              <div className="flex flex-col items-center space-y-1 mx-6">
                <div className="text-gray-400">
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
                {transfer.isLoan && (
                  <div className="text-xs text-yellow-400 font-medium bg-yellow-900/20 px-2 py-1 rounded">
                    LOAN
                  </div>
                )}
              </div>

              {/* To Team */}
              <div className="flex flex-col items-center text-center space-y-2 flex-1">
                <div className="flex items-center gap-1">
                  {isValidUrl(transfer.to_team.team_url) && (
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <Image
                        src={transfer.to_team.team_url}
                        alt={transfer.to_team.team_name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  {isValidUrl(transfer.to_team.nation_url) && (
                    <div className="relative w-4 h-3 flex-shrink-0">
                      <Image
                        src={transfer.to_team.nation_url}
                        alt={transfer.to_team.nation}
                        fill
                        className="object-cover rounded-sm"
                      />
                    </div>
                  )}
                </div>
                <Link
                  href={`/teams/${transfer.to_team.team_id}`}
                  className="hover:text-blue-400 transition-colors duration-200 text-white text-sm font-medium"
                  title={transfer.to_team.team_name}
                >
                  <span className="sm:hidden">
                    {truncateText(transfer.to_team.team_name, 10)}
                  </span>
                  <span className="hidden sm:block">
                    {truncateText(transfer.to_team.team_name, 18)}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

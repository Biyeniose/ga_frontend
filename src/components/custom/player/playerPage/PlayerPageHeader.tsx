"use client";

import { DataContext } from "@/context/PlayerPageDataContext";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

export function PlayerPageHeader() {
  const { playerData, isLoading, error } = useContext(DataContext);

  if (isLoading)
    return (
      <div className="flex justify-center items-center p-8 mt-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );

  if (error)
    return <div className="p-6 text-red-500 mt-6">Error: {error.message}</div>;

  if (!playerData || !playerData.info) {
    return <div className="p-4 mt-6">Player data not found</div>;
  }

  const {
    player_name,
    pic_url,
    curr_team_name,
    curr_team_logo,
    curr_number,
    position,
    dob,
    age,
    nations,
    market_value,
    height,
    foot,
    date_joined,
    contract_end,
    instagram,
  } = playerData.info;

  // Format market value to millions
  const formattedMarketValue = market_value
    ? `€${(market_value / 1000000).toFixed(1)}M`
    : "N/A";

  // Format date strings
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-black border border-gray-700 rounded-lg p-6 mt-6 mb-6">
      <div className="flex gap-4">
        {/* Player Image - Always on the left */}
        <div className="flex-shrink-0">
          <div className="relative w-20 h-28 sm:w-24 sm:h-32 rounded-lg overflow-hidden bg-gray-800">
            {pic_url ? (
              <Image
                src={pic_url}
                alt={player_name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 80px, 96px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-600 rounded-full"></div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Player Name and Team */}
          <div className="mb-3 sm:mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
              {player_name}
            </h1>

            {/* Current Team */}
            {playerData.info.isRetired ? (
              <div className="text-gray-400 text-sm">Retired</div>
            ) : playerData.info.noClub ? (
              <div className="text-gray-400 text-sm">Free Agent</div>
            ) : (
              <div className="mb-2">
                <div className="flex items-center gap-2 sm:gap-3 mb-1">
                  {curr_team_logo && (
                    <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                      <Image
                        src={curr_team_logo}
                        alt={curr_team_name || "Team"}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  {playerData.info.curr_team_id && curr_team_name && (
                    <Link
                      href={`/teams/${playerData.info.curr_team_id}`}
                      className="text-white hover:text-blue-400 transition-colors font-medium text-sm sm:text-base"
                    >
                      {curr_team_name}
                    </Link>
                  )}
                  {curr_number && (
                    <span className="bg-gray-800 px-2 py-1 rounded text-sm">
                      #{curr_number}
                    </span>
                  )}
                </div>

                {/* Position and Join Date */}
                <div className="text-gray-400 text-xs">
                  {position && `${position}`}
                  {position && date_joined && " • "}
                  {date_joined && `Joined ${formatDate(date_joined)}`}
                </div>

                {/* Loan Info */}
                {playerData.info.onLoan && playerData.info.parent_team_name && (
                  <div className="flex items-center gap-2 text-yellow-400 text-xs mt-1">
                    <span>On loan from</span>
                    {playerData.info.parent_team_logo && (
                      <div className="relative w-3 h-3">
                        <Image
                          src={playerData.info.parent_team_logo}
                          alt={playerData.info.parent_team_name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    {playerData.info.parent_team_id && (
                      <Link
                        href={`/teams/${playerData.info.parent_team_id}`}
                        className="hover:text-blue-400 transition-colors"
                      >
                        {playerData.info.parent_team_name}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Player Basic Info - Mobile horizontal layout */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-400 text-xs mb-3 sm:mb-4">
            <div>{age} years old</div>
            <div>{formatDate(dob)}</div>
            {nations && nations.nation1 && (
              <div className="flex items-center gap-1">
                {nations.nation1_url && (
                  <div className="relative w-4 h-3 rounded overflow-hidden">
                    <Image
                      src={nations.nation1_url}
                      alt={nations.nation1 || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span>{nations.nation1}</span>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="text-center">
              <div className="text-gray-400 text-xs uppercase mb-1">Value</div>
              <div className="text-white font-medium text-sm">
                {formattedMarketValue}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-xs uppercase mb-1">Height</div>
              <div className="text-white font-medium text-sm">
                {height ? `${height}m` : "N/A"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-xs uppercase mb-1">Foot</div>
              <div className="text-white font-medium text-sm">
                {foot || "N/A"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-xs uppercase mb-1">
                Contract
              </div>
              <div className="text-white font-medium text-xs">
                {formatDate(contract_end)}
              </div>
            </div>
          </div>

          {/* Social and Navigation */}
          <div className="space-y-2 sm:space-y-3">
            {/* Instagram */}
            {instagram && (
              <div>
                <a
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-xs"
                >
                  @{instagram}
                </a>
              </div>
            )}

            {/* Navigation Links */}
            {playerData.info.player_id && (
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-3 border-t border-gray-800">
                <Link
                  href={`/players/${playerData.info.player_id}/stats`}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-xs"
                >
                  Stats
                </Link>
                <Link
                  href={`/players/${playerData.info.player_id}/matches`}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-xs"
                >
                  Matches
                </Link>
                <Link
                  href={`/players/${playerData.info.player_id}/national-team`}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-xs"
                >
                  National Team
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

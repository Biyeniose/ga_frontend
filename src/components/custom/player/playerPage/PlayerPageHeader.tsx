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
    <div className="bg-black rounded-lg p-6 mt-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Player Image and Basic Info */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative w-32 h-40 rounded-lg overflow-hidden bg-gray-800 mb-4">
            {pic_url ? (
              <Image
                src={pic_url}
                alt={player_name}
                fill
                className="object-cover"
                sizes="128px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
              </div>
            )}
          </div>

          <div className="text-center lg:text-left text-gray-300 space-y-2">
            <div className="text-sm">{age} years</div>
            <div className="text-sm">{formatDate(dob)}</div>

            {/* Nationality */}
            {nations && (
              <div className="flex items-center justify-center lg:justify-start gap-2">
                {nations.nation1_url && (
                  <div className="relative w-6 h-4 rounded overflow-hidden">
                    <Image
                      src={nations.nation1_url}
                      alt={nations.nation1 || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {nations.nation1 && (
                  <span className="text-sm">{nations.nation1}</span>
                )}
                {nations.nation2 && (
                  <>
                    {nations.nation2_url && (
                      <div className="relative w-6 h-4 rounded overflow-hidden">
                        <Image
                          src={nations.nation2_url}
                          alt={nations.nation2}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="text-sm">{nations.nation2}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Detailed Info */}
        <div className="flex-1 text-white">
          {/* Player Name */}
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            {player_name}
          </h1>

          {/* Current Team */}
          <div className="mb-6">
            {playerData.info.isRetired ? (
              <div className="text-gray-400">Retired</div>
            ) : playerData.info.noClub ? (
              <div className="text-gray-400">Free Agent</div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  {curr_team_logo && (
                    <div className="relative w-8 h-8">
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
                      className="text-blue-400 hover:underline text-lg font-medium"
                    >
                      {curr_team_name}
                    </Link>
                  )}
                  {curr_number && (
                    <span className="bg-gray-800 px-2 py-1 rounded text-sm font-bold">
                      #{curr_number}
                    </span>
                  )}
                </div>
                <div className="text-gray-300 text-sm">
                  {position && `Position: ${position}`}
                  {position && date_joined && " • "}
                  {date_joined && `Joined: ${formatDate(date_joined)}`}
                </div>

                {playerData.info.onLoan && playerData.info.parent_team_name && (
                  <div className="flex items-center gap-2 text-yellow-400 text-sm bg-yellow-900/20 px-3 py-2 rounded">
                    <span>On loan from:</span>
                    {playerData.info.parent_team_logo && (
                      <div className="relative w-4 h-4">
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
                        className="hover:underline font-medium"
                      >
                        {playerData.info.parent_team_name}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Player Details Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-black border border-gray-700 hover:border-blue-500 p-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/20">
              <div className="text-xs text-gray-400 uppercase">
                Market Value
              </div>
              <div className="font-bold text-lg">{formattedMarketValue}</div>
            </div>
            <div className="bg-black border border-gray-700 hover:border-green-500 p-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/20">
              <div className="text-xs text-gray-400 uppercase">Height</div>
              <div className="font-bold text-lg">
                {height ? `${height}m` : "N/A"}
              </div>
            </div>
            <div className="bg-black border border-gray-700 hover:border-purple-500 p-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/20">
              <div className="text-xs text-gray-400 uppercase">Foot</div>
              <div className="font-bold text-lg">{foot || "N/A"}</div>
            </div>
            <div className="bg-black border border-gray-700 hover:border-orange-500 p-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-orange-500/20">
              <div className="text-xs text-gray-400 uppercase">Contract</div>
              <div className="font-bold text-lg">
                {formatDate(contract_end)}
              </div>
            </div>
          </div>

          {/* Social Links */}
          {instagram && (
            <div className="mb-6">
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:underline text-sm"
              >
                📷 @{instagram}
              </a>
            </div>
          )}

          {/* Navigation Links */}
          <div className="border-t border-gray-800 pt-4">
            <div className="flex flex-wrap gap-4">
              {playerData.info.player_id && (
                <>
                  <Link
                    href={`/players/${playerData.info.player_id}/stats`}
                    className="bg-black border border-gray-700 hover:border-blue-500 hover:text-blue-400 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-blue-500/20"
                  >
                    📊 Stats
                  </Link>
                  <Link
                    href={`/players/${playerData.info.player_id}/matches`}
                    className="bg-black border border-gray-700 hover:border-green-500 hover:text-green-400 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-green-500/20"
                  >
                    ⚽ Matches
                  </Link>
                  <Link
                    href={`/players/${playerData.info.player_id}/national-team`}
                    className="bg-black border border-gray-700 hover:border-yellow-500 hover:text-yellow-400 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-yellow-500/20"
                  >
                    🏆 National Team
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

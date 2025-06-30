"use client";

import { DataContext } from "@/context/PlayerPageDataContext";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

export function PlayerPageHeader() {
  const { playerData, isLoading, error } = useContext(DataContext);

  if (isLoading) return <div className="p-6">Loading player info...</div>;
  if (error)
    return <div className="p-6 text-red-500">Error: {error.message}</div>;
  if (!playerData || !playerData.info) {
    return <div className="p-4">Player data not found</div>;
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
    <header className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6 mt-20">
      <div className="flex flex-col gap-6">
        {/* Player Image and Basic Info */}
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24 rounded-full border-2 border-zinc-200 dark:border-zinc-700 overflow-hidden">
            {pic_url ? (
              <Image
                src={pic_url}
                alt={player_name}
                fill // Use fill instead of width/height
                className="object-cover" // object-cover still important
                quality={100}
                priority
                // No need for 'style' with fill, as it handles absolute positioning
              />
            ) : (
              <div className="w-full h-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                <span className="text-2xl font-bold text-zinc-400">
                  {player_name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {player_name}
            </h1>
            <p className="font-medium text-xs">
              {age} ({formatDate(dob)})
            </p>
            <div className="flex items-center gap-2">
              {nations.nation1_url && (
                <div className="relative w-6 h-4">
                  <Image
                    src={nations.nation1_url}
                    alt={nations.nation1 || ""}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-yellow-300">{nations.nation1}</span>
              {nations.nation2 && (
                <>
                  <div className="relative w-6 h-4">
                    <Image
                      src={nations.nation2_url || ""}
                      alt={nations.nation2}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-yellow-300">{nations.nation2}</span>
                </>
              )}
            </div>
            {playerData.info.isRetired ? (
              <div className="text-gray-600 dark:text-gray-400">Retired</div>
            ) : playerData.info.noClub ? (
              <div className="text-gray-600 dark:text-gray-400">No Club</div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  {curr_team_logo && (
                    <div className="relative w-6 h-6">
                      <Image
                        src={curr_team_logo}
                        alt={curr_team_name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <Link
                    href={`/teams/${playerData.info.curr_team_id}`}
                    className="hover:underline text-blue-600 dark:text-blue-400"
                  >
                    {curr_team_name}
                  </Link>
                  {curr_number && (
                    <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm">
                      #{curr_number}
                    </span>
                  )}
                  <p className="font-medium text-xs">{position}</p>
                </div>

                {playerData.info.onLoan && playerData.info.parent_team_name && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
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
                    <Link
                      href={`/teams/${playerData.info.parent_team_id}`}
                      className="hover:underline text-blue-600 dark:text-blue-400"
                    >
                      {playerData.info.parent_team_name}
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Player Details */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-grow">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Market Value
            </h3>
            <p className="font-medium">{formattedMarketValue}</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Height
            </h3>
            <p className="font-medium">{height ? `${height}m` : "N/A"}</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Preferred Foot
            </h3>
            <p className="font-medium">{foot || "N/A"}</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Joined
            </h3>
            <p className="font-medium">{formatDate(date_joined)}</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Contract Until
            </h3>
            <p className="font-medium">{formatDate(contract_end)}</p>
          </div>

          {instagram && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Social
              </h3>
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                @{instagram}
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

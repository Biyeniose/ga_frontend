import * as React from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerBio } from "@/types/PlayerTypes";
import Image from "next/image";
import Link from "next/link";
import { formatNumber } from "@/lib/methods";

interface PlayerBioCardProps {
  playerData: PlayerBio;
}

function PlayerBioCard({ playerData }: PlayerBioCardProps) {
  return (
    <div className="min-h-screen items-center max-w-screen-xl mx-auto p-8 pb-20 sm:p-20 px-8 pt-20 pb-14 font-[family-name:var(--font-ibm-plex)] text-sm md:text-base">
      <div className="justify-start dark:bg-zinc-900 rounded-lg p-3">
        <h1 className="text-2xl font-bold ">
          {playerData.player_name} #{playerData.curr_number}
        </h1>

        <div className="flex items-center space-x-2">
          {playerData.curr_team_logo ? (
            <Image
              className="mr-2"
              src={playerData.curr_team_logo}
              alt="Club"
              width={30}
              height={20}
            />
          ) : null}

          <Link
            href={`/teams/${playerData.curr_team_id}`}
            className="hover:underline hover:underline-offset-4"
          >
            {playerData.curr_team_name}
          </Link>
        </div>
        <div className="flex space-x-2">
          {playerData.nation1_url ? (
            <Image
              src={playerData.nation1_url}
              alt={playerData.nation1}
              width={30}
              height={20}
            />
          ) : null}
          {playerData.nation2 && playerData.nation2_url ? (
            <Image
              src={playerData.nation2_url}
              alt={playerData.nation2}
              width={30}
              height={20}
            />
          ) : null}
        </div>

        <div className="">
          <div className="">
            {playerData.age} yo ({playerData.dob} in {playerData.pob})
          </div>
          <div className="">
            {playerData.position} - {playerData.foot}
          </div>
          <div className="">
            Value:{" "}
            {playerData.market_value
              ? `${formatNumber(playerData.market_value)}`
              : "Not available"}
          </div>
          <div className="">
            Contract:{" "}
            {playerData.date_joined && playerData.contract_end
              ? `${playerData.date_joined} to ${playerData.contract_end}`
              : "Not available"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerBioCard;

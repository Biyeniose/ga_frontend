import * as React from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerPage } from "@/app/players/[id]/page";
import Image from "next/image";
import Link from "next/link";

interface PlayerCardProps {
  playerDetails: PlayerPage;
}

function PlayerCard({ playerDetails }: PlayerCardProps) {
  return (
    <Card className="w-[350px] max-h-[300px]">
      <CardHeader>
        <CardTitle>
          <Image
            src={playerDetails.logo_url}
            alt={playerDetails.team_name}
            width={50}
            height={50}
          />
          <div className="text-lg">
            <Link
              href={`/teams/${playerDetails.curr_team_id}`}
              className="hover:underline hover:underline-offset-4"
            >
              {playerDetails.team_name2}
            </Link>

            {""}
          </div>

          <p className="text-red-500">
            {playerDetails.date_joined} to {playerDetails.contract_end}
            {""}
          </p>
          <p className="my-2">
            GP = {playerDetails.curr_gp}
            <br />
            G/A = {playerDetails.curr_ga} ({playerDetails.curr_goals}G{" "}
            {playerDetails.curr_assists}A)
          </p>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PlayerCard;

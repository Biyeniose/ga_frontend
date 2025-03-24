import * as React from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerPage } from "@/app/players/[id]/page";
import Image from "next/image";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

          <p className="text-red-500 mb-1">
            {playerDetails.date_joined} to {playerDetails.contract_end}
            {""}
          </p>
        </CardTitle>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>GP</TableHead>
              <TableHead>GA</TableHead>
              <TableHead>G</TableHead>
              <TableHead>A</TableHead>
              <TableHead>ST</TableHead>
              <TableHead>ON</TableHead>
              <TableHead>OFF</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{playerDetails.curr_gp}</TableCell>
              <TableCell>{playerDetails.curr_ga}</TableCell>
              <TableCell>{playerDetails.curr_goals}</TableCell>
              <TableCell>{playerDetails.curr_assists}</TableCell>

              <TableCell>
                {playerDetails.curr_gp - playerDetails.curr_subon}
              </TableCell>
              <TableCell>{playerDetails.curr_suboff}</TableCell>
              <TableCell>{playerDetails.curr_suboff}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardHeader>
    </Card>
  );
}

export default PlayerCard;

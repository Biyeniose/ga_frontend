"use client";

import { useEffect, useState } from "react";
import * as React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Player {
  player_name: string;
  player_id: number;
  curr_ga: number;
  curr_goals: number;
  curr_assists: number;
  curr_gp: number;
  age: number;
  team_name: string;
  curr_team_id: number;
  nation1: string;
  nation2?: string | null;
  nation1_url: string;
  nation2_url?: string | null;
}

interface MyComponentProps {
  api_url: string;
}

//const api_url = "http://192.168.1.108:90/mostga/topleagues?max_age=38";
//const api_url ="https://c1ac-142-188-229-219.ngrok-free.app/v1/players/most_ga/topleagues";

const TableComponent: React.FC<MyComponentProps> = ({ api_url }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch(api_url, {
          headers: {
            "ngrok-skip-browser-warning": "true", // Add this header
          },
        });

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if the response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(`Expected JSON but got: ${text}`);
        }

        const data = await response.json();
        setPlayers(data.data);
      } catch (error) {
        console.error("Error fetching player data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlayers();
  }, [api_url]);

  if (loading)
    return (
      <>
        <Skeleton className="w-[150px] h-[50px] rounded-full" />
      </>
    );

  return (
    <Table className="w-82">
      <TableCaption>Top G/A All Competitions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Player Name</TableHead>
          <TableHead>G/A</TableHead>
          <TableHead>G</TableHead>
          <TableHead>A</TableHead>
          <TableHead>GP</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player) => (
          <TableRow key={player.player_id}>
            <TableCell className="font-small">
              <div className="flex flex-col gap-1">
                <div>
                  <Link
                    href={`/players/${player.player_id}`}
                    className="hover:underline hover:underline-offset-4"
                  >
                    {player.player_name}
                  </Link>{" "}
                  ({player.age})
                </div>
                <Link
                  href={`/teams/${player.curr_team_id}`}
                  className="hover:underline hover:underline-offset-4"
                >
                  {player.team_name}
                </Link>
                <div className="flex gap-1">
                  <Image
                    src={player.nation1_url}
                    alt={player.nation1}
                    width={28}
                    height={15}
                  />
                  {player.nation2 && player.nation2_url && (
                    <Image
                      src={player.nation2_url}
                      alt={player.nation2}
                      width={28}
                      height={15}
                    />
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell>{player.curr_ga}</TableCell>
            <TableCell>{player.curr_goals}</TableCell>
            <TableCell>{player.curr_assists}</TableCell>
            <TableCell>{player.curr_gp}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;

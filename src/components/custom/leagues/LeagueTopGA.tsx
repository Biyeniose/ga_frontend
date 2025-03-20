"use client";

import { useEffect, useState, useRef } from "react"; // Added useRef
import * as React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

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
  club_url: string;
}

interface MyComponentProps {
  api_url: string;
}

const LeagueTopGA: React.FC<MyComponentProps> = ({ api_url }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const isFetchCalled = useRef(false); // Added useRef

  useEffect(() => {
    async function fetchPlayers() {
      if (isFetchCalled.current) {
        return; // Prevent double fetch
      }
      isFetchCalled.current = true; // Set flag to true

      try {
        const response = await fetch(api_url, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

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
      <div className="flex justify-center items-center">
        {" "}
        {/* Center horizontally & vertically */}
        <Skeleton className="w-[150px] h-[30px] rounded-full" />
      </div>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Player</TableHead>
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

                <div className="flex gap-1">
                  <Image
                    alt={player.player_name}
                    src={player.club_url}
                    width={30}
                    height={30}
                  />
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

export default LeagueTopGA;

"use client";

import { useEffect, useState, useRef } from "react";
import * as React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Player {
  player_id: string;
  player_name: string; // Corrected type
  age: number;
  position: string; // Corrected type
  curr_gp: number;
  curr_ga: number;
  curr_goals: number; // Corrected type
  curr_assists: number;
  curr_minutes: number;
  nation1: string;
  nation2?: string | null;
  nation1_url: string | null; // Allow null
  nation2_url?: string | null; // Allow null
  curr_subon: number;
  curr_suboff: number;
}

interface MyComponentProps {
  api_url: string;
}

const MostMin: React.FC<MyComponentProps> = ({ api_url }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const isFetchCalled = useRef(false);

  useEffect(() => {
    async function fetchPlayers() {
      if (isFetchCalled.current) {
        return;
      }
      isFetchCalled.current = true;

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
        if (data && data.data) {
          setPlayers(data.data);
        } else {
          setPlayers([]); // Set empty array if data is missing.
        }
      } catch (error) {
        console.error("Error fetching teams players data:", error);
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
    <div className="flex flex-col border border-gray-300 rounded-md p-4">
      <h1 className="flex justify-center">Most Minutes</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead>ST</TableHead>
            <TableHead>ON</TableHead>
            <TableHead>OFF</TableHead>
            <TableHead>G/A</TableHead>
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
                    </Link>
                    {""} ({player.age})
                    <br />
                    {player.position}
                  </div>

                  <div className="flex gap-1">
                    {player.nation1_url && (
                      <Image
                        src={player.nation1_url}
                        alt={player.nation1}
                        width={28}
                        height={15}
                      />
                    )}
                    {player.nation2_url && (
                      <Image
                        src={player.nation2_url}
                        alt={player.nation2 ?? "Nation 2"}
                        width={28}
                        height={15}
                      />
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>{player.curr_gp - player.curr_subon}</TableCell>

              <TableCell>{player.curr_subon}</TableCell>
              <TableCell>{player.curr_suboff}</TableCell>
              <TableCell>{player.curr_ga}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MostMin;

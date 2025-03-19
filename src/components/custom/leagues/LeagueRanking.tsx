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

interface Team {
  team_name: string;
  team_id: number;
  curr_league_rank: number;
  curr_league_points: number;
  curr_league_gp: number;
  curr_league_gd: number;
  logo_url: string;
}

interface MyComponentProps {
  api_url: string;
}

const LeagueRanking: React.FC<MyComponentProps> = ({ api_url }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const isFetchCalled = useRef(false); // Added useRef

  useEffect(() => {
    async function fetchTeams() {
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
        setTeams(data.data);
      } catch (error) {
        console.error("Error fetching player data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTeams();
  }, [api_url]);

  if (loading)
    return (
      <>
        <Skeleton className="w-[150px] h-[50px] rounded-full" />
      </>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Team</TableHead>
          <TableHead>P</TableHead>
          <TableHead>GD</TableHead>
          <TableHead>GP</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teams.map((team) => (
          <TableRow key={team.team_id}>
            <TableCell>{team.curr_league_rank}</TableCell>

            <TableCell className="font-small">
              <div className="flex gap-1">
                <div>
                  <Link
                    href={`/teams/${team.team_id}`}
                    className="hover:underline hover:underline-offset-4"
                  >
                    {team.team_name}
                  </Link>
                </div>

                <div className="flex gap-1">
                  <Image
                    src={team.logo_url}
                    alt={team.team_name}
                    width={28}
                    height={15}
                  />
                </div>
              </div>
            </TableCell>

            <TableCell>{team.curr_league_points}</TableCell>
            <TableCell>{team.curr_league_gd}</TableCell>
            <TableCell>{team.curr_league_gp}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeagueRanking;

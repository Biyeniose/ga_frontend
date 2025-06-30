"use client";

import { useEffect, useState, useRef } from "react";
import * as React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Trophy, Users, Clock, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PlayerStats {
  player_id: number;
  season_year: number;
  player_name: string;
  age: number;
  team_name: string;
  ga: number;
  goals: number;
  assists: number;
  penalty_goals: number;
  gp: number;
  minutes: number;
  position: string;
  team_id: number;
  team_logo: string;
  nation1_id: number;
  nation2_id: number;
  nation1: string;
  nation2: string;
  nation1_url: string;
  nation2_url: string | null;
  stats_id: number;
}

interface MyComponentProps {
  api_url: string;
}

const MostGA: React.FC<MyComponentProps> = ({ api_url }) => {
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const isFetchCalled = useRef(false);

  //window.scrollTo(0, 0);

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
        if (data && data) {
          setPlayers(data);
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

  const getRankBadgeVariant = (
    rank: number,
  ): "default" | "secondary" | "outline" => {
    switch (rank) {
      case 1:
        return "default";
      case 2:
        return "secondary";
      case 3:
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-2xl">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <span>Top Goal Scorers</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {players.map((player, index) => (
          <Card
            key={player.stats_id}
            className="transition-all duration-200 hover:shadow-md hover:bg-muted/20 border-l-4 border-l-primary"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  {/* Rank Badge */}
                  <Badge
                    variant={getRankBadgeVariant(index + 1)}
                    className="h-10 w-10 rounded-full flex items-center justify-center text-base font-bold p-0"
                  >
                    {index + 1}
                  </Badge>

                  {/* Player Info */}
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg leading-tight">
                      {player.player_name}
                    </h3>

                    {/* Nation Flags */}
                    <div className="flex items-center space-x-2">
                      {player.nation1_url && (
                        <Image
                          src={player.nation1_url}
                          alt={player.nation1}
                          width={24}
                          height={16}
                          className="object-cover rounded border shadow-sm"
                          title={player.nation1}
                        />
                      )}
                      {player.nation2_url && (
                        <Image
                          src={player.nation2_url}
                          alt={player.nation2}
                          width={24}
                          height={16}
                          className="object-cover rounded border shadow-sm"
                          title={player.nation2}
                        />
                      )}
                    </div>

                    {/* Position */}
                    <div className="text-sm font-medium text-muted-foreground">
                      {player.position}
                    </div>

                    {/* Additional Stats */}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{player.team_name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{player.gp} GP</span>
                      </div>
                      {player.assists > 0 && (
                        <span className="font-medium">
                          {player.assists} assists
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Goals */}
                <div className="text-right">
                  <div className="text-4xl font-bold text-primary">
                    {player.goals}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    goals
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {players.length === 0 && !loading && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No player data available
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default MostGA;

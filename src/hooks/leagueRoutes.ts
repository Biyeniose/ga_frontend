"use client";

import { useState, useEffect } from "react";
import { LeagueResponse } from "@/types/LeagueTypes";
import { useQuery } from "@tanstack/react-query";
import { TeamPlayerStats } from "@/types/TeamTypes";
import { LeagueInfoResponse } from "@/types/LeagueTypes";

interface UseLeagueStandingsResult {
  data: LeagueResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useLeagueStandings = (
  season: string = "2024",
): UseLeagueStandingsResult => {
  const [data, setData] = useState<LeagueResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeagueStandings = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:90/v1/leagues/top_ranks?season=${season}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch league standings: ${response.status}`);
      }

      const result: LeagueResponse = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeagueStandings();
  }, [season]);

  const refetch = () => {
    fetchLeagueStandings();
  };

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

const fetchTopLeagueStats = async (
  leagueId: string,
): Promise<TeamPlayerStats[]> => {
  const res = await fetch(
    `http://localhost:90/v1/leagues/${leagueId}/stats?stat=ga&age=64&season=2024`,
  );
  if (!res.ok) throw new Error("Failed to fetch player stats");
  return res.json();
};

export const useTopLeagueStats = (leagueId: string) => {
  return useQuery<TeamPlayerStats[]>({
    queryKey: ["playerStats", leagueId],
    queryFn: () => fetchTopLeagueStats(leagueId),
  });
};

const fetchLeagueInfo = async (
  leagueId: number,
): Promise<LeagueInfoResponse> => {
  const res = await fetch(`http://localhost:90/v1/leagues/${leagueId}/infos`);
  if (!res.ok) throw new Error("Failed to fetch player stats");
  return res.json();
};

export const useLeagueInfo = (leagueId: number) => {
  return useQuery<LeagueInfoResponse>({
    queryKey: ["leagueInfo", leagueId],
    queryFn: () => fetchLeagueInfo(leagueId),
  });
};

"use client";

import { useQuery } from "@tanstack/react-query";
import { TeamPlayerStats } from "@/types/TeamTypes";
import {
  LeagueInfoResponse,
  TopCompWinnersResponse,
} from "@/types/LeagueTypes";
import { API_BASE_URL, NGROK_HEADERS } from "@/lib/constants";

// /leagues/:id/stats
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

// /leagues/:id/infos
const fetchLeagueInfo = async (
  leagueId: number,
): Promise<LeagueInfoResponse> => {
  const res = await fetch(`${API_BASE_URL}/v1/leagues/${leagueId}/infos`, {
    headers: NGROK_HEADERS,
  });
  if (!res.ok) throw new Error("Failed to fetch player stats");
  return res.json();
};

export const useLeagueInfo = (leagueId: number) => {
  return useQuery<LeagueInfoResponse>({
    queryKey: ["leagueInfo", leagueId],
    queryFn: () => fetchLeagueInfo(leagueId),
  });
};

// /leagues/winners
const fetchTopCompWinners = async (): Promise<TopCompWinnersResponse> => {
  const res = await fetch(`${API_BASE_URL}/v1/leagues/winners`, {
    headers: NGROK_HEADERS,
  });
  if (!res.ok) throw new Error("Failed to fetch player stats");
  return res.json();
};

export const useTopCompWinners = () => {
  return useQuery<TopCompWinnersResponse>({
    queryKey: ["leagueInfo"],
    queryFn: () => fetchTopCompWinners(),
  });
};

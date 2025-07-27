"use client";

import { useQuery } from "@tanstack/react-query";
import {
  PlayerPageDataResponse,
  PlayerGADistResponse,
} from "@/types/PlayerTypes";
import { API_BASE_URL, NGROK_HEADERS } from "@/lib/constants";

// player page: /players/infos
const fetchPlayerPageData = async (
  playerId: number,
): Promise<PlayerPageDataResponse> => {
  const res = await fetch(`${API_BASE_URL}/v1/players/${playerId}/infos`, {
    headers: NGROK_HEADERS,
  });
  console.log(res);

  if (!res.ok) throw new Error(`Failed to fetch team stats`);
  return res.json();
};

export const usePlayerPageData = (playerId: number) => {
  return useQuery<PlayerPageDataResponse>({
    queryKey: ["playerInfo", playerId],
    queryFn: () => fetchPlayerPageData(playerId),
  });
};

// player goal dist
const fetchPlayerGoalDist = async (
  playerId: number,
  season: number,
): Promise<PlayerGADistResponse> => {
  const res = await fetch(
    `${API_BASE_URL}/v1/players/${playerId}/goal-dist?season=${season}`,
    {
      headers: NGROK_HEADERS,
    },
  );
  if (!res.ok) throw new Error(`Failed to fetch team stats`);
  return res.json();
};

export const usePlayerGoalDistData = (playerId: number, season: number) => {
  return useQuery<PlayerGADistResponse>({
    queryKey: ["playerGoalDist", playerId, season],
    queryFn: () => fetchPlayerGoalDist(playerId, season),
  });
};

"use client";

import { useQuery } from "@tanstack/react-query";
import {
  PlayerPageDataResponse,
  PlayerGADistResponse,
  PlayerRecentGAResponse,
  PlayerMatchesResponse,
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

// player recent ga
const fetchPlayerRecentGA = async (
  playerId: number,
): Promise<PlayerRecentGAResponse> => {
  const res = await fetch(`${API_BASE_URL}/v1/players/${playerId}/recent-ga`, {
    headers: NGROK_HEADERS,
  });
  if (!res.ok) throw new Error(`Failed to fetch team stats`);
  return res.json();
};

export const usePlayerRecentGA = (playerId: number) => {
  return useQuery<PlayerRecentGAResponse>({
    queryKey: ["recentGA", playerId],
    queryFn: () => fetchPlayerRecentGA(playerId),
  });
};

// ALL player matches per year
const fetchPlayerMatches = async (
  playerId: number,
  season: number,
): Promise<PlayerMatchesResponse> => {
  const res = await fetch(
    `${API_BASE_URL}/v1/players/${playerId}/matches?season=${season}`,
    {
      headers: NGROK_HEADERS,
    },
  );
  if (!res.ok) throw new Error(`Failed to fetch team stats`);
  return res.json();
};

export const usePlayerMatches = (playerId: number, season: number) => {
  return useQuery<PlayerMatchesResponse>({
    queryKey: ["playerMatches", playerId],
    queryFn: () => fetchPlayerMatches(playerId, season),
  });
};

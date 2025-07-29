"use client";

import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, NGROK_HEADERS } from "@/lib/constants";
import {
  TeamPageResponse,
  TeamSeasonResponse,
  DomesticSeasonsResponse,
  LeagueMatchesResponse,
} from "@/types/TeamTypes";

// /teams/:id/infos
const fetchTeamPageData = async (teamId: number): Promise<TeamPageResponse> => {
  const res = await fetch(`${API_BASE_URL}/v1/teams/${teamId}/infos`, {
    headers: NGROK_HEADERS,
  });
  if (!res.ok) throw new Error(`Failed to fetch team ${teamId} data`);
  return res.json();
};

export const useTeamPageData = (teamId: number) => {
  return useQuery<TeamPageResponse>({
    queryKey: ["teamInfo", teamId],
    queryFn: () => fetchTeamPageData(teamId),
  });
};

// /teams/:id/comps
const fetchTeamSeasonRanks = async (
  teamId: number,
  season: number,
): Promise<TeamSeasonResponse> => {
  const res = await fetch(
    `${API_BASE_URL}/v1/teams/${teamId}/comps?season=${season}`,
    {
      headers: NGROK_HEADERS,
    },
  );
  //const res = await fetch(`http://localhost:90/v1/teams/${teamId}/infos`);
  console.log(res);

  if (!res.ok) throw new Error(`Failed to fetch team stats`);
  return res.json();
};

export const useTeamSeasonRanks = (teamId: number, season: number) => {
  return useQuery<TeamSeasonResponse>({
    queryKey: ["teamCups", teamId, season],
    queryFn: () => fetchTeamSeasonRanks(teamId, season),
  });
};

// /teams/:id/domestic
const fetchDomesticRanks = async (
  teamId: number,
  season: number,
): Promise<DomesticSeasonsResponse> => {
  const res = await fetch(
    `${API_BASE_URL}/v1/teams/${teamId}/domestic?season=${season}`,
    {
      headers: NGROK_HEADERS,
    },
  );
  //const res = await fetch(`http://localhost:90/v1/teams/${teamId}/infos`);
  console.log(res);

  if (!res.ok) throw new Error(`Failed to fetch team stats`);
  return res.json();
};

export const useDomesticRanks = (teamId: number, season: number) => {
  return useQuery<DomesticSeasonsResponse>({
    queryKey: ["domesticRanks", teamId, season],
    queryFn: () => fetchDomesticRanks(teamId, season),
  });
};

// /teams/:id/matches?season=2024
const fetchTeamMatchesbyYear = async (
  teamId: number,
  season: number,
): Promise<LeagueMatchesResponse> => {
  const res = await fetch(
    `${API_BASE_URL}/v1/teams/${teamId}/matches?season=${season}`,
    {
      headers: NGROK_HEADERS,
    },
  );
  console.log(res);

  if (!res.ok) throw new Error(`Failed to fetch team stats`);
  return res.json();
};

export const useTeamMatchesbyYear = (teamId: number, season: number) => {
  return useQuery<LeagueMatchesResponse>({
    queryKey: ["teamMatches", teamId, season],
    queryFn: () => fetchTeamMatchesbyYear(teamId, season),
  });
};

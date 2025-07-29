"use client";

import { useQuery } from "@tanstack/react-query";
import { PlayerStats } from "@/types/TeamTypes";
import { TeamPageResponse, TeamSeasonResponse } from "@/types/TeamTypes";
import { API_BASE_URL } from "@/lib/constants";

const fetchPlayerStats = async (teamId: string): Promise<PlayerStats[]> => {
  const res = await fetch(
    `${API_BASE_URL}/v1/leagues/9999/${teamId}/stats?stat=minutes&age=64`,
  );
  if (!res.ok) throw new Error("Failed to fetch player stats");
  return res.json();
};

export const usePlayerStats = (teamId: string) => {
  return useQuery<PlayerStats[]>({
    queryKey: ["playerStats", teamId],
    queryFn: () => fetchPlayerStats(teamId),
  });
};

// /players/:id/infos
const fetchTeamPageData = async (teamId: number): Promise<TeamPageResponse> => {
  const res = await fetch(`${API_BASE_URL}/v1/teams/${teamId}/infos`);
  //const res = await fetch(`http://localhost:90/v1/teams/${teamId}/infos`);
  console.log(res);

  if (!res.ok) throw new Error(`Failed to fetch team stats`);
  return res.json();
};

export const useTeamPageData = (teamId: number) => {
  return useQuery<TeamPageResponse>({
    queryKey: ["teamInfo", teamId],
    queryFn: () => fetchTeamPageData(teamId),
  });
};

// /players/:id/comps
const fetchTeamSeasonRanks = async (
  teamId: number,
  season: number,
): Promise<TeamSeasonResponse> => {
  const res = await fetch(
    `${API_BASE_URL}/v1/teams/${teamId}/comps?season=${season}`,
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

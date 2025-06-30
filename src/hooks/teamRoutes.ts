"use client";

import { useQuery } from "@tanstack/react-query";
import { TeamPlayerStats } from "@/types/TeamTypes";
import { TeamPageInfoResponse, SquadResponse } from "@/types/TeamTypes";
import { API_BASE_URL } from "@/lib/constants";

const fetchPlayerStats = async (teamId: string): Promise<TeamPlayerStats[]> => {
  const res = await fetch(
    `${API_BASE_URL}/v1/leagues/9999/${teamId}/stats?stat=minutes&age=64`,
  );
  if (!res.ok) throw new Error("Failed to fetch player stats");
  return res.json();
};

export const usePlayerStats = (teamId: string) => {
  return useQuery<TeamPlayerStats[]>({
    queryKey: ["playerStats", teamId],
    queryFn: () => fetchPlayerStats(teamId),
  });
};

const fetchTeamPageData = async (
  teamId: number,
): Promise<TeamPageInfoResponse> => {
  const res = await fetch(`${API_BASE_URL}/v1/teams/${teamId}/infos`);
  //const res = await fetch(`http://localhost:90/v1/teams/${teamId}/infos`);
  console.log(res);

  if (!res.ok) throw new Error(`Failed to fetch team stats`);
  return res.json();
};

export const useTeamPageData = (teamId: number) => {
  return useQuery<TeamPageInfoResponse>({
    queryKey: ["teamInfo", teamId],
    queryFn: () => fetchTeamPageData(teamId),
  });
};

const fetchTeamSqaudData = async (teamId: number): Promise<SquadResponse> => {
  const res = await fetch(`${API_BASE_URL}/v1/teams/${teamId}/squad`);
  //const res = await fetch(`http://localhost:90/v1/teams/${teamId}/infos`);
  console.log(res);

  if (!res.ok) throw new Error(`Failed to fetch team stats`);
  return res.json();
};

export const useTeamSquadData = (teamId: number) => {
  return useQuery<SquadResponse>({
    queryKey: ["teamSquad", teamId],
    queryFn: () => fetchTeamSqaudData(teamId),
  });
};

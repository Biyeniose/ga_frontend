"use client";

import { useQuery } from "@tanstack/react-query";
import { TeamPageResponse } from "@/types/TeamTypes";
import { API_BASE_URL, NGROK_HEADERS } from "@/lib/constants";

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

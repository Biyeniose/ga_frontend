"use client";

import { useQuery } from "@tanstack/react-query";
import { PlayerPageDataResponse } from "@/types/PlayerTypes";
import { API_BASE_URL } from "@/lib/constants";

const fetchPlayerPageData = async (
  playerId: number,
): Promise<PlayerPageDataResponse> => {
  const res = await fetch(`${API_BASE_URL}/v1/players/${playerId}/infos`);
  //const res = await fetch(`http://localhost:90/v1/teams/${teamId}/infos`);
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

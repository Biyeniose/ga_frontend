"use client";

import { useQuery } from "@tanstack/react-query";
import { MatchDataResponse } from "@/types/MatchTypes";
import { API_BASE_URL, NGROK_HEADERS } from "@/lib/constants";

// /matches/:id
const fetchMatchData = async (matchId: number): Promise<MatchDataResponse> => {
  const res = await fetch(`${API_BASE_URL}/v1/matches/${matchId}`, {
    headers: NGROK_HEADERS,
  });
  if (!res.ok) throw new Error("Failed to fetch match data");
  return res.json();
};

export const useMatchData = (matchId: number) => {
  return useQuery<MatchDataResponse>({
    queryKey: ["matchInfo", matchId],
    queryFn: () => fetchMatchData(matchId),
  });
};

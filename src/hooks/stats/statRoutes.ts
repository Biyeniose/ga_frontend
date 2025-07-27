"use client";
import { H2HResponse } from "@/types/StatTypes";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, NGROK_HEADERS } from "@/lib/constants";

// /h2h/:team1_id?team2_id
const fetchH2HData = async (
  team1Id: number,
  team2Id: number,
): Promise<H2HResponse> => {
  const res = await fetch(
    `${API_BASE_URL}/v1/stats/h2h?team1_id=${team1Id}&team2_id=${team2Id}`,

    {
      headers: NGROK_HEADERS,
    },
  );
  if (!res.ok) throw new Error("Failed to fetch match data");
  return res.json();
};

export const useH2HData = (team1Id: number, team2Id: number) => {
  return useQuery<H2HResponse>({
    queryKey: ["matchInfo", team1Id],
    queryFn: () => fetchH2HData(team1Id, team2Id),
  });
};

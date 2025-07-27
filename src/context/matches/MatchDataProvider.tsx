// src/context/natches/MatchDataContext.tsx
"use client";

import { createContext, ReactNode } from "react";
//import { PlayerPageDataItem } from "@/types/PlayerTypes";
import { MatchDataResponse } from "@/types/MatchTypes";
import { useMatchData } from "@/hooks/matches/matchRoutes";
//import { usePlayerPageData } from "@/hooks/playerRoutes";

interface DataContextType {
  //playerData?: PlayerPageDataItem;
  matchData?: MatchDataResponse;
  isLoading: boolean;
  error: Error | null;
}

interface DataProviderProps {
  children: ReactNode;
  matchId: number;
}

export const MatchDataContext = createContext<DataContextType>({
  matchData: undefined,
  isLoading: true,
  error: null,
});

export function MatchDataProvider({ children, matchId }: DataProviderProps) {
  // useTeamPageData now returns a Promise<TeamPageInfoResponse>
  const { data: apiResponse, isLoading, error } = useMatchData(matchId);

  const extractedMatchData: MatchDataResponse | undefined = apiResponse;

  const contextValue: DataContextType = {
    matchData: extractedMatchData, // Assign the extracted content
    isLoading,
    error,
  };

  return (
    <MatchDataContext.Provider value={contextValue}>
      {children}
    </MatchDataContext.Provider>
  );
}

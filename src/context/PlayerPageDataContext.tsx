// src/context/PlayerPageDataContext.tsx
"use client";

import { createContext, ReactNode } from "react";
import { PlayerPageDataItem } from "@/types/PlayerTypes";
import { usePlayerPageData } from "@/hooks/playerRoutes";

interface DataContextType {
  playerData?: PlayerPageDataItem;
  isLoading: boolean;
  error: Error | null;
}

interface DataProviderProps {
  children: ReactNode;
  playerId: number;
}

export const DataContext = createContext<DataContextType>({
  playerData: undefined,
  isLoading: true,
  error: null,
});

export function PlayerPageDataProvider({
  children,
  playerId,
}: DataProviderProps) {
  // useTeamPageData now returns a Promise<TeamPageInfoResponse>
  const { data: apiResponse, isLoading, error } = usePlayerPageData(playerId);

  const extractedPlayerData: PlayerPageDataItem | undefined = apiResponse?.data;

  const contextValue: DataContextType = {
    playerData: extractedPlayerData, // Assign the extracted content
    isLoading,
    error,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}

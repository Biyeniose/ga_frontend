// src/context/PlayerPageDataContext.tsx
"use client";

import { createContext, ReactNode } from "react";
import { PlayerPageDataItem, PlayerGADistData } from "@/types/PlayerTypes";
import { usePlayerPageData } from "@/hooks/playerRoutes";
import { usePlayerGoalDistData } from "@/hooks/players/playerRoutes"; // Add this import

interface DataContextType {
  playerData?: PlayerPageDataItem;
  gaDistData?: PlayerGADistData; // Add GA distribution data type here
  isLoading: boolean;
  gaDistLoading: boolean; // Add separate loading for GA dist
  error: Error | null;
  gaDistError: Error | null; // Add separate error for GA dist
}

interface DataProviderProps {
  children: ReactNode;
  playerId: number;
  season?: number; // Add season prop
}

export const DataContext = createContext<DataContextType>({
  playerData: undefined,
  gaDistData: undefined,
  isLoading: true,
  gaDistLoading: true,
  error: null,
  gaDistError: null,
});

export function PlayerPageDataProvider({
  children,
  playerId,
  season = 2024, // Default to 2024
}: DataProviderProps) {
  // Original player data hook
  const { data: apiResponse, isLoading, error } = usePlayerPageData(playerId);

  // Add GA distribution data hook
  const {
    data: gaDistResponse,
    isLoading: gaDistLoading,
    error: gaDistError,
  } = usePlayerGoalDistData(playerId, season);

  const extractedPlayerData: PlayerPageDataItem | undefined = apiResponse?.data;
  const extractedGADistData: PlayerGADistData | undefined =
    gaDistResponse?.data; // Extract GA dist data

  const contextValue: DataContextType = {
    playerData: extractedPlayerData,
    gaDistData: extractedGADistData, // Add GA dist data
    isLoading,
    gaDistLoading, // Add GA dist loading state
    error,
    gaDistError, // Add GA dist error state
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}

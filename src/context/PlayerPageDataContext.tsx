// src/context/PlayerPageDataContext.tsx
"use client";

import { createContext, ReactNode } from "react";
import {
  PlayerPageDataItem,
  PlayerGADistData,
  PlayerRecentGAResponse,
} from "@/types/PlayerTypes";
import { usePlayerPageData } from "@/hooks/playerRoutes";
import { usePlayerGoalDistData } from "@/hooks/players/playerRoutes"; // Add this import
import { usePlayerRecentGA } from "@/hooks/players/playerRoutes";

interface DataContextType {
  playerData?: PlayerPageDataItem;
  gaDistData?: PlayerGADistData; // Add GA distribution data type here
  recentGAData?: PlayerRecentGAResponse;
  isLoading: boolean;
  gaDistLoading: boolean; // Add separate loading for GA dist
  recentGALoading: boolean; // Add separate loading for GA dist
  error: Error | null;
  gaDistError: Error | null; // Add separate error for GA dist
  recentGAError: Error | null;
}

interface DataProviderProps {
  children: ReactNode;
  playerId: number;
  season?: number; // Add season prop
}

export const DataContext = createContext<DataContextType>({
  playerData: undefined,
  gaDistData: undefined,
  recentGAData: undefined,
  isLoading: true,
  gaDistLoading: true,
  recentGALoading: true,
  error: null,
  gaDistError: null,
  recentGAError: null,
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

  // Recent GA
  const {
    data: recentGAResponse,
    isLoading: recentGALoading,
    error: recentGAError,
  } = usePlayerRecentGA(playerId);

  const extractedPlayerData: PlayerPageDataItem | undefined = apiResponse?.data;
  const extractedGADistData: PlayerGADistData | undefined =
    gaDistResponse?.data; // Extract GA dist data

  const extractedRecentGAData: PlayerRecentGAResponse | undefined =
    recentGAResponse; // Extract GA dist data

  const contextValue: DataContextType = {
    playerData: extractedPlayerData,
    gaDistData: extractedGADistData, // Add GA dist data
    recentGAData: extractedRecentGAData, // recent GA
    isLoading,
    gaDistLoading, // Add GA dist loading state
    recentGALoading,
    error,
    gaDistError, // Add GA dist error state
    recentGAError,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}

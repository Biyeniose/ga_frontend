// src/context/LeagueDataContext.tsx
"use client";

import { createContext, ReactNode } from "react";
// Import the specific types needed for the context
import { LeagueDataItem } from "@/types/LeagueTypes";
import { useLeagueInfo } from "@/hooks/leagueRoutes"; // Assuming this hook exists

interface DataContextType {
  // Now, `leagueData` will directly hold the content of a single league
  leagueData?: LeagueDataItem;
  isLoading: boolean;
  error: Error | null;
}

interface DataProviderProps {
  children: ReactNode;
  leagueId: number;
}

export const DataContext = createContext<DataContextType>({
  leagueData: undefined,
  isLoading: true,
  error: null,
});

export function LeagueInfoProvider({ children, leagueId }: DataProviderProps) {
  // Let's assume useLeagueInfo returns LeagueApiResponse | undefined for now based on your full JSON.
  const { data: apiResponse, isLoading, error } = useLeagueInfo(leagueId);

  // Extract the specific league data content we need
  // Assuming for a specific league ID, the 'data' array will contain exactly one element
  const extractedLeagueData: LeagueDataItem | undefined =
    apiResponse?.data && apiResponse.data.length > 0
      ? apiResponse.data[0]
      : undefined;

  const contextValue: DataContextType = {
    leagueData: extractedLeagueData, // Assign the extracted content
    isLoading,
    error,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}

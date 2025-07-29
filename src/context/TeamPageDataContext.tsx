// src/context/TeamPageDataContext.tsx
"use client";

import { createContext, ReactNode } from "react";
import { TeamPageData } from "@/types/TeamTypes"; // Ensure TeamPageInfoResponse is imported
import { useTeamPageData } from "@/hooks/teamRoutes";

interface DataContextType {
  teamData?: TeamPageData;
  isLoading: boolean;
  error: Error | null;
}

interface DataProviderProps {
  children: ReactNode;
  teamId: number;
}

export const DataContext = createContext<DataContextType>({
  teamData: undefined,
  isLoading: true,
  error: null,
});

export function TeamPageDataProvider({ children, teamId }: DataProviderProps) {
  // useTeamPageData now returns a Promise<TeamPageInfoResponse>
  const { data: apiResponse, isLoading, error } = useTeamPageData(teamId);

  const extractedTeamData: TeamPageData | undefined = apiResponse?.data;

  const contextValue: DataContextType = {
    teamData: extractedTeamData, // Assign the extracted content
    isLoading,
    error,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}

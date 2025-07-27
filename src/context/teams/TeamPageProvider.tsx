// src/context/teams/TeamPageProvider.tsx
"use client";

import { createContext, ReactNode } from "react";
//import { PlayerPageDataItem } from "@/types/PlayerTypes";
import { TeamPageResponse } from "@/types/TeamTypes";
import { useTeamPageData } from "@/hooks/teams/teamRoutes";
//import { usePlayerPageData } from "@/hooks/playerRoutes";

interface DataContextType {
  teamData?: TeamPageResponse;
  isLoading: boolean;
  error: Error | null;
}

interface DataProviderProps {
  children: ReactNode;
  teamId: number;
}

export const TeamPageContext = createContext<DataContextType>({
  teamData: undefined,
  isLoading: true,
  error: null,
});

export function TeamPageProvider({ children, teamId }: DataProviderProps) {
  // useTeamPageData now returns a Promise<TeamPageInfoResponse>
  const { data: apiResponse, isLoading, error } = useTeamPageData(teamId);

  const extractedTeamData: TeamPageResponse | undefined = apiResponse;

  const contextValue: DataContextType = {
    teamData: extractedTeamData, // Assign the extracted content
    isLoading,
    error,
  };

  return (
    <TeamPageContext.Provider value={contextValue}>
      {children}
    </TeamPageContext.Provider>
  );
}

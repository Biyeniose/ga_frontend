// src/context/teams/TeamPageProvider.tsx
"use client";

import { createContext, ReactNode } from "react";
//import { PlayerPageDataItem } from "@/types/PlayerTypes";
import {
  TeamPageResponse,
  TeamSeasonResponse,
  DomesticSeasonsResponse,
} from "@/types/TeamTypes";
import {
  useTeamPageData,
  useTeamSeasonRanks,
  useDomesticRanks,
} from "@/hooks/teams/teamRoutes";
//import { usePlayerPageData } from "@/hooks/playerRoutes";

interface DataContextType {
  teamData?: TeamPageResponse;
  isLoading: boolean;
  error: Error | null;
  seasonData?: TeamSeasonResponse;
  seasonLoading: boolean;
  seasonError: Error | null;
  domesticData?: DomesticSeasonsResponse;
  domesticLoading: boolean;
  domesticError: Error | null;
}

interface DataProviderProps {
  children: ReactNode;
  teamId: number;
  season?: number;
}

export const TeamPageContext = createContext<DataContextType>({
  teamData: undefined,
  seasonData: undefined,
  domesticData: undefined,
  isLoading: true,
  seasonLoading: true,
  domesticLoading: true,
  error: null,
  seasonError: null,
  domesticError: null,
});

export function TeamPageProvider({
  children,
  teamId,
  season = 2024,
}: DataProviderProps) {
  // useTeamPageData now returns a Promise<TeamPageInfoResponse>
  const { data: apiResponse, isLoading, error } = useTeamPageData(teamId);
  // season ranks promise
  const {
    data: teamSeasonResponse,
    isLoading: seasonLoading,
    error: seasonError,
  } = useTeamSeasonRanks(teamId, season);
  // domestic ranks promise
  const {
    data: domesticSeasonsData,
    isLoading: domesticLoading,
    error: domesticError,
  } = useDomesticRanks(teamId, season);

  const extractedTeamData: TeamPageResponse | undefined = apiResponse;
  const seasonCupsData: TeamSeasonResponse | undefined = teamSeasonResponse;
  const domesticData: DomesticSeasonsResponse | undefined = domesticSeasonsData;

  const contextValue: DataContextType = {
    teamData: extractedTeamData, // Assign the extracted content
    isLoading,
    error,
    seasonData: seasonCupsData, // Assign the extracted content
    seasonLoading,
    seasonError,
    domesticData: domesticData, // Assign the extracted content
    domesticLoading,
    domesticError,
  };

  return (
    <TeamPageContext.Provider value={contextValue}>
      {children}
    </TeamPageContext.Provider>
  );
}

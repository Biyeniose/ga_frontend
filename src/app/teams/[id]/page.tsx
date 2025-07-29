"use client";

//import { useParams } from "next/navigation";
//import { useContext } from "react";
import { TeamMatchesSection } from "@/components/custom/teams/team_page/TeamMatchesSection";
import { TeamPlayerStatsSection } from "@/components/custom/teams/team_page/TeamPlayerStatsSection";
import { TeamTransfersSection } from "@/components/custom/teams/team_page/TeamTransfersSection";
import TeamSeasonCard from "@/components/custom/teams/team_page/TeamSeasonCard";
//import { TeamPageContext } from "@/context/teams/TeamPageProvider";
import DomesticRanksChart from "@/components/custom/teams/team_page/DomesticRanksChart";

export default function TeamsPage() {
  //const { teamData, isLoading, error } = useContext(TeamPageContext);
  //const params = useParams();
  //const teamId = params.id;

  return (
    <div className="min-h-screen mx-1 mt-3 p-4 bg-zinc-100 dark:bg-zinc-950 rounded-lg font-[family-name:var(--font-opensans)] space-y-4">
      <TeamSeasonCard />
      <DomesticRanksChart />
      <TeamMatchesSection />
      <TeamPlayerStatsSection />
      <TeamTransfersSection />
    </div>
  );
}

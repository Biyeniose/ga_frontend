import { useContext } from "react";
import { TeamPageContext } from "@/context/teams/TeamPageProvider";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TeamSeasonCard = () => {
  const { seasonData, seasonLoading, seasonError } =
    useContext(TeamPageContext);

  if (seasonLoading) {
    return (
      <div className="w-48 h-12 bg-black border border-gray-800 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-600 border-t-white"></div>
      </div>
    );
  }

  if (seasonError || !seasonData?.data?.season_comps) {
    return (
      <div className="w-48 h-12 bg-black border border-gray-800 rounded-lg flex items-center justify-center">
        <span className="text-gray-400 text-xs">No data</span>
      </div>
    );
  }

  const seasonFinishes = seasonData.data.season_comps;

  const getRankDisplay = (ranking) => {
    if (ranking.rank === 1) return "🏆";
    if (ranking.rank === 2) return "🥈";
    if (ranking.rank === 3) return "🥉";
    if (ranking.rank) return `${ranking.rank}`;
    if (ranking.round) return ranking.round;
    return "—";
  };

  const getRankColor = (ranking) => {
    if (ranking.rank === 1) return "text-yellow-400";
    if (ranking.rank === 2) return "text-gray-300";
    if (ranking.rank === 3) return "text-orange-400";
    if (ranking.rank && ranking.rank <= 10) return "text-green-400";
    return "text-gray-400";
  };

  return (
    <div className="w-80">
      <Accordion
        type="single"
        collapsible
        className="bg-black border border-gray-800 rounded-lg"
      >
        <AccordionItem value="season" className="border-none">
          <AccordionTrigger className="px-3 py-3 text-white text-sm font-medium hover:no-underline">
            {seasonFinishes[0]?.ranking.season} Season
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-2 space-y-1">
            {seasonFinishes.map((seasonComp, index) => (
              <div
                key={`${seasonComp.ranking.comp.comp_id}-${index}`}
                className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-900 transition-colors"
              >
                {seasonComp.ranking.comp.comp_url ? (
                  <Image
                    src={seasonComp.ranking.comp.comp_url}
                    alt=""
                    width={16}
                    height={16}
                    className="rounded flex-shrink-0"
                  />
                ) : (
                  <div className="w-4 h-4 bg-gray-700 rounded flex-shrink-0"></div>
                )}

                <span className="text-gray-200 text-xs truncate flex-1 min-w-0">
                  {seasonComp.ranking.comp.comp_name}
                </span>

                <span
                  className={`text-xs font-medium ${getRankColor(
                    seasonComp.ranking,
                  )}`}
                >
                  {getRankDisplay(seasonComp.ranking)}
                </span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TeamSeasonCard;

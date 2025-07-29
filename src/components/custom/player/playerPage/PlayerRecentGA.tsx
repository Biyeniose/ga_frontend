import { useContext } from "react";
import { DataContext } from "@/context/PlayerPageDataContext";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { format } from "date-fns";

const PlayerRecentGA = () => {
  const { recentGAData, recentGALoading, recentGAError } =
    useContext(DataContext);

  if (recentGALoading) {
    return (
      <div className="bg-black border border-gray-700 rounded-lg p-6 w-full">
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (recentGAError) {
    return (
      <div className="bg-black border border-gray-700 rounded-lg p-6 w-full">
        <div className="p-4 text-red-500 flex items-center gap-2">
          <span>⚠️</span>
          <span>Error: {recentGAError.message}</span>
        </div>
      </div>
    );
  }

  const recentGA = recentGAData?.data.recent_ga;

  if (!recentGA || recentGA.length === 0) {
    return (
      <div className="bg-black border border-gray-700 rounded-lg p-6 w-full">
        <div className="p-4 text-gray-400 text-center">
          No recent goal contributions found
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black border border-gray-700 rounded-lg p-4 w-full">
      <h3 className="text-lg font-medium mb-4 text-white">
        Recent Goal Contributions
      </h3>
      <div className="relative px-12 sm:px-16">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1">
            {recentGA.map((match, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-[260px] sm:basis-[280px]"
              >
                <Link href={`/matches/${match.match_info.match_id}`}>
                  <div className="bg-black border border-gray-600 rounded-lg p-3 h-full max-w-[260px] hover:border-gray-500 hover:bg-gray-900 transition-colors cursor-pointer">
                    {/* Match header */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-xs text-gray-400">
                        {format(
                          new Date(match.match_info.date_time_utc),
                          "MMM d, yyyy",
                        )}
                      </div>
                      <div className="flex items-center">
                        <Image
                          src={match.match_info.comp_logo}
                          alt={match.match_info.comp}
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain"
                        />
                        <span className="text-xs text-gray-400 ml-1 truncate max-w-[50px]">
                          {match.match_info.comp.length > 7
                            ? `${match.match_info.comp.substring(0, 7)}..`
                            : match.match_info.comp}
                        </span>
                      </div>
                    </div>

                    {/* Teams and score */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center justify-center w-10">
                        <Image
                          src={match.teams.home.team.logo}
                          alt={match.teams.home.team.team_name}
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div className="px-2 py-0.5 bg-gray-800 rounded text-xs font-bold text-white">
                        {match.match_info.result}
                      </div>
                      <div className="flex items-center justify-center w-10">
                        <Image
                          src={match.teams.away.team.logo}
                          alt={match.teams.away.team.team_name}
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    </div>

                    {/* Player stats */}
                    {match.player_stats && (
                      <div className="border-t border-gray-700 pt-2">
                        <div className="flex gap-3 text-xs">
                          {match.player_stats.goals > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400">G:</span>
                              <span className="font-medium text-green-500">
                                {match.player_stats.goals}
                              </span>
                            </div>
                          )}
                          {match.player_stats.assists > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400">A:</span>
                              <span className="font-medium text-blue-500">
                                {match.player_stats.assists}
                              </span>
                            </div>
                          )}
                          {match.player_stats.pens_made > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400">PG:</span>
                              <span className="font-medium text-yellow-500">
                                {match.player_stats.pens_made}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 border-gray-600 hover:bg-gray-700 text-white w-8 h-8" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 border-gray-600 hover:bg-gray-700 text-white w-8 h-8" />
        </Carousel>
      </div>
    </div>
  );
};

export default PlayerRecentGA;

"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { MatchEvent } from "@/types/PlayerTypes";

export function PlayerGoalsCarousel({
  goal_data,
}: {
  goal_data: MatchEvent[];
}) {
  // Group events by match_id
  const matchesMap = new Map<number, MatchEvent[]>();

  goal_data.forEach((event) => {
    const matchEvents = matchesMap.get(event.match_id) || [];
    matchEvents.push(event);
    matchesMap.set(event.match_id, matchEvents);
  });

  const uniqueMatches = Array.from(matchesMap.values());

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {uniqueMatches.map((matchEvents, index) => {
            const firstEvent = matchEvents[0];
            const {
              home_team,
              away_team,
              total_match_goals,
              total_match_assists,
              match_date,
            } = firstEvent;

            return (
              <CarouselItem key={index} className="basis-full md:basis-1/2">
                <div className="p-2">
                  <div className="border rounded-lg p-4">
                    {/* Match date */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2">
                      {formatDate(match_date)}
                    </div>

                    {/* Match info - logos and score */}
                    <div className="flex items-center justify-center gap-4 mb-4">
                      {home_team.team_logo && (
                        <div className="relative w-10 h-10">
                          <Image
                            src={home_team.team_logo}
                            alt={home_team.team_name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-2 px-4">
                        <span className="font-bold text-lg">
                          {home_team.goals}
                        </span>
                        <span className="text-lg">-</span>
                        <span className="font-bold text-lg">
                          {away_team.goals}
                        </span>
                      </div>

                      {away_team.team_logo && (
                        <div className="relative w-10 h-10">
                          <Image
                            src={away_team.team_logo}
                            alt={away_team.team_name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>

                    {/* Player contributions */}
                    <div className="flex justify-center gap-6 mt-4">
                      {total_match_goals > 0 && (
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-bold text-green-500">
                            {total_match_goals}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Goals
                          </span>
                        </div>
                      )}
                      {total_match_assists > 0 && (
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-bold text-blue-500">
                            {total_match_assists}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Assists
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

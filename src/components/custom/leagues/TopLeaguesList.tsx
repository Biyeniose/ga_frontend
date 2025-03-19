"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import LeagueTopGA from "./LeagueTopGA";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface TopLeagues {
  league_name: string;
  league_id: number;
  country_url: string;
}

const api_url =
  "https://a0d1-142-188-229-219.ngrok-free.app/v1/leagues/domestic";

export function TopLeaguesList() {
  const [leagues, setLeagues] = useState<TopLeagues[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeagues() {
      try {
        const response = await fetch(api_url, {
          headers: {
            "ngrok-skip-browser-warning": "true", // Add this header
          },
        });

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if the response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(`Expected JSON but got: ${text}`);
        }

        const data = await response.json();
        setLeagues(data.data);
      } catch (error) {
        console.error("Error fetching player data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeagues();
  }, []);

  if (loading)
    return (
      <>
        <Skeleton className="w-[150px] h-[50px] rounded-full" />
      </>
    );

  return (
    <div className="w-[370px]">
      {leagues.map((league) => (
        <React.Fragment key={league.league_id}>
          {" "}
          {/* Added key prop */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium leading-none">
                      {league.league_name}
                    </h4>
                    <Image
                      src={`${league.country_url}`}
                      alt="nation"
                      width={28}
                      height={15}
                    />
                    <Link
                      href={`/leagues/${league.league_id}`}
                      className="inline-flex items-center justify-center rounded-md text-xs px-1 py-1 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    >
                      <ChevronRight className="h-4 w-7" />
                    </Link>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <LeagueTopGA
                  key={league.league_id}
                  api_url={`https://a0d1-142-188-229-219.ngrok-free.app/v1/players/most_ga/${league.league_id}`}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator className="" />
        </React.Fragment>
      ))}
    </div>
  );
}

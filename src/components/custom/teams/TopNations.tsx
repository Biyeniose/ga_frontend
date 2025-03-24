"use client";

import { useEffect, useState, useRef } from "react";
import * as React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface Data {
  nation: string;
  nation_url: string;
  num_players: number;
  team_id: number;
}

interface MyComponentProps {
  api_url: string;
}

const TopNations: React.FC<MyComponentProps> = ({ api_url }) => {
  const [players, setPlayers] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const isFetchCalled = useRef(false);

  useEffect(() => {
    async function fetchPlayers() {
      if (isFetchCalled.current) {
        return;
      }
      isFetchCalled.current = true;

      try {
        const response = await fetch(api_url, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(`Expected JSON but got: ${text}`);
        }

        const data = await response.json();
        if (data && data.data) {
          setPlayers(data.data);
        } else {
          setPlayers([]); // Set empty array if data is missing.
        }
      } catch (error) {
        console.error("Error fetching teams players data:", error);
      } finally {
        setLoading(false);
      }
    }

    window.scrollTo(0, 0); // Scroll to top on mount (initial page load)

    fetchPlayers();
  }, [api_url]);

  if (loading)
    return (
      <>
        <Skeleton className="w-[150px] h-[50px] rounded-full" />
      </>
    );

  return (
    <div className="flex flex-col border border-gray-300 rounded-md p-4 text-sm">
      <h1 className="flex justify-center">Top Nations</h1>

      {players.map((player) => (
        <label key={player.team_id}>
          <div className="flex flex-col gap-1 font-small">
            <div>
              {player.nation_url && (
                <Image
                  src={player.nation_url}
                  alt={player.nation}
                  width={28}
                  height={15}
                />
              )}
              {player.nation} - {player.num_players}
            </div>
          </div>
        </label>
      ))}
    </div>
  );
};

export default TopNations;

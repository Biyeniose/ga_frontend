import PlayerCard from "@/components/custom/player/PlayerCard";
import Image from "next/image";

export interface PlayerPage {
  player_name: string;
  player_id: number;
  team_name: string;
  team_name2: string;
  logo_url: string;
  curr_team_id: number;
  age: number;
  position: string;
  dob: string;
  nation1: string;
  nation2?: string | null;
  nation1_url: string;
  nation2_url?: string | null;
  market_value: number;
  date_joined: string;
  contract_end: string;
  curr_ga: number;
  curr_goals: number;
  curr_assists: number;
  curr_gp: number;
  curr_subon: number;
  curr_suboff: number;
  foot: string;
}

interface ApiResponse {
  data: PlayerPage | null;
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const url = `https://c1ac-142-188-229-219.ngrok-free.app/v1/players/${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch player data: ${response.status}`);
    }

    const apiResponse: ApiResponse = await response.json();
    const playerData = apiResponse.data;

    if (!playerData) {
      return (
        <div className="min-h-screen p-8 pb-20 sm:p-20 px-8 pt-20 pb-14 font-[family-name:var(--font-geist-mono)] ">
          Player not found.
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col items-center p-8 pb-20 sm:p-20 px-8 pt-20 pb-14 font-[family-name:var(--font-geist-mono)] ">
        <h1 className="text-3xl font-bold my-4 p-3">
          {playerData.player_name}
          <div className="flex space-x-2">
            {playerData.nation1_url ? (
              <Image
                src={playerData.nation1_url}
                alt={playerData.nation1}
                width={40}
                height={35}
              />
            ) : null}
            {playerData.nation2 && playerData.nation2_url ? (
              <Image
                src={playerData.nation2_url}
                alt={playerData.nation2}
                width={40}
                height={35}
              />
            ) : null}
          </div>
          <p className="text-base font-normal">
            {new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "EUR",
            }).format(playerData.market_value)}
          </p>
          <p className="text-base font-normal">
            {playerData.age} yo ({playerData.dob})
          </p>
          <p className="text-base font-normal">
            {playerData.position} - {playerData.foot}
          </p>
        </h1>

        <PlayerCard playerDetails={playerData} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div className="text-red-500">Error loading player data.</div>;
  }
}

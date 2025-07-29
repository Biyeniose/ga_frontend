//import Image from "next/image";
"use client";

import SeasonMatchesChart from "@/components/custom/player/matches/SeasonMatchesChart";
import { useParams } from "next/navigation";

export default function PlayerMatchesPage() {
  const params = useParams();
  const id = params.id;
  const idAsNumber: number = Number(id);

  return (
    <div className="mb-5 ">
      <SeasonMatchesChart playerId={idAsNumber} season={2024} />
    </div>
  );
}

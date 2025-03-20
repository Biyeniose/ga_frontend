import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface TeamPage {
  team_name: string;
  team_name2: string;
  team_id: number;
  logo_url: string;
  league_id: number;
}

interface ApiResponse {
  data: TeamPage | null; // Data is a single PlayerPage object or null
}

export default async function TeamsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const url = `https://c1ac-142-188-229-219.ngrok-free.app/v1/teams/${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch team data: ${response.status}`);
    }

    const apiResponse: ApiResponse = await response.json();
    const teamData = apiResponse.data; // Access data directly

    if (!teamData) {
      console.log(apiResponse.data);
      return (
        <div className="min-h-screen p-8 pb-20 sm:p-20 px-8 pt-20 pb-14 font-[family-name:var(--font-geist-mono)] ">
          Team not found.
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col md:flex-row p-8 pb-20 sm:p-20 px-8 pt-20 pb-14 font-[family-name:var(--font-geist-mono)] ">
        <h1 className="text-3xl font-bold my-4 p-3 flex flex-col items-center justify-center">
          {teamData.team_name2}
          <div className="flex space-x-2">
            <Image
              src={teamData.logo_url}
              alt={teamData.team_name}
              width={70}
              height={70}
            />
          </div>
        </h1>

        <main className="flex items-center justify-center">
          <Button asChild className="self-start" variant="destructive">
            <Link href={`/teams/${teamData.team_id}/allplayers`}>
              See All Players
            </Link>
          </Button>
        </main>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error loading player data.</div>;
  }
}

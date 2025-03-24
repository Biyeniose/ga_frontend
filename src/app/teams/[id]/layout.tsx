import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define the type for the API response
interface TeamData {
  team_name: string;
  team_name2: string;
  team_id: number;
  logo_url: string;
  league_id: number;
}

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = await params;

  // Make the API call
  const url = `https://c1ac-142-188-229-219.ngrok-free.app/v1/teams/${id}`;
  const response = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch team data: ${response.status}`);
  }

  const apiResponse: { data: TeamData | null } = await response.json();
  const teamData = apiResponse.data;

  return (
    <section>
      <header className="font-[family-name:var(--font-geist-mono)] ">
        <h1 className="flex justify-center text-2xl font-bold mt-8 pt-12 ">
          {teamData ? teamData.team_name2 : "Team not found"}
        </h1>
        {teamData && (
          <div className="flex justify-center">
            <Image
              src={teamData.logo_url}
              alt={teamData.team_name}
              width={70}
              height={70}
            />
          </div>
        )}

        <div className="flex justify-center mt-4 space-x-2">
          <Button asChild>
            <Link href={`/teams/${teamData?.team_id || ""}`}>Home</Link>
          </Button>

          <Button asChild>
            <Link
              href={`/teams/${teamData ? teamData.team_id : ""}/allplayers`}
            >
              Current Players
            </Link>
          </Button>

          <Button asChild>
            <Link href={`/leagues/${teamData?.league_id || ""}`}>
              League Page
            </Link>
          </Button>
        </div>
      </header>

      <main>{children}</main>
    </section>
  );
}

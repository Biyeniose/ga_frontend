"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import TeamPlayersTable from "@/components/custom/teams/TeamPlayersTable";

export default function Page() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount (initial page load)
  }, []); // Run only once on mount

  const pathname = usePathname();

  const extractId = (path: string): string | null => {
    const parts = path.split("/");
    const teamsIndex = parts.indexOf("teams");
    const allPlayersIndex = parts.indexOf("allplayers");

    if (
      teamsIndex !== -1 &&
      allPlayersIndex !== -1 &&
      allPlayersIndex > teamsIndex + 1
    ) {
      return parts[teamsIndex + 1];
    }

    return null;
  };

  const id = extractId(pathname);

  const url = `https://c1ac-142-188-229-219.ngrok-free.app/v1/teams/${id}/players`;

  return (
    <div className="min-h-screen p-8 sm:p-15 px-8 pt-5 pb-14 font-[family-name:var(--font-geist-sans)]">
      <div className="top-0 flex flex-col items-center space-y-2 py-4">
        <h1 className="text-3xl font-bold">All Players</h1>

        <div className="font-[family-name:var(--font-geist-mono)]">
          <TeamPlayersTable api_url={url} />
        </div>
      </div>
    </div>
  );
}

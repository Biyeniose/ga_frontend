import MostGA from "@/components/custom/teams/MostGA";
import MostMin from "@/components/custom/teams/MostMin";
import TopNations from "@/components/custom/teams/TopNations";

export interface TeamPage {
  team_name: string;
  team_name2: string;
  team_id: number;
  logo_url: string;
  league_id: number;
}

interface ApiResponse {
  data: TeamPage | null;
}

export default async function TeamsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const url = `https://c1ac-142-188-229-219.ngrok-free.app/v1/teams/${id}`;
  const url_ga = `https://c1ac-142-188-229-219.ngrok-free.app/v1/teams/${id}/most_ga`;
  const url_min = `https://c1ac-142-188-229-219.ngrok-free.app/v1/teams/${id}/most_min`;
  const url_nations = `https://c1ac-142-188-229-219.ngrok-free.app/v1/teams/${id}/top_nations`;

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
    const teamData = apiResponse.data;

    if (!teamData) {
      console.log(apiResponse.data);
      return (
        <div className="min-h-screen p-8 pb-20 sm:p-20 px-8 pt-20 pb-14 font-[family-name:var(--font-geist-mono)] ">
          Team not found.
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col md:flex-row p-8 pb-20 sm:p-20 px-8 pt-10 pb-14 font-[family-name:var(--font-geist-mono)] items-center justify-center">
        <main className="flex flex-col md:flex-row items-start justify-center md:space-x-4 space-y-4">
          <TopNations api_url={url_nations} />
          <MostGA api_url={url_ga} />
          <MostMin api_url={url_min} />
        </main>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error loading player data.</div>;
  }
}

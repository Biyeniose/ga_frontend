import LeagueRanking from "@/components/custom/leagues/LeagueRanking";

interface LeaguePage {
  league_name: string;
  league_id: number;
  country: string;
  type: string;
}

interface ApiResponse {
  data: LeaguePage[]; // The API returns an array of PlayerPage objects in the "data" field
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  //const url =  `https://a0d1-142-188-229-219.ngrok-free.app/v1/leagues/${id}/rank`;
  const url = `https://a0d1-142-188-229-219.ngrok-free.app/v1/leagues/${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch player data: ${response.status}`);
    }

    const apiResponse: ApiResponse = await response.json(); // Parse the entire API response
    const leagueData = apiResponse.data[0]; // Access the first (and likely only) player object in the array

    if (!leagueData) {
      return <div>League not found.</div>; // Handle the case where no player is found
    }

    return (
      <div className="min-h-screen p-8 pb-20 sm:p-20 px-8 pt-20 pb-14 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-3xl font-bold my-4">{leagueData.league_name}</h1>
        <p>Type: {leagueData.type}</p>
        <p>Country: {leagueData.country}</p>
        <div className="font-[family-name:var(--font-geist-mono)]">
          <LeagueRanking
            api_url={`https://a0d1-142-188-229-219.ngrok-free.app/v1/leagues/${leagueData.league_id}/rank`}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error loading league data.</div>;
  }
}

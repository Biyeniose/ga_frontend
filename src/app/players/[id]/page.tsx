interface PlayerPage {
  player_name: string;
  player_id: number;
  curr_team_id: number;
  age: number;
  position: string;
  dob: string;
  nation1: string;
  nation2?: string | null;
  market_value: number;
  date_joined: string;
  contract_end: string;
  curr_ga: number;
  curr_goals: number;
  curr_assists: number;
  curr_gp: number;
}

interface ApiResponse {
  data: PlayerPage[]; // The API returns an array of PlayerPage objects in the "data" field
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const url = `https://a0d1-142-188-229-219.ngrok-free.app/v1/players/${id}`;

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
    const playerData = apiResponse.data[0]; // Access the first (and likely only) player object in the array

    if (!playerData) {
      return <div>Player not found.</div>; // Handle the case where no player is found
    }

    return (
      <div className="min-h-screen p-8 pb-20 sm:p-20 px-8 pt-20 pb-14 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-3xl font-bold my-4">{playerData.player_name}</h1>
        <p>Player ID: {playerData.player_id}</p>
        <p>Age: {playerData.age}</p>
        <p>DOB: {playerData.dob}</p>
        <p>Position: {playerData.position}</p>

        <p>
          Market Value:{" "}
          {new Intl.NumberFormat("local", {
            style: "currency",
            currency: "EUR",
          }).format(playerData.market_value)}
        </p>
        <p>Goals: {playerData.curr_goals}</p>
        <p>Assists: {playerData.curr_assists}</p>
        <p>Games Played: {playerData.curr_gp}</p>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error loading player data.</div>;
  }
}

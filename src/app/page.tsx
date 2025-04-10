//import { TableComponent } from "@/components/custom/tables/TableComponent";
import { TopPerformances } from "@/components/custom/player/TopPerformances";
import MostGA from "@/components/custom/tables/MostGA";

export default function Home() {
  const most_ga_url =
    "https://c1ac-142-188-229-219.ngrok-free.app/v1/stats/most_ga";
  const most_goals_url =
    "https://c1ac-142-188-229-219.ngrok-free.app/v1/stats/most_goals";

  const most_assists_url =
    "https://c1ac-142-188-229-219.ngrok-free.app/v1/stats/most_assists";

  return (
    <div className="grid gap-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 max-w-screen-xl mx-auto">
      {/* Left Hand stuff*/}
      <div className="md:col-span-2 lg:col-span-2 font-[family-name:var(--font-ibm-plex)] min-h-screen text-black dark:text-white py-8 px-2">
        {/* Row above the grid */}
        <div className="w-full py-4 text-center bg-zinc-100 dark:bg-zinc-800 rounded-md mb-4 mt-10">
          <p className="text-2xl font-text">Standout Performances</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <TopPerformances />
        </div>
        <div className="flex flex-wrap mx-1 gap-x-5 my-4">
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg ">
            <p className="py-2 text-center border-b-2">Top GA All Leagues</p>
            {/* First Table (MostGA) */}
            <MostGA url={most_ga_url} />
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg">
            <p className="py-2 text-center border-b-2">Top U-23 G/A</p>
            {/* First Table (MostGA) */}
            <MostGA url={most_assists_url} />
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg">
            <p className="py-2 text-center border-b-2">Top Scoring Defenders</p>
            {/* First Table (MostGA) */}
            <MostGA url={most_goals_url} />
          </div>
        </div>
      </div>

      {/* Right Hand stuff*/}
      <div className="md:col-span-1 lg:col-span-1 font-[family-name:var(--font-fira-sans)] min-h-screen text-black dark:text-white py-8 px-2 hidden sm:block">
        {/* Row above the grid */}
        <div className="w-full py-4 text-center bg-zinc-100 dark:bg-zinc-800 rounded-md mb-4 mt-10">
          <p className="text-2xl font-text">Insta Followers</p>
        </div>
        <div className="w-full py-4 text-center bg-zinc-100 dark:bg-zinc-800 rounded-md mb-4 mt-10">
          <p className="text-2xl font-text">Stats Leaders All Leagues</p>
        </div>
      </div>
    </div>
  );
}

//import { TableComponent } from "@/components/custom/tables/TableComponent";
import { TopPerformances } from "@/components/custom/player/TopPerformances";
import MostGA from "@/components/custom/tables/MostGA";

export default function Home() {
  //const most_ga_url =
  //"https://2236-142-188-76-246.ngrok-free.app/v1/leagues/2/stats?stat=goals";
  //"http://localhost:90/v1/leagues/1/stats/all?stat=ga";
  const most_ga_url =
    //"http://localhost:90/v1/teams/4935/stats?stat=ga&age=52&season=2024";
    "http://localhost:90/v1/leagues/9900/stats?stat=ga&season=2024&age=60";

  const most_ga_max23_url =
    "http://localhost:90/v1/leagues/9999/1495/stats?stat=ga&age=64";
  //"http://localhost:90/v1/leagues/9999/stats?stat=ga&age=60&season=2024";
  //"http://localhost:90/v1/teams/8711/stats?stat=ga&age=52&season=2024";
  //"http://localhost:90/v1/leagues/1/stats?stat=ga&season=2024&age=22";

  return (
    <div className="grid gap-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 max-w-screen-xl mx-auto">
      {/* Left Hand stuff*/}
      <div className="md:col-span-2 lg:col-span-2 font-[family-name:var(--font-geist-mono)] min-h-screen text-black dark:text-white py-8 px-2">
        {/* Row above the grid */}
        <div className="w-full py-4 text-center bg-zinc-100 dark:bg-zinc-800 rounded-md mb-4 mt-10">
          <p className="text-2xl font-text">Standout Performances</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <TopPerformances />
        </div>
        <div className="flex flex-wrap items-center mx-1 gap-x-6 gap-y-5 my-4">
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg ">
            <p className="py-2 text-center border-b-2">Top GA All Leagues</p>
            {/* First Table (MostGA) */}
            <MostGA url={most_ga_url} />
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg">
            <p className="py-2 text-center border-b-2">Top G/A</p>
            {/* First Table (MostGA) */}
            <MostGA url={most_ga_max23_url} />
          </div>
        </div>
      </div>

      {/* Right Hand stuff*/}
      <div className="md:col-span-1 lg:col-span-1 font-[family-name:var(--font-geist-mono)] min-h-screen text-black dark:text-white py-8 px-2 hidden sm:block">
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

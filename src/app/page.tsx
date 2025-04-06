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
    <div className="font-[family-name:var(--font-fira-sans)] min-h-screen  text-black dark:text-white py-8 px-2">
      {/* Row above the grid */}

      <div className="w-full py-4 text-center bg-zinc-100 dark:bg-zinc-800 rounded-md mb-4 mt-10">
        <p className="text-2xl font-text">Standout Performances</p>
      </div>
      <div className="flex justify-center items-center">
        <TopPerformances />
      </div>
      <div className="w-full py-4 text-center bg-zinc-100 dark:bg-zinc-800 rounded-md mb-4 mt-10">
        <p className="text-2xl font-text">Stats Leaders All Leagues</p>
      </div>

      {/* Grid container */}
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:grid-cols-1">
        <div className="w-full my-7 px-4 max-w-98 flex flex-col items-center pb-4">
          {/* First Table (MostGA) */}
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-md shadow-md max-w-82 ">
            <MostGA url={most_ga_url} stat="G+A" />
          </div>
        </div>

        <div className=" my-7 px-4 max-w-98 flex flex-col items-center w-full  pb-4">
          {/* First Table (MostGA) */}
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-md shadow-md max-w-82 ">
            <MostGA url={most_goals_url} stat="Goals" />
          </div>
        </div>

        <div className=" my-7 px-4 max-w-98 flex flex-col items-center w-full  pb-4">
          {/* First Table (MostGA) */}
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-md shadow-md max-w-82 ">
            <MostGA url={most_assists_url} stat="Assists" />
          </div>
        </div>
      </div>
    </div>
  );
}

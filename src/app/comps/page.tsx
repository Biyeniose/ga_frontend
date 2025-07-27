import { CompWinners } from "@/components/custom/leagues/CompWinners";

export default function CompsPage() {
  return (
    <div className="max-w-screen-xl mx-auto p-8 pb-20 sm:p-20 px-8 pt-20 pb-14 font-[family-name:var(--font-ibm-plex)]">
      <div className="top-0 flex flex-col items-center space-y-1 lg: flex">
        <h1 className="text-3xl font-bold">Top Competitions</h1>

        <div className="">
          <CompWinners />
        </div>
      </div>
    </div>
  );
}

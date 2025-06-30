import { TopLeagueRanks } from "@/components/custom/leagues/TopLeagueRanks/TopLeaguesRanks";

export default function CompsPage() {
  return (
    <div className="max-w-screen-xl mx-auto p-8 pb-20 sm:p-20 px-8 pt-20 pb-14 font-[family-name:var(--font-geist-sans)]">
      <div className="top-0 flex flex-col items-center space-y-1">
        <h1 className="text-3xl font-bold">Competitions Page</h1>

        <div className="font-[family-name:var(--font-ibm-plex)] py-6 ">
          <TopLeagueRanks season="2024" />
        </div>
      </div>
    </div>
  );
}

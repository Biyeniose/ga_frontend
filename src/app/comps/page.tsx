import { TopLeaguesList } from "@/components/custom/leagues/TopLeaguesList";

export default function CompsPage() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 px-8 pt-20 pb-14 font-[family-name:var(--font-geist-sans)]">
      <div className="top-0 flex flex-col items-center space-y-1 py-4">
        <h1 className="text-3xl font-bold">Competitions Page</h1>

        <div className="font-[family-name:var(--font-geist-mono)] py-6 ">
          <TopLeaguesList />
        </div>
      </div>
    </div>
  );
}

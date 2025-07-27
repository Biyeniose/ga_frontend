import { MatchDataProvider } from "@/context/matches/MatchDataProvider";
import { MatchHeader } from "@/components/custom/matches/MatchHeader";

interface PageLayoutProps {
  children: React.ReactNode;
  params: {
    id: number; // or number if you prefer
  };
}

export default async function LeagueLayout({
  children,
  params,
}: PageLayoutProps) {
  // Convert id to number if needed (assuming your API expects number)
  const { id } = await params;
  const matchId = Number(id);

  return (
    <section className="max-w-screen-xl mx-auto mt-20 px-5 font-[family-name:var(--font-ibm-plex)]">
      <MatchDataProvider matchId={matchId}>
        <MatchHeader />
        {children}
      </MatchDataProvider>
    </section>
  );
}

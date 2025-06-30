// app/leagues/[id]/layout.tsx
import { LeagueHeader } from "@/components/custom/leagues/LeagueHeader";
import { LeagueInfoProvider } from "@/context/LeagueDataContext";

interface LeagueLayoutProps {
  children: React.ReactNode;
  params: {
    id: number; // or number if you prefer
  };
}

export default async function LeagueLayout({
  children,
  params,
}: LeagueLayoutProps) {
  // Convert id to number if needed (assuming your API expects number)
  const { id } = await params;
  const leagueId = Number(id);

  return (
    <section className="max-w-screen-xl mx-auto font-[family-name:var(--font-ibm-plex)">
      <LeagueInfoProvider leagueId={leagueId}>
        <LeagueHeader />
        {children}
      </LeagueInfoProvider>
    </section>
  );
}

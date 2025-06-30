import { PlayerPageHeader } from "@/components/custom/player/playerPage/PlayerPageHeader";
import { PlayerPageDataProvider } from "@/context/PlayerPageDataContext";

interface PlayerPageLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default async function PlayerPageLayout({
  children,
  params,
}: PlayerPageLayoutProps) {
  const { id } = await params;
  const playerId = Number(id);

  return (
    <PlayerPageDataProvider playerId={playerId}>
      <div className="font-[family-name:var(--font-ibm-plex)] max-w-screen-xl mx-auto px-4">
        <PlayerPageHeader />
        <main className="mt-6">{children}</main>
      </div>
    </PlayerPageDataProvider>
  );
}

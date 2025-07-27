import { TeamPageHeader } from "@/components/custom/teams/team_page/TeamPageHeader";
import { TeamPageProvider } from "@/context/teams/TeamPageProvider";

interface TeamPageLayoutProps {
  children: React.ReactNode;
  params: { id: number };
}

export default async function TeamPageLayout({
  children,
  params,
}: TeamPageLayoutProps) {
  const { id } = await params;
  const teamId = Number(id);

  return (
    <TeamPageProvider teamId={teamId}>
      <div className="font-[family-name:var(--font-ibm-plex)] max-w-screen-xl mx-auto px-4 py-5">
        <TeamPageHeader />
        <main className="mt-6">{children}</main>
      </div>
    </TeamPageProvider>
  );
}

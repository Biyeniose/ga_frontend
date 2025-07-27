"use client";
import { useContext } from "react";
import { MatchDataContext } from "@/context/matches/MatchDataProvider";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface LineupPlayer {
  id: number;
  player: {
    id: number;
    name: string;
    current_age: number;
    pic_url: string | null;
    nations: {
      nation1_id: number | null;
      nation1: string | null;
      nation1_logo: string;
      nation2_id: number | null;
      nation2: string | null;
      nation2_logo: string | null;
    };
  };
  number: number;
  position: string;
  xi: boolean;
  age: number;
}

const positionOrder = [
  "Goalkeeper",
  "Center Back",
  "Right Back",
  "Left Back",
  "Defender",
  "Defensive Midfield",
  "Central Midfield",
  "Right Midfield",
  "Left Midfield",
  "Midfielder",
  "Attacking Midfield",
  "Right Winger",
  "Left Winger",
  "Second Striker",
  "Center Forward",
  "Forward",
];

function sortPlayers(players: LineupPlayer[]) {
  return [...players].sort((a, b) => {
    const aIndex = positionOrder.findIndex((pos) => a.position.includes(pos));
    const bIndex = positionOrder.findIndex((pos) => b.position.includes(pos));
    return aIndex - bIndex || a.number - b.number;
  });
}

function PlayerImage({ src, name }: { src: string | null; name: string }) {
  const hasImage = src && !src.includes("default");

  return (
    <div className="relative w-10 h-10 rounded-full border flex items-center justify-center overflow-hidden bg-muted">
      {hasImage ? (
        <Image
          src={src}
          alt={name}
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      ) : (
        <Image
          src="/icons/others/person_black.svg"
          alt={name}
          width={24}
          height={24}
          className="w-6 h-6 dark:invert"
        />
      )}
    </div>
  );
}

export function Lineups() {
  const { matchData, isLoading, error } = useContext(MatchDataContext);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  if (!matchData?.data) return <div className="p-4">No data</div>;

  const { home, away } = matchData.data.teams;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Match Lineups</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <TeamLineup team={home.info.team.team_name} lineups={home.lineups} />
        <TeamLineup team={away.info.team.team_name} lineups={away.lineups} />
      </div>
    </div>
  );
}

function TeamLineup({
  team,
  lineups,
}: {
  team: string;
  lineups: LineupPlayer[];
}) {
  const startingXI = sortPlayers(lineups.filter((p) => p.xi));
  const bench = sortPlayers(lineups.filter((p) => !p.xi));

  return (
    <Card className="flex-1">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{team}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="hidden sm:table-cell">Pos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {startingXI.map((player) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">{player.number}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <PlayerImage
                      src={player.player.pic_url}
                      name={player.player.name}
                    />
                    <div>
                      <div>{player.player.name}</div>
                      <div className="text-sm text-muted-foreground sm:hidden">
                        {player.position}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {player.position}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {bench.length > 0 && (
          <Accordion type="single" collapsible>
            <AccordionItem value="bench" className="border-b-0">
              <AccordionTrigger className="px-4 py-2 hover:no-underline">
                <span className="text-sm">Bench ({bench.length})</span>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    {bench.map((player) => (
                      <TableRow key={player.id} className="bg-muted/30">
                        <TableCell className="font-medium">
                          {player.number}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <PlayerImage
                              src={player.player.pic_url}
                              name={player.player.name}
                            />
                            <div>{player.player.name}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {player.position}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}

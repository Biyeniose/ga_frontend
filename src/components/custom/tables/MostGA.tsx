"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const queryClient = new QueryClient();

interface PlayerStats {
  player_id: number;
  player_name: string;
  age: number;
  team_id: number;
  team_logo: string;
  team_name: string;
  nation1: string;
  nation2?: string | null;
  nation1_url: string;
  nation2_url?: string | null;
  nation1_id: number;
  nation2_id: number | null;
  ga: number;
  goals: number;
  assists: number;
  gp: number;
  stats_id: number;
}

interface MostGAProps {
  url: string;
}

export default function MostGA({ url }: MostGAProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Example url={url} />
    </QueryClientProvider>
  );
}

function Example({ url }: { url: string }) {
  const { isPending, error, data } = useQuery<PlayerStats[]>({
    queryKey: ["TopGA", url],
    queryFn: () =>
      fetch(url, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }).then((res) => res.json()),
  });

  if (isPending)
    return (
      <>
        <Skeleton className="w-[150px] h-[50px] rounded-full" />
      </>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <Table className="w-65">
      <TableBody>
        {data.map((player) => (
          <TableRow key={player.stats_id}>
            <TableCell className="font-small max-w-80">
              <div className="gap-1">
                <div>
                  {player.nation1_url ? (
                    <div className="flex gap-1">
                      <Image
                        src={player.nation1_url}
                        alt={player.nation1}
                        width={28}
                        height={15}
                      />
                      {player.nation2 && player.nation2_url && (
                        <Image
                          src={player.nation2_url}
                          alt={player.nation2}
                          width={28}
                          height={15}
                        />
                      )}
                    </div>
                  ) : null}
                </div>
                <div>
                  <Link
                    href={`/players/${player.player_id}`}
                    className="hover:underline hover:underline-offset-4"
                  >
                    {player.player_name}
                  </Link>{" "}
                  ({player.age})
                </div>
                <div className="flex items-center gap-y-2">
                  <Image
                    src={player.team_logo}
                    alt={player.team_name}
                    width={28}
                    height={15}
                  />
                  <Link
                    href={`/teams/${player.team_id}`}
                    className="hover:underline hover:underline-offset-4"
                  >
                    {player.team_name}
                  </Link>
                </div>
              </div>
            </TableCell>
            <TableCell className="flex flex-col items-center justify-center pt-4 ">
              {player.ga}
              <span>
                {player.goals}/{player.assists}
              </span>
              <span>{player.gp} GP</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

"use client";

import * as React from "react";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatNumber } from "@/lib/methods";

const queryClient = new QueryClient();

interface TransferInfo {
  transfer_id: number;
  player_name: string;
  from_team_name: string;
  to_team_name: string;
  fee: number;
  value: number;
  date: number;
  season: string;
}

export default function RandTransfer() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const url = "https://c1ac-142-188-229-219.ngrok-free.app/v1/players/tr/rand";

  const { isPending, error, data } = useQuery<TransferInfo>({
    // Changed to a single TransferInfo object
    queryKey: ["RandTransf"],
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
    <Table>
      <TableCaption>Random Transfer Information</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && ( // Conditionally render if data exists
          <>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell>{data.player_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>From Team</TableCell>
              <TableCell>{data.from_team_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>To Team</TableCell>
              <TableCell>{data.to_team_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fee</TableCell>
              <TableCell>{formatNumber(data.fee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Value</TableCell>
              <TableCell>{formatNumber(data.value)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>{data.date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Season</TableCell>
              <TableCell>{data.season}</TableCell>
            </TableRow>
          </>
        )}
      </TableBody>
    </Table>
  );
}

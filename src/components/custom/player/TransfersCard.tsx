"use client";
import { useEffect, useState, useRef } from "react";
import * as React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TransferData {
  transfer_id: number;
  from_team_id: number;
  from_team_name: string;
  from_team_url: string;
  from_team_nation_url: string | null;
  from_team_nation: string | null;
  to_team_id: number;
  to_team_name: string;
  to_team_url: string;
  to_team_nation_url: string | null;
  to_team_nation: string | null;
  isloan: boolean;
  fee: number | null;
  value: number | null;
  date: string;
  season: string;
}

interface TransferCardProp {
  api_url: string;
}

const formatNumber = (num: number | null): string => {
  if (num === null) return "-";
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "k";
  }
  return num.toString();
};

const TransferCard: React.FC<TransferCardProp> = ({ api_url }) => {
  const [transfers, setTransfers] = useState<TransferData[]>([]);
  const [loading, setLoading] = useState(true);
  const isFetchCalled = useRef(false);
  const noLinkWords = [
    "U23",
    "U20",
    "U21",
    "U18",
    "U17",
    "U19",
    "U16",
    "U-15",
    "U15",
    "Yth",
    "Yth.",
    "Youth",
    "Aca",
    "Academy",
    "Yout",
    "II",
    "Sub-17",
    "Sub-15",
    "CF You",
    "Jgd",
    "Jgd.",
    "Jugend",
  ];

  useEffect(() => {
    async function fetchTransfers() {
      if (isFetchCalled.current) {
        return;
      }
      isFetchCalled.current = true;

      try {
        const response = await fetch(api_url, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(`Expected JSON but got: ${text}`);
        }

        const data = await response.json();
        if (data) {
          setTransfers(data);
        } else {
          setTransfers([]);
        }
      } catch (error) {
        console.error("Error fetching teams players data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTransfers();
  }, [api_url]);

  if (loading)
    return (
      <>
        <Skeleton className="w-[150px] h-[50px] rounded-full" />
      </>
    );

  const isLinkable = (teamName: string): boolean => {
    return !noLinkWords.some((word) => teamName.includes(word));
  };

  return (
    <Table className="w-full min-w-fit mx-auto overflow-x-auto p-4">
      <TableHeader className="max-w-[40px]">
        <TableRow>
          <TableHead className="text-white-50 text-sm md:text-sm max-w-[130px]">
            From
          </TableHead>
          <TableHead className="text-white-50 text-sm md:text-sm max-w-[130px]">
            To
          </TableHead>
          <TableHead className="text-white-50 text-sm md:text-sm ">
            Fee
          </TableHead>
          <TableHead className="text-white-50 text-sm md:text-sm">
            Season
          </TableHead>
          <TableHead className="text-white-50 text-sm md:text-sm hidden sm:table-cell">
            Value
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {transfers
          .map((transfer) => {
            return (
              <TableRow key={transfer.transfer_id}>
                <TableCell className="font-small p-2 text-sm md:text-sm truncate max-w-[130px] whitespace-normal break-words">
                  <div className="flex flex-col gap-1">
                    <div>
                      {isLinkable(transfer.from_team_name) ? (
                        <Link
                          href={`/teams/${transfer.from_team_id}`}
                          className="hover:underline hover:underline-offset-4"
                        >
                          {transfer.from_team_name}
                        </Link>
                      ) : (
                        <span>{transfer.from_team_name}</span>
                      )}
                      <br />
                    </div>

                    <div className="flex gap-1">
                      {transfer.from_team_url && (
                        <Image
                          src={transfer.from_team_url}
                          alt={transfer.from_team_name[0]}
                          width={28}
                          height={15}
                        />
                      )}
                      {transfer.from_team_nation_url && (
                        <Image
                          src={transfer.from_team_nation_url}
                          alt="Error"
                          width={28}
                          height={15}
                        />
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="font-small p-2 text-sm md:text-sm truncate max-w-[130px] whitespace-normal break-words">
                  <div className="flex flex-col gap-1">
                    <div>
                      {isLinkable(transfer.to_team_name) ? (
                        <Link
                          href={`/teams/${transfer.to_team_id}`}
                          className="hover:underline hover:underline-offset-4"
                        >
                          {transfer.to_team_name}
                          {transfer.isloan && (
                            <span className="text-yellow-900 dark:text-yellow-500 ">
                              *
                            </span>
                          )}
                        </Link>
                      ) : (
                        <span>
                          {transfer.to_team_name}
                          {transfer.isloan && (
                            <span className="text-yellow-900 dark:text-yellow-500 ">
                              *
                            </span>
                          )}
                        </span>
                      )}
                      <br />
                    </div>

                    <div className="flex gap-1">
                      {transfer.to_team_url && (
                        <Image
                          src={transfer.to_team_url}
                          alt={transfer.to_team_name[0]}
                          width={28}
                          height={15}
                        />
                      )}
                      {transfer.to_team_nation_url && (
                        <Image
                          src={transfer.to_team_nation_url}
                          alt="Error"
                          width={28}
                          height={15}
                        />
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="p-2 text-sm md:text-sm ">
                  {formatNumber(transfer.fee)}
                </TableCell>
                <TableCell className="p-2 text-sm md:text-sm ">
                  {transfer.season}
                </TableCell>
                <TableCell className="p-2 text-sm md:text-sm  hidden sm:table-cell">
                  {formatNumber(transfer.value)}
                </TableCell>
              </TableRow>
            );
          })
          .filter(Boolean)}
      </TableBody>
    </Table>
  );
};

export default TransferCard;

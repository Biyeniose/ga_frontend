"use client";

import { useContext } from "react";
import { TeamPageContext } from "@/context/teams/TeamPageProvider";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Transfer } from "@/types/TeamTypes";

export function TeamTransfersSection() {
  const { teamData, isLoading, error } = useContext(TeamPageContext);

  if (isLoading) return <div className="p-4">Loading team info...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  if (!teamData || !teamData.data) {
    return <div className="p-4">Team data not found</div>;
  }

  const transfers = teamData.data.transfers;
  const currentTeamId = teamData.data.info.team_id;

  // Sort transfers by date (most recent first) and limit to recent ones
  const recentTransfers = transfers
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatFee = (fee: number | null) => {
    if (!fee) return "Free";
    if (fee >= 1000000) {
      return `€${(fee / 1000000).toFixed(1)}M`;
    }
    if (fee >= 1000) {
      return `€${(fee / 1000).toFixed(0)}K`;
    }
    return `€${fee}`;
  };

  const TransferItem = ({ transfer }: { transfer: Transfer }) => {
    const isIncoming = transfer.to_team.team_id === currentTeamId;

    return (
      <Link href={`/players/${transfer.player_id}`}>
        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
          {/* Player Info */}
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm truncate">
                {transfer.player_name}
              </h3>
              <Badge
                variant={isIncoming ? "default" : "destructive"}
                className={`text-xs ${
                  isIncoming ? "bg-green-600 hover:bg-green-700" : ""
                }`}
              >
                {isIncoming ? "In" : "Out"}
              </Badge>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(transfer.date)}
              </div>
              {transfer.isLoan && <span className="text-xs">Loan</span>}
            </div>
          </div>

          {/* Teams and Fee */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="relative w-6 h-6">
                  <Image
                    src={transfer.from_team.team_url}
                    alt={`${transfer.from_team.team_name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative w-4 h-4">
                  <Image
                    src={transfer.from_team.nation_url}
                    alt={`${transfer.from_team.nation} flag`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-muted-foreground" />

              <div className="flex items-center gap-1">
                <div className="relative w-6 h-6">
                  <Image
                    src={transfer.to_team.team_url}
                    alt={`${transfer.to_team.team_name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative w-4 h-4">
                  <Image
                    src={transfer.to_team.nation_url}
                    alt={`${transfer.to_team.nation} flag`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Fee */}
            <div className="text-xs font-medium text-muted-foreground">
              {formatFee(transfer.fee)}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="max-w-2xl space-y-4">
      <h2 className="text-lg font-semibold">Recent Transfers</h2>

      {recentTransfers.length > 0 ? (
        <div className="space-y-2">
          {recentTransfers.map((transfer) => (
            <TransferItem key={transfer.transfer_id} transfer={transfer} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No recent transfers found
        </div>
      )}
    </div>
  );
}

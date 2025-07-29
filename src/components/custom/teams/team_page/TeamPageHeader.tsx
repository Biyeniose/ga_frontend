"use client";

import { TeamPageContext } from "@/context/teams/TeamPageProvider";
import { useContext } from "react";
import { Calendar, Trophy, TrendingUp, ArrowLeftRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function TeamPageHeader() {
  const { teamData, isLoading, error } = useContext(TeamPageContext);

  if (isLoading)
    return (
      <div className="flex justify-center items-center p-8 mt-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );

  if (error)
    return <div className="p-6 text-red-500 mt-6">Error: {error.message}</div>;

  if (!teamData || !teamData.data) {
    return <div className="p-4 mt-6">Team data not found</div>;
  }

  const {
    team_name2,
    logo_url,
    current_league_name,
    city,
    stadium,
    nation_url,
    team_id,
  } = teamData.data.info;

  const navigationLinks = [
    { href: `/teams/${team_id}/matches`, label: "Matches", icon: Calendar },
    { href: `/teams/${team_id}/seasons`, label: "Seasons", icon: Trophy },
    { href: `/teams/${team_id}/stats`, label: "Stats", icon: TrendingUp },
    {
      href: `/teams/${team_id}/transfers`,
      label: "Transfers",
      icon: ArrowLeftRight,
    },
  ];

  return (
    <div className="bg-black border border-gray-800 rounded-lg p-6 mt-12 mb-6">
      {/* Main Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 relative flex-shrink-0">
          <Image
            src={logo_url}
            alt={`${team_name2} logo`}
            fill
            className="object-contain"
            priority
            sizes="64px"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
            {team_name2}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
            <span>{current_league_name}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span>{city}</span>
              {nation_url && (
                <Image
                  src={nation_url}
                  alt="Nation flag"
                  width={16}
                  height={12}
                  className="rounded-sm"
                />
              )}
            </div>
            <span>•</span>
            <span className="truncate">{stadium}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-6">
        {navigationLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors"
            >
              <IconComponent className="w-4 h-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

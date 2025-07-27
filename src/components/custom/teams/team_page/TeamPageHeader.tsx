"use client";

import { TeamPageContext } from "@/context/teams/TeamPageProvider";
import { useContext } from "react";
import {
  MapPin,
  Building2,
  Trophy,
  Calendar,
  TrendingUp,
  Users,
  ArrowLeftRight,
} from "lucide-react";
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

  // Destructure the API response
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
    {
      href: `/teams/${team_id}/matches`,
      label: "Matches",
      icon: Calendar,
      color: "blue",
    },
    {
      href: `/teams/${team_id}/seasons`,
      label: "Seasons",
      icon: Trophy,
      color: "yellow",
    },
    {
      href: `/teams/${team_id}/stats`,
      label: "Stats",
      icon: TrendingUp,
      color: "green",
    },
    {
      href: `/teams/${team_id}/transfers`,
      label: "Transfers",
      icon: ArrowLeftRight,
      color: "purple",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-900/30 text-blue-400 border-blue-700 hover:border-blue-500 hover:shadow-blue-500/20",
      yellow:
        "bg-yellow-900/30 text-yellow-400 border-yellow-700 hover:border-yellow-500 hover:shadow-yellow-500/20",
      green:
        "bg-green-900/30 text-green-400 border-green-700 hover:border-green-500 hover:shadow-green-500/20",
      purple:
        "bg-purple-900/30 text-purple-400 border-purple-700 hover:border-purple-500 hover:shadow-purple-500/20",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="bg-black rounded-lg p-6 mt-12 mb-6 border border-gray-700">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Team Logo */}
        <div className="relative w-20 h-20 bg-gray-900/50 rounded-xl p-3 border border-gray-600 flex-shrink-0">
          <div className="relative w-full h-full">
            <Image
              src={logo_url}
              alt={`${team_name2} logo`}
              fill
              className="object-contain"
              priority
              sizes="80px"
            />
          </div>
        </div>

        {/* Team Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {team_name2}
          </h1>

          {/* Info Badges */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
            <div className="bg-blue-900/30 text-blue-400 border border-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              <span
                className="max-w-[120px] truncate"
                title={current_league_name}
              >
                {current_league_name}
              </span>
            </div>

            <div className="bg-green-900/30 text-green-400 border border-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{city}</span>
              {nation_url && (
                <div className="relative w-3 h-2 ml-1">
                  <Image
                    src={nation_url}
                    alt="Nation flag"
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
              )}
            </div>

            <div className="bg-purple-900/30 text-purple-400 border border-purple-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              <span className="max-w-[100px] truncate" title={stadium}>
                {stadium}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {navigationLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 hover:shadow-lg ${getColorClasses(
                    link.color,
                  )}`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

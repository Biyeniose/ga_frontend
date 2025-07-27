// Team types
import { Comp } from "./LeagueTypes";
import { MatchInfo } from "./MatchTypes";

// new models

export interface Team {
  team_id: number;
  team_name: string;
  logo?: string | null;
}

// Team Information Types
export interface TeamInfo {
  team_id: number;
  team_name: string;
  team_name2: string;
  logo_url: string;
  curr_league_id: number;
  current_league_name: string;
  nation_id: number;
  nation_url: string;
  city: string;
  stadium: string;
}

// Transfer Related Types
export interface TransferTeam {
  team_id: number;
  team_name: string;
  team_url: string;
  nation: string;
  nation_url: string;
}

export interface Transfer {
  transfer_id: number;
  player_id: number;
  player_name: string;
  from_team: TransferTeam;
  to_team: TransferTeam;
  isLoan: boolean;
  fee: number;
  value: number;
  date: string;
  season: string;
}

// Match Related Types
export interface TeamStats {
  goals: number;
  pen_goals: number;
  ranking: number;
}

export interface MatchTeamInfo {
  team_id: number;
  team_name: string;
  logo: string;
}

export interface MatchTeam {
  stats: TeamStats;
  team: MatchTeamInfo;
}

export interface MatchTeams {
  home: MatchTeam;
  away: MatchTeam;
}

export interface Match {
  teams: MatchTeams;
  match_info: MatchInfo;
}

// Player Statistics Types
export interface StatPlayer {
  player_id: number;
  player_name: string;
  img: string;
}

export interface StatTeam {
  team_id: number;
  team_name: string;
  logo: string;
}

export interface PlayerStats {
  player: StatPlayer;
  comp: Comp;
  team: Team;
  season_year: number;
  age: number;
  ga: number;
  ga_pg: number;
  goals: number;
  goals_pg: number;
  assists: number;
  assists_pg: number;
  penalty_goals: number;
  gp: number;
  minutes: number;
  minutes_pg: number;
  cs: number;
  pass_compl_pg: number;
  passes_pg: number;
  errors_pg: number;
  shots_pg: number;
  shots_on_target_pg: number;
  sca_pg: number;
  gca_pg: number;
  take_ons_pg: number;
  take_ons_won_pg: number;
  goals_concede: number;
  yellows: number;
  yellows2: number;
  reds: number;
  own_goals: number;
  stats_id: number;
}

// Main API Response Type
export interface TeamPageData {
  info: TeamInfo;
  transfers: Transfer[];
  matches: Match[];
  stats: PlayerStats[];
}

export interface TeamPageResponse {
  data: TeamPageData;
}

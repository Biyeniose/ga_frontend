// Team types

// type for showing team's highest GA
export interface TeamPlayerStats {
  player_id: number;
  season_year: number;
  player_name: string;
  age: number;
  team_name: string;
  ga: number;
  goals: number;
  assists: number;
  penalty_goals: number;
  gp: number;
  minutes: number;
  position: string;
  team_id: number;
  team_logo: string;
  nation1_id: number;
  nation2_id: number;
  nation1: string;
  nation2: string;
  nation1_url: string;
  nation2_url: string | null;
  stats_id: number;
}

export interface TeamInfo {
  team_id: number;
  team_name: string;
  team_name2?: string;
  logo_url: string;
  curr_league_id: number;
  current_league_name?: string;
  nation_id?: number;
  nation_url?: string;
  city?: string;
  stadium?: string;
}

// Transfers section models
export interface TransferTeam {
  team_id: number;
  team_name: string;
  team_url?: string;
  nation?: string;
  nation_url?: string;
}

export interface Transfer {
  transfer_id: number;
  player_id: number;
  player_name: string;
  from_team: TransferTeam;
  to_team: TransferTeam;
  isLoan: boolean;
  fee?: number;
  value?: number;
  date?: string;
  season: string;
}

// Matches section models
export interface MatchTeamInfo {
  team_name: string;
  team_id: number;
  team_logo?: string;
  goals?: number;
}

export interface MatchResult {
  result?: string;
  win_team?: number;
  loss_team?: number;
  isDraw?: boolean;
}

export interface MatchDetails {
  extra_time?: boolean;
  pens?: boolean;
  pen_home_goals?: number;
  pen_away_goals?: number;
}

export interface Match {
  match_id: number;
  comp_id: number;
  comp_name?: string;
  comp_url?: string;
  home_team: MatchTeamInfo;
  away_team: MatchTeamInfo;
  result: MatchResult;
  round?: string;
  match_date?: string;
  match_time?: string;
  details: MatchDetails;
}

export interface PlayerNations {
  nation1_id?: number | null;
  nation2_id?: number | null;
  nation1?: string | null;
  nation2?: string | null;
  nation1_url?: string | null;
  nation2_url?: string | null;
}

export interface PlayerStats {
  comp_id: number;
  comp_name: string;
  comp_url?: string | null;
  player_id: number;
  season_year: number;
  player_name: string;
  position?: string | null;
  age?: number | null;
  team_id?: number | null;
  team_name?: string | null;
  team_logo?: string | null;
  ga?: number | null;
  goals?: number | null;
  assists?: number | null;
  penalty_goals?: number | null;
  gp?: number | null;
  minutes?: number | null;
  nations?: PlayerNations | null;
  stats_id: number;
}

export interface TeamPageDataItem {
  info: TeamInfo;
  transfers: Transfer[];
  matches: Match[];
  stats: PlayerStats[];
}

// Complete API response structure
export interface TeamPageInfoResponse {
  data: TeamPageDataItem; // The 'data' property holds an array of LeagueDataContent
}

export interface PlayersStats {
  ga: number | null;
  goals: number | null;
  assists: number | null;
  penalty_goals: number | null;
  gp: number | null;
  minutes: number | null;
  subbed_on: number | null;
  subbed_off: number | null;
  yellows: number | null;
  yellows2: number | null;
  reds: number | null;
}

export interface SquadPlayer {
  squad_id: number;
  player_id: number;
  player_name: string;
  pic_url: string | null;
  team_id: number;
  number: number | null;
  age: number;
  position?: string;
  nations: PlayerNations;
  contract_end: string | null;
  stats: PlayersStats;
  season_year: number;
}

export interface SquadResponse {
  data: {
    squad: SquadPlayer[];
  };
}

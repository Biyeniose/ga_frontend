// types/LeagueTypes.ts
export interface TeamRank {
  rank: string;
  team_id: number;
  team_name: string;
  team_logo: string;
  info: string;
  points: number;
  gp: number;
  gd: number;
  wins: number;
  losses: number;
  draws: number;
  goals_f: number;
  goals_a: number;
}

export interface League {
  comp_id: number;
  league_name: string;
  country_id: number;
  country_url: string;
  type: string;
  ranks: TeamRank[];
}

export interface LeagueResponse {
  data: League[];
}

export interface LeagueInfo {
  comp_id: number;
  league_name: string;
  country_id: number;
  league_logo: string;
  type: string;
  country_url: string;
}

// Team ranking information
export interface TeamRank {
  rank: string;
  team_id: number;
  team_name: string;
  team_logo: string;
  info: string;
  points: number;
  gp: number; // Games played
  gd: number; // Goal difference
  wins: number;
  losses: number;
  draws: number;
  goals_f: number; // Goals for
  goals_a: number; // Goals against
}

// Match information
export interface Match {
  match_id: number;
  comp_id: number;
  home_team_name: string;
  home_id: number;
  home_logo: string;
  home_color: string | null;
  home_formation: string;
  home_ranking: number;
  home_goals: number;
  away_team_name: string;
  away_id: number;
  away_logo: string;
  away_color: string | null;
  away_formation: string;
  away_ranking: number;
  away_goals: number;
  result: string;
  round: string;
  match_date: string;
  season_year: number;
  win_team: number;
  loss_team: number;
  isDraw: boolean;
  extra_time: boolean;
  pens: boolean;
  pen_home_goals: number | null;
  pen_away_goals: number | null;
  match_time: string;
}

export interface LeagueDataItem {
  info: LeagueInfo;
  ranks: TeamRank[];
  matches: Match[];
}
// Complete API response structure
export interface LeagueInfoResponse {
  data: LeagueDataItem[]; // The 'data' property holds an array of LeagueDataContent
}

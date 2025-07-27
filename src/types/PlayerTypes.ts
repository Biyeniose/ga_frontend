// Player types
import { Transfer, Team } from "./TeamTypes";
import { Comp } from "./LeagueTypes";
export interface Nations {
  nation1_id: number | null;
  nation2_id: number | null;
  nation1: string | null;
  nation2: string | null;
  nation1_url: string | null;
  nation2_url: string | null;
}

export interface PlayerInfo {
  player_id: number;
  player_name: string;
  full_name: string;
  pic_url: string | null;
  isRetired: boolean;
  curr_team_id: number;
  curr_team_name: string;
  curr_team_logo: string | null;
  curr_number: number | null;
  onLoan?: boolean | null;
  instagram: string | null;
  parent_team_id: number | null;
  parent_team_name: string | null;
  parent_team_logo: string | null;
  position: string;
  dob: string;
  age: number;
  pob: string;
  nations: Nations;
  market_value: number | null;
  height: number | null;
  foot: string | null;
  date_joined: string | null;
  contract_end: string | null;
  last_extension: string | null;
  parent_club_exp: string | null;
  noClub?: boolean | null;
}

export interface TeamBasicInfo {
  team_name: string;
  team_id: number;
  team_logo: string | null;
  goals: number;
}

export interface MatchEvent {
  event_id: number;
  match_id: number;
  match_date: string;
  player_id: number;
  player_name: string;
  event_type: "Goal" | "Assist" | "Yellow Card" | "Red Card" | string; // Add other event types as needed
  minute: number;
  add_minute: number | null;
  isgoalscorer: boolean;
  home_team: TeamBasicInfo;
  away_team: TeamBasicInfo;
  total_match_goals: number;
  total_match_assists: number;
}

export interface PlayerLatestStats {
  player: Player;
  comp: Comp;
  team: Team;
  season_year: number;
  age?: number | null;
  ga?: number | null; // Goals Against
  ga_pg?: number | null; // Goals Against Per Game
  goals?: number | null;
  goals_pg?: number | null; // Goals Per Game
  assists?: number | null;
  assists_pg?: number | null; // Assists Per Game
  penalty_goals?: number | null;
  gp?: number | null; // Games Played
  minutes?: number | null;
  minutes_pg?: number | null; // Minutes Per Game
  cs?: number | null; // Clean Sheets
  pass_compl_pg?: number | null; // Pass Completion Per Game
  passes_pg?: number | null; // Passes Per Game
  errors_pg?: number | null; // Errors Per Game
  shots_pg?: number | null; // Shots Per Game
  shots_on_target_pg?: number | null; // Shots On Target Per Game
  sca_pg?: number | null; // Shot Creating Actions Per Game
  gca_pg?: number | null; // Goal Creating Actions Per Game
  take_ons_pg?: number | null; // Take-ons Per Game
  take_ons_won_pg?: number | null; // Take-ons Won Per Game
  goals_concede?: number | null; // Goals Conceded
  yellows?: number | null;
  yellows2?: number | null; // Second Yellow Cards
  reds?: number | null;
  own_goals?: number | null;
  stats_id: number;
}

export interface PlayerPageDataItem {
  info: PlayerInfo;
  transfers: Transfer[];
  goal_data: MatchEvent[];
  stats: PlayerLatestStats[];
}

export interface PlayerPageDataResponse {
  data: PlayerPageDataItem;
}

// new
// Nation information
export interface Nations {
  nation1_id: number | null;
  nation1: string | null;
  nation1_logo: string;
  nation2_id: number | null;
  nation2: string | null;
  nation2_logo: string | null;
}

// Player information
export interface Player {
  id: number;
  name: string;
  current_age: number;
  pic_url: string;
  nations: Nations;
}

// Player Goal Dist per Season
export interface TotalGA {
  goals: number;
  assists: number;
  ga: number; // Goal Actions or Goals + Assists
  pens?: number | null; // Penalties (scored/taken/involved in)
}

export interface Pens {
  pen_pct?: number | null; // Penalty Percentage
  pens_scored?: number | null; // Penalties Scored
}

export interface StatsDist {
  ga_against_pct?: number | null; // Goal Actions Against Percentage
  ga_against?: number | null; // Goal Actions Against
  goals_against?: number | null; // Goals Against
  goals_against_pct?: number | null; // Goals Against Percentage
  assists_against?: number | null; // Assists Against
  assists_against_pct?: number | null; // Assists Against Percentage
}

export interface TeamDist {
  team: Team;
  stats: StatsDist;
}

export interface GoalDist {
  teams: TeamDist;
}

export interface Comp2 {
  comp_id: number;
  comp_name: string;
  comp_url?: string | null; // Optional string, can be string or null
  season_year: number;
}

export interface PlayerGADistData {
  info: Comp2;
  total: TotalGA;
  goal_dist: GoalDist[] | undefined;
  pens: Pens;
}

export interface PlayerGADistResponse {
  data: PlayerGADistData;
}

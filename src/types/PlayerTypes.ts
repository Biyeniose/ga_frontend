// Player types
import { Transfer } from "./TeamTypes";

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
  comp_id: number;
  comp_name: string;
  comp_url: string | null;
  player_id: number;
  season_year: number;
  player_name: string;
  age: number;
  team_id: number;
  team_name: string;
  team_logo: string | null;
  ga: number; // Goals + Assists
  goals: number;
  assists: number;
  penalty_goals: number;
  gp: number; // Games played
  minutes: number;
  subbed_on: number;
  subbed_off: number;
  yellows: number;
  yellows2: number; // Second yellows (leading to red)
  reds: number;
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

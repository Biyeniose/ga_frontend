import { Player, Nations } from "./PlayerTypes";

// Player stats
export interface PlayerStats {
  id: number;
  player_id: number;
  match_id: number;
  team_id: number;
  minutes: number;
  goals: number;
  assists: number;
  goals_assists: number;
  pens_made: number;
  pens_att: number;
  age: number;
  shots: number;
  shots_on_target: number;
  cards_yellow: number;
  cards_red: number;
  touches: number;
  tackles: number;
  interceptions: number;
  blocks: number;
  xg: number;
  npxg: number;
  xg_assist: number;
  sca: number;
  gca: number;
  passes_completed: number;
  passes: number;
  passes_pct: number;
  progressive_passes: number;
  carries: number;
  progressive_carries: number;
  take_ons: number;
  take_ons_won: number;
  tackles_won: number;
  tackles_def_3rd: number;
  tackles_mid_3rd: number;
  tackles_att_3rd: number;
  challenge_tackles: number;
  challenges: number;
  challenge_tackles_pct: number;
  challenges_lost: number;
  blocked_shots: number;
  blocked_passes: number;
  tackles_interceptions: number;
  clearances: number;
  errors: number;
  touches_def_pen_area: number;
  touches_def_3rd: number;
  touches_mid_3rd: number;
  touches_att_3rd: number;
  touches_att_pen_area: number;
  touches_live_ball: number;
  take_ons_won_pct: number;
  take_ons_tackled: number;
  take_ons_tackled_pct: number;
  carries_distance: number;
  carries_progressive_distance: number;
  carries_into_final_third: number;
  carries_into_penalty_area: number;
  miscontrols: number;
  dispossessed: number;
  passes_received: number;
  progressive_passes_received: number;
  fouls: number;
  fouled: number;
  offsides: number;
  crosses: number;
  own_goals: number;
  pens_won: number;
  pens_conceded: number;
  aerials_lost: number;
  cards_yellow_red: number;
  ball_recoveries: number;
  aerials_won: number;
  aerials_won_pct: number;
}
// Lineup player
export interface LineupPlayer {
  id: number;
  player: Player;
  age: number;
  number: number;
  position: string;
  xi: boolean;
  team_id: number;
  stats: PlayerStats;
}
export type MatchGoals = {
  goals?: number | null; // Optional integer, can be number or null
  pen_goals?: number | null; // Optional integer, can be number or null
  ranking?: number | null; // Optional integer, can be number or null
};
// Team stats
export interface TeamStats {
  ranking: number;
  goals: number;
  xg: number;
  pen_goals: number;
  possesion: number;
  offsides: number;
  fouls: number;
  freekicks: number;
  corners: number;
  formation: string;
  saves_succ: number;
  saves_att: number;
  saves_acc: number;
  shots_att: number;
  shots_succ: number;
  shot_acc: number;
  pass_att: number;
  pass_succ: number;
  pass_acc: number;
}
// Team info
export interface TeamInfo {
  team: {
    team_id: number;
    team_name: string;
    team_logo: string;
    league_id: number;
  };
  manager: {
    manager_id: number;
    name: string;
  };
}

// Team data
export interface TeamData {
  info: TeamInfo;
  lineups: LineupPlayer[];
  team_stats: TeamStats;
}
// Match event
export interface MatchEvent {
  id: number;
  event_type: string;
  minute: number;
  add_minute: number | null;
  home_goals: number;
  away_goals: number;
  team_id: number;
  active_player: {
    id: number;
    name: string;
    current_age: number;
    pic_url: string;
    nations: Nations;
  } | null;
  passive_player: {
    id: number;
    name: string;
    current_age: number;
    pic_url: string;
    nations: Nations;
  } | null;
}

// Match info
export interface MatchInfo {
  match_id: number;
  match_date: string;
  date_time_utc: string;
  round: string;
  season_year: number;
  draw: boolean;
  et: boolean;
  pens: boolean;
  result: string;
  comp_id: number;
  comp: string;
  comp_logo: string;
}

// Main API response
export interface MatchDataResponse {
  data: {
    events: MatchEvent[];
    teams: {
      home: TeamData;
      away: TeamData;
    };
    match_info: MatchInfo;
  };
}

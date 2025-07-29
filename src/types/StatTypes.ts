import { Team } from "./TeamTypes";
import { MatchInfo, MatchGoals } from "./MatchTypes";

export type MatchTeam = {
  stats: MatchGoals;
  team: Team;
};

export type MatchTeamsBasic = {
  home: MatchTeam;
  away: MatchTeam;
};

export type Match = {
  teams: MatchTeamsBasic;
  match_info: MatchInfo;
};

export type TeamRecord = {
  team: Team;
  gp: number; // Games Played
  wins: number;
  win_pct: number; // Win Percentage
  losses: number;
  draws: number;
  goals_f: number; // Goals For
  goals_a: number; // Goals Against
};

export type H2HData = {
  matches: Match[];
  record: TeamRecord[];
};

export type H2HResponse = {
  data: H2HData;
};

// detailed stats
export interface BasicStats {
  id: number;
  player_id: number;
  match_id: number;
  team_id: number;
  minutes?: number;
  goals?: number;
  assists?: number;
  goals_assists?: number;
  pens_made?: number;
  pens_att?: number;
  age?: number;
  shots?: number;
  shots_on_target?: number;
  cards_yellow?: number;
  cards_red?: number;
  touches?: number;
}

export interface DefensiveStats {
  tackles?: number;
  interceptions?: number;
  blocks?: number;
  tackles_won?: number;
  tackles_def_3rd?: number;
  tackles_mid_3rd?: number;
  tackles_att_3rd?: number;
  challenge_tackles?: number;
  challenges?: number;
  challenge_tackles_pct?: number;
  challenges_lost?: number;
  blocked_shots?: number;
  blocked_passes?: number;
  tackles_interceptions?: number;
  clearances?: number;
  errors?: number;
  ball_recoveries?: number;
}

export interface AttackingStats {
  xg?: number;
  npxg?: number;
  xg_assist?: number;
  sca?: number;
  gca?: number;
  take_ons?: number;
  take_ons_won?: number;
  take_ons_won_pct?: number;
  take_ons_tackled?: number;
  take_ons_tackled_pct?: number;
  crosses?: number;
  own_goals?: number;
  pens_won?: number;
  pens_conceded?: number;
}

export interface PassingStats {
  passes_completed?: number;
  passes?: number;
  passes_pct?: number;
  progressive_passes?: number;
  passes_received?: number;
  progressive_passes_received?: number;
}

export interface PossessionStats {
  carries?: number;
  progressive_carries?: number;
  carries_distance?: number;
  carries_progressive_distance?: number;
  carries_into_final_third?: number;
  carries_into_penalty_area?: number;
  miscontrols?: number;
  dispossessed?: number;
  touches_def_pen_area?: number;
  touches_def_3rd?: number;
  touches_mid_3rd?: number;
  touches_att_3rd?: number;
  touches_att_pen_area?: number;
  touches_live_ball?: number;
}

export interface DisciplineStats {
  fouls?: number;
  fouled?: number;
  offsides?: number;
  cards_yellow_red?: number;
  aerials_lost?: number;
  aerials_won?: number;
  aerials_won_pct?: number;
}

export interface PlayerMatchStatsDiv {
  basic: BasicStats;
  defensive?: DefensiveStats;
  attacking?: AttackingStats;
  passing?: PassingStats;
  possession?: PossessionStats;
  discipline?: DisciplineStats;
}

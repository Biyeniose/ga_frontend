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

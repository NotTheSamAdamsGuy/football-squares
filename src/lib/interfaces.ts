import { GameStatus } from "./enums";

export interface TeamResult {
  name: string;
  points: number;
}

export interface ResultScores {
  homeTeam: TeamResult;
  awayTeam: TeamResult;
}

export interface PeriodResult {
  period: string;
  score: ResultScores | null;
  winner: string | null;
}

export interface TeamBoardDetails {
  location: string;
  name: string;
  abbreviation: string;
  banner: {
    bgColor: string;
    numbersBgColor: string;
    homeBgImage: string;
    awayBgImage: string;
    homeBgStyle: string;
    awayBgStyle: string;
    homeBgGradient: string;
    awayBgGradient: string;
  };
}

export interface TeamsInfo {
  homeTeam: TeamBoardDetails;
  awayTeam: TeamBoardDetails;
}

export interface Player {
  name: string;
  initials: string;
}

export interface Square {
  player: Player;
  highlights: string[];
  row: number;
  col: number;
}

export interface HeaderNumbers {
  home: number[];
  away: number[];
}

export interface ConfigurationFormData {
  homeTeam?: string;
  awayTeam?: string;
  numberOfPeriods?: string;
  randomizeNumbers?: boolean;
}

export interface AssignmentFormData {
  row?: number;
  col?: number;
  playerInitials?: string;
}

export interface AddPlayerFormData {
  playerName: string;
}

export type BoardState = {
  gameStatus: GameStatus;
  displayHeaderNumbers: boolean;
  isConfigured: boolean;
};

export interface SettingsBgGradients {
  homeTeam: string;
  awayTeam: string;
}

export interface BoardData {
  players: Map<string, Player> | null;
  periodResults: PeriodResult[] | null;
  squares: Square[][] | null;
  headerNumbers: HeaderNumbers | null;
  randomizeNumbers: boolean | null;
  boardState: BoardState | null;
  teamsInfo: TeamsInfo | null;
}

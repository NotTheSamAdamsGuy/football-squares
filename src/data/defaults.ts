import { GameStatus } from "../lib/enums";
import { PeriodResult, HeaderNumbers, TeamsInfo, BoardState } from "../lib/interfaces";

export const defaultHeaderNumbers: HeaderNumbers = {
  home: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  away: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
};

export const defaultResults: Array<PeriodResult> = [
  {
    period: "q1",
    score: null,
    winner: null,
  },
  {
    period: "q2",
    score: null,
    winner: null,
  },
  {
    period: "q3",
    score: null,
    winner: null,
  },
  {
    period: "q4",
    score: null,
    winner: null,
  },
];

export const defaultTeamsInfo: TeamsInfo = {
  homeTeam: {
    location: "",
    name: "",
    abbreviation: "",
    banner: {
      bgColor: "bg-slate-400",
      numbersBgColor: "",
      homeBgImage: "",
      awayBgImage: "",
      homeBgStyle: "",
      awayBgStyle: "",
      homeBgGradient: "",
      awayBgGradient: "",
    },
  },
  awayTeam: {
    location: "",
    name: "",
    abbreviation: "",
    banner: {
      bgColor: "bg-slate-400",
      numbersBgColor: "",
      homeBgImage: "",
      awayBgImage: "",
      homeBgStyle: "",
      awayBgStyle: "",
      homeBgGradient: "",
      awayBgGradient: "",
    },
  },
};

export const defaultBoardState: BoardState = {
  gameStatus: GameStatus.NotStarted,
  displayHeaderNumbers: false,
  isConfigured: false,
}

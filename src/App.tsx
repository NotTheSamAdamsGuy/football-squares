import { useState } from "react";

import "./App.css";
import { JsonSerializer } from "json-safe-stringify";
import { ErrorBoundary } from "react-error-boundary";

import GridHeader from "./components/grid/GridHeader";
import SquaresGrid from "./components/grid/SquaresGrid";
import Scoreboard from "./components/scoreboard/Scoreboard";
import SettingsComponent from "./components/settings/SettingsComponent";
import { BoardStateContext } from "./context/BoardStateContext";
import { defaultHeaderNumbers, defaultTeamsInfo } from "./data/defaults";
import {
  BoardData,
  BoardState,
  HeaderNumbers,
  PeriodResult,
  Player,
  SettingsBgGradients,
  Square,
  TeamsInfo,
} from "./lib/interfaces";
import { generateSquaresArray } from "./lib/utils";

const savedBoardData: BoardData = {
  players: null,
  periodResults: null,
  squares: null,
  headerNumbers: null,
  randomizeNumbers: null,
  boardState: null,
  teamsInfo: null,
};

const loadDataFromLocalStorage = () => {
  const serializer = new JsonSerializer();
  const players: Map<string, Player> = serializer.parse(
    localStorage.getItem("players")!,
    (error) => console.log(error)
  );
  const periodResults: PeriodResult[] = JSON.parse(
    localStorage.getItem("periodResults")!
  );
  const squares: Square[][] = JSON.parse(localStorage.getItem("squares")!);
  const headerNumbers: HeaderNumbers = JSON.parse(
    localStorage.getItem("headerNumbers")!
  );
  const randomizeNumbers: boolean = JSON.parse(
    localStorage.getItem("randomizeNumbers")!
  );
  const boardState: BoardState = JSON.parse(
    localStorage.getItem("boardState")!
  );
  const teamsInfo: TeamsInfo = JSON.parse(localStorage.getItem("teamsInfo")!);

  if (players) savedBoardData.players = players;
  if (periodResults) savedBoardData.periodResults = periodResults;
  if (squares) savedBoardData.squares = squares;
  if (headerNumbers) savedBoardData.headerNumbers = headerNumbers;
  if (randomizeNumbers) savedBoardData.randomizeNumbers = randomizeNumbers;
  if (boardState) savedBoardData.boardState = boardState;
  if (teamsInfo) savedBoardData.teamsInfo = teamsInfo;
};

if (typeof window !== "undefined") {
  loadDataFromLocalStorage();
}

function App() {
  const [players, setPlayers] = useState(
    savedBoardData.players ? savedBoardData.players : new Map<string, Player>()
  );
  const [results, setResults] = useState<PeriodResult[]>(
    savedBoardData.periodResults ? savedBoardData.periodResults : []
  );
  const [squares, setSquares] = useState<Square[][]>(
    savedBoardData.squares
      ? savedBoardData.squares
      : generateSquaresArray(10, 10)
  );
  const [headerNumbers, setHeaderNumbers] = useState<HeaderNumbers>(
    savedBoardData.headerNumbers
      ? savedBoardData.headerNumbers
      : defaultHeaderNumbers
  );
  const [teamsInfo, setTeamsInfo] = useState<TeamsInfo>(
    savedBoardData.teamsInfo ? savedBoardData.teamsInfo : defaultTeamsInfo
  );

  const fallback = (
    <div className="bg-white p-5 w-96 mx-auto mt-96 text-center">
      Something went wrong. Please reload the page.
    </div>
  );

  const settingsBgGradients: SettingsBgGradients = {
    homeTeam: teamsInfo.homeTeam.banner.homeBgGradient,
    awayTeam: teamsInfo.awayTeam.banner.awayBgGradient,
  };

  return (
    <ErrorBoundary fallback={fallback}>
      <BoardStateContext>
        <main className="flex justify-center items-center h-screen">
          <div className="flex justify-center items-center gap-x-[63px]">
            <div className="w-[750px] h-[750px] shadow-[5px_5px_50px_10px_rgba(0,0,0,1)] grid grid-rows-12 grid-cols-12">
              <SettingsComponent
                players={players}
                setPlayers={setPlayers}
                setTeamsInfo={setTeamsInfo}
                setHeaderNumbers={setHeaderNumbers}
                setResults={setResults}
                setSquares={setSquares}
                gradients={settingsBgGradients}
              />
              <GridHeader
                type="home"
                teamDetails={teamsInfo.homeTeam}
                numbers={headerNumbers.home}
              />
              <GridHeader
                type="away"
                teamDetails={teamsInfo.awayTeam}
                numbers={headerNumbers.away}
              />
              <SquaresGrid
                squares={squares}
                setSquares={setSquares}
                players={players}
              />
            </div>
            <Scoreboard
              results={results}
              setResults={setResults}
              teamsInfo={teamsInfo}
              headerNumbers={headerNumbers}
              squares={squares}
              setSquares={setSquares}
            />
          </div>
        </main>
      </BoardStateContext>
    </ErrorBoundary>
  );
}

export default App;

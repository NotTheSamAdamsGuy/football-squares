import { useState } from "react";

import AddResultModal from "./AddResultModal";
import ScoreboardResult from "./ScoreboardResult";
import {
  HeaderNumbers,
  PeriodResult,
  Square,
  TeamsInfo,
} from "../../lib/interfaces";

interface Props {
  results: PeriodResult[];
  setResults: (results: PeriodResult[]) => void;
  teamsInfo: TeamsInfo;
  headerNumbers: HeaderNumbers;
  squares: Square[][];
  setSquares: (squares: Square[][]) => void;
}

export default function Scoreboard({
  results,
  setResults,
  teamsInfo,
  headerNumbers,
  squares,
  setSquares,
}: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [homeTeamPoints, setHomeTeamPoints] = useState<number>(0);
  const [awayTeamPoints, setAwayTeamPoints] = useState<number>(0);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");

  const renderScoreboardResults = (results: Array<PeriodResult>) => {
    const scoreboardResults: React.ReactNode[] = [];

    results.forEach((result) => {
      scoreboardResults.push(
        <ScoreboardResult
          result={result}
          updateScores={updateScores}
          homeTeamName={teamsInfo.homeTeam.name}
          awayTeamName={teamsInfo.awayTeam.name}
          setSelectedPeriod={setSelectedPeriod}
          setShowModal={setShowModal}
          key={result?.period}
        />
      );
    });

    return scoreboardResults;
  };

  /**
   * Adds the given string to the highlights array of the given square
   * @param winningSquare Square
   * @param period string
   */
  const addValueToSquareHighlights = (square: Square, period: string): void => {
    const tempSquares: Square[][] = [...squares];
    tempSquares[square.row][square.col].highlights.push(period);
    setSquares(tempSquares);
    localStorage.setItem("squares", JSON.stringify(tempSquares));
  };

  /**
   * Updates the PeriodResult object in results array whose period property
   * matches the given period string value.
   * Throws an error if a matching PeriodResult object cannot be found.
   * @param period string
   * @param homeScore number
   * @param awayScore number
   * @param winningSquare Square
   */
  const updatePeriodResults = (
    period: string,
    homeScore: number,
    awayScore: number,
    winningSquare: Square
  ): void => {
    const result: PeriodResult = {
      period: period,
      score: {
        homeTeam: {
          name: teamsInfo.homeTeam.name,
          points: homeScore,
        },
        awayTeam: {
          name: teamsInfo.awayTeam.name,
          points: awayScore,
        },
      },
      winner: winningSquare.player.name,
    };

    const tempResults: PeriodResult[] = [...results];
    const resultIndex: number = tempResults.findIndex(
      (tempResult) => tempResult.period === result.period
    );

    tempResults[resultIndex] = result;
    setResults(tempResults);
    localStorage.setItem("periodResults", JSON.stringify(tempResults));
  };

  /**
   * Updates the scoreboard and squares grid based on the given scores for the given period
   * @param period string
   * @param homeScore number
   * @param awayScore number
   */
  const updateScores = (
    period: string,
    homeScore: number,
    awayScore: number
  ): void => {
    // scores should not be less than zero
    const validHomeScore: number = homeScore < 0 ? 0 : homeScore;
    const validAwayScore: number = awayScore < 0 ? 0 : awayScore;

    const homeHeaderNumberIndex: number = headerNumbers.home.indexOf(
      Math.floor(validHomeScore % 10)
    );

    const awayHeaderNumberIndex: number = headerNumbers.away.indexOf(
      Math.floor(validAwayScore % 10)
    );

    const winningSquare = squares[awayHeaderNumberIndex][homeHeaderNumberIndex];

    updatePeriodResults(period, validHomeScore, validAwayScore, winningSquare);
    addValueToSquareHighlights(winningSquare, period);
  };

  const updateScoreboard = () => {
    try {
      updateScores(selectedPeriod, homeTeamPoints, awayTeamPoints);
      closeModal();
    } catch (error) {
      console.error(`Unable to update scores: ${error}`);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setHomeTeamPoints(0);
    setAwayTeamPoints(0);
  };

  return (
    <>
      <div
        className="w-[313px] h-[750px] bg-black shadow-[5px_5px_50px_10px_rgba(0,0,0,1)] rounded p-[10px]"
        data-testid="scoreboard"
      >
        <div className="flex flex-col justify-around text-white p-[10px] h-[730px] border-4 border-white rounded-[30px]">
          {renderScoreboardResults(results)}
        </div>
      </div>
      <AddResultModal
        isOpen={showModal}
        onSubmit={updateScoreboard}
        onClose={closeModal}
        homeTeamName={teamsInfo.homeTeam.name}
        awayTeamName={teamsInfo.awayTeam.name}
        period={selectedPeriod}
        homeTeamPoints={homeTeamPoints}
        setHomeTeamPoints={setHomeTeamPoints}
        awayTeamPoints={awayTeamPoints}
        setAwayTeamPoints={setAwayTeamPoints}
      />
    </>
  );
}

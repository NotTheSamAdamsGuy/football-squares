import { PeriodResult } from "../../lib/interfaces";
import Button from "../forms/Button";

interface Props {
  result: PeriodResult;
  updateScores: (period: string, homeScore: number, awayScore: number) => void;
  homeTeamName: string;
  awayTeamName: string;
  setSelectedPeriod: (period: string) => void;
  setShowModal: (value: boolean) => void;
}

export default function ScoreboardResult({
  result,
  setSelectedPeriod,
  setShowModal,
}: Props) {
  const handleAddResultClick = (period: string): void => {
    setSelectedPeriod(period);
    setShowModal(true);
  };

  const renderResultPlaceholder = (result: PeriodResult): JSX.Element => {
    return (
      <div
        className="flex flex-cols justify-center items-center"
        data-testid="placeholder"
      >
        <Button
          className="btn-secondary capitalize"
          onClick={() => handleAddResultClick(result.period)}
          text={`Add ${result.period} Result`}
        />
      </div>
    );
  };

  const renderResult = (result: PeriodResult): React.ReactNode => {
    return (
      <>
        <div className="flex justify-center uppercase" data-testid="result">
          {result.period} RESULT
        </div>
        <div className="flex mb-1">
          <div className="w-1/2">
            <div className="flex justify-center mb-1">
              {result.score?.homeTeam.name}
            </div>
            <div className="flex flex-cols justify-center items-center h-7 w-14 my-0 mx-auto border-white border-2 bg-black text-amber-300 font-scoreboard">
              {result.score?.homeTeam.points}
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex justify-center mb-1">
              {result.score?.awayTeam.name}
            </div>
            <div className="flex flex-cols justify-center items-center h-7 w-14 my-0 mx-auto border-white border-2 bg-black text-amber-300 font-scoreboard">
              {result.score?.awayTeam.points}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center mb-0">WINNER</div>
          <div className="flex justify-center h-6 text-sm border-white border-2 bg-black text-amber-300 font-scoreboard uppercase">
            {result.winner}
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className={`h-[160px] p-[10px] flex flex-col justify-center border-white border-2 rounded-[30px] ${result.period}`}
      data-testid={`${result.period}-scoreboard-result`}
    >
      {result?.score === null
        ? renderResultPlaceholder(result)
        : renderResult(result)}
    </div>
  );
}

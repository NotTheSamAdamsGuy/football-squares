import { useState } from "react";

import AddPlayer from "./AddPlayer";
import ConfigurationControls from "./ConfigurationControls";
import HelpComponent from "./HelpComponent";
import ResetModal from "./ResetModal";
import SettingsButton from "./SettingsButton";
import { useBoardStateContext } from "../../context/BoardStateContext";
import {
  defaultBoardState,
  defaultHeaderNumbers,
  defaultTeamsInfo,
} from "../../data/defaults";
import { GameStatus } from "../../lib/enums";
import {
  BoardState,
  HeaderNumbers,
  PeriodResult,
  Player,
  SettingsBgGradients,
  Square,
  TeamsInfo,
} from "../../lib/interfaces";
import { generateSquaresArray } from "../../lib/utils";

interface Props {
  players: Map<string, Player>;
  setPlayers: (players: Map<string, Player>) => void;
  setTeamsInfo: (teamsInfo: TeamsInfo) => void;
  setHeaderNumbers: (headerNumbers: HeaderNumbers) => void;
  setResults: (results: PeriodResult[]) => void;
  setSquares: (squares: Square[][]) => void;
  gradients: SettingsBgGradients;
}

export default function SettingsComponent({
  players,
  setPlayers,
  setTeamsInfo,
  setHeaderNumbers,
  setResults,
  setSquares,
  gradients,
}: Props) {
  const { boardState, setBoardState } = useBoardStateContext();
  const [showModal, setShowModal] = useState(false);
  const disableStartButton =
    !boardState.isConfigured ||
    !(boardState.isConfigured && boardState.gameStatus !== "Started");

  const updateBoardState = () => {
    const tempBoardState: BoardState = JSON.parse(JSON.stringify(boardState));
    tempBoardState.gameStatus = GameStatus.Started;
    tempBoardState.displayHeaderNumbers = true;
    setBoardState(tempBoardState);
    localStorage.setItem("boardState", JSON.stringify(tempBoardState));
  };

  const resetBoard = () => {
    setShowModal(false);
    
    setPlayers(new Map<string, Player>());
    localStorage.removeItem("players");

    setTeamsInfo(defaultTeamsInfo);
    localStorage.removeItem("teamsInfo");

    setHeaderNumbers(defaultHeaderNumbers);
    localStorage.removeItem("headerNumbers");
    localStorage.removeItem("randomizeNumbers");

    setResults([]);
    localStorage.removeItem("periodResults");

    setSquares(generateSquaresArray(10, 10));
    localStorage.removeItem("squares");

    setBoardState(defaultBoardState);
    localStorage.removeItem("boardState");
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
  };

  const backgroundStyle = boardState.isConfigured
    ? `${gradients.awayTeam}  ${gradients.homeTeam}`
    : "bg-slate-400";

  return (
    <div
      className={`flex flex-col justify-evenly row-span-2 col-span-2 rounded-tl-lg bg-gradient-to-tr ${backgroundStyle}`}
      data-testid="settings-component"
    >
      <div className="flex justify-evenly">
        <ConfigurationControls
          setTeamsInfo={setTeamsInfo}
          setHeaderNumbers={setHeaderNumbers}
          setResults={setResults}
        />
        <AddPlayer players={players} setPlayers={setPlayers} />
        <HelpComponent />
      </div>
      <div className="flex justify-evenly">
        <SettingsButton
          type="start"
          onClick={updateBoardState}
          disabled={disableStartButton}
        />
        <SettingsButton type="reset" onClick={() => setShowModal(true)} />
        <ResetModal isOpen={showModal} onClose={handleCloseModal} onSubmit={resetBoard} />
      </div>
    </div>
  );
}

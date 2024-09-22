import { useState } from "react";

import { SubmitHandler } from "react-hook-form";

import ConfigurationModal from "./ConfigurationModal";
import SettingsButton from "./SettingsButton";
import { useBoardStateContext } from "../../context/BoardStateContext";
import { teams } from "../../data/teams";
import { GameStatus } from "../../lib/enums";
import {
  BoardState,
  ConfigurationFormData,
  HeaderNumbers,
  PeriodResult,
  TeamsInfo,
} from "../../lib/interfaces";
import { generateNumbersArray } from "../../lib/utils";

interface Props {
  setTeamsInfo: (teamsInfo: TeamsInfo) => void;
  setHeaderNumbers: (headerNumbers: HeaderNumbers) => void;
  setResults: (results: PeriodResult[]) => void;
}

export default function ConfigurationControls({
  setTeamsInfo,
  setHeaderNumbers,
  setResults,
}: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { boardState, setBoardState } = useBoardStateContext();

  const setConfigurations: SubmitHandler<ConfigurationFormData> = (data) => {
    const { homeTeam, awayTeam, numberOfPeriods, randomizeNumbers } = data;
    const periodCount: number = parseInt(numberOfPeriods!);

    try {
      const teamsInfo = loadTeamsInfo(homeTeam!, awayTeam!);
      setTeamsInfo(teamsInfo);
      localStorage.setItem("teamsInfo", JSON.stringify(teamsInfo));

      const headerNumbers: HeaderNumbers = loadHeaderNumbers(randomizeNumbers!);
      setHeaderNumbers(headerNumbers);
      localStorage.setItem("headerNumbers", JSON.stringify(headerNumbers));
      localStorage.setItem("randomizeNumbers", JSON.stringify(randomizeNumbers));

      const periodResults: PeriodResult[] = loadInitialPeriodResults(periodCount);
      setResults(periodResults);
      localStorage.setItem("periodResults", JSON.stringify(periodResults));

      const tempBoardState: BoardState = JSON.parse(JSON.stringify(boardState));
      tempBoardState.isConfigured = true;
      setBoardState(tempBoardState);
      localStorage.setItem("boardState", JSON.stringify(tempBoardState));

      setShowModal(false);
    } catch (error) {
      console.error(`Unable to save configurations: ${error}`);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const loadTeamsInfo = (
    homeTeamAbbr: string,
    awayTeamAbbr: string
  ): TeamsInfo => {
    return {
      homeTeam: teams.get(homeTeamAbbr)!,
      awayTeam: teams.get(awayTeamAbbr)!,
    };
  };

  const loadHeaderNumbers = (
    randomizeHeaderNumbers: boolean
  ): HeaderNumbers => {
    const headerNumbers: HeaderNumbers = {
      home: generateNumbersArray(10, randomizeHeaderNumbers),
      away: generateNumbersArray(10, randomizeHeaderNumbers),
    };

    return headerNumbers;
  };

  const loadInitialPeriodResults = (
    numberOfPeriods: number
  ): PeriodResult[] => {
    const results: PeriodResult[] = [];
    let periodType: string = "";

    switch (numberOfPeriods) {
      case 1:
        periodType = "f";
        break;
      case 2:
        periodType = "h";
        break;
      case 4:
        periodType = "q";
        break;
      default:
        throw new Error("Invalid value provided for numberOfPeriods");
    }

    for (let i = 0; i < numberOfPeriods; i++) {
      const result: PeriodResult = {
        period: periodType === "f" ? "final" : `${periodType}${i + 1}`,
        score: null,
        winner: null,
      };
      results.push(result);
    }

    return results;
  };

  return (
    <>
      <SettingsButton
        type="config"
        onClick={() => setShowModal(true)}
        disabled={boardState.gameStatus === GameStatus.Started}
      />
      <ConfigurationModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={setConfigurations}
      />
    </>
  );
}

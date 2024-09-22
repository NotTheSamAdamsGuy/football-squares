import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ConfigurationControls from "../../../components/settings/ConfigurationControls";
import { Context } from "../../../context/BoardStateContext";
import { GameStatus } from "../../../lib/enums";
import {
  BoardState,
  HeaderNumbers,
  PeriodResult,
} from "../../../lib/interfaces";

beforeEach(() => {
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

afterEach(() => {
  cleanup();
});

// override console.error so we don't log expected errors into the output
window.console.error = jest.fn();

const expectedTeams = {
  homeTeam: {
    location: "Chicago",
    name: "Bears",
    abbreviation: "CHI",
    banner: {
      bgColor: "bg-CHI-100",
      numbersBgColor: "bg-CHI-200",
      homeBgImage: "bg-[url('/logos/home/CHI.png')]",
      awayBgImage: "bg-[url('/logos/away/CHI.png')]",
      homeBgStyle: "bg-cover bg-[center_top_-4rem]",
      awayBgStyle: "bg-cover bg-[left_-4rem_center]",
      homeBgGradient: "to-CHI-100 to-50%",
      awayBgGradient: "from-CHI-100 from-50%",
    }
  },
  awayTeam: {
    location: "Minnesota",
    name: "Vikings",
    abbreviation: "MIN",
    banner: {
      bgColor: "bg-MIN-100",
      numbersBgColor: "bg-MIN-200",
      homeBgImage: "bg-[url('/logos/home/MIN.png')]",
      awayBgImage: "bg-[url('/logos/away/MIN.png')]",
      homeBgStyle: "bg-cover bg-center",
      awayBgStyle: "bg-cover bg-center",
      homeBgGradient: "to-MIN-100 to-50%",
      awayBgGradient: "from-MIN-100 from-50%",
    }
  },
};

const expectedHeaderNumbers: HeaderNumbers = {
  home: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  away: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
};

const setup = (
  boardState: BoardState,
  setTeamsInfo: () => void,
  setHeaderNumbers: () => void,
  setResults: () => void,
  setBoardState: () => void
): void => {
  render(
    <Context.Provider value={{ boardState, setBoardState }}>
      <ConfigurationControls
        setTeamsInfo={setTeamsInfo}
        setHeaderNumbers={setHeaderNumbers}
        setResults={setResults}
      />
    </Context.Provider>
  );
};

describe("ConfigurationControls component", () => {
  const setTeamsInfo = jest.fn();
  const setHeaderNumbers = jest.fn();
  const setResults = jest.fn();
  const setBoardState = jest.fn();

  test("Component render", () => {
    const boardState: BoardState = {
      gameStatus: GameStatus.NotStarted,
      displayHeaderNumbers: false,
      isConfigured: false,
    };

    setup(
      boardState,
      setTeamsInfo,
      setHeaderNumbers,
      setResults,
      setBoardState
    );

    const button = screen.getByTestId("configuration-controls-button");
    expect(button).toBeInTheDocument();
  });

  test("Close modal", async () => {
    const user = userEvent.setup();
    const boardState: BoardState = {
      gameStatus: GameStatus.NotStarted,
      displayHeaderNumbers: false,
      isConfigured: false,
    };
    const setTeamsInfo = jest.fn();

    setup(
      boardState,
      setTeamsInfo,
      setHeaderNumbers,
      setResults,
      setBoardState
    );

    const button = screen.getByTestId("configuration-controls-button");
    await user.click(button);
    const closeButton = screen.getByTestId("secondary-button");
    await user.click(closeButton);
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });

  test("Set configurations - quarters", async () => {
    const user = userEvent.setup();
    const boardState: BoardState = {
      gameStatus: GameStatus.NotStarted,
      displayHeaderNumbers: false,
      isConfigured: false,
    };

    setup(
      boardState,
      setTeamsInfo,
      setHeaderNumbers,
      setResults,
      setBoardState
    );

    // open modal
    const button = screen.getByTestId("configuration-controls-button");
    await user.click(button);

    // fill out the form and click submit
    const homeTeamSelect = screen.getByTestId("home-team-select");
    await user.selectOptions(homeTeamSelect, ["CHI"]);

    const awayTeamSelect = screen.getByTestId("away-team-select");
    await user.selectOptions(awayTeamSelect, ["MIN"]);

    const select = screen.getByTestId("scoring-preference-select");
    await user.selectOptions(select, ["Score after every quarter"]);

    const submitButton = screen.getByTestId("primary-button");
    await user.click(submitButton);

    const expectedResults: PeriodResult[] = [
      { period: "q1", score: null, winner: null },
      { period: "q2", score: null, winner: null },
      { period: "q3", score: null, winner: null },
      { period: "q4", score: null, winner: null },
    ];

    expect(setTeamsInfo).toHaveBeenCalledWith(expectedTeams);
    expect(setHeaderNumbers).toHaveBeenCalledWith(expectedHeaderNumbers);
    expect(setResults).toHaveBeenCalledWith(expectedResults);
  });

  test("Set configurations - every half", async () => {
    const user = userEvent.setup();
    const boardState: BoardState = {
      gameStatus: GameStatus.NotStarted,
      displayHeaderNumbers: false,
      isConfigured: false,
    };

    setup(
      boardState,
      setTeamsInfo,
      setHeaderNumbers,
      setResults,
      setBoardState
    );

    const button = screen.getByTestId("configuration-controls-button");
    await user.click(button);

    const homeTeamSelect = screen.getByTestId("home-team-select");
    await user.selectOptions(homeTeamSelect, ["CHI"]);

    const awayTeamSelect = screen.getByTestId("away-team-select");
    await user.selectOptions(awayTeamSelect, ["MIN"]);

    const select = screen.getByTestId("scoring-preference-select");
    await user.selectOptions(select, ["Score after every half"]);

    const submitButton = screen.getByTestId("primary-button");
    await user.click(submitButton);

    const expectedResults: PeriodResult[] = [
      { period: "h1", score: null, winner: null },
      { period: "h2", score: null, winner: null },
    ];

    expect(setTeamsInfo).toHaveBeenCalledWith(expectedTeams);
    expect(setHeaderNumbers).toHaveBeenCalledWith(expectedHeaderNumbers);
    expect(setResults).toHaveBeenCalledWith(expectedResults);
  });

  test("Set configurations - full game", async () => {
    const user = userEvent.setup();
    const boardState: BoardState = {
      gameStatus: GameStatus.NotStarted,
      displayHeaderNumbers: false,
      isConfigured: false,
    };

    setup(
      boardState,
      setTeamsInfo,
      setHeaderNumbers,
      setResults,
      setBoardState
    );

    const button = screen.getByTestId("configuration-controls-button");
    await user.click(button);

    const homeTeamSelect = screen.getByTestId("home-team-select");
    await user.selectOptions(homeTeamSelect, ["CHI"]);

    const awayTeamSelect = screen.getByTestId("away-team-select");
    await user.selectOptions(awayTeamSelect, ["MIN"]);

    const select = screen.getByTestId("scoring-preference-select");
    await user.selectOptions(select, ["Final score"]);

    const submitButton = screen.getByTestId("primary-button");
    await user.click(submitButton);

    const expectedResults: PeriodResult[] = [
      { period: "final", score: null, winner: null },
    ];

    expect(setTeamsInfo).toHaveBeenCalledWith(expectedTeams);
    expect(setHeaderNumbers).toHaveBeenCalledWith(expectedHeaderNumbers);
    expect(setResults).toHaveBeenCalledWith(expectedResults);
  });
});

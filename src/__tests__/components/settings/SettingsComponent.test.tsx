import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SettingsComponent from "../../../components/settings/SettingsComponent";
import { Context } from "../../../context/BoardStateContext";
import { GameStatus } from "../../../lib/enums";
import { BoardState, Player, SettingsBgGradients } from "../../../lib/interfaces";

describe("SettingsComponent", () => {
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();

  const gradients: SettingsBgGradients = {
    homeTeam: "",
    awayTeam: ""
  }

  test("Component renders", () => {
    const players = new Map<string, Player>();
    const setPlayers = jest.fn();
    const setTeamsInfo = jest.fn();
    const setHeaderNumbers = jest.fn();
    const setResults = jest.fn();
    const setBoardState = jest.fn();
    const boardState: BoardState = {
      gameStatus: GameStatus.NotStarted,
      displayHeaderNumbers: false,
      isConfigured: false,
    };

    render(
      <Context.Provider value={{ boardState, setBoardState }}>
        <SettingsComponent
          players={players}
          setPlayers={setPlayers}
          setTeamsInfo={setTeamsInfo}
          setHeaderNumbers={setHeaderNumbers}
          setResults={setResults}
          gradients={gradients}
        />
      </Context.Provider>
    );

    const component = screen.getByTestId("settings-component");
    expect(component).toBeInTheDocument();
  });

  test("Clicking the start button updates BoardState", async () => {
    const user = userEvent.setup();
    const players = new Map<string, Player>();
    const setPlayers = jest.fn();
    const setTeamsInfo = jest.fn();
    const setHeaderNumbers = jest.fn();
    const setResults = jest.fn();
    const setBoardState = jest.fn();
    const boardState: BoardState = {
      gameStatus: GameStatus.NotStarted,
      displayHeaderNumbers: false,
      isConfigured: true,
    };

    render(
      <Context.Provider value={{ boardState, setBoardState }}>
        <SettingsComponent
          players={players}
          setPlayers={setPlayers}
          setTeamsInfo={setTeamsInfo}
          setHeaderNumbers={setHeaderNumbers}
          setResults={setResults}
          gradients={gradients}
        />
      </Context.Provider>
    );

    const startButton = screen.getByTestId("start-button");
    await user.click(startButton);

    const expectedBoardState: BoardState = {
      gameStatus: GameStatus.Started,
      isConfigured: true,
      displayHeaderNumbers: true
    };

    expect(setBoardState).toHaveBeenCalledWith(expectedBoardState);
  });

  describe("Start button enablement", () => {
    test("Start button is disabled when configurations have not been set and game is not started", () => {
      const players = new Map<string, Player>();
      const setPlayers = jest.fn();
      const setTeamsInfo = jest.fn();
      const setHeaderNumbers = jest.fn();
      const setResults = jest.fn();
      const setBoardState = jest.fn();
      const boardState: BoardState = {
        gameStatus: GameStatus.NotStarted,
        displayHeaderNumbers: false,
        isConfigured: false,
      };

      render(
        <Context.Provider value={{ boardState, setBoardState }}>
          <SettingsComponent
            players={players}
            setPlayers={setPlayers}
            setTeamsInfo={setTeamsInfo}
            setHeaderNumbers={setHeaderNumbers}
            setResults={setResults}
            gradients={gradients}
          />
        </Context.Provider>
      );

      const startButton = screen.getByTestId("start-button");
      expect(startButton).toHaveAttribute("disabled");
    });

    test("Start button is enabled when configurations have been set and game is not started", () => {
      const players = new Map<string, Player>();
      const setPlayers = jest.fn();
      const setTeamsInfo = jest.fn();
      const setHeaderNumbers = jest.fn();
      const setResults = jest.fn();
      const setBoardState = jest.fn();
      const boardState: BoardState = {
        gameStatus: GameStatus.NotStarted,
        displayHeaderNumbers: false,
        isConfigured: true,
      };

      render(
        <Context.Provider value={{ boardState, setBoardState }}>
          <SettingsComponent
            players={players}
            setPlayers={setPlayers}
            setTeamsInfo={setTeamsInfo}
            setHeaderNumbers={setHeaderNumbers}
            setResults={setResults}
            gradients={gradients}
          />
        </Context.Provider>
      );
      
      const startButton = screen.getByTestId("start-button");
      expect(startButton).not.toHaveAttribute("disabled");
    });

    test("Start button is disabled when configurations have been set and game is started", () => {
      const players = new Map<string, Player>();
      const setPlayers = jest.fn();
      const setTeamsInfo = jest.fn();
      const setHeaderNumbers = jest.fn();
      const setResults = jest.fn();
      const setBoardState = jest.fn();
      const boardState: BoardState = {
        gameStatus: GameStatus.Started,
        displayHeaderNumbers: false,
        isConfigured: true,
      };

      render(
        <Context.Provider value={{ boardState, setBoardState }}>
          <SettingsComponent
            players={players}
            setPlayers={setPlayers}
            setTeamsInfo={setTeamsInfo}
            setHeaderNumbers={setHeaderNumbers}
            setResults={setResults}
            gradients={gradients}
          />
        </Context.Provider>
      );
      
      const startButton = screen.getByTestId("start-button");
      expect(startButton).toHaveAttribute("disabled");
    });
  });
});

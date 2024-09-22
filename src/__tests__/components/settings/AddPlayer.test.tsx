import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddPlayer from "../../../components/settings/AddPlayer";
import { Context } from "../../../context/BoardStateContext";
import { GameStatus } from "../../../lib/enums";
import { BoardState, Player } from "../../../lib/interfaces";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

interface Props {
  boardState: BoardState;
  players?: Map<string, Player>;
  setPlayers?: () => void;
  setBoardState?: () => void;
}

const setup = ({
  boardState,
  players = new Map<string, Player>(),
  setPlayers = jest.fn(),
  setBoardState = jest.fn(),
}: Props): void => {
  render(
    <Context.Provider value={{ boardState, setBoardState }}>
      <AddPlayer players={players} setPlayers={setPlayers} />
    </Context.Provider>
  );
};

describe("AddPlayer component", () => {
  test("Component render", () => {
    const boardState: BoardState = {
      gameStatus: GameStatus.NotStarted,
      displayHeaderNumbers: false,
      isConfigured: false,
    };

    setup({ boardState });

    const component = screen.getByTestId("add-player");
    expect(component).toBeInTheDocument();
  });

  test("Add Player click", async () => {
    const user = userEvent.setup();
    const boardState: BoardState = {
      gameStatus: GameStatus.NotStarted,
      displayHeaderNumbers: false,
      isConfigured: false,
    };
    const setPlayers = jest.fn();

    setup({ boardState, setPlayers });

    const addPlayerButton = screen.getByTestId("add-player-button");
    await user.click(addPlayerButton);
    const nameInput = screen.getByTestId("player-name-input");
    await user.type(nameInput, "Test");
    await user.keyboard("{Enter}");

    expect(setPlayers).toHaveBeenCalledTimes(1);
  });

  test("Adding a player with the same initials as an existing player does not overwrite the old one", async () => {
    const user = userEvent.setup();
    const players: Map<string, Player> = new Map();
    players.set("TU", { name: "Test User", initials: "TU" });
    const setPlayers = jest.fn();
    const boardState: BoardState = {
      gameStatus: GameStatus.NotStarted,
      displayHeaderNumbers: false,
      isConfigured: false,
    };

    setup({ boardState, players, setPlayers });

    const addPlayerButton = screen.getByTestId("add-player-button");
    await user.click(addPlayerButton);
    const nameInput = screen.getByTestId("player-name-input");
    await user.type(nameInput, "Test Usher");
    await user.keyboard("{Enter}");

    const expectedPlayers = new Map<string, Player>();
    expectedPlayers.set("TU", { name: "Test User", initials: "TU" });
    expectedPlayers.set("TU0", { name: "Test Usher", initials: "TU0" });

    expect(setPlayers).toHaveBeenCalledWith(expectedPlayers);
  });

  test("Close modal", async () => {
    const user = userEvent.setup();
    const boardState: BoardState = {
      gameStatus: GameStatus.NotStarted,
      displayHeaderNumbers: false,
      isConfigured: false,
    };

    setup({ boardState });

    const button = screen.getByTestId("add-player-button");
    await user.click(button);
    const closeButton = screen.getByTestId("primary-button");
    await user.click(closeButton);
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });

  test("Button is disabled once the game has started", () => {
    const boardState: BoardState = {
      gameStatus: GameStatus.Started,
      displayHeaderNumbers: false,
      isConfigured: false,
    };

    setup({ boardState });

    const button = screen.getByTestId("add-player-button");
    expect(button).toHaveAttribute("disabled");
  });
});

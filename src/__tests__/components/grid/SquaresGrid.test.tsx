import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SquaresGrid from "../../../components/grid/SquaresGrid";
import { Player, Square } from "../../../lib/interfaces";
import { generateSquaresArray } from "../../../lib/utils";

afterEach(() => {
  cleanup();
});

describe("SquaresGrid component", () => {
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
  
  const squares: Square[][] = generateSquaresArray(10, 10);
  const players: Map<string, Player> = new Map();
  players.set("TU", { name: "Test User", initials: "TU" });

  test("Component render", () => {
    const setSquares = jest.fn();

    render(
      <SquaresGrid
        squares={squares}
        setSquares={setSquares}
        players={players}
      />
    );
    const grid = screen.getByTestId("squares-grid");
    expect(grid).toBeInTheDocument();
  });

  test("Square click", async () => {
    const setSquares = jest.fn();
    const user = userEvent.setup();

    render(
      <SquaresGrid
        squares={squares}
        setSquares={setSquares}
        players={players}
      />
    );
    const squareCard = screen.getByTestId("square-card-row0-col0");
    await user.click(squareCard);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
  });

  test("Close modal", async () => {
    const setSquares = jest.fn();
    const user = userEvent.setup();
    
    render(
      <SquaresGrid
        squares={squares}
        setSquares={setSquares}
        players={players}
      />
    );

    const button = screen.getByTestId("square-card-row0-col0");
    await user.click(button);
    const closeButton = screen.getByTestId("secondary-button");
    await user.click(closeButton);
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });

  test("Assign square", async () => {
    const setSquares = jest.fn();
    const user = userEvent.setup();

    render(
      <SquaresGrid
        squares={squares}
        setSquares={setSquares}
        players={players}
      />
    );
    const squareCard = screen.getByTestId("square-card-row0-col0");
    await user.click(squareCard);

    // select player from drop-down and submit
    const playersSelect = screen.getByTestId("players-select");
    await user.selectOptions(playersSelect, ["TU"]);

    const primaryButton = screen.getByTestId("primary-button");
    await user.click(primaryButton);

    const testSquares: Square[][] = [...squares];
    testSquares[0][0].player = { name: "Test User", initials: "TU" };

    expect(setSquares).toHaveBeenCalledWith(testSquares);
  });
});

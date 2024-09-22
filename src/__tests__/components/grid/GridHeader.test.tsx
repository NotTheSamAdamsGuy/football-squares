import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";

import GridHeader from "../../../components/grid/GridHeader";
import { Context } from "../../../context/BoardStateContext";
import { GameStatus } from "../../../lib/enums";
import { BoardState, TeamBoardDetails } from "../../../lib/interfaces";

afterEach(() => {
  cleanup();
});

describe("GridHeader component", () => {
  const teamDetails: TeamBoardDetails = {
    location: "Test City",
    name: "Testers",
    abbreviation: "TC",
    banner: {
      bgColor: "",
      numbersBgColor: "",
      homeBgImage: "",
      awayBgImage: "",
      homeBgStyle: "",
      awayBgStyle: "",
      homeBgGradient: "",
      awayBgGradient: "",
    },
  };

  test("Component renders", () => {
    const setBoardState = jest.fn();
    const boardState: BoardState = {
      gameStatus: GameStatus.NotStarted,
      displayHeaderNumbers: false,
      isConfigured: false,
    };

    render(
      <Context.Provider value={{ boardState, setBoardState }}>
        <GridHeader
          teamDetails={teamDetails}
          type={"home"}
          numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        />
      </Context.Provider>
    );
    const headerEl = screen.getByTestId("home-header");
    expect(headerEl).toBeInTheDocument();
  });

  describe("Number visibility", () => {
    test("Hidden", () => {
      const setBoardState = jest.fn();
      const boardState: BoardState = {
        gameStatus: GameStatus.NotStarted,
        displayHeaderNumbers: false,
        isConfigured: false,
      };

      render(
        <Context.Provider value={{ boardState, setBoardState }}>
          <GridHeader
            teamDetails={teamDetails}
            type={"home"}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          />
        </Context.Provider>
      );
      const number = screen.getByTestId("home0");
      expect(number.innerHTML).toEqual("");
    });

    test("Visible", () => {
      const setBoardState = jest.fn();
      const boardState: BoardState = {
        gameStatus: GameStatus.Started,
        displayHeaderNumbers: true,
        isConfigured: false,
      };

      render(
        <Context.Provider value={{ boardState, setBoardState }}>
          <GridHeader
            teamDetails={teamDetails}
            type={"home"}
            numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          />
        </Context.Provider>
      );
      const number = screen.getByTestId("home0");
      expect(number.innerHTML).toEqual("0");
    });
  });
});

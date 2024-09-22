import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Scoreboard from "../../../components/scoreboard/Scoreboard";
import {
  HeaderNumbers,
  PeriodResult,
  Square,
  TeamsInfo,
} from "../../../lib/interfaces";
import { generateSquaresArray } from "../../../lib/utils";

afterEach(() => {
  cleanup();
});

describe("Scoreboard component", () => {
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();

  const teamsInfo: TeamsInfo = {
    homeTeam: {
      location: "Anytown",
      name: "Testers",
      abbreviation: "ANY",
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
    },
    awayTeam: {
      location: "Hometown",
      name: "Breakers",
      abbreviation: "HOM",
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
    },
  };

  const headerNumbers: HeaderNumbers = {
    home: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    away: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  };

  const squares = generateSquaresArray(10, 10);

  // add test user data into one of the squares
  const assignedSquare: Square = {
    player: {
      name: "Test User",
      initials: "TU",
    },
    highlights: [],
    row: 7,
    col: 8,
  };
  squares[7][8] = assignedSquare;

  function generateEmptyResults(numberOfPeriods: number) {
    let periodType = "q";
    const results: PeriodResult[] = [];

    if (numberOfPeriods === 2) {
      periodType = "h";
    } else if (numberOfPeriods === 1) {
      periodType = "final";
    }

    for (let i = 0; i < numberOfPeriods; i++) {
      const result: PeriodResult = {
        period: numberOfPeriods === 1 ? periodType : `${periodType}${i + 1}`,
        score: null,
        winner: null,
      };

      results.push(result);
    }

    return results;
  }

  test("Component renders", () => {
    const setResults = jest.fn();
    const setSquares = jest.fn();
    
    render(
      <Scoreboard
        results={[]}
        setResults={setResults}
        teamsInfo={teamsInfo}
        headerNumbers={headerNumbers}
        squares={squares}
        setSquares={setSquares}
      />
    );

    const scoreboard = screen.getByTestId("scoreboard");
    expect(scoreboard).toBeInTheDocument();
  });

  describe("The correct number of ScoreboardResult components is displayed", () => {
    const setResults = jest.fn();
    const setSquares = jest.fn();

    test("Four quarters", () => {
      const results: PeriodResult[] = generateEmptyResults(4);

      render(
        <Scoreboard
          results={results}
          setResults={setResults}
          teamsInfo={teamsInfo}
          headerNumbers={headerNumbers}
          squares={squares}
          setSquares={setSquares}
        />
      );

      const resultsContainer = screen.getByTestId("scoreboard").childNodes[0];
      expect(resultsContainer.childNodes.length).toEqual(4);
    });

    test("Two halves", () => {
      const results: PeriodResult[] = generateEmptyResults(2);

      render(
        <Scoreboard
          results={results}
          setResults={setResults}
          teamsInfo={teamsInfo}
          headerNumbers={headerNumbers}
          squares={squares}
          setSquares={setSquares}
        />
      );

      const resultsContainer = screen.getByTestId("scoreboard").childNodes[0];
      expect(resultsContainer.childNodes.length).toEqual(2);
    });

    test("One full", () => {
      const results: PeriodResult[] = generateEmptyResults(1);

      render(
        <Scoreboard
          results={results}
          setResults={setResults}
          teamsInfo={teamsInfo}
          headerNumbers={headerNumbers}
          squares={squares}
          setSquares={setSquares}
        />
      );

      const resultsContainer = screen.getByTestId("scoreboard").childNodes[0];
      expect(resultsContainer.childNodes.length).toEqual(1);
    });
  });

  test("Update scoreboard", async () => {
    const setResults = jest.fn();
    const setSquares = jest.fn();

    render(
      <Scoreboard
        results={generateEmptyResults(1)}
        setResults={setResults}
        teamsInfo={teamsInfo}
        headerNumbers={headerNumbers}
        squares={squares}
        setSquares={setSquares}
      />
    );

    // click on the add results button
    const addResultButton = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(addResultButton);

    // fill in the modal, then submit
    const homeTeamPointsInput = screen.getByTestId("home-team-points-input");
    const awayTeamPointsInput = screen.getByTestId("away-team-points-input");
    const submitButton = screen.getByTestId("primary-button");
    await user.type(homeTeamPointsInput, "7");
    await user.type(awayTeamPointsInput, "6");
    await user.click(submitButton);

    // verify the correct values were passed in set functions
    const result: PeriodResult = {
      period: "final",
      score: {
        homeTeam: {
          name: "Testers",
          points: 7,
        },
        awayTeam: {
          name: "Breakers",
          points: 6,
        },
      },
      winner: "",
    };

    expect(setResults).toHaveBeenCalledWith([result]);

    const updatedSquares: Square[][] = squares;
    const updatedSquare: Square = squares[7][8];
    updatedSquare.highlights.push("final");
    updatedSquares[7][8] = updatedSquare;

    expect(setSquares).toHaveBeenCalledWith(updatedSquares);
  });

  test("Negative numbers for score", async () => {
    const setResults = jest.fn();
    const setSquares = jest.fn();

    render(
      <Scoreboard
        results={generateEmptyResults(1)}
        setResults={setResults}
        teamsInfo={teamsInfo}
        headerNumbers={headerNumbers}
        squares={squares}
        setSquares={setSquares}
      />
    );

    // click on the add results button
    const addResultButton = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(addResultButton);

    // fill in the modal, then submit
    const homeTeamPointsInput = screen.getByTestId("home-team-points-input");
    const awayTeamPointsInput = screen.getByTestId("away-team-points-input");
    const submitButton = screen.getByTestId("primary-button");
    // await user.type(homeTeamPointsInput, "-1");
    homeTeamPointsInput.setAttribute('value', "-1"); // user.type isn't allowing minus signs to be entered
    await user.type(awayTeamPointsInput, "0");
    await user.click(submitButton);

    // verify the correct values were passed in set functions
    const result: PeriodResult = {
      period: "final",
      score: {
        homeTeam: {
          name: "Testers",
          points: 0,
        },
        awayTeam: {
          name: "Breakers",
          points: 0,
        },
      },
      winner: "",
    };

    expect(setResults).toHaveBeenCalledWith([result]);
  });
});

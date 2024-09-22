import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import ScoreboardResult from "../../../components/scoreboard/ScoreboardResult";
import { PeriodResult } from "../../../lib/interfaces";

describe("ScoreboardResult component", () => {
  const updateScores = jest.fn();
  const setSelectedPeriod = jest.fn();
  const setShowModal = jest.fn();

  test("Component renders", () => {
    const result: PeriodResult = {
      period: "q1",
      score: null,
      winner: null,
    };

    render(
      <ScoreboardResult
        result={result}
        updateScores={updateScores}
        homeTeamName={"Testers"}
        awayTeamName={"Breakers"}
        setSelectedPeriod={setSelectedPeriod}
        setShowModal={setShowModal}
      />
    );

    const componentEl = screen.getByTestId("q1-scoreboard-result");
    expect(componentEl).toBeInTheDocument();
  });

  test("Placeholder is rendered", () => {
    const result: PeriodResult = {
      period: "q1",
      score: null,
      winner: null,
    };
    
    render(
      <ScoreboardResult
        result={result}
        updateScores={updateScores}
        homeTeamName={"Testers"}
        awayTeamName={"Breakers"}
        setSelectedPeriod={setSelectedPeriod}
        setShowModal={setShowModal}
      />
    );

    const placeholder = screen.getByTestId("placeholder");
    expect(placeholder).toBeInTheDocument();
  });

  test("Result is rendered", () => {
    const result: PeriodResult = {
      period: "q1",
      score: {
        homeTeam: {
          name: "Testers",
          points: 7
        },
        awayTeam: {
          name: "Breakers",
          points: 6
        }
      },
      winner: "Test User",
    };
    
    render(
      <ScoreboardResult
        result={result}
        updateScores={updateScores}
        homeTeamName={"Testers"}
        awayTeamName={"Breakers"}
        setSelectedPeriod={setSelectedPeriod}
        setShowModal={setShowModal}
      />
    );

    const componentEl = screen.getByTestId("q1-scoreboard-result");
    const resultEl = screen.getByTestId("result");
    expect(resultEl).toBeInTheDocument();

    // make sure the scores are correct
    const homeTeamContainer = componentEl.childNodes[1].childNodes[0];
    const awayTeamContainer = componentEl.childNodes[1].childNodes[1];

    expect(homeTeamContainer.childNodes[0].textContent?.trim()).toEqual("Testers");
    expect(homeTeamContainer.childNodes[1].textContent?.trim()).toEqual("7");
    expect(awayTeamContainer.childNodes[0].textContent?.trim()).toEqual("Breakers");
    expect(awayTeamContainer.childNodes[1].textContent?.trim()).toEqual("6");
  });

  test("Add Result button click", async () => {
    const result: PeriodResult = {
      period: "q1",
      score: null,
      winner: null,
    };
    
    render(
      <ScoreboardResult
        result={result}
        updateScores={updateScores}
        homeTeamName={"Testers"}
        awayTeamName={"Breakers"}
        setSelectedPeriod={setSelectedPeriod}
        setShowModal={setShowModal}
      />
    );

    const addResultButton = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(addResultButton);
    expect(setSelectedPeriod).toHaveBeenCalledWith("q1");
    expect(setShowModal).toHaveBeenCalledWith(true);
  });
});

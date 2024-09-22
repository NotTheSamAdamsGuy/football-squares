import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import AddResultModal from "../../../components/scoreboard/AddResultModal";

describe("ScoreboardResultModal component", () => {
  const onSubmit = jest.fn();
  const onClose = jest.fn();
  const setHomeTeamPoints = jest.fn();
  const setAwayTeamPoints = jest.fn();

  test("Component renders", () => {
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
    
    render(
      <AddResultModal
        isOpen={true}
        onSubmit={onSubmit}
        onClose={onClose}
        homeTeamName={"Testers"}
        awayTeamName={"Breakers"}
        period={"q1"}
        homeTeamPoints={0}
        setHomeTeamPoints={setHomeTeamPoints}
        awayTeamPoints={0}
        setAwayTeamPoints={setAwayTeamPoints}
      />
    );

    const modal = screen.getByTestId("scoreboard-result-modal");
    expect(modal).toBeInTheDocument();
  });

  test("Submit scores", async () => {
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
    
    const user = userEvent.setup();
    render(
      <AddResultModal
        isOpen={true}
        onSubmit={onSubmit}
        onClose={onClose}
        homeTeamName={"Testers"}
        awayTeamName={"Breakers"}
        period={"q1"}
        homeTeamPoints={0}
        setHomeTeamPoints={setHomeTeamPoints}
        awayTeamPoints={0}
        setAwayTeamPoints={setAwayTeamPoints}
      />
    );

    // set the home and away team points, then click the submit button
    const homeTeamPoints = screen.getByTestId("home-team-points-input");
    await user.type(homeTeamPoints, '5');
    expect(setHomeTeamPoints).toHaveBeenCalledWith(5);

    const awayTeamPoints = screen.getByTestId("away-team-points-input");
    await user.type(awayTeamPoints, '4');
    expect(setAwayTeamPoints).toHaveBeenCalledWith(4);

    const submitButton = screen.getByTestId("primary-button");
    await user.click(submitButton);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test("Close modal", async () => {
    const user = userEvent.setup();
    render(
      <AddResultModal
        isOpen={true}
        onSubmit={onSubmit}
        onClose={onClose}
        homeTeamName={"Testers"}
        awayTeamName={"Breakers"}
        period={"q1"}
        homeTeamPoints={0}
        setHomeTeamPoints={setHomeTeamPoints}
        awayTeamPoints={0}
        setAwayTeamPoints={setAwayTeamPoints}
      />
    );

    const cancelButton = screen.getByTestId('secondary-button');
    await user.click(cancelButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

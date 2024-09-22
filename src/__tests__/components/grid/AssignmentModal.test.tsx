import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import AssignmentModal from "../../../components/grid/AssignmentModal";
import { Player, Square } from "../../../lib/interfaces";

describe("AssignmentModal component", () => {
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();

  test("Component renders", () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const players = new Map<string, Player>();
    const selectedSquare: Square = {
      player: { name: "", initials: "" },
      row: 0,
      col: 0,
      highlights: [],
    };
    render(
      <AssignmentModal
        isOpen={false}
        onClose={onClose}
        onSubmit={onSubmit}
        players={players}
        selectedSquare={selectedSquare}
      />
    );
    const component = screen.getByTestId("assignment-modal");
    expect(component).toBeInTheDocument();
  });

  test("Names are alphabetized", () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const players = new Map<string, Player>();
    players.set("TU", { name: "Test User", initials: "TU" });
    players.set("AT", { name: "Aaron Tester", initials: "AT" });
    players.set("AS", { name: "Alicia Smith", initials: "AS" });
    players.set("AT2", { name: "Aaron Tate", initials: "AT2" });

    const selectedSquare: Square = {
      player: { name: "", initials: "" },
      row: 0,
      col: 0,
      highlights: [],
    };

    render(
      <AssignmentModal
        isOpen={false}
        onClose={onClose}
        onSubmit={onSubmit}
        players={players}
        selectedSquare={selectedSquare}
      />
    );

    const playersOptions = screen.getByTestId("players-select").childNodes;
    expect(playersOptions).toHaveLength(5);
    expect(playersOptions[0].textContent).toEqual("None selected");
    expect(playersOptions[1].textContent).toEqual("Aaron Tate");
    expect(playersOptions[2].textContent).toEqual("Aaron Tester");
    expect(playersOptions[3].textContent).toEqual("Alicia Smith");
    expect(playersOptions[4].textContent).toEqual("Test User");
  });
});

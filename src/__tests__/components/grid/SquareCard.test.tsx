import "@testing-library/jest-dom";
import {
  render,
  screen,
  cleanup,
  fireEvent,
} from "@testing-library/react";

import SquareCard from "../../../components/grid/SquareCard";
import { Square } from "../../../lib/interfaces";

afterEach(() => {
  cleanup();
});

describe("SquareCard", () => {
  test("Component rendered", () => {
    const square: Square = {
      player: { name: "", initials: "" },
      row: 0,
      col: 0,
      highlights: [],
    };
    render(<SquareCard square={square} />);

    const component = screen.getByTestId("square-card-row0-col0");
    expect(component).toBeInTheDocument();
  });

  test("Displays no initials when a user is not assigned", () => {
    const square: Square = {
      player: { name: "", initials: "" },
      row: 0,
      col: 0,
      highlights: [],
    };
    render(<SquareCard square={square} />);
    const component = screen.getByTestId("square-card-row0-col0");
    expect(component.innerHTML).toEqual("");
  });

  test("Displays initials when a user is assigned", () => {
    const square: Square = {
      player: { name: "Test Player", initials: "TP" },
      row: 0,
      col: 0,
      highlights: [],
    };
    render(<SquareCard square={square} />);
    const component = screen.getByTestId("square-card-row0-col0");
    expect(component.innerHTML).toEqual("TP");
  });

  test("Executes the callback function when clicked", () => {
    const square: Square = {
      player: { name: "", initials: "" },
      row: 0,
      col: 0,
      highlights: [],
    };

    const onClick = jest.fn();
    render(<SquareCard square={square} onClick={onClick} />);
    const component = screen.getByTestId("square-card-row0-col0");
    fireEvent.click(component);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

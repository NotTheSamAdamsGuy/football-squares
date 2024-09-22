import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import HeaderNumber from "../../../components/grid/HeaderNumber";

describe("HeaderNumber component", () => {
  test("Component renders", () => {
    render(<HeaderNumber type="home" number={1} displayNumber={true} bgColor=""  />);
    const headerNumber = screen.getByTestId("home1");
    expect(headerNumber).toBeInTheDocument();
  });
});
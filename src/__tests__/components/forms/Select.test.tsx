import '@testing-library/jest-dom'
import { cleanup, render, screen } from "@testing-library/react";

import Select from '../../../components/forms/Select';

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe("Select tests", () => {
  const register = jest.fn();
  const errors = {};

  test("Select should render", () => {
    render(<Select id="test" label="test" register={register} errors={errors} />);
    const select = screen.getByTestId("select");
    expect(select).toBeInTheDocument();
  });

  describe("Styles", () => {
    test("Default style", () => {
      render(<Select id="test" label="test" register={register} errors={errors} />);
      const select = screen.getByTestId("select");
      expect(select).toHaveClass("border-2 p-2");
    });

    test("Additional styles", () => {
      render(<Select id="test" label="test" register={register} errors={errors} className="test-style" />);
      const select = screen.getByTestId("select");
      expect(select).toHaveClass("border-2 p-2 test-style");
    });
  });
});

import '@testing-library/jest-dom'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import Button from '../../../components/forms/Button';

// afterEach function runs after each test suite is executed
afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe("Button tests", () => {
  test("Button should render", () => {
    const onClick = jest.fn();
    render(<Button text="Button Text" onClick={onClick} />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
  });

  test("Button text", () => {
    const onClick = jest.fn();
    render(<Button text="Button Text" onClick={onClick} />);
    const button = screen.getByTestId("button");
    expect(button).toHaveTextContent("Button Text");
  });

  test("Button icon", () => {
    const onClick = jest.fn();
    render(<Button icon={faXmark} onClick={onClick} />);
    const button = screen.getByTestId("button");
    expect(button.childNodes[0]).toHaveAttribute("data-icon", "xmark");
  })

  test("Button click", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<Button text="" onClick={onClick} />);
    const button = screen.getByTestId("button");
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  describe("Button types", () => {
    const onClick = jest.fn();
    test("Default", () => {
      render(<Button text="Button Text" onClick={onClick} />);
      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute('type', 'button');
    });

    test("Reset", () => {
      render(<Button text="Button Text" type="reset" onClick={onClick} />);
      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute('type', 'reset');
    });
  
    test("Submit", () => {
      render(<Button text="Button Text" type="submit" onClick={onClick} />);
      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe("Button enabled/disabled", () => {
    test("Disabled", async () => {
      const onClick = jest.fn();
      const user = userEvent.setup();
      render(<Button text="Button Text" disabled={true} onClick={onClick} />);
      const button = screen.getByTestId("button");
      expect(button).toHaveAttribute("disabled");
      
      await user.click(button);
      expect(onClick).toHaveBeenCalledTimes(0);
    });

    test("Enabled", async () => {
      const onClick = jest.fn();
      const user = userEvent.setup();
      render(<Button text="Button Text" onClick={onClick} />);
      const button = screen.getByTestId("button");
      expect(button).not.toHaveAttribute("disabled");
      
      await user.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  })
});

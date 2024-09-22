import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import SettingsButton from "../../../components/settings/SettingsButton";
// import userEvent from "@testing-library/user-event";

describe("SettingsButton component", () => {
  const onClick = jest.fn();

  test("Component renders", () => {
    render(<SettingsButton onClick={onClick} type="test"/>);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
  });

  test("Add Player button", () => {
    render(<SettingsButton onClick={onClick} type="player" />);
    const button = screen.getByTestId("add-player-button");
    const icon = button.childNodes[0];
    expect(icon).toHaveAttribute("data-icon", "user");
  });

  test("Configuration button", () => {
    render(<SettingsButton onClick={onClick} type="config" />);
    const button = screen.getByTestId("configuration-controls-button");
    const icon = button.childNodes[0];
    expect(icon).toHaveAttribute("data-icon", "gear");
  });

  test("Info button", () => {
    render(<SettingsButton onClick={onClick} type="info" />);
    const button = screen.getByTestId("info-button");
    const icon = button.childNodes[0];
    expect(icon).toHaveAttribute("data-icon", "circle-info");
  });
});

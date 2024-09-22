import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ConfigurationModal from "../../../components/settings/ConfigurationModal";


beforeAll(() => {
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

afterEach(() => {
  cleanup();
});

describe("ConfigurationModal component", () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();

  test("Component render", () => {
    render(
      <ConfigurationModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    const modal = screen.getByTestId("configurations-modal");
    const title = screen.getByTestId("modal-title");
    expect(modal).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title.innerHTML.trim()).toEqual("Configurations");
  });

  test("onClose", async () => {
    const user = userEvent.setup();
    render(
      <ConfigurationModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    const xButton = screen.getByTestId('x-button');
    await user.click(xButton);

    const cancelButton = screen.getByTestId('secondary-button');
    await user.click(cancelButton);
    
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});

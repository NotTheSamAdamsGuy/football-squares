import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddPlayerModal from "../../../components/settings/AddPlayerModal";

beforeAll(() => {
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

afterEach(() => {
  cleanup();
});

describe("AddPlayerModal component", () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();
  const user = userEvent.setup();

  test("Component render", () => {
    render(
      <AddPlayerModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onSubmit}
        displayName=""
        showSuccessMessage={false}
      />
    );

    const form = screen.getByTestId("add-player-form");
    const title = screen.getByTestId("modal-title");
    expect(form).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title.innerHTML.trim()).toEqual("Add Players");
  });

  test("handleSubmit is called when user presses Enter", async () => {
    render(
      <AddPlayerModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onSubmit}
        displayName="Test"
        showSuccessMessage={false}
      />
    );

    const nameInput = screen.getByTestId("player-name-input");
    await user.type(nameInput, "Test");
    await user.keyboard('{Enter}');
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test("Success message is visible", () => {
    render(
      <AddPlayerModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onSubmit}
        displayName="Test"
        showSuccessMessage={true}
      />
    );

    const successMessage = screen.getByTestId("success-message");
    expect(successMessage).toHaveClass('opacity-100');
    
  });
});

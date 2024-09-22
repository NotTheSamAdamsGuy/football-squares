import "@testing-library/jest-dom";
import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react";

import BaseModal from "../../../components/modal/BaseModal";

beforeAll(() => {
  HTMLDialogElement.prototype.show = jest.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = true;
  });

  HTMLDialogElement.prototype.showModal = jest.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = true;
  });

  HTMLDialogElement.prototype.close = jest.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = false;
  });
});

afterEach(() => {
  cleanup();
});

describe("Base Modal", () => {
  test("Component render", async () => {
    render(
      <BaseModal
        isOpen={false}
        onClose={() => {
          return true;
        }}
        children={<div>child div</div>}
      />
    );
    const component = screen.getByTestId("base-modal");
    expect(component).toBeInTheDocument();

    await waitFor(() => {
      expect((screen.getByTestId("base-modal") as HTMLDialogElement).open).toBe(
        false
      );
    });
  });

  test("Title rendered", () => {
    render(
      <BaseModal
        isOpen={false}
        onClose={() => {
          return true;
        }}
        title="Test Title"
        children={<div>child div</div>}
      />
    );
    const component = screen.getByTestId("base-modal");
    const title = screen.getByTestId("modal-title");
    expect(component).toContainElement(title);
  });

  test("Close button", async () => {
    render(
      <BaseModal
        isOpen={true}
        onClose={() => {
          return true;
        }}
        title="Test Title"
        children={<div>child div</div>}
      />
    );
    const closeBtn = screen.getByTestId("x-button");

    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect((screen.getByTestId("base-modal") as HTMLDialogElement).open).toBe(
        false
      );
    });
  });

  test("Escape key press", async () => {
    render(
      <BaseModal
        isOpen={true}
        onClose={() => {
          return true;
        }}
        title="Test Title"
        children={<div>child div</div>}
      />
    );
    
    const component = screen.getByTestId("base-modal");
    fireEvent.keyDown(component, { key: 'Escape'});

    await waitFor(() => {
      expect((screen.getByTestId("base-modal") as HTMLDialogElement).open).toBe(
        false
      );
    });
  });
});

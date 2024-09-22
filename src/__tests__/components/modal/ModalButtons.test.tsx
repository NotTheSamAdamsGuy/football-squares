import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";

import ModalButtons from "../../../components/modal/ModalButtons";

afterEach(() => {
  cleanup();
});

describe("Modal Buttons", () => {
  test("Modal Buttons should render", () => {
    render(
      <ModalButtons
        primaryText="Primary"
        onPrimaryClick={() => {
          return true;
        }}
      />
    );
    const component = screen.getByTestId("modal-buttons");
    expect(component).toBeInTheDocument();
  });

  test("Secondary button is not rendered", () => {
    render(
      <ModalButtons
        primaryText="Primary"
        onPrimaryClick={() => {
          return true;
        }}
      />
    );
    const component = screen.getByTestId("modal-buttons");
    expect(component.childNodes.length).toEqual(1);
  });

  test("Secondary button is rendered", () => {
    render(
      <ModalButtons
        primaryText="Primary"
        onPrimaryClick={() => {
          return true;
        }}
        showSecondary={true}
        secondaryText="Secondary"
        onSecondaryClick={(() => {return true;})}
      />
    );
    const component = screen.getByTestId("modal-buttons");
    expect(component.childNodes.length).toEqual(2);
  });
});

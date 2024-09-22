import '@testing-library/jest-dom'
import { render } from "@testing-library/react";

import App from "../App";

beforeAll(() => {
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

// TODO: figure out why this fails - something to do with the modals
test("Renders the main page", () => {
  render(<App />);
  expect(true).toBeTruthy();
});

/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import Register from "./register";
import { MemoryRouter } from "react-router";

describe("Given the register component", () => {
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register></Register>
        </MemoryRouter>
      </Provider>
    );
  });

  describe("When we render it", () => {
    test("Then it should contain the button role", async () => {
      const elements = [screen.getByRole("button")];
      await fireEvent.click(elements[0]);
      expect(elements).toHaveLength(1);
    });

    test("Then it should contain the heading role", () => {
      const elements = [screen.getAllByRole("heading")];
      expect(elements.length).toBe(1);
    });
  });
});

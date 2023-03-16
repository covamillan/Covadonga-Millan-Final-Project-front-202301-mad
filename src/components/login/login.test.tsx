/* eslint-disable testing-library/no-render-in-setup */
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import Login from "./login";

describe("Given the Login component", () => {
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <Login></Login>
      </Provider>
    );
  });

  describe("When we render the component", () => {
    test("Then it should contain the 'button' role", async () => {
      const elements = [screen.getByRole("button")];
      await fireEvent.click(elements[0]);
    });

    test("Then it should contain the 'heading' role", () => {
      const elements = [screen.getAllByRole("heading")];
      expect(elements.length).toBe(1);
    });
  });
});

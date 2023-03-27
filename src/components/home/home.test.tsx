/* eslint-disable testing-library/no-unnecessary-act */
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { Cards } from "../cards/cards";
import { MemoryRouter } from "react-router-dom";
import Home from "./home";

jest.mock("../../hooks/usePets.ts");
jest.mock("../cards/cards");

describe("Given the home component", () => {
  describe("When it's rendered", () => {
    test("Then it should contain Home component", async () => {
      await act(async () => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              <Home />
            </MemoryRouter>
          </Provider>
        );
      });
      expect(Cards).toHaveBeenCalled();
    });
  });
});

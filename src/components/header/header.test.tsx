/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store/store";
import { Header } from "./header";
describe("Given the header component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </Provider>
      );
    });
  });
  describe("When its rendered", () => {
    test("Then it should contain the word", () => {
      const img = screen.getByAltText(/logout/i);
      expect(img).toBeInTheDocument();
    });
    test("Then it should contain role", () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });

    test("Then it should contain img role", () => {
      const element = screen.getAllByRole("img");
      expect(element).toHaveLength(2);
    });
  });
});

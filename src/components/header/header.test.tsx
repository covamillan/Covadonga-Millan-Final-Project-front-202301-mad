/* eslint-disable testing-library/no-render-in-setup */
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { WorkerStructure } from "../../models/worker";
import { workersReducer } from "../../reducer/workers/workers.slice";
import { store } from "../../store/store";
import { Header } from "./header";
describe("Given the header component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );
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
      expect(element).toHaveLength(1);
    });
  });
  describe("When there's a token", () => {
    const mockStore = configureStore({
      reducer: { workers: workersReducer },
      preloadedState: {
        workers: {
          workers: [],
          workerLogged: "token",
          worker: {} as WorkerStructure,
        },
      },
    });

    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Header></Header>
        </Provider>
      </MemoryRouter>
    );
    test("Then it should have a menu when logged", () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});

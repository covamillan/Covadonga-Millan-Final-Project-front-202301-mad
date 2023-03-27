/* eslint-disable testing-library/no-render-in-setup */
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { WorkerStructure } from "../../models/worker";
import { workersReducer } from "../../reducer/workers/workers.slice";
import { store } from "../../store/store";
import { Header } from "./header";
describe("Given the header component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  });
  describe("When its rendered", () => {
    test("Then it should contain the word", () => {
      const img = screen.getByAltText(/logo/i);
      expect(img).toBeInTheDocument();
    });
    test("Then it should contain role", () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });

    test("Then it should contain img role", () => {
      const element = screen.getByRole("img");
      expect(element).toBeInTheDocument();
    });

    test("Then it should have a menu when logged", () => {
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
        <Provider store={mockStore}>
          <Header></Header>
        </Provider>
      );
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});

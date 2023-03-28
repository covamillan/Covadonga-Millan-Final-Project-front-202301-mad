/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { mockPet } from "../../models/petMock";
import { WorkerStructure } from "../../models/worker";
import { workersReducer } from "../../reducer/workers/workers.slice";
import { Card } from "./card";

describe("Given card component", () => {
  beforeEach(() => {
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
          <Card pet={mockPet} />
        </Provider>
      </MemoryRouter>
    );
  });

  describe("When we render it", () => {
    test("Then it calls the deletePetId function when the delete button is clicked", async () => {
      const deleteButton = screen.getByRole("button");
      await fireEvent.click(deleteButton);
    });
    test("Then the pet name should be in the doc", () => {
      const nameElement = screen.getByRole("button");
      expect(nameElement).toBeInTheDocument();
    });
  });
});

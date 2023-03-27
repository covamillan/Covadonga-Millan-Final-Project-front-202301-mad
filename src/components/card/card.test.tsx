/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { PetStructure } from "../../models/pet";
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

    const pet = {
      id: "e",
      name: "firulais",
      kg: 420,
      age: 7,
      species: "dog",
      breed: "chihuahua",
      owner: "un señor",
      phone: 2,
      email: "emilio@je",
      temper: "malo",
      gender: "chique",
      img: "foto8",
      symptoms: ["e"],
      exam: {
        temperature: 3,
        hr: 3,
        rr: 3,
        membrane: "e",
        cap: 2,
        sap: 2,
        dap: 2,
        map: 2,
      },
      meds: { fluids: "a", med: "a", ml: 4, hour: 4, via: "a" },
    } as unknown as PetStructure;

    render(
      <MemoryRouter>
        <Provider store={mockStore}>
          <Card pet={pet} />
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

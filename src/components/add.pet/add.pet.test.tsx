/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, fireEvent, render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { usePets } from "../../hooks/usePets";
import { PetsRepo } from "../../services/pets/pet.repo";
import { store } from "../../store/store";

import AddPet from "./add.pet";
const mockParams = { id: "1" };
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => mockParams,
}));
jest.mock("../../hooks/usePets.ts");
jest.mock("../../firebase/firebase.pet.ts");

describe("Given the add pet component", () => {
  beforeEach(async () => {
    (usePets as jest.Mock).mockReturnValue({
      petsState: {
        pets: [
          {
            id: "1",
            name: "firulais",
          },
          {
            id: "1",
            name: "a",
          },
        ],
      },
      createNewPet: jest.fn(),
      updatePetId: jest.fn(),
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <AddPet />
          </MemoryRouter>
        </Provider>
      );
    });
  });
  describe("When we render the component and do an update", () => {
    const mockRepo = {
      createPetRepo: jest.fn(),
      updatePetRepo: jest.fn(),
    } as unknown as PetsRepo;
    test("Then it should contain the 'button' role", async () => {
      const elements = [screen.getByRole("button")];
      await fireEvent.click(elements[0]);
    });

    test("Then it should call update", async () => {
      await act(async () => {
        fireEvent.click(screen.getByRole("button"));
      });
      const { updatePetId } = usePets(mockRepo);
      expect(updatePetId).toHaveBeenCalledTimes(1);
    });

    test("Then it should contain the 'heading' role", () => {
      const elements = [screen.getAllByRole("heading")];
      expect(elements.length).toBe(1);
    });

    test("Then it should contain the 'textbox' role", () => {
      const elements = [screen.getAllByRole("textbox")];
      expect(elements.length).toBe(1);
    });
  });
});

describe("When we want to create a pet", () => {
  beforeEach(async () => {
    (usePets as jest.Mock).mockReturnValue({
      petsState: {
        pets: [{ id: "4" }],
      },
      createNewPet: jest.fn(),
      updatePetId: jest.fn(),
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <AddPet />
          </MemoryRouter>
        </Provider>
      );
    });
  });
  const mockRepo = {
    createPetRepo: jest.fn(),
    updatePetRepo: jest.fn(),
  } as unknown as PetsRepo;
  describe("When we render the component", () => {
    test("Then it should contain the 'button' role", async () => {
      const elements = [screen.getByRole("button")];
      await fireEvent.click(elements[0]);
    });

    test("Then it should call the create function", async () => {
      await act(async () => {
        fireEvent.click(screen.getByRole("button"));
      });
      const { createNewPet } = usePets(mockRepo);
      expect(createNewPet).toHaveBeenCalledTimes(1);
    });
  });
});

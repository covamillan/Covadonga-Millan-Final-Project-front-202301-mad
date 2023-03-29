/* eslint-disable testing-library/no-unnecessary-act */
import { configureStore } from "@reduxjs/toolkit";
import { screen, act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { usePets } from "../../hooks/usePets";
import { PetStructure } from "../../models/pet";
import { petsReducer } from "../../reducer/pets/pets.slice";
import { workersReducer } from "../../reducer/workers/workers.slice";
import { PetsRepo } from "../../services/pets/pet.repo";
import Details from "./details";
import { mockPetEmpty } from "../../models/pet.mock";

jest.mock("../../hooks/usePets.ts");
jest.mock("../../firebase/firebase.pet.ts");

let mockParams = { id: "1" };
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn().mockImplementation(() => ({})),
  useParams: () => mockParams,
}));

const mockRepo = {
  url: "testing",
  findPetRepo: jest.fn(),
  updatePetRepo: jest.fn(),
  findOwnerRepo: jest.fn(),
} as unknown as PetsRepo;
const mockStore = configureStore({
  reducer: {
    workers: workersReducer,
    pets: petsReducer,
  },
  preloadedState: {
    pets: {
      pet: mockPetEmpty,
      pets: [],
      actualPet: {} as PetStructure,
    },
  },
});

describe("Given the detail component", () => {
  beforeEach(async () => {
    (usePets as jest.Mock).mockReturnValue({
      petsState: {
        pet: [
          {
            id: "1",
            meds: "abrazos",
          },
        ],
        actualPet: { id: "1", meds: "besitos" },
      },
      updatePetId: jest.fn(),
      findPetId: jest.fn(),
      loadPets: jest.fn(),
      findPetOwner: jest.fn(),
    });

    await act(async () => {
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(
        <Provider store={mockStore}>
          <MemoryRouter>
            <Details />
          </MemoryRouter>
        </Provider>
      );
    });
  });
  describe("When we render it and do an update", () => {
    describe("When we render the component", () => {
      test('Then, the title "Details" should be in the document', () => {
        const element = screen.getAllByRole("heading");
        expect(element).toHaveLength(21);
      });
    });
  });

  describe("When we want to update the symptoms", () => {
    test("Then the symptoms will be updated", async () => {
      const elements = screen.getAllByRole("button");
      await act(async () => await userEvent.click(elements[2]));

      expect(usePets(mockRepo).updatePetId).toHaveBeenCalled();
    });
  });
  describe("When", () => {
    test("Then the symptoms will be updated", async () => {
      const elements = screen.getAllByRole("button");
      await act(async () => await userEvent.click(elements[0]));
    });
  });
  describe("When we load the pets", () => {
    test("Then the details will be showed", async () => {
      const elements = screen.getAllByRole("button");
      await act(async () => await userEvent.click(elements[1]));
    });
  });
});

/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { usePets } from "../../hooks/usePets";
import { PetsRepo } from "../../services/pets/pet.repo";
import { store } from "../../store/store";
import AddPet from "./add.pet";

const mockParams = { id: "id" };

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => mockParams,
}));
jest.mock("../../hooks/usePets.ts");

const mockRepo = {
  queryPetsRepo: jest.fn(),
  findPetRepo: jest.fn(),
  findOwnerRepo: jest.fn(),
  deletePetRepo: jest.fn(),
} as unknown as PetsRepo;

describe("Given the add test form", () => {
  let elements: HTMLElement[];

  describe("When we render it", () => {
    beforeEach(async () => {
      (usePets as jest.Mock).mockReturnValue({
        pets: [
          { id: "1", name: "firulais" },
          { id: "2", name: "chucho" },
        ],
        createPetRepo: jest.fn(),
        updatePetRepo: jest.fn(),
      });
      await act(async () => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              <AddPet></AddPet>
            </MemoryRouter>
          </Provider>
        );
      });
    });

    test("Then it should contain a button", async () => {
      const element = screen.getByRole("button");
      expect(element).toBeInTheDocument();
    });
  });
  describe("When ", () => {
    test("Then", async () => {
      elements = await screen.findAllByRole("button");
      await userEvent.click(elements[0]);
      expect(usePets(mockRepo).updatePetId).toHaveBeenCalled();
    });
  });
});

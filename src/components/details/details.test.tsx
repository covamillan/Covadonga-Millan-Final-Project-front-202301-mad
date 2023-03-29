/* eslint-disable testing-library/no-unnecessary-act */
import { screen, act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { usePets } from "../../hooks/usePets";
import { PetsRepo } from "../../services/pets/pet.repo";
import { store } from "../../store/store";
import Details from "./details";

jest.mock("../../hooks/usePets.ts");
jest.mock("../../firebase/firebase.pet.ts");

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
const mockParams = { id: "1" };

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
        <Provider store={store}>
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

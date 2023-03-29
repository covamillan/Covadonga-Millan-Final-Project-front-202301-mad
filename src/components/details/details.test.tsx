/* eslint-disable testing-library/no-unnecessary-act */
import { screen, act, fireEvent, render } from "@testing-library/react";
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
    });

    await act(async () => {
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
        const element = screen.getByRole("heading");
        expect(element).toBeInTheDocument();
      });
    });
    describe("When we want to update the info", () => {
      test("Then the info will be updated", async () => {
        const elements = screen.getAllByRole("button");
        await act(async () => await userEvent.click(elements[2]));

        expect(usePets(mockRepo).updatePetId).toHaveBeenCalled();
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

  describe("When we want to filter", () => {
    test("Then the owner's pets will appear", async () => {
      const elements = screen.getAllByRole("button");
      await act(async () => await userEvent.click(elements[3]));
      expect(usePets(mockRepo).findPetOwner).toHaveBeenCalled();
    });
  });
});

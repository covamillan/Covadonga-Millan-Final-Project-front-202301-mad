/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { usePets } from "../../hooks/usePets";
import { PetsRepo } from "../../services/pets/pet.repo";
import { store } from "../../store/store";
import AddSymptoms from "./symptoms.form";

jest.mock("../../hooks/usePets.ts");
jest.mock("../../firebase/firebase.pet.ts");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn().mockImplementation(() => ({})),
  useParams: () => mockParams,
}));

const mockParams = { id: "1" };
describe("Given the add symptoms component", () => {
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
            <AddSymptoms />
          </MemoryRouter>
        </Provider>
      );
    });
  });
  describe("When we render it and do an update", () => {
    const mockRepo = {
      updatePetRepo: jest.fn(),
    } as unknown as PetsRepo;
    test("Then it should contain a button", async () => {
      const elements = [screen.getByRole("button")];
      await fireEvent.click(elements[0]);
    });
    test("Then it should contain a textbox", () => {
      const elements = [screen.getAllByRole("textbox")];
      expect(elements.length).toBe(1);
    });
    test("Then it should contain a heading", () => {
      const elements = [screen.getAllByRole("heading")];
      expect(elements.length).toBe(1);
    });
    test("Then it should call update function", async () => {
      await act(async () => {
        fireEvent.click(screen.getByRole("button"));
      });
      const { updatePetId } = usePets(mockRepo);
      expect(updatePetId).toHaveBeenCalledTimes(1);
    });
  });
});

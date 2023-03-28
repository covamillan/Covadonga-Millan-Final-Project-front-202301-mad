/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { usePets } from "../../hooks/usePets";
import { PetsRepo } from "../../services/pets/pet.repo";
import { store } from "../../store/store";
import AddSymptoms from "./symptoms.form";

const mockParams = { id: "1" };
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useParams: () => mockParams,
  useNavigate: () => jest.fn().mockImplementation(() => ({})),
}));
jest.mock("../../hooks/usePets.ts");
jest.mock("../../firebase/firebase.pet.ts");

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
  describe("When we render the component and do an update", () => {
    const mockRepo = {
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

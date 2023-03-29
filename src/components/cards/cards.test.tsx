import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store/store";
import { Cards } from "./cards";

jest.mock("../../hooks/usePets.ts");
jest.mock("../../services/pets/pet.repo");

describe("Cards component", () => {
  test("renders correct number of dogs and cats", async () => {
    const mockPets = {
      pets: [
        { id: "1", name: "Buddy", species: "Dog" },
        { id: "2", name: "Simba", species: "Cat" },
        { id: "3", name: "Max", species: "Dog" },
        { id: "4", name: "Luna", species: "Cat" },
      ],
      actualPet: null,
    };

    jest.spyOn(require("../../hooks/usePets"), "usePets").mockReturnValue({
      petsState: mockPets,
      loadPets: jest.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cards />
        </MemoryRouter>
      </Provider>
    );

    const dogSection = screen.getByRole("heading", { name: /Dogs - 2/i });
    expect(dogSection).toBeInTheDocument();

    const catSection = screen.getByRole("heading", { name: /Cats - 2/i });
    expect(catSection).toBeInTheDocument();
  });
});

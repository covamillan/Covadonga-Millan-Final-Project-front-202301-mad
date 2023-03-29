/* eslint-disable testing-library/no-render-in-setup */
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Cards } from "./cards";
import { render, screen } from "@testing-library/react";
import { store } from "../../store/store";
import { mockPet } from "../../models/pet.mock";
import { PetStructure } from "../../models/pet";

const mockPet2 = {
  id: "d",
  name: "sdada",
  kg: 42340,
  age: 734,
  species: "cat",
  breed: "ffsdf",
  owner: "un",
  phone: 2,
  email: "dfg@je",
  temper: "mafdglo",
  gender: "chigdque",
  img: "dgfg",
  symptoms: "e",
  temperature: 3,
  hr: 3,
  rr: 3,
  membrane: "e",
  cap: 22,
  sap: 21,
  dap: 23,
  map: 2,
  fluids: "a",
  meds: "aff",
  ml: 4,
  hour: 42,
  via: "a",
};

jest.mock("../card/card.tsx");
jest.mock("../../hooks/usePets", () => ({
  usePets: () => ({
    petsState: {
      pets: [mockPet, mockPet2] as unknown as PetStructure,
    },
    loadPets: jest.fn(),
  }),
}));

describe("Given cards component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cards />
        </MemoryRouter>
      </Provider>
    );
  });

  describe("When we render it", () => {
    test("Then the pet name should be in the doc", () => {
      const heading = screen.getAllByRole("heading");
      expect(heading).toHaveLength(9);
    });

    test("Then the dogs section should be in the doc", () => {
      const dogsSection = screen.getByRole("heading", { name: /dogs -/i });
      expect(dogsSection).toBeInTheDocument();
    });

    test("Then the cats section should be in the doc", () => {
      const catsSection = screen.getByRole("heading", { name: /cats -/i });
      expect(catsSection).toBeInTheDocument();
    });
  });
});

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Cards } from "./cards";
import { render, screen } from "@testing-library/react";
import { store } from "../../store/store";

jest.mock("../../hooks/usePets", () => ({
  usePets: () => ({
    petsState: {
      pets: [
        {
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
        },
        {
          id: "f",
          name: "michi",
          kg: 360,
          age: 2,
          species: "cat",
          breed: "siames",
          owner: "otro señor",
          phone: 5,
          email: "emilio@noje",
          temper: "malo",
          gender: "chique",
          img: "foto9",
          symptoms: ["e"],
          exam: {
            temperature: 3,
            hr: 3,
            rr: 3,
            membrane: "e",
            cap: 2,
            sap: 2342,
            dap: 2,
            map: 342,
          },
          meds: { fluids: "avxc", med: "da", ml: 4, hour: 4, via: "afds" },
        },
      ],
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
      expect(heading).toHaveLength(11);
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

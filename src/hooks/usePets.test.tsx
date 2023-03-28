/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { configureStore } from "@reduxjs/toolkit";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { PetStructure } from "../models/pet";
import { WorkerStructure } from "../models/worker";
import { workersReducer } from "../reducer/workers/workers.slice";
import { PetsRepo } from "../services/pets/pet.repo";
import { store } from "../store/store";
import { usePets } from "./usePets";

describe("Given usePets hook", () => {
  let mockPayload: PetStructure;
  let mockRepo: PetsRepo;

  const mockStore = configureStore({
    reducer: { workers: workersReducer },
    preloadedState: {
      workers: {
        workers: [],
        workerLogged: "token",
        worker: {} as WorkerStructure,
      },
    },
  });

  beforeEach(async () => {
    mockPayload = {
      name: "string",
      kg: 3,
      age: 3,
      species: "string",
      breed: "string",
      owner: "string",
      phone: 9,
      email: "string",
      temper: "string",
      gender: "string",
      img: "string",
    } as unknown as PetStructure;

    mockRepo = {
      queryPetsRepo: jest.fn(),
      findPetRepo: jest.fn(),
      findOwnerRepo: jest.fn(),
      createPetRepo: jest.fn(),
      updatePetRepo: jest.fn(),
      deletePetRepo: jest.fn(),
    } as unknown as PetsRepo;

    const TestComponent = function () {
      const {
        loadPets,
        findPetId,
        findPetOwner,
        createNewPet,
        updatePetId,
        deletePetId,
      } = usePets(mockRepo);

      return (
        <>
          <button onClick={() => loadPets()}>load</button>
          <button onClick={() => findPetId("id")}>find</button>
          <button onClick={() => findPetOwner("owner")}>find owner</button>
          <button onClick={() => createNewPet(mockPayload)}>create</button>
          <button onClick={() => updatePetId("id", mockPayload)}>update</button>
          <button onClick={() => deletePetId("id")}>delete</button>
        </>
      );
    };

    await act(async () =>
      render(
        <Provider store={mockStore}>
          <TestComponent></TestComponent>
        </Provider>
      )
    );
  });

  describe("When we render it", () => {
    test("Then it has to be a button", async () => {
      const elements = await screen.findAllByRole("button");
      expect(elements[0]).toBeInTheDocument();
      expect(elements[1]).toBeInTheDocument();
      expect(elements[2]).toBeInTheDocument();
      expect(elements[3]).toBeInTheDocument();
      expect(elements[4]).toBeInTheDocument();
      expect(elements[5]).toBeInTheDocument();
    });
  });

  describe("When we use the load pets function", () => {
    test("Then the function should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[0]));
      expect(mockRepo.queryPetsRepo).toHaveBeenCalled();
    });
  });

  describe("When we use the find pet by id function", () => {
    test("Then the function should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[1]));
      expect(mockRepo.findPetRepo).toHaveBeenCalled();
    });
  });

  describe("When we use the find pet by owner function", () => {
    test("Then the function should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[2]));
      expect(mockRepo.findOwnerRepo).toHaveBeenCalled();
    });
  });

  describe("When we use the create new pet function", () => {
    test("Then the function should be called", async () => {
      const elements = await screen.findAllByRole("button");
      fireEvent.click(elements[3]);
      const data = await mockRepo.createPetRepo("Token", mockPayload);
      expect(data).toHaveBeenCalled();
    });
  });

  describe("When we use the update pet function", () => {
    test("Then the function should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[4]));
      expect(mockRepo.updatePetRepo).toHaveBeenCalled();
    });
  });

  describe("When we use the delete pet function", () => {
    test("Then the function should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[5]));
      expect(mockRepo.deletePetRepo).toHaveBeenCalled();
    });
  });

  describe("When we do not have a valid token", () => {
    beforeEach(async () => {
      const TestComponent = function () {
        const {
          loadPets,
          findPetId,
          findPetOwner,
          createNewPet,
          updatePetId,
          deletePetId,
        } = usePets(mockRepo);

        mockStore.getState().workers.workerLogged = "";

        return (
          <>
            <button onClick={() => loadPets()}>loadPet</button>
            <button onClick={() => findPetId("id")}>findPet</button>
            <button onClick={() => findPetOwner("owner")}>
              find pet owner
            </button>
            <button onClick={() => createNewPet(mockPayload)}>createPet</button>
            <button onClick={() => updatePetId("id", mockPayload)}>
              updatePet
            </button>
            <button onClick={() => deletePetId("id")}>deletePet</button>
          </>
        );
      };

      await act(async () =>
        render(
          <Provider store={store}>
            <TestComponent></TestComponent>
          </Provider>
        )
      );
    });

    test("Then load pets should throw an error", async () => {
      const spyLog = jest.spyOn(console, "log");
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[0]));
      expect(spyLog).toHaveBeenCalled();
    });

    test("Then load pet by id should throw an error", async () => {
      const spyLog = jest.spyOn(console, "log");
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[1]));
      expect(spyLog).toHaveBeenCalled();
    });

    test("Then load pet by owner should throw an error", async () => {
      const spyLog = jest.spyOn(console, "log");
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[2]));
      expect(spyLog).toHaveBeenCalled();
    });

    test("Then create should throw an error", async () => {
      const spyLog = jest.spyOn(console, "log");
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[3]));
      expect(spyLog).toHaveBeenCalled();
    });

    test("Then update should throw an error", async () => {
      const spyLog = jest.spyOn(console, "log");
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[4]));
      expect(spyLog).toHaveBeenCalled();
    });

    test("Then delete should throw an error", async () => {
      const spyLog = jest.spyOn(console, "log");
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[5]));
      expect(spyLog).toHaveBeenCalled();
    });
  });
});

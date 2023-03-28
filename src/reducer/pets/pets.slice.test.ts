import { PayloadAction } from "@reduxjs/toolkit";
import { mockPet, mockPets } from "../../models/pet.mock";
import { PetStructure } from "../../models/pet";
import { petsReducer, State } from "./pets.slice";

const mockInitialState: State = {
  pet: {} as PetStructure,
  pets: [],
};

const mockFullInitialState = {
  pets: mockPets,
} as unknown as State;

describe("Given pet slice", () => {
  describe("When we use the query pet method", () => {
    test("Then it should return the payload", () => {
      const mockQuery: PayloadAction<PetStructure[]> = {
        type: "pet/queryPets",
        payload: mockPets,
      };
      const result = petsReducer(mockInitialState, mockQuery);
      expect(result.pets).toEqual(mockQuery.payload);
    });
  });

  describe("When we use the find pet method", () => {
    test("Then it should return a payload", () => {
      const mockFind: PayloadAction<PetStructure["id"]> = {
        type: "pet/findPet",
        payload: "e",
      };
      const result = petsReducer(mockFullInitialState, mockFind);
      expect(result.pets[0]["id"]).toEqual(mockFind.payload);
    });
  });

  describe("When we use the find by owner method", () => {
    test("Then it should return a payload", () => {
      const mockFindOwner: PayloadAction<PetStructure["owner"]> = {
        type: "pet/findOwner",
        payload: "un señor",
      };
      const result = petsReducer(mockFullInitialState, mockFindOwner);
      expect(result.pets).toEqual(mockFindOwner.payload);
    });
  });

  describe("When we use the create pet method", () => {
    test("Then it should return a payload", () => {
      const mockCreate: PayloadAction<PetStructure> = {
        type: "pet/createPet",
        payload: mockPet,
      };
      const result = petsReducer(mockInitialState, mockCreate);
      expect(result.pets[0]).toBe(mockCreate.payload);
    });
  });

  describe("When we use the update pet method", () => {
    test("Then it should return a payload", () => {
      const mockUpdate: PayloadAction<PetStructure> = {
        type: "pet/updatePet",
        payload: {
          id: "e",
          name: "chencho",
          kg: 420,
          age: 7,
          species: "dog",
          breed: "chihuahua",
          owner: "un señor",
          phone: 4,
          email: "emilio@je",
          temper: "malo",
          gender: "chique",
          img: "foto",
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
      };
      const result = petsReducer(mockFullInitialState, mockUpdate);
      expect(result.pets[0]).toEqual(mockUpdate.payload);
    });
  });

  describe("When we use the delete pet method", () => {
    test("Then it should return a payload", () => {
      const mockDelete: PayloadAction<PetStructure["id"]> = {
        type: "pet/deletePet",
        payload: "e",
      };
      const result = petsReducer(mockFullInitialState, mockDelete);
      expect(result.pets[0]).toEqual(mockFullInitialState.pets[1]);
    });
  });
});

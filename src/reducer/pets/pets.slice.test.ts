import { PayloadAction } from "@reduxjs/toolkit";
import { mockPet, mockPets } from "../../models/pet.mock";
import { PetStructure } from "../../models/pet";
import { petsReducer, State } from "./pets.slice";

const mockInitialState: State = {
  pet: {} as PetStructure,
  pets: [],
  actualPet: {} as PetStructure,
};

const mockFullInitialState = {
  pets: mockPets,
  pet: {} as PetStructure,
  actualPet: {} as PetStructure,
} as unknown as State;

describe("Given pet slice", () => {
  describe("When we use the query pet method", () => {
    test("Then it should return the payload", () => {
      const mockQuery: PayloadAction<PetStructure> = {
        type: "pet/queryPets",
        payload: mockPet,
      };
      const result = petsReducer(mockInitialState, mockQuery);
      expect(result.pets).toEqual(mockQuery.payload);
    });
  });

  describe("When we use the find pet method", () => {
    test("Then it should return a payload", () => {
      const mockFind: PayloadAction<PetStructure> = {
        type: "pet/findPet",
        payload: mockPet,
      };
      const result = petsReducer(mockFullInitialState, mockFind);
      expect(mockPet).toEqual(mockFind.payload);
    });
  });

  describe("When we use the find by owner method", () => {
    test("Then it should return a payload", () => {
      const mockFindOwner: PayloadAction<PetStructure["owner"]> = {
        type: "pet/findOwner",
        payload: "u",
      };
      const result = petsReducer(mockFullInitialState, mockFindOwner);
      expect(result.pets[0]).toEqual(mockFindOwner.payload);
    });
  });

  describe("When we use the update method", () => {
    test("Then it should return a payload", () => {
      const mockUpdate: PayloadAction<PetStructure> = {
        type: "pet/updatePet",
        payload: mockPets[0],
      };
      const result = petsReducer(mockFullInitialState, mockUpdate);
      expect(result.pets[0]).toEqual(mockUpdate.payload);
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

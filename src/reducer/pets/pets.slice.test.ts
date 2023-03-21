import { PayloadAction } from "@reduxjs/toolkit";
import { PetStructure } from "../../models/pet";
import { petsReducer, State } from "./pets.slice";

const mockPet = {
  id: "e",
  name: "firulais",
  kg: 420,
  age: 7,
  species: "dog",
  breed: "chihuahua",
  owner: "un señor",
  phone: [2, 1],
  email: "emilio@je",
  temper: "malo",
  gender: "chique",
  img: "foto8",
};

const mockPets = [
  {
    id: "e",
    name: "firulais",
    kg: 420,
    age: 7,
    species: "dog",
    breed: "chihuahua",
    owner: "un señor",
    phone: [2, 1],
    email: "emilio@je",
    temper: "malo",
    gender: "chique",
    img: "foto3",
  },
  {
    id: "o",
    name: "chucho",
    kg: 42,
    age: 8,
    species: "dog",
    breed: "chihuahua",
    owner: "una señora",
    phone: [2, 1],
    email: "emilio@je",
    temper: "malo",
    gender: "chique",
    img: "foto4",
  },
];

const mockInitialState: State = {
  pet: {} as PetStructure,
  pets: [],
};

const mockFullInitialState = {
  pets: [
    {
      id: "e",
      name: "pepe",
      kg: 40,
      age: 3,
      species: "cat",
      breed: "european",
      owner: "un señor",
      phone: [0, 2],
      email: "emilio@je",
      temper: "malo",
      gender: "chique",
      img: "foto1",
    },

    {
      id: "o",
      name: "chucho",
      kg: 42,
      age: 8,
      species: "dog",
      breed: "border collie",
      owner: "una señora",
      phone: [2, 1],
      email: "emilio@je",
      temper: "malo",
      gender: "señoro",
      img: "foto2",
    },
  ],
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
      const mockFind: PayloadAction<PetStructure> = {
        type: "pet/findPet",
        payload: mockPet,
      };
      const result = petsReducer(mockInitialState, mockFind);
      expect(result.pet).toEqual(mockFind.payload);
    });
  });

  describe("When we use the find by owner method", () => {
    test("Then it should return a payload", () => {
      const mockFindOwner: PayloadAction<PetStructure["owner"]> = {
        type: "pet/findOwner",
        payload: "un señor",
      };
      const result = petsReducer(mockFullInitialState, mockFindOwner);
      expect(result.pets[0]["owner"]).toEqual(mockFindOwner.payload);
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
          phone: [2, 1],
          email: "emilio@je",
          temper: "malo",
          gender: "chique",
          img: "foto",
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

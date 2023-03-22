import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PetStructure } from "../../models/pet";

export type State = {
  pets: PetStructure[];
  pet: PetStructure;
};

const initialState: State = {
  pets: [],
  pet: {} as PetStructure,
};

export const petsSlice = createSlice({
  name: "pet",
  initialState,

  reducers: {
    queryPets(state, action: PayloadAction<PetStructure[]>) {
      state.pets = action.payload;
    },

    findPet(state, action: PayloadAction<PetStructure["id"]>) {
      const actualData = [...state.pets];
      state.pets = actualData.filter((item) => item.id === action.payload);
    },

    findOwner(state, action: PayloadAction<PetStructure[]>) {
      state.pets = action.payload;
    },

    createPet(state, action: PayloadAction<PetStructure>) {
      state.pets = [...state.pets, action.payload];
    },

    updatePet(state, action: PayloadAction<PetStructure>) {
      const actualData = [...state.pets];
      state.pets = actualData.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },

    deletePet(state, action: PayloadAction<PetStructure["id"]>) {
      const actualData = [...state.pets];
      state.pets = actualData.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  queryPets,
  findPet,
  findOwner,
  createPet,
  updatePet,
  deletePet,
} = petsSlice.actions;
export const petsReducer = petsSlice.reducer;

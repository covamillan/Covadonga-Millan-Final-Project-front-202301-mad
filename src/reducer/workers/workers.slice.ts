import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkerStructure } from "../../models/worker";

export type State = {
  workerLogged: string;
  workers: WorkerStructure[];
  worker: WorkerStructure;
};

const initialState: State = {
  workerLogged: "",
  workers: [],
  worker: {} as WorkerStructure,
};

export const workersSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {
    register(state, action: PayloadAction<WorkerStructure>) {
      state.workers = [...state.workers, action.payload];
    },
    login(state, action: PayloadAction<string>) {
      state.workerLogged = action.payload;
    },
  },
});

export const { register, login } = workersSlice.actions;

export const workersReducer = workersSlice.reducer;

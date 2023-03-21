import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkerStructure } from "../../models/worker";

export type State = {
  workerLogged: WorkerStructure;
  workers: WorkerStructure[];
};

const initialState: State = {
  workerLogged: {} as WorkerStructure,
  workers: [],
};

export const workersSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {
    register(state, action: PayloadAction<WorkerStructure>) {
      state.workers = [...state.workers, action.payload];
    },
    login(state, action: PayloadAction<WorkerStructure>) {
      state.workerLogged = action.payload;
    },
  },
});

export const { register, login } = workersSlice.actions;

export const workersReducer = workersSlice.reducer;

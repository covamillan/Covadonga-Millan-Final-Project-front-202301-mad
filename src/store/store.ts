import { configureStore } from "@reduxjs/toolkit";
import { petsReducer } from "../reducer/pets/pets.slice";
import { workersReducer } from "../reducer/workers/workers.slice";

export const store = configureStore({
  reducer: {
    workers: workersReducer,
    pets: petsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

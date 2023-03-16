import { configureStore } from "@reduxjs/toolkit";
import { workerReducer } from "../reducer/workers/workers.slice";

export const store = configureStore({
  reducer: {
    workers: workerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

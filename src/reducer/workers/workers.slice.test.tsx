import { Action, PayloadAction } from "@reduxjs/toolkit";
import { WorkerStructure } from "../../models/worker";
import { workersReducer, State } from "./workers.slice";

const secretWord = "password";
const mockWorker = {
  id: "id",
  email: "email",
  password: secretWord,
};

const mockInitialState: State = {
  workerLogged: {} as WorkerStructure,
  workers: [],
  worker: {} as WorkerStructure,
};
describe("Given worker slice", () => {
  describe("When we use the register method", () => {
    test("Then it should return the payload", () => {
      const mockRegister: PayloadAction<WorkerStructure> = {
        type: "worker/register",
        payload: mockWorker,
      };
      const result = workersReducer(mockInitialState, mockRegister);
      expect(result).toEqual({
        workerLogged: {} as WorkerStructure,
        workers: [mockWorker],
        worker: {},
      });
    });
  });
  describe("When we use the login method", () => {
    test("Then it should return a payload", () => {
      const mockLogin: PayloadAction<WorkerStructure> = {
        type: "worker/login",
        payload: mockWorker,
      };
      const result = workersReducer(mockInitialState, mockLogin);
      expect(result.workerLogged).toBe(mockWorker);
    });
  });
});

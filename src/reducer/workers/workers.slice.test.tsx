import { PayloadAction } from "@reduxjs/toolkit";
import { WorkerStructure } from "../../models/worker";
import { workerReducer, State } from "./workers.slice";

const secretWord = "password";
const mockWorker = {
  id: "id",
  email: "email",
  password: secretWord,
};

const mockInitialState: State = {
  workerLogged: {} as WorkerStructure,
  workers: [],
};
describe("Given user slice", () => {
  describe("When we use the register method", () => {
    test("Then it should return the payload", () => {
      const mockRegister: PayloadAction<WorkerStructure> = {
        type: "worker/register",
        payload: mockWorker,
      };
      const result = workerReducer(mockInitialState, mockRegister);
      expect(result).toEqual({
        workerLogged: {} as WorkerStructure,
        workers: [mockWorker],
      });
    });
  });
  describe("When we use the login method", () => {
    test("Then it should return a payload", () => {
      const mockLogin: PayloadAction<WorkerStructure> = {
        type: "worker/login",
        payload: mockWorker,
      };
      const result = workerReducer(mockInitialState, mockLogin);
      expect(result.workerLogged).toBe(mockWorker);
    });
  });
});

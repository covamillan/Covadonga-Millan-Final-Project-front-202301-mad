/* eslint-disable testing-library/no-render-in-setup */
import { act, fireEvent, render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { WorkerStructure } from "../models/worker";
import { WorkersRepo } from "../services/workers/workers.repo";
import { store } from "../store/store";
import { useWorkers } from "./useWorkers";

describe("Given the useWorkers hook", () => {
  let mockPayload: WorkerStructure;
  let mockRepo: WorkersRepo;

  beforeEach(async () => {
    mockPayload = {
      username: "epa",
      email: "epa@epa",
    } as unknown as WorkerStructure;

    mockRepo = {
      create: jest.fn(),
      update: jest.fn(),
    } as unknown as WorkersRepo;

    const TestComponent = function () {
      const { workerRegister, workerLogin } = useWorkers(mockRepo);

      return (
        <>
          <button onClick={() => workerRegister(mockPayload)}>register</button>
          <button onClick={() => workerLogin(mockPayload)}>login</button>
        </>
      );
    };
    await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TestComponent></TestComponent>
          </MemoryRouter>
        </Provider>
      )
    );
  });

  describe("When it's rendered", () => {
    test("Then it has to have a button", async () => {
      const elements = await screen.findAllByRole("button");
      expect(elements[0]).toBeInTheDocument();
    });
  });

  describe("When you click the register button", () => {
    test("Then workerRegister function should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await fireEvent.click(elements[0]);
      expect(mockRepo.create).toHaveBeenCalled();
    });
  });

  describe("When you click the login button", () => {
    test("Then workerLogin function should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await fireEvent.click(elements[1]);
      expect(mockRepo.update).toHaveBeenCalled();
    });
  });
});

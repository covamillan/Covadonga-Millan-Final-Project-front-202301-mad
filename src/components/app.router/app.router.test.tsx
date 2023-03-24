/* eslint-disable testing-library/no-render-in-setup */
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { store } from "../../store/store";
import { AppRouter } from "./app.router";

describe("Given the App router component", () => {
  const listPaths = (number: number) => {
    render(
      <Provider store={store}>
        <Router
          initialEntries={["/", "/login", "/register", "/add-pet"]}
          initialIndex={number}
        >
          <AppRouter></AppRouter>
        </Router>
      </Provider>
    );
  };

  describe("When rendering and the path is '/'", () => {
    test("Then the role 'textbox' should be in the document", async () => {
      await waitFor(async () => listPaths(0));
      const element = await screen.findAllByRole("heading");
      expect(element.length).toBe(2);
    });
  });

  describe("When rendering and the path is '/login'", () => {
    test("Then the role 'heading' should be in the document two times", async () => {
      await waitFor(async () => listPaths(1));
      const element = await screen.findAllByRole("heading");
      expect(element.length).toBe(2);
    });
  });

  describe("When rendering and the path is '/register'", () => {
    test("Then the role 'textbox' should be in the document", async () => {
      await waitFor(async () => listPaths(2));
      const element = await screen.findByRole("textbox");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When rendering and the path is '/add-pet'", () => {
    test("Then the role 'textbox' should be in the document", async () => {
      await waitFor(async () => listPaths(3));
      const element = await screen.findByRole("button");
      expect(element).toBeInTheDocument();
    });
  });
});

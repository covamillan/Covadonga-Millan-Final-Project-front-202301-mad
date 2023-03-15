import { render, screen } from "@testing-library/react";
import { Header } from "../header/header";
import App from "./app";
jest.mock("../header/header.tsx");
describe("Given App component", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<App />);
  });
  describe("When it's rendered", () => {
    test("its called", () => {
      expect(Header).toHaveBeenCalled();
    });
  });
});

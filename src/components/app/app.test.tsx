import { render } from "@testing-library/react";
import { AppRouter } from "../app.router/app.router";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";
import App from "./app";
jest.mock("../header/header.tsx");
jest.mock("../footer/footer.tsx");
jest.mock("../app.router/app.router.tsx");

describe("Given App component", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<App />);
  });
  describe("When is rendered", () => {
    test("Then header its called", () => {
      expect(Header).toHaveBeenCalled();
    });

    test("Then footer is called", () => {
      expect(Footer).toHaveBeenCalled();
    });

    test("Then appRouter should be called", () => {
      expect(AppRouter).toHaveBeenCalled();
    });
  });
});

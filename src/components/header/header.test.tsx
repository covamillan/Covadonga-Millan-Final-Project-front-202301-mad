import { render, screen } from "@testing-library/react";
import { Header } from "./header";
describe("Given the header component", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Header></Header>);
  });
  describe("When its rendered", () => {
    test("Then it should contain the word", () => {
      const img = screen.getByAltText(/logo/i);
      expect(img).toBeInTheDocument();
    });
    test("Then it should contain role", () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });

    test("Then it should contain img role", () => {
      const element = screen.getByRole("img");
      expect(element).toBeInTheDocument();
    });
  });
});

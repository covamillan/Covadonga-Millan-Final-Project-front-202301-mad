import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe("Given the header component", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Footer />);
  });
  describe("When its rendered", () => {
    test("Then it should contain role", () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});

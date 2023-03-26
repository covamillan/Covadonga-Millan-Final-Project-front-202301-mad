import { render, screen } from "@testing-library/react";
import { menuOptions } from "../app/app";
import { Menu } from "../menu/menu";
import { Header } from "./header";
jest.mock("../menu/menu.tsx");
describe("Given the header component", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <Header>
        <Menu options={menuOptions}></Menu>
      </Header>
    );
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

import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

import { Menu } from "./menu";

describe("Given menu component", () => {
  render(
    <Router>
      <Menu></Menu>
    </Router>
  );
  describe("When its rendered", () => {
    test("Then it should render home as a list element", () => {
      const listElement = screen.getAllByRole("listitem");
      expect(listElement[0]).toBeInTheDocument();
    });
  });
});

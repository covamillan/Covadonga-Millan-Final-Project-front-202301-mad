import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";
import App from "./app";
jest.mock("../header/header.tsx");
jest.mock("../footer/footer.tsx");
describe("Given App component", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  describe("When is rendered", () => {
    test("Then header its called", () => {
      expect(Header).toHaveBeenCalled();
    });
    test("Then footer is called", () => {
      expect(Footer).toHaveBeenCalled();
    });
  });
});

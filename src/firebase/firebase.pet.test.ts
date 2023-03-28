import { getDownloadURL } from "firebase/storage";
import { uploadImg } from "./firebase.pet";

jest.mock("firebase/storage");

describe("Given the firebase function", () => {
  describe("When there is no pet image", () => {});

  describe("When there is an image", () => {
    test("Then, the pet img should be the loaded image", async () => {
      const mockInfo = { name: "pepa", img: "e.jpg" };
      const mockFile = new File(["img"], "img.png", {
        type: "image/png",
      });
      await uploadImg(mockInfo, mockFile);
      expect(getDownloadURL).toHaveBeenCalled();
    });
  });
});

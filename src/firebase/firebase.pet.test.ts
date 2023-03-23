import { getDownloadURL } from "firebase/storage";
import { newImg } from "./firebase.pet";

jest.mock("firebase/storage");

describe("Given the firebase function", () => {
  describe("When there is no pet image", () => {
    test("Then the image should be the default one", async () => {
      const mockInfo = { name: "pepe", img: "" };

      await newImg(mockInfo);
      expect(mockInfo.img).toBe(
        "https://firebasestorage.googleapis.com/v0/b/pet-hospital-1e2b6.appspot.com/o/avatar.png?alt=media&token=779063c4-77ee-4973-b560-2d6473323581"
      );
    });
  });

  describe("When there is an image", () => {
    test("Then, the pet img should be the loaded image", async () => {
      const mockInfo = { name: "pepa", img: "e.jpg" };
      const mockFile = new File(["img"], "img.png", {
        type: "image/png",
      });
      await newImg(mockInfo, mockFile);
      expect(getDownloadURL).toHaveBeenCalled();
    });
  });
});

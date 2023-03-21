import { PetStructure } from "../../models/pet";
import { PetsRepo } from "./pet.repo";

describe("Given pets repository", () => {
  let repo: PetsRepo;
  repo = new PetsRepo();
  describe("When we use the query pets method", () => {
    test("Then if everything is okay it should return the data", async () => {
      const mockedValue = [] as unknown as PetStructure[];
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockedValue),
      });
      const result = await repo.queryPets("token");
      expect(result).toEqual(mockedValue);
    });

    test("Then it should throw an error if the data is not ok", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = repo.queryPets("token");
      await expect(result).rejects.toThrow();
    });
  });

  describe("When we use the find pet method", () => {
    test("Then if everything is okay it should return the data", async () => {
      const mockedValue = {} as unknown as PetStructure;
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        id: "e",
        json: jest.fn().mockResolvedValue(mockedValue),
      });
      const result = await repo.findPet("token", "e");
      expect(result).toEqual(mockedValue);
    });

    test("Then it should throw an error if the data is not ok", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = repo.findPet("token", "e");
      await expect(result).rejects.toThrow();
    });
  });

  describe("When we use the find by owner method", () => {
    test("Then if everything is okay it should return the data", async () => {
      const mockedValue = [] as unknown as PetStructure[];
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        owner: "e",
        json: jest.fn().mockResolvedValue(mockedValue),
      });
      const result = await repo.findOwner("token", "e");
      expect(result).toEqual(mockedValue);
    });

    test("Then it should throw an error if the data is not ok", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = repo.findOwner("token", "e");
      await expect(result).rejects.toThrow();
    });
  });

  describe("When we use the create pet method", () => {
    test("Then if everything is okay it should return the data", async () => {
      const mockedValue = {} as unknown as PetStructure;
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        body: "e",
        json: jest.fn().mockResolvedValue(mockedValue),
      });
      const result = await repo.createPet("token", mockedValue);
      expect(result).toEqual(mockedValue);
    });

    test("Then it should throw an error if the data is not ok", async () => {
      const mockedValue = {} as unknown as PetStructure;
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = repo.createPet("token", mockedValue);
      await expect(result).rejects.toThrow();
    });
  });

  describe("When we use the update pet method", () => {
    test("Then if everything is okay it should return the data", async () => {
      const mockedValue = [] as unknown as PetStructure[];
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockedValue),
      });
      const result = await repo.updatePet("token", "id", {});
      expect(result).toEqual(mockedValue);
    });

    test("Then it should throw an error if the data is not ok", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = repo.updatePet("token", "id", {});
      await expect(result).rejects.toThrow();
    });
  });
  describe("When we use the delete pet method", () => {
    test("Then if everything is okay it should return the data", async () => {
      const mockedValue = [{ id: "1" }, { id: "2" }];
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockedValue),
      });
      const result = await repo.deletePet("token", "2");
      expect(result).toEqual(undefined);
    });

    test("Then it should throw an error if the data is not ok", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = repo.deletePet("token", "id");
      await expect(result).rejects.toThrow();
    });
  });
});

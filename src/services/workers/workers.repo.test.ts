import { WorkersRepo } from "./workers.repo";

describe("Given the Workers repo", () => {
  let repo: WorkersRepo;

  beforeEach(() => {
    repo = new WorkersRepo();
  });

  describe("When we call the create function", () => {
    test("Then the fetch should return the data", async () => {
      const mockedValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockedValue),
      });
      const result = await repo.create({}, "/route");
      expect(result).toEqual(mockedValue);
    });
    test("Then if the fetch fails, it should throw an error", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = repo.create({ email: "email" }, "/route");
      await expect(result).rejects.toThrow();
    });
  });
  describe("When we call the update function", () => {
    test("Then if the fetch works, it should return the data", async () => {
      const mockedValue = { id: "1" };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockedValue),
      });
      const result = await repo.update({ email: "email" }, "data", "token");
      expect(result).toEqual(mockedValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = repo.update({ email: "emilio" }, "data", "token");
      await expect(result).rejects.toThrow();
    });
  });
});

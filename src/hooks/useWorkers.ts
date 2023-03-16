import { useDispatch } from "react-redux";
import { WorkerStructure } from "../models/worker";
import { login, register } from "../reducer/workers/workers.slice";
import { WorkersRepo } from "../services/workers/workers.repo";
import { AppDispatch } from "../store/store";

export function useWorkers(repo: WorkersRepo) {
  const dispatch = useDispatch<AppDispatch>();

  const workerRegister = async (info: Partial<WorkerStructure>) => {
    try {
      const data = await repo.create(info, "register");
      dispatch(register(data.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const workerLogin = async (info: Partial<WorkerStructure>) => {
    try {
      const data = await repo.create(info, "login");
      dispatch(login(data.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    workerRegister,
    workerLogin,
  };
}

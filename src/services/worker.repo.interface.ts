import { WorkerStructure } from "../models/worker";

export interface RepoWorker<T> {
  create(userInfo: Partial<WorkerStructure>, urlPath: string): Promise<T>;
  update(
    userInfo: Partial<WorkerStructure>,
    urlPath: string,
    token: string
  ): Promise<T>;
}

import { WorkerStructure } from "../models/worker";
import { RepoWorker } from "./worker.repo.interface";

export class WorkersRepo implements RepoWorker<WorkerStructure> {
  url: string;
  constructor() {
    this.url = "http://localhost:4200/workers";
  }

  async create(
    userInfo: Partial<WorkerStructure>,
    urlExtraPath: string
  ): Promise<WorkerStructure> {
    const url = this.url + "/" + urlExtraPath;

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!resp.ok)
      throw new Error(`Error http: ${resp.status} ${resp.statusText}`);

    const data = (await resp.json()) as WorkerStructure;

    return data;
  }

  async update(
    userInfo: Partial<WorkerStructure>,
    urlExtraPath: string,
    token: string
  ): Promise<WorkerStructure> {
    const url = this.url + "/" + urlExtraPath;

    const resp = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(userInfo),
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!resp.ok)
      throw new Error(`Error http: ${resp.status} ${resp.statusText}`);

    const data = await resp.json();

    return data;
  }
}

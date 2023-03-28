import { ServerResp, WorkerStructure } from "../../models/worker";
import { RepoWorker } from "./worker.repo.interface";

export class WorkersRepo implements RepoWorker<ServerResp> {
  url: string;
  constructor() {
    this.url = "http://localhost:4200/workers";
  }

  async create(userInfo: Partial<WorkerStructure>): Promise<ServerResp> {
    const url = this.url + "/register";

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!resp.ok)
      throw new Error(`Error http: ${resp.status} ${resp.statusText}`);

    const data = await resp.json();

    return data;
  }

  async update(userInfo: Partial<WorkerStructure>) {
    const url = this.url + "/login";

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!resp.ok)
      throw new Error(`Error http: ${resp.status} ${resp.statusText}`);

    const data = await resp.json();

    return data;
  }
}

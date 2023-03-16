export type WorkerStructure = {
  email: string;
  password: string;
};

export type ServerResp = {
  results: WorkerStructure[];
};

export class Worker implements WorkerStructure {
  constructor(
    public id: string,
    public email: string,
    public password: string
  ) {}
}

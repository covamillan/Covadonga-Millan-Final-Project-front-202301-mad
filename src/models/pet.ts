export type ProtoPetStructure = {
  name: string;
  kg: number;
  age: number;
  species: string;
  breed: string;
  owner: string;
  phone: number;
  email: string;
  temper: string;
  gender: string;
  img: string;
  symptoms: string[];
  exam: {
    temperature: number;
    hr: number;
    rr: number;
    membrane: string;
    cap: number;
    sap: number;
    dap: number;
    map: number;
  };
  meds: {
    fluids: string;
    med: string;
    ml: number;
    hour: number;
    via: string;
  };
};

type HasId = {
  id: string;
};

export type PetStructure = ProtoPetStructure & HasId;

export type PetServerResp = {
  results: PetStructure[];
};

export class Pet implements PetStructure {
  constructor(
    public id: string,
    public name: string,
    public kg: number,
    public age: number,
    public species: string,
    public breed: string,
    public owner: string,
    public phone: number,
    public email: string,
    public temper: string,
    public gender: string,
    public img: string,
    public symptoms: string[],
    public exam: {
      temperature: number;
      hr: number;
      rr: number;
      membrane: string;
      cap: number;
      sap: number;
      dap: number;
      map: number;
    },
    public meds: {
      fluids: string;
      med: string;
      ml: number;
      hour: number;
      via: string;
    }
  ) {}
}

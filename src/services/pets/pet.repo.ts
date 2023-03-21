import {
  PetServerResp,
  PetStructure,
  ProtoPetStructure,
} from "../../models/pet";
import { RepoPet } from "../pets/pet.repo.interface";

export class PetsRepo implements RepoPet<PetServerResp> {
  url: string;
  constructor() {
    this.url = "http://localhost:4200/pets";
  }

  async queryPets(token: string): Promise<PetServerResp[]> {
    const url = this.url + "/queryPets";

    const resp = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    if (!resp.ok)
      throw new Error("Error http: " + resp.status + resp.statusText);

    const petData = (await resp.json()) as PetServerResp[];
    return petData;
  }

  async findPet(
    token: string,
    idPet: PetStructure["id"]
  ): Promise<PetServerResp> {
    const url = this.url + "/findPet" + idPet;

    const resp = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    if (!resp.ok)
      throw new Error("Error http: " + resp.status + resp.statusText);

    const petData = (await resp.json()) as PetServerResp;
    return petData;
  }

  async findOwner(
    token: string,
    ownerPet: PetStructure["owner"]
  ): Promise<PetServerResp[]> {
    const url = this.url + "/findOwner" + ownerPet;
    const resp = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    if (!resp.ok)
      throw new Error("Error http: " + resp.status + resp.statusText);

    const petData = (await resp.json()) as PetServerResp[];
    return petData;
  }

  async createPet(
    token: string,
    pet: ProtoPetStructure
  ): Promise<PetServerResp> {
    const url = this.url + "/createPet";
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(pet),
      headers: { Authorization: "Bearer " + token },
    });

    if (!resp.ok)
      throw new Error("Error http: " + resp.status + resp.statusText);

    const petData = (await resp.json()) as PetServerResp;
    return petData;
  }

  async updatePet(
    token: string,
    idPet: PetStructure["id"],
    pet: Partial<ProtoPetStructure>
  ): Promise<PetServerResp> {
    const url = this.url + "/updatePet" + idPet;
    const resp = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(pet),
      headers: { Authorization: "Bearer " + token },
    });

    if (!resp.ok)
      throw new Error("Error http: " + resp.status + resp.statusText);

    const petData = (await resp.json()) as PetServerResp;
    return petData;
  }

  async deletePet(token: string, idPet: PetStructure["id"]): Promise<void> {
    const url = this.url + "/deletePet" + idPet;
    const resp = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });

    if (!resp.ok)
      throw new Error("Error http: " + resp.status + resp.statusText);
  }
}

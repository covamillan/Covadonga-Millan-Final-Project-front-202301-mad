import { PetStructure, ProtoPetStructure } from "../../models/pet";

export interface RepoPet<T> {
  queryPets(token: string): Promise<T[]>;
  findPet(token: string, idPet: PetStructure["id"]): Promise<T>;
  findOwner(token: string, ownerPet: PetStructure["owner"]): Promise<T[]>;
  createPet(token: string, pet: Partial<ProtoPetStructure>): Promise<T>;
  updatePet(
    token: string,
    idPet: PetStructure["id"],
    pet: Partial<ProtoPetStructure>
  ): Promise<T>;
  deletePet(token: string, idPet: PetStructure["id"]): Promise<void>;
}

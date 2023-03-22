import { PetStructure, ProtoPetStructure } from "../../models/pet";

export interface RepoPet<T> {
  queryPetsRepo(token: string): Promise<T>;
  findPetRepo(token: string, idPet: PetStructure["id"]): Promise<T>;
  findOwnerRepo(token: string, ownerPet: PetStructure["owner"]): Promise<T>;
  createPetRepo(token: string, pet: ProtoPetStructure): Promise<T>;
  updatePetRepo(
    token: string,
    idPet: PetStructure["id"],
    pet: Partial<ProtoPetStructure>
  ): Promise<T>;
  deletePetRepo(token: string, idPet: PetStructure["id"]): Promise<void>;
}

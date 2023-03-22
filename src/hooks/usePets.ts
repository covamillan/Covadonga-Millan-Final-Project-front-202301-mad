import { useDispatch, useSelector } from "react-redux";
import { PetsRepo } from "../services/pets/pet.repo";
import { AppDispatch, RootState } from "../store/store";
import { useCallback } from "react";
import { PetStructure, ProtoPetStructure } from "../models/pet";
import {
  queryPets,
  findPet,
  findOwner,
  createPet,
  deletePet,
  updatePet,
} from "../reducer/pets/pets.slice";

export function usePets(repo: PetsRepo) {
  const workersState = useSelector((state: RootState) => state.workers);
  const petsState = useSelector((state: RootState) => state.pets);

  const petsDispatch = useDispatch<AppDispatch>();

  const loadPets = useCallback(async () => {
    try {
      const workerToken = workersState.workerLogged.token;
      if (!workerToken) throw new Error("Not authorized");

      const data = await repo.queryPetsRepo(workerToken);

      petsDispatch(queryPets(data.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [petsDispatch, repo, workersState.workerLogged.token]);

  const findPetId = async (idPet: PetStructure["id"]) => {
    try {
      const workerToken = workersState.workerLogged.token;
      if (!workerToken) throw new Error("Not authorized");

      const data = await repo.findPetRepo(workerToken, idPet);

      petsDispatch(findPet(data.results[0].id));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const findPetOwner = async (ownerPet: PetStructure["owner"]) => {
    try {
      const workerToken = workersState.workerLogged.token;
      if (!workerToken) throw new Error("Not authorized");

      const data = await repo.findOwnerRepo(workerToken, ownerPet);
      petsDispatch(findOwner(data.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const createNewPet = async (pet: ProtoPetStructure) => {
    try {
      const workerToken = workersState.workerLogged.token;
      if (!workerToken) throw new Error("Not authorized");

      const data = await repo.createPetRepo(workerToken, pet);
      petsDispatch(createPet(data.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const updatePetId = async (
    idPet: PetStructure["id"],
    pet: Partial<ProtoPetStructure>
  ) => {
    try {
      const workerToken = workersState.workerLogged.token;
      if (!workerToken) throw new Error("Not authorized");

      const data = await repo.updatePetRepo(workerToken, idPet, pet);
      petsDispatch(updatePet(data.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const deletePetId = async (idPet: PetStructure["id"]) => {
    try {
      const workerToken = workersState.workerLogged.token;
      if (!workerToken) throw new Error("Not authorized");
      debugger;
      await repo.deletePetRepo(workerToken, idPet);
      petsDispatch(deletePet(idPet));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    petsState,
    loadPets,
    findPetId,
    findPetOwner,
    createNewPet,
    updatePetId,
    deletePetId,
  };
}

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { PetStructure } from "../models/pet";

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadImg = async (
  info: Partial<PetStructure>,
  file: File
): Promise<void> => {
  const storageInfo = ref(storage, `test/${info.owner}_${info.name}`);
  await uploadBytes(storageInfo, file);
};

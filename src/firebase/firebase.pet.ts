import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { PetStructure } from "../models/pet";

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const newImg = async (info: Partial<PetStructure>, file?: File) => {
  if (!file) {
    info.img =
      "https://firebasestorage.googleapis.com/v0/b/pet-hospital-1e2b6.appspot.com/o/avatar.png?alt=media&token=779063c4-77ee-4973-b560-2d6473323581";
    return;
  }
  const storageInfo = ref(storage, info.name);
  await uploadBytes(storageInfo, file);
  const imgUrl = await getDownloadURL(storageInfo);

  info.img = imgUrl;
};

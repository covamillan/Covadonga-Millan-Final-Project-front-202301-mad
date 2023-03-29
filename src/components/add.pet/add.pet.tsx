import { SyntheticEvent, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uploadImg } from "../../firebase/firebase.pet";
import { usePets } from "../../hooks/usePets";
import { Pet } from "../../models/pet";
import { PetsRepo } from "../../services/pets/pet.repo";
import styles from "./add.pet.module.scss";
export default function AddPet() {
  const { id } = useParams();
  const repo = useMemo(() => new PetsRepo(), []);
  const navigate = useNavigate();

  const { petsState, createNewPet, updatePetId } = usePets(repo);

  let petInfo: Partial<Pet> | undefined = petsState.pets.find(
    (item) => item.id === id
  );
  const type = petInfo === undefined ? "add" : "";

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const formInfo = event.currentTarget as HTMLFormElement;

    const newPet: Partial<Pet> | undefined = {
      name: (formInfo.elements[0] as HTMLFormElement).value,
      owner: (formInfo.elements[1] as HTMLFormElement).value,
      age: (formInfo.elements[2] as HTMLFormElement).value,
      species: (formInfo.elements[3] as HTMLFormElement).value,
      breed: (formInfo.elements[4] as HTMLFormElement).value,
      kg: (formInfo.elements[5] as HTMLFormElement).value,
      phone: (formInfo.elements[6] as HTMLFormElement).value,
      email: (formInfo.elements[7] as HTMLFormElement).value,
      temper: (formInfo.elements[8] as HTMLFormElement).value,
      gender: (formInfo.elements[9] as HTMLFormElement).value,
    };

    const img = (
      formInfo.elements[10] as unknown as HTMLFormElement
    ).files?.item(0) as File;

    if (type === "add") {
      await uploadImg(newPet, img);
      await createNewPet(newPet);
      navigate(`/update/symptoms/${newPet.id}`);
    } else {
      newPet.id = petInfo!.id;
      await updatePetId(newPet.id!, newPet);
      navigate(`/home`);
    }

    formInfo.reset();
  };

  return (
    <div className={styles.addPet}>
      <form onSubmit={handleSubmit}>
        <h1>Add pet</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={petInfo?.name}
          required
        />

        <label htmlFor="owner">Owner</label>
        <input
          type="text"
          name="owner"
          id="owner"
          defaultValue={petInfo?.owner}
          required
        />

        <label htmlFor="age">Age (years)</label>
        <input
          type="number"
          name="age"
          id="age"
          defaultValue={petInfo?.age}
          required
        />

        <label htmlFor="species" className={styles.species}>
          Species
          <select
            name="species"
            id="species"
            defaultValue={petInfo?.species}
            required
          >
            <option value="">Choose an option</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </select>
        </label>

        <label htmlFor="breed">Breed</label>
        <input
          type="text"
          name="breed"
          id="breed"
          defaultValue={petInfo?.breed}
        />

        <label htmlFor="kg">Kg</label>
        <input
          type="text"
          name="kg"
          id="kg"
          defaultValue={petInfo?.kg}
          required
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          id="phone"
          defaultValue={petInfo?.phone}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          defaultValue={petInfo?.email}
          required
        />

        <div className={styles.bottom}>
          <label htmlFor="temper" className={styles.species}>
            Temper
            <select
              name="temper"
              id="temper"
              defaultValue={petInfo?.temper}
              required
            >
              <option value="">Choose an option</option>
              <option value="good">Good</option>
              <option value="bad">Bad</option>
              <option value="neutral">It Depends</option>
            </select>
          </label>

          <label htmlFor="gender" className={styles.species}>
            Gender
            <select
              name="gender"
              id="gender"
              defaultValue={petInfo?.gender}
              required
            >
              <option value="">Choose an option</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </label>

          <div className={styles.img}>
            <label>Image</label>
            <input type="file" name="img" id="img" />
          </div>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

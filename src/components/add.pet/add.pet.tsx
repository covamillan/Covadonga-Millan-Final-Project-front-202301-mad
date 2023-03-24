import { SyntheticEvent, useMemo } from "react";
import { useParams } from "react-router-dom";
import { usePets } from "../../hooks/usePets";
import { Pet } from "../../models/pet";
import { PetsRepo } from "../../services/pets/pet.repo";
import styles from "./add.pet.module.scss";
export default function AddPet() {
  const { id } = useParams();
  const repo = useMemo(() => new PetsRepo(), []);

  const { petsState, createNewPet, updatePetId } = usePets(repo);

  let petInfo: Partial<Pet> | undefined = petsState.pets.find(
    (item) => item.id === id
  );
  const type = petInfo === undefined ? "add" : "";

  const handleSubmit = (event: SyntheticEvent) => {
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
      img: (formInfo.elements[10] as HTMLFormElement).files?.item(0),
    };

    if (type === "add") {
      createNewPet(newPet);
    } else {
      newPet.id = petInfo!.id;
      updatePetId(newPet.id!, newPet);
    }

    formInfo.reset();
  };

  return (
    <div className={styles.addPet}>
      <form onSubmit={handleSubmit}>
        <h1>Add pet</h1>
        <label htmlFor="name">Name</label>
        <input type="name" name="name" id="name" required />

        <label htmlFor="owner">Owner</label>
        <input type="owner" name="owner" id="owner" required />

        <label htmlFor="age">Age (years)</label>
        <input type="age" name="age" id="age" required />

        <label htmlFor="species">Species</label>
        <select name="species" id="species" /*required*/ />

        <label htmlFor="breed">Breed</label>
        <select name="breed" id="breed" /*required*/ />

        <label htmlFor="kg">Kg</label>
        <input type="kg" name="kg" id="kg" required />

        <label htmlFor="phone">Phone</label>
        <input type="phone" name="phone" id="phone" required />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />

        <div className={styles.bottom}>
          <div className={styles.temper}>
            <label>Temper</label>
            <ul>
              <li>
                <input type="checkbox" id="good" name="temper" />
                <label htmlFor="good">
                  <img alt="good" src="../../../smile.png" />
                </label>
              </li>
              <li>
                <input type="checkbox" id="bad" name="temper" />
                <label htmlFor="bad">
                  <img alt="bad" src="../../../sad.png" />
                </label>
              </li>
              <li>
                <input type="checkbox" id="neutral" name="temper" />
                <label htmlFor="neutral">
                  <img alt="neutral" src="../../../neutral.png" />
                </label>
              </li>
            </ul>
          </div>

          <div className={styles.gender}>
            <label>Gender</label>
            <ul>
              <li>
                <input type="checkbox" id="female" />
                <label htmlFor="female">
                  <img alt="female" src="../../../female.png" />
                </label>
              </li>
              <li>
                <input type="checkbox" id="male" />
                <label htmlFor="male">
                  <img alt="male" src="../../../male-gender.png" />
                </label>
              </li>
            </ul>
          </div>
          <div className={styles.img}>
            <label>Image</label>
            <input type="file" name="image" id="image" />
          </div>
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

import React from "react";
import { SyntheticEvent, useMemo } from "react";
import { useParams } from "react-router-dom";
import { uploadImg } from "../../firebase/firebase.pet";
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
  const [temper, setTemper] = React.useState("");
  const [gender, setGender] = React.useState("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    debugger;
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
      formInfo.elements[13] as unknown as HTMLFormElement
    ).files?.item(0) as File;

    console.dir(img);

    console.log(type, img);

    if (type === "add") {
      debugger;
      await uploadImg(newPet, img);
      createNewPet(newPet);
    } else {
      newPet.id = petInfo!.id;
      updatePetId(newPet.id!, img);
    }

    formInfo.reset();
  };

  return (
    <div className={styles.addPet}>
      <form onSubmit={handleSubmit}>
        <h1>Add pet</h1>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" required />

        <label htmlFor="owner">Owner</label>
        <input type="text" name="owner" id="owner" required />

        <label htmlFor="age">Age (years)</label>
        <input type="number" name="age" id="age" required />

        <label htmlFor="species" className={styles.species}>
          Species
          <select name="species" id="species" required>
            <option value="">Choose an option</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="bird">Bird</option>
            <option value="lizzard">Lizzard</option>
            <option value="rabbit">Rabbit</option>
          </select>
        </label>

        <label htmlFor="breed">Breed</label>
        <input type="text" name="breed" id="breed" />

        <label htmlFor="kg">Kg</label>
        <input type="text" name="kg" id="kg" required />

        <label htmlFor="phone">Phone</label>
        <input type="text" name="phone" id="phone" required />

        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" required />

        <div className={styles.bottom}>
          <div className={styles.temper}>
            <label>Temper</label>
            <div className={styles.container}>
              <div className={styles.input}>
                <input
                  type="checkbox"
                  id="good"
                  name="temper"
                  value="good"
                  checked={temper === "good"}
                  onChange={() => setTemper("good")}
                />
                <label htmlFor="good">
                  <img alt="good" src="../../../smile.png" />
                </label>
              </div>
              <div className={styles.input}>
                <input
                  type="checkbox"
                  id="bad"
                  name="temper"
                  value="bad"
                  checked={temper === "bad"}
                  onChange={() => setTemper("bad")}
                />
                <label htmlFor="bad">
                  <img alt="bad" src="../../../sad.png" />
                </label>
              </div>
              <div className={styles.input}>
                <input
                  type="checkbox"
                  id="neutral"
                  name="temper"
                  value="neutral"
                  checked={temper === "neutral"}
                  onChange={() => setTemper("neutral")}
                />
                <label htmlFor="neutral">
                  <img alt="neutral" src="../../../neutral.png" />
                </label>
              </div>
            </div>
          </div>

          <div className={styles.gender}>
            <label>Gender</label>
            <div className={styles.container}>
              <div className={styles.input}>
                <input
                  type="checkbox"
                  id="female"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />
                <label htmlFor="female">
                  <img alt="female" src="../../../female.png" />
                </label>
              </div>
              <div className={styles.input}>
                <input
                  type="checkbox"
                  id="male"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />
                <label htmlFor="male">
                  <img alt="male" src="../../../male-gender.png" />
                </label>
              </div>
            </div>
          </div>
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

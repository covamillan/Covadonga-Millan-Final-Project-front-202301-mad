import { useEffect, useMemo } from "react";
import { usePets } from "../../hooks/usePets";
import { PetsRepo } from "../../services/pets/pet.repo";
import { Card } from "../card/card";
import styles from "./cards.module.scss";

export function Cards() {
  const petsRepo = useMemo(() => new PetsRepo(), []);
  const { petsState, loadPets } = usePets(petsRepo);
  useEffect(() => {
    loadPets();
  }, [loadPets]);
  const dogs = petsState.pets.filter((pet) => pet.species === "dog");
  const cats = petsState.pets.filter((pet) => pet.species === "cat");

  return (
    <div className={styles.cards}>
      <h2>Hospitalized - {petsState.pets.length}</h2>
      <section>
        <h3>Dogs - {dogs.length}</h3>
        <div className={styles.section}>
          <h5 className={styles.fluids}>Fluids</h5>
          <h5 className={styles.meds}> Next meds</h5>
          <h5 className={styles.status}> Status</h5>
        </div>

        {dogs.map((dog) => (
          <Card key={dog.id} pet={dog}></Card>
        ))}
      </section>

      <section>
        <h3>Cats - {cats.length}</h3>
        <div className={styles.section}>
          <h5 className={styles.fluids}>Fluids</h5>
          <h5 className={styles.meds}> Next meds</h5>
          <h5 className={styles.status}> Status</h5>
        </div>

        {cats.map((cat) => (
          <Card key={cat.id} pet={cat}></Card>
        ))}
      </section>
    </div>
  );
}

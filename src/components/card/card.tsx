import { SyntheticEvent, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePets } from "../../hooks/usePets";
import { PetStructure } from "../../models/pet";
import { PetsRepo } from "../../services/pets/pet.repo";
import styles from "./card.module.scss";
export function Card({ pet }: { pet: PetStructure }) {
  const repo = useMemo(() => new PetsRepo(), []);
  const { deletePetId, findPetId } = usePets(repo);
  const handleDelete = () => {
    deletePetId(pet.id);
  };
  const findPet = async (event: SyntheticEvent) => {
    event.preventDefault();
    findPetId(pet.id);
  };

  return (
    <li className={styles.card}>
      <div>
        <Link to={`/find/${pet.id}`} onClick={findPet}>
          <h4>{pet.name.charAt(0).toUpperCase() + pet.name.slice(1)}</h4>
        </Link>

        <p>NHC {pet.id.slice(0, 6)}</p>
        <p>{pet.kg} kg</p>
      </div>
      <div>
        <img src={`../../../${pet.temper}.png`} alt="temper" />
        <img src={`../../../${pet.gender}.png`} alt="gender"></img>
      </div>
      <div>
        <p>
          {pet.fluids}&nbsp;{pet.ml}ml/kg/h
        </p>
      </div>

      <div>
        <p>
          {pet.meds}&nbsp;{pet.via}
        </p>
        <p>{pet.ml}ml</p>
        <p>q {pet.hour}/hours</p>
      </div>

      <button type="submit" className={styles.passed} onClick={handleDelete}>
        Passed
        <img src="../../../cross.png" alt="cross" className={styles.cross} />
      </button>
    </li>
  );
}

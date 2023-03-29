import { SyntheticEvent, useEffect, useMemo } from "react";
import { usePets } from "../../hooks/usePets";
import { PetsRepo } from "../../services/pets/pet.repo";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./details.module.scss";

export default function Details() {
  const repo = useMemo(() => new PetsRepo(), []);
  const { id } = useParams();
  const { petsState, updatePetId, findPetOwner, findPetId } = usePets(repo);
  const navigate = useNavigate();

  useEffect(() => {
    findPetId(id!);
  }, [findPetId, id]);

  const handleEdit = async (event: SyntheticEvent) => {
    event.preventDefault();
    navigate(`/update/${petsState.pet.id}`);
  };

  const editSymptoms = async (event: SyntheticEvent) => {
    event.preventDefault();
    updatePetId(petsState.pet.id, petsState.pet);
    navigate(`/update/symptoms/${petsState.pet.id}`);
  };

  const findOwner = async (event: SyntheticEvent) => {
    event.preventDefault();
    findPetOwner(petsState.pet.owner);
  };

  return (
    <div className={styles.details}>
      <div className={styles.up}>
        <h1>
          {petsState.pet.name} - NHC {petsState.pet.id?.slice(0, 6)}
        </h1>
        <button type="submit" onClick={handleEdit}>
          Edit
        </button>
      </div>
      <div className={styles.petinfo}>
        <div className={styles.left}>
          <div>
            <img
              className={styles.image}
              src={petsState.pet.img}
              alt="pet-img"
            ></img>
          </div>
          <div>
            <div className={styles.name}>
              <h3>
                {petsState.pet.species} - {petsState.pet.breed}
              </h3>
              <h3>{petsState.pet.kg} kg</h3>
              <h3>{petsState.pet.age} years</h3>
              <div className={styles.faces}>
                <img
                  src={`../../../${petsState.pet.temper}.png`}
                  alt="temper"
                />
                <img
                  src={`../../../${petsState.pet.gender}.png`}
                  alt="gender"
                ></img>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <button type="submit" onClick={findOwner}>
            <h3>{petsState.pet.owner}</h3>
          </button>
          <h3>{petsState.pet.email}</h3>
          <h3>{petsState.pet.phone}</h3>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.midedit}>
          <button type="submit" onClick={editSymptoms}>
            Edit
          </button>
        </div>
        <div className={styles.info}>
          <div className={styles.symptoms}>
            <h2>Symptoms</h2>
            <h3>{petsState.pet.symptoms}</h3>
          </div>
          <div className={styles.exam}>
            <h2>Last physical exam</h2>
            <div className={styles.text}></div>
            <h3>Temperature - {petsState.pet.temperature}</h3>
            <h3>Heart rate - {petsState.pet.hr}</h3>
            <h3>Resp. rate - {petsState.pet.rr}</h3>
            <h3>Mucous membrane - {petsState.pet.membrane}</h3>
            <h3>Capillary refill - {petsState.pet.cap}</h3>
            <h3>Systolic arterial pressure - {petsState.pet.sap}</h3>
            <h3>Diastolic arterial pressure - {petsState.pet.dap}</h3>
            <h3>Mean arterial pressure - {petsState.pet.map}</h3>
          </div>
        </div>
      </div>
      <div className={styles.down}>
        <h2>
          Fluids: {petsState.pet.fluids} {petsState.pet.ml}ml/kg/h
        </h2>
        <div className={styles.meds}>
          <h3>
            {petsState.pet.meds} -{petsState.pet.via}
          </h3>
          <h3>
            {petsState.pet.ml}ml/{petsState.pet.hour}hour
          </h3>
        </div>
      </div>
    </div>
  );
}

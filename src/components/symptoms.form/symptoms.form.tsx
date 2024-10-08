import { SyntheticEvent, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePets } from "../../hooks/usePets";
import { Pet } from "../../models/pet";
import { PetsRepo } from "../../services/pets/pet.repo";
import styles from "./symptoms.form.module.scss";

export default function AddSymptoms() {
  const repo = useMemo(() => new PetsRepo(), []);
  const navigate = useNavigate();

  const { petsState, updatePetId } = usePets(repo);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const formInfo = event.currentTarget as HTMLFormElement;

    const newSymptom: Partial<Pet> | undefined = {
      symptoms: (formInfo.elements[0] as HTMLFormElement).value,
      temperature: (formInfo.elements[1] as HTMLFormElement).value,
      hr: (formInfo.elements[2] as HTMLFormElement).value,
      rr: (formInfo.elements[3] as HTMLFormElement).value,
      sap: (formInfo.elements[4] as HTMLFormElement).value,
      dap: (formInfo.elements[5] as HTMLFormElement).value,
      map: (formInfo.elements[6] as HTMLFormElement).value,
      membrane: (formInfo.elements[7] as HTMLFormElement).value,
      cap: (formInfo.elements[8] as HTMLFormElement).value,
      fluids: (formInfo.elements[9] as HTMLFormElement).value,
      meds: (formInfo.elements[10] as HTMLFormElement).value,
      ml: (formInfo.elements[11] as HTMLFormElement).value,
      hour: (formInfo.elements[12] as HTMLFormElement).value,
      via: (formInfo.elements[13] as HTMLFormElement).value,
    };
    updatePetId(petsState.pet.id, newSymptom);
    navigate("/home");
  };

  return (
    <div className={styles.symptoms}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Add symptoms</h1>
        <section className={styles.container}>
          <div className={styles.left}>
            <label htmlFor="symptoms">Symptoms</label>
            <input
              type="text"
              name="symptoms"
              id="symptoms"
              defaultValue={petsState?.pet.symptoms}
              required
            />

            <label htmlFor="temperature">Temperature</label>
            <input
              type="number"
              name="temperature"
              id="temperature"
              defaultValue={petsState?.pet.temperature}
              required
            />

            <label htmlFor="hr">Heart rate</label>
            <input
              type="number"
              name="hr"
              id="hr"
              defaultValue={petsState?.pet.hr}
              required
            />

            <label htmlFor="rr">Respiratory rate</label>
            <input
              type="number"
              name="rr"
              id="rr"
              defaultValue={petsState?.pet.rr}
              required
            />

            <label htmlFor="sap">Systolic arterial pressure</label>
            <input
              type="number"
              name="sap"
              id="sap"
              defaultValue={petsState?.pet.sap}
              required
            />

            <label htmlFor="dap">Dyastolic arterial pressure</label>
            <input
              type="number"
              name="dap"
              id="dap"
              defaultValue={petsState?.pet.dap}
              required
            />

            <label htmlFor="map">Mean arterial pressure</label>
            <input
              type="number"
              name="map"
              id="map"
              defaultValue={petsState?.pet.map}
              required
            />
          </div>
          <div className={styles.right}>
            <label htmlFor="membrane">Mucose membrane</label>
            <input
              type="text"
              name="membrane"
              id="membrane"
              defaultValue={petsState?.pet.membrane}
              required
            />
            <label htmlFor="cr">Capillary refill</label>
            <input
              type="number"
              name="cap"
              id="cap"
              defaultValue={petsState?.pet.cap}
              required
            />
            <label htmlFor="fluids">Fluids</label>
            <input
              type="text"
              name="fluids"
              id="fluids"
              defaultValue={petsState?.pet.fluids}
              required
            />
            <label htmlFor="med">Medication</label>
            <input
              type="text"
              name="med"
              id="med"
              defaultValue={petsState?.pet.meds}
              required
            />
            <label htmlFor="ml">Milliliters</label>
            <input
              type="number"
              name="ml"
              id="ml"
              defaultValue={petsState?.pet.ml}
              required
            />
            <label htmlFor="hour">Hour</label>
            <input
              type="number"
              name="hour"
              id="hour"
              defaultValue={petsState?.pet.hour}
              required
            />
            <label htmlFor="via">Via</label>
            <input
              type="text"
              name="via"
              id="via"
              defaultValue={petsState?.pet.via}
              required
            />
          </div>
        </section>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

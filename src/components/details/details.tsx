import { SyntheticEvent, useMemo } from "react";
import { usePets } from "../../hooks/usePets";
import { PetsRepo } from "../../services/pets/pet.repo";
import { useNavigate } from "react-router-dom";
import { PetStructure } from "../../models/pet";

export default function Details({ pet }: { pet: PetStructure }) {
  const repo = useMemo(() => new PetsRepo(), []);
  const { petsState, updatePetId, findPetOwner } = usePets(repo);
  const navigate = useNavigate();
  const editPet = async (event: SyntheticEvent) => {
    event.preventDefault();
    updatePetId(petsState.actualPet.id, petsState.actualPet);
  };

  const editSymptoms = async (event: SyntheticEvent) => {
    event.preventDefault();
    navigate("/symptoms");
  };

  const findOwner = async (event: SyntheticEvent) => {
    event.preventDefault();
    findPetOwner(petsState.actualPet.owner);
    navigate(`/owner/${petsState.actualPet.owner}`);
  };

  return (
    <>
      <div className="up">
        <button type="submit" onClick={editPet}>
          Edit
        </button>
        <h1>
          {petsState.actualPet.name} - NHC {petsState.actualPet.id.slice(0, 6)}
        </h1>
      </div>
      <section className="petInfo">
        <div className="left">
          <div>
            <img src={petsState.actualPet.img} alt="pet-img"></img>
          </div>
          <div>
            <h3>
              {petsState.actualPet.species} - {petsState.actualPet.breed}
            </h3>
            <h3>{petsState.actualPet.kg}kg</h3>
            <h3>{petsState.actualPet.age}years</h3>
            <div>
              <img src={`../../../${pet.temper}.png`} alt="temper" />
              <img src={`../../../${pet.gender}.png`} alt="gender"></img>
            </div>
          </div>
        </div>
        <div className="right">
          <button type="submit" onClick={findOwner}>
            <h3>{petsState.actualPet.owner}</h3>
          </button>
          <h3>{petsState.actualPet.age}mail</h3>
          <h3>{petsState.actualPet.age}phone</h3>
        </div>
      </section>
      <section className="middle">
        <div className="info">
          <button type="submit" onClick={editSymptoms}>
            Edit
          </button>
          <div className="symptoms">
            <h2>Symptoms</h2>
            <h3>{petsState.actualPet.symptoms}</h3>
          </div>
          ´
          <div className="exam">
            <h2>Last physical exam</h2>
            <div className="iz">
              <h3>Temperature {petsState.actualPet.temperature}</h3>
              <h3>Heart rate {petsState.actualPet.hr}</h3>
              <h3>Resp. rate{petsState.actualPet.rr}</h3>
              <h3>Mucous membrane{petsState.actualPet.membrane}</h3>
              <h3>Capillary refill{petsState.actualPet.cap}</h3>
            </div>
            <div className="dr">
              <h3>Systolic arterial pressure {petsState.actualPet.sap}</h3>
              <h3>Diastolic arterial pressure {petsState.actualPet.dap}</h3>
              <h3>Mean arterial pressure {petsState.actualPet.map}</h3>
            </div>
          </div>
        </div>
        <div className="down">
          <h2>Fluids {petsState.actualPet.fluids}ml/kg/h</h2>
          <div className="meds">
            <h3>
              {petsState.actualPet.meds} -{petsState.actualPet.via}
            </h3>
            <h3>
              {petsState.actualPet.ml}ml/{petsState.actualPet.hour}/hour
            </h3>
          </div>
        </div>
      </section>
    </>
  );
}

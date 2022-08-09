import React from "react";
import Symptom from "./Symptom";
// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddSymptomForm from "./AddSymptomForm";

const SymptomsList = (props) => {
  // const location = useLocation();
  // const data = location.state;
  // console.log(data);

  //props:
  // const symptomEntries = props.symptomEntries

  // const [enteredSymptomText, setEnteredSymptomText] = useState("");
  //state for symptoms
  const [symptomsData, setSymptomsData] = useState([]);

  useEffect(() => {
    getSymptomsFromAPI();
  }, []);

  // API - GET
  const getSymptomsFromAPI = () => {
    axios
      .get("http://localhost:3000/symptoms")
      .then((response) => {
        setSymptomsData(response.data);
      })
      .catch((error) => {
        console.log("cant get ur symptoms :/ ");
      });
  };

  // API - POST
  const addNewSymptom = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3000/symptoms", data)
      .then((response) => {
        getSymptomsFromAPI();
      })
      .catch((error) => {
        console.log("COULDN'T MAKE A new symptom ");
      });
  };

  // API - DELETE
  const deleteSymptom = (id) => {
    // delete all entries associated with the symptom --> deleteEntries
    axios
      .delete(`http://localhost:3000/symptoms/${id}`)
      .then((response) => {
        const updatedSymptoms = symptomsData.filter(
          (symptom) => symptom.id !== id
        );
        setSymptomsData(updatedSymptoms);
      })
      .catch((error) => {
        console.log("Unable to delete");
      });
  };

  return (
    <div>
      <h1> SymptomsList!!</h1>
      <section>
        <AddSymptomForm addSymptomCallback={addNewSymptom} />
      </section>
      <section>
        {symptomsData.map((symptom) => (
          <Symptom
            key={symptom.id}
            id={symptom.id}
            name={symptom.name}
            // entries={props.symptomEntries}
            deleteSymptomCallback={deleteSymptom}
            deleteSympEntriesCallback={props.deleteSympEntriesCallback}
          />
        ))}
      </section>
    </div>
  );
};

export default SymptomsList;
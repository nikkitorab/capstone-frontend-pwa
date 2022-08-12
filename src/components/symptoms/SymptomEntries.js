import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import SymptomRating from "./SymptomRating";

const SymptomEntries = () => {
  // const location = useLocation();
  // const data = location.state;
  // console.log(data);
  // get list of symptoms from api
  //
  const [symptomsData, setSymptomsData] = useState([]);
  const [completedEntries, setCompletedEntries] = useState([]);
  // const [lastEntryID, setLastEntryID] = useState("");
  // const [done, setDone] = useState(1);

  // const [entriesData, setEntriesData] = useState([]);

  useEffect(() => {
    getSymptomsFromAPI();
  }, []);

  // useEffect(() => {
  //   // addRelatedEntries(lastEntryID);
  //   getSymptomEntriesFromAPI(lastEntryID);
  // }, [lastEntryID]);

  // useEffect(() => {
  //   getEntriesData();
  // }, []);

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

  // const getSymptomEntriesFromAPI = (id) => {
  //   axios
  //     .get(`http://localhost:3000/related-entries/symptom-entries/${id}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       // addRelatedEntries(lastEntryID);
  //       // setEntries(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("cant get ur entries :/ ");
  //     });
  // };

  // API - POST
  const addSymptomEntryAPI = (data) => {
    const symptomID = data.symptom_id;
    return axios
      .post("http://localhost:3000/symptom-entries", data)
      .then((response) => {
        // remove symptom from to-do list
        // console.log(`response: ${response}`);
        const updatedSymptoms = symptomsData.filter(
          (symptom) => symptom.id !== symptomID
        );
        // THIS DOESNT WORK
        // markSymptomComplete(symptomID);
        // console.log(`completedSymptom in add symptpm: ${completedSymptom}`);
        // const updatedCompleted = [completedSymptom];
        // for (const symptom in completedEntries) {
        //   updatedCompleted.push(symptom);
        // }
        // setCompletedEntries(updatedCompleted);
        // console.log(`completed name: ${completedName}`);
        // setCompletedEntries((current) => [...current, completedName]);

        // setSymptomsData(updatedSymptoms);
        // getEntriesData();

        // CALL FUNCTION TO GET ENTRIES DATA

        // for(const sym of )
        //add completed symptom to completedEntries list
        // const name = getSymptomById(symptomID);
        // console.log(`completed sym: ${name}`);

        // const completedSymptom = { key: 89, id: symptomID, name: name };
        // console.log(`completed sym: ${completedSymptom.name}`);
        // setCompletedEntries((current) => [...current, completedSymptom]);
        // setCompletedEntries(completedSymptom);

        // const updatedCompleted = [completedSymptom];

        // const updatedCompleted = completedEntries.map((entry) => (
        //   // updatedCompleted.push(entry)
        //   entry
        // ))};
        // const updatedCompleted = completedEntries.map((entry)

        // completedEntries.map((entry) => updatedCompleted.push(entry));

        // setCompletedEntries(updatedCompleted);
        // console.log(`Completed Entries: ${completedEntries.length}`);
        // completedEntries.map(
        //   (entry) => console.log(`entries: ${entry}`)
        //   // updatedCompleted.push(entry)
        //   entry
        // );
        // const symptomEntryID = response.data;
        // const relatedData = symptomEntryID;
        // return response.data;
        console.log(`response: ${response.data.id}`);
        // setLastEntryID(response.data.id);
        return response.data.id;
      })
      .catch((error) => {
        console.log("COULDN'T MAKE A new symptom entry");
      });

    // const relatedData = { symptomEntryID };

    // add related entries
  };

  const editEntry = () => {
    console.log("u wanna edit ur entry");
  };

  return (
    <div>
      <h1> SymptomEntries!!!!!</h1>
      <section>
        {symptomsData.map((symptom) => (
          <SymptomRating
            key={symptom.id}
            id={symptom.id}
            name={symptom.name}
            addEntryCallback={addSymptomEntryAPI}
          />
        ))}
      </section>
      <section>
        <h2>Completed:</h2>
        {completedEntries.map((entry) => (
          <section>
            <h3>{entry.id}</h3>
            <button onClick={editEntry}>EDIT</button>
          </section>
        ))}
      </section>
    </div>
  );
};

export default SymptomEntries;

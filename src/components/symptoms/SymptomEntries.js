import React from "react";
// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import SymptomRating from "./SymptomRating";

const SymptomEntries = (props) => {
  // const location = useLocation();
  // const data = location.state;
  // console.log(data);
  // get list of symptoms from api
  //
  // const [remainingEntries, setRemainingEntries] = useState(
  //   props.remainingSymptomEntries
  // );
  // const [remainingEntries, setRemainingEntries] = useState(
  //   props.remainingEntries
  // );
  // const [completedEntries, setCompletedEntries] = useState(
  //   props.completedEntries
  // );
  // console.log(remainingEntries);
  // const [completedEntries, setCompletedEntries] = useState(
  //   props.completedSymptomEntries
  // );
  // const [lastEntryID, setLastEntryID] = useState("");
  // const [done, setDone] = useState(1);

  // const [completedEntriesList, setCompletedEntriesList] = useState(
  //   props.completedEntries.entries()
  // );

  // useEffect(() => {
  //   setCompletedEntriesList
  //   // getRemainingSymptomEntries();
  // }, []);

  // useEffect(() => {
  //   // addRelatedEntries(lastEntryID);
  //   getSymptomEntriesFromAPI(lastEntryID);
  // }, [lastEntryID]);

  // useEffect(() => {
  //   getEntriesData();
  // }, []);

  // API - GET
  // const getSymptomsFromAPI = () => {
  //   axios
  //     .get("http://localhost:3000/symptoms")
  //     .then((response) => {
  //       setRemainingEntries(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("cant get ur symptoms :/ ");
  //     });
  // };

  // const getCompletedSymptomEntries = () => {
  //   axios
  //     .get("http://localhost:3000/completed/symptoms")
  //     .then((response) => {
  //       setCompletedEntries(response.data);

  //       const remaining = [];

  //       for (const symptom of props.symptomsData) {
  //         const id = symptom.id.toString();
  //         if (!response.data[id]) {
  //           console.log("*********");
  //           remaining.push(symptom);
  //         }
  //       }
  //       setRemainingEntries(remaining);
  //     })
  //     .catch((error) => {
  //       console.log("cant get ur symptoms :/ ");
  //     });
  // };

  // const getRemainingSymptomEntries = () => {
  //   axios
  //     .get("http://localhost:3000/symptoms")
  //     .then((response) => {
  //       const remaining = [];
  //       for (const symptom of response.data) {
  //         const id = symptom.id.toString();
  //         if (!completedEntries[id]) {
  //           remaining.push(symptom);
  //         }
  //       }
  //       setRemainingEntries(remaining);
  //     })
  //     .catch((error) => {
  //       console.log("cant get ur symptoms :/ ");
  //     });
  // };

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
  // const addSymptomEntryAPI = (data) => {
  //   // const symptomID = data.symptom_id;
  //   return axios
  //     .post("http://localhost:3000/symptom-entries", data)
  //     .then((response) => {
  //       // getCompletedSymptomEntries();
  //       // getRemainingSymptomEntries();
  //       // remove symptom from to-do list
  //       // console.log(`response: ${response}`);
  //       // const updatedSymptoms = symptomsData.filter(
  //       //   (symptom) => symptom.id !== symptomID
  //       // );
  //       // console.log(`response: ${response.data.id}`);
  //       // // setLastEntryID(response.data.id);
  //       // return response.data.id;
  //     })
  //     .catch((error) => {
  //       console.log("COULDN'T MAKE A new symptom entry");
  //     });

  //   // const relatedData = { symptomEntryID };

  //   // add related entries
  // };
  const addEntry = (data) => {
    props.addEntryCallback(data);
  };

  const editEntry = () => {
    console.log("u wanna edit ur entry");
  };
  console.log(`remainingEntries: ${props.completedEntries}`);

  return (
    <div>
      <h1> SymptomEntries!!!!!</h1>
      <section>
        {props.remainingEntries.map((symptom) => (
          <SymptomRating
            key={symptom.id}
            id={symptom.id}
            name={symptom.name}
            addEntryCallback={addEntry}
          />
        ))}
      </section>
      <section>
        <h2>Completed:</h2>
        {Object.entries(props.completedEntries).map((entry) => (
          <section>
            <h3>{entry[1]}</h3>
            <button onClick={editEntry}>EDIT</button>
          </section>
        ))}
      </section>
    </div>
  );
};

export default SymptomEntries;

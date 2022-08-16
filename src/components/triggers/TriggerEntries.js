import React from "react";
// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TriggerPresent from "./TriggerPresent";

const TriggerEntries = (props) => {
  // const [triggersData, setTriggersData] = useState([]);
  // const [completedEntries, setCompletedEntries] = useState([]);

  // useEffect(() => {
  //   getTriggersFromAPI();
  // }, []);

  // const getTriggersFromAPI = () => {
  //   axios
  //     .get("http://localhost:3000/triggers")
  //     .then((response) => {
  //       setTriggersData(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("cant get ur triggers :/ ");
  //     });
  // };

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
  //       setSymptomsData(response.data);
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
  const addTriggerEntryAPI = (data) => {
    const triggerID = data.trigger_id;
    return axios
      .post("http://localhost:3000/trigger-entries", data)
      .then((response) => {
        // remove symptom from to-do list
        // console.log(`response: ${response}`);
        // const updatedTriggers = triggersData.filter(
        //   (trigger) => trigger.id !== triggerID
        // );
        // console.log(`response: ${response.data.id}`);
        // // setLastEntryID(response.data.id);
        // return response.data.id;
      })
      .catch((error) => {
        console.log("COULDN'T MAKE A new trigger entry");
      });

    // const relatedData = { symptomEntryID };

    // add related entries
  };

  const editEntry = () => {
    console.log("u wanna edit ur entry");
  };

  return (
    <div>
      <h1> trigger entries!!!!!</h1>
      <section>
        {props.remainingEntries.map((trigger) => (
          <TriggerPresent
            key={trigger.id}
            id={trigger.id}
            name={trigger.name}
            addEntryCallback={addTriggerEntryAPI}
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

export default TriggerEntries;

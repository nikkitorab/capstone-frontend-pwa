import React from "react";
// import ToggleButton from "react-bootstrap/ToggleButton";
import "./Lists.css";

import { useState, useEffect } from "react";
import axios from "axios";

import SymptomEntries from "../symptoms/SymptomEntries";
import TriggerEntries from "../triggers/TriggerEntries";
import { useLocation } from "react-router-dom";

// import { useLocation } from "react-router-dom";

const Entries = (props) => {
  const location = useLocation();
  const data = location.state;

  const [selectedEntries, setSelectedEntries] = useState(data.selection); // default
  // console.log(selectedEntries);
  // const [selectedEntries, setSelectedEntries] = useState("TriggerEntries"); // default
  //BUTTON CLASS FOR COLORS:
  const [triggersButton, setTriggersButton] = useState("selected");
  const [symptomsButton, setSymptomsButton] = useState("notSelected");

  const [remainingSymptomEntries, setRemainingSymptomEntries] = useState([]);

  const [completedSymptomEntries, setCompletedSymptomEntries] = useState([]);

  const [remainingTriggerEntries, setRemainingTriggerEntries] = useState([]);

  const [completedTriggerEntries, setCompletedTriggerEntries] = useState([]);

  useEffect(() => {
    getCompletedTriggerEntries();
    getCompletedSymptomEntries();
    // getRemainingSymptomEntries();
  }, []);

  const getCompletedSymptomEntries = () => {
    axios
      .get("http://localhost:3000/completed/symptoms")
      .then((response) => {
        setCompletedSymptomEntries(response.data);

        const remaining = [];

        for (const symptom of data.symptomsData) {
          const id = symptom.id.toString();
          if (!response.data[id]) {
            console.log("*********");
            remaining.push(symptom);
          }
        }
        setRemainingSymptomEntries(remaining);
      })
      .catch((error) => {
        console.log("cant get ur symptoms :/ ");
      });
  };

  const getCompletedTriggerEntries = () => {
    axios
      .get("http://localhost:3000/completed/triggers")
      .then((response) => {
        setCompletedTriggerEntries(response.data);

        const remaining = [];

        for (const trigger of data.triggersData) {
          const id = trigger.id.toString();
          if (!response.data[id]) {
            console.log("*********");
            remaining.push(trigger);
          }
        }
        setRemainingTriggerEntries(remaining);
      })
      .catch((error) => {
        console.log("cant get ur trigger entries :/ ");
      });
  };

  // const getCompletedSymptomEntries = () => {
  //   axios
  //     .get("http://localhost:3000/completed/symptoms")
  //     .then((response) => {
  //       setCompletedSymptomEntries(response.data);

  //       //GET REMAINING ENTRIES:
  //       const remaining = [];
  //       for (const symptom of data.symptomsData) {
  //         const id = symptom.id.toString();
  //         if (!completedSymptomEntries[id]) {
  //           console.log("*********");
  //           remaining.push(symptom);
  //         }
  //       }

  //       // symptomsData
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
  //         if (!completedSymptomEntries[id]) {
  //           console.log("*********");
  //           remaining.push(symptom);
  //         }
  //       }
  //       console.log(`remaining: ${remaining}`);
  //       setRemainingSymptomEntries(remaining);
  //     })
  //     .catch((error) => {
  //       console.log("cant get ur symptoms :/ ");
  //     });
  // };

  //props:
  // const symptomEntries = props.symptomEntries
  // dont forget about props.deleteSymptomEntriesCallback

  // const deleteSymptomEntriesCallback={deleteSymptomEntries}

  // console.log(data);

  const selectSymptomEntries = () => {
    setSelectedEntries("SymptomEntries");
    setSymptomsButton("selected");
    setTriggersButton("notSelected");
  };

  const selectTriggerEntries = () => {
    setSelectedEntries("TriggerEntries");
    setTriggersButton("selected");
    setSymptomsButton("notSelected");
  };

  return (
    <div>
      <section>
        <button className={triggersButton} onClick={selectTriggerEntries}>
          Triggers
        </button>
        <button className={symptomsButton} onClick={selectSymptomEntries}>
          Symptoms
        </button>
      </section>
      <section>
        {selectedEntries === "TriggerEntries" && (
          <TriggerEntries
            remainingEntries={remainingTriggerEntries}
            completedEntries={completedTriggerEntries}
            // triggersData={data.triggersData}
            // getTriggersCallback={props.getTriggersCallback}
            // getTriggersData={props.getTriggersData}
            // addTriggerCallback={props.addNewTriggerCallback}
            // deleteTriggerCallback={props.deleteTriggerCallback}

            // entries={props.symptomEntries}
            // deleteSympEntriesCallback={props.deleteSympEntriesCallback}
          ></TriggerEntries>
        )}
        {selectedEntries === "SymptomEntries" && (
          <SymptomEntries
            remainingEntries={remainingSymptomEntries}
            completedEntries={completedSymptomEntries}
            // symptomsData={data.symptomsData}
            // getSymptomsCallback={props.getSymptomsCallback}
            // addSymptomCallback={props.addSymptomCallback}
            // deleteSymptomCallback={props.deleteSymptomCallback}
          ></SymptomEntries>
        )}
      </section>
    </div>
  );
};

export default Entries;

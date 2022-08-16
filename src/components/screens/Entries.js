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
  // const [triggersButton, setTriggersButton] = useState("selected");
  // const [symptomsButton, setSymptomsButton] = useState("notSelected");
  const [triggersButton, setTriggersButton] = useState("");
  const [symptomsButton, setSymptomsButton] = useState("");

  const [remainingSymptomEntries, setRemainingSymptomEntries] = useState([]);

  const [completedSymptomEntries, setCompletedSymptomEntries] = useState([]);

  const [remainingTriggerEntries, setRemainingTriggerEntries] = useState([]);

  const [completedTriggerEntries, setCompletedTriggerEntries] = useState([]);

  // console.log(`****** PROPS: ${props.selection}`)

  useEffect(() => {
    getButtonColor();
    getCompletedTriggerEntries();
    getCompletedSymptomEntries();
    // getRemainingSymptomEntries();
  }, []);

  const getButtonColor = () => {
    if (selectedEntries === "TriggerEntries") {
      setTriggersButton("selected");
      setSymptomsButton("notSelected");
    } else {
      setTriggersButton("notSelected");
      setSymptomsButton("selected");
    }
  };

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

        console.log(`******** data.triggersData: ${data.triggersData}`);

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

  const addSymptomEntryAPI = (data) => {
    const symptomID = data.symptom_id;
    let symptomName = "";
    for (const symptom of remainingSymptomEntries) {
      const id = symptom.id;
      if (symptomID == id) {
        symptomName = symptom.name;
        break;
      }
    }
    console.log(`iiiiid: ${symptomID}`);
    axios
      .post("http://localhost:3000/symptom-entries", data)
      .then((response) => {
        // getCompletedSymptomEntries();
        console.log("!!!!!!!!!!!!!!!!!!!!!");

        const completed = { ...completedSymptomEntries };
        // const remaining = { ...remainingSymptomEntries };

        completed[symptomID] = symptomName;
        // const s = JSON.stringify(completed);

        // console.log(`******* COMPLETED: ${s}`);
        setCompletedSymptomEntries(completed);
        // const ss = JSON.stringify(completedSymptomEntries);
        // console.log(`******* STATE: ${ss}`);

        // const remaining = [];
        const remaining = remainingSymptomEntries.filter(
          (symptom) => symptom.symptom_id != symptomID
        );
        setRemainingSymptomEntries(remaining);

        // for (const symptom of remainingSymptomEntries) {
        //   if (symptom.symptom_id != symptomID) {
        //     remaining.push(symptom);
        //   }
        // }
        // setRemainingSymptomEntries(remaining);

        // data.symptom_id

        // completedSymptomEntries[data.symptom_id]

        // for(const entry of completedSymptomEntries){

        // }

        // getRemainingSymptomEntries();
        // remove symptom from to-do list
        // console.log(`response: ${response}`);
        // const updatedSymptoms = symptomsData.filter(
        //   (symptom) => symptom.id !== symptomID
        // );
        // console.log(`response: ${response.data.id}`);
        // // setLastEntryID(response.data.id);
        // return response.data.id;
      })
      .catch((error) => {
        console.log("COULDN'T MAKE A new symptom entry");
      });

    // const relatedData = { symptomEntryID };

    // add related entries
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
            addEntryCallback={addSymptomEntryAPI}
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

import React from "react";
// import ToggleButton from "react-bootstrap/ToggleButton";
import "./Lists.css";

import { useState, useEffect } from "react";

import SymptomEntries from "../symptoms/SymptomEntries";
import TriggerEntries from "../triggers/TriggerEntries";

// import { useLocation } from "react-router-dom";

const Entries = (props) => {
  const [selectedEntries, setSelectedEntries] = useState("TriggerEntries"); // default
  //BUTTON CLASS FOR COLORS:
  const [triggersButton, setTriggersButton] = useState("selected");
  const [symptomsButton, setSymptomsButton] = useState("notSelected");

  //props:
  // const symptomEntries = props.symptomEntries
  // dont forget about props.deleteSymptomEntriesCallback

  // const deleteSymptomEntriesCallback={deleteSymptomEntries}

  // const location = useLocation();
  // const data = location.state;
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
            triggersData={props.triggersData}
            getTriggersCallback={props.getTriggersCallback}
            // addTriggerCallback={props.addNewTriggerCallback}
            // deleteTriggerCallback={props.deleteTriggerCallback}

            // entries={props.symptomEntries}
            // deleteSympEntriesCallback={props.deleteSympEntriesCallback}
          ></TriggerEntries>
        )}
        {selectedEntries === "SymptomEntries" && (
          <SymptomEntries
            getSymptomsCallback={props.getSymptomsCallback}
            symptomsData={props.symptomsData}
            // addSymptomCallback={props.addSymptomCallback}
            // deleteSymptomCallback={props.deleteSymptomCallback}
          ></SymptomEntries>
        )}
      </section>
    </div>
  );
};

export default Entries;

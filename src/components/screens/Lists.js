import React from "react";
// import ToggleButton from "react-bootstrap/ToggleButton";
import "./Lists.css";

import { useState, useEffect } from "react";

import SymptomsList from "../symptoms/SymptomsList";
import TriggersList from "../triggers/TriggersList";

import { useLocation } from "react-router-dom";

const Lists = (props) => {
  const [selectedList, setSelectedList] = useState("SymptomsList"); // default
  //BUTTON CLASS FOR COLORS:
  const [symptomsButton, setSymptomsButton] = useState("selected");
  const [triggersButton, setTriggersButton] = useState("notSelected");

  //props:
  // const symptomEntries = props.symptomEntries
  // dont forget about props.deleteSymptomEntriesCallback

  // const deleteSymptomEntriesCallback={deleteSymptomEntries}

  const location = useLocation();
  const data = location.state;
  // console.log(data);

  const selectSymptomsList = () => {
    setSelectedList("SymptomsList");
    setSymptomsButton("selected");
    setTriggersButton("notSelected");
  };

  const selectTriggersList = () => {
    setSelectedList("TriggersList");
    setTriggersButton("selected");
    setSymptomsButton("notSelected");
  };

  return (
    <div>
      <section>
        <button className={symptomsButton} onClick={selectSymptomsList}>
          Symptoms
        </button>
        <button className={triggersButton} onClick={selectTriggersList}>
          Triggers
        </button>
      </section>
      <section>
        {selectedList === "SymptomsList" && (
          <SymptomsList
            symptomsData={data.symptomsData}
            // getSymptomsCallback={props.getSymptomsCallback}
            // addSymptomCallback={props.addSymptomCallback}
            // deleteSymptomCallback={props.deleteSymptomCallback}

            // entries={props.symptomEntries}
            // deleteSympEntriesCallback={props.deleteSympEntriesCallback}
          ></SymptomsList>
        )}
        {selectedList === "TriggersList" && (
          <TriggersList
            triggersData={data.triggersData}
            // getTriggersCallback={props.getTriggersCallback}
            // addTriggerCallback={props.addNewTriggerCallback}
            // deleteTriggerCallback={props.deleteTriggerCallback}
          ></TriggersList>
        )}
      </section>
    </div>
  );
};

export default Lists;

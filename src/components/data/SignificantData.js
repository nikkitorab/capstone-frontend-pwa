import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const SignificantData = (props) => {
  const [triggerName, setTriggerName] = useState("");

  // useEffect(() => {
  //   getTriggerNameByID();
  //   // getMostSignificantTriggers();
  //   // getMostSignificantTriggers();
  // }, []);
  const id = props.id;
  const symptomID = props.symptomID;

  const triggerID = props.triggerID;
  const presentMean = props.present_mean;
  const absentMean = props.absent_mean;
  const cohensD = props.cohens_d;

  const viewData = () => {
    console.log("button clicked!");
  };

  // const getTriggerNameByID = () => {
  //   axios
  //     .get(`http://localhost:3000/triggers/name/${props.id}`)
  //     .then((response) => {
  //       // setTriggersData(response.data);
  //       console.log(`name from app: ${response.data[0].name}`);
  //       // console.log(`id from app: ${response.data.id}`);
  //       setTriggerName(response.data[0].name);
  //     })
  //     .catch((error) => {
  //       console.log("cant get ur symptoms :/ ");
  //     });
  // };

  // const deleteTrigger = () => {
  //   props.deleteTriggerCallback(id);
  // };

  return (
    <div>
      <h1>{triggerName}</h1>
      <button onClick={viewData}>{triggerName}</button>
    </div>
  );
};

export default SignificantData;

import React from "react";
import Trigger from "./Trigger";
// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
import AddTriggerForm from "./AddTriggerForm";

const TriggersList = (props) => {
  // const [triggersData, setTriggersData] = useState([]);

  // useEffect(() => {
  //   getTriggersFromAPI();
  // }, []);

  // // API - GET
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

  // const getTriggers = () => {
  //   props.getTriggersCallback();
  // };

  const triggersData = props.triggersData;
  // const location = useLocation();
  // const data = location.state;
  // console.log(data);

  // const [enteredSymptomText, setEnteredSymptomText] = useState("");
  //state for symptoms
  // const [triggersData, setTriggersData] = useState([]);

  // API - POST
  // const addNewTrigger = (data) => {
  //   console.log(data);
  //   axios
  //     .post("http://localhost:3000/triggers", data)
  //     .then((response) => {
  //       getTriggersFromAPI();
  //     })
  //     .catch((error) => {
  //       console.log("COULDN'T MAKE A new trigger ");
  //     });
  // };

  // // API - DELETE
  // const deleteTrigger = (id) => {
  //   axios
  //     .delete(`http://localhost:3000/triggers/${id}`)
  //     .then((response) => {
  //       const updatedTriggers = triggersData.filter(
  //         (trigger) => trigger.id !== id
  //       );
  //       setTriggersData(updatedTriggers);
  //     })
  //     .catch((error) => {
  //       console.log("Unable to delete");
  //     });
  // };

  return (
    <div>
      <h1> Triggers List!!</h1>
      <section>
        <AddTriggerForm addTriggerCallback={props.addTriggerCallback} />
      </section>
      <section>
        {triggersData.map((trigger) => (
          <Trigger
            key={trigger.id}
            id={trigger.id}
            name={trigger.name}
            deleteTriggerCallback={props.deleteTriggerCallback}
          />
        ))}
      </section>
    </div>
  );
};

export default TriggersList;

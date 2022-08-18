import React from "react";
import Trigger from "./Trigger";
// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddTriggerForm from "./AddTriggerForm";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
const TriggersList = (props) => {
  const [triggersData, setTriggersData] = useState([]);

  useEffect(() => {
    getTriggersFromAPI();
  }, []);

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

  // const triggersData = props.triggersData;

  const getTriggersFromAPI = () => {
    axios
      .get("http://localhost:3000/triggers")
      .then((response) => {
        setTriggersData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("cant get ur triggers :/ ");
      });
  };

  const addNewTrigger = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3000/triggers", data)
      .then((response) => {
        getTriggersFromAPI();
      })
      .catch((error) => {
        console.log("COULDN'T MAKE A new trigger ");
      });
  };
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
  const deleteTrigger = (id) => {
    axios
      .delete(`http://localhost:3000/triggers/${id}`)
      .then((response) => {
        const updatedTriggers = triggersData.filter(
          (trigger) => trigger.id !== id
        );
        setTriggersData(updatedTriggers);
      })
      .catch((error) => {
        console.log("Unable to delete");
      });
  };

  const triggers = triggersData.map((trigger) => (
    <Box
      sx={{
        border: 2,
        borderRadius: "16px",
        p: "1.5vw",
        bgcolor: "secondary.light",
        borderColor: "primary.light",

        justifyContent: "space-between",
        alignItems: "center",

        // p: "20px",
        width: 0.5,
        boxShadow: 3,
      }}
    >
      <Trigger
        key={trigger.id}
        id={trigger.id}
        name={trigger.name}
        deleteTriggerCallback={deleteTrigger}
      />
    </Box>
  ));

  return (
    <div>
      {/* <h1> Your Symptoms:</h1>
  

      <Stack
        spacing={2.5}
        justifyContent="center"
        alignItems="center"
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          height: "95vh",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        {symptoms}
      </Stack>
    </div> */}

      <h1> Your Triggers: </h1>
      <Stack
        spacing={2.5}
        justifyContent="center"
        alignItems="center"
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          height: "75vh",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        {triggers}
        {/* <section>
          {triggersData.map((trigger) => (
            <Trigger
              key={trigger.id}
              id={trigger.id}
              name={trigger.name}
              deleteTriggerCallback={deleteTrigger}
            />
          ))}
        </section> */}
      </Stack>
    </div>
  );
};

export default TriggersList;

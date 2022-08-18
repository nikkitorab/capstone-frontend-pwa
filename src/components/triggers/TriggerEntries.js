import React from "react";
// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TriggerPresent from "./TriggerPresent";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";

const TriggerEntries = (props) => {
  const [selectedList, setSelectedList] = useState("ToDo"); // default

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

  const handleChange = (event, newValue) => {
    // console.log(`newValue ${newValue}`);
    setSelectedList(newValue);
    // if (newValue == 0) {
    //   setSelectedList("SymptomsList");
    // } else {
    //   setSelectedList("TriggersList");
    // }
  };

  return (
    <div>
      <h1> Which triggers did you experience today? </h1>
      <ToggleButtonGroup
        value={selectedList}
        exclusive
        size="large"
        onChange={handleChange}
        color="primary"
        aria-label="list selection"
        sx={{
          p: "2.5vw",
        }}
      >
        <ToggleButton value="ToDo" aria-label="ToDo">
          To-Do
          {/* <FormatAlignLeftIcon /> */}
        </ToggleButton>

        <ToggleButton value="Completed" aria-label="Completed">
          Completed
          {/* <FormatAlignCenterIcon /> */}
        </ToggleButton>
      </ToggleButtonGroup>

      {/* <section> */}
      <Box
        sx={{
          // border: 2,
          borderRadius: "16px",

          // m: "20px",
          alignItems: "center",
          justifyContent: "center",
          // m: "5vw",
          p: "1.5vw",
          // p: "20px",
          width: 1,
          boxShadow: 3,
        }}
      >
        {selectedList === "ToDo" && (
          <Stack spacing={3} justifyContent="center" alignItems="center">
            {props.remainingEntries.map((trigger) => (
              <TriggerPresent
                key={trigger.id}
                id={trigger.id}
                name={trigger.name}
                addEntryCallback={addTriggerEntryAPI}
              />
            ))}
            {/* </section> */}
          </Stack>
        )}
        {selectedList === "Completed" && (
          <Stack spacing={3} justifyContent="center" alignItems="center">
            {/* <h2>Completed:</h2> */}
            {Object.entries(props.completedEntries).map((entry) => (
              <Box
                sx={{
                  border: 2,
                  borderRadius: "16px",
                  // m: "20px",
                  m: "1vw",
                  p: "1.5vw",
                  // p: "20px",
                  bgcolor: "#EEF3F8",
                  borderColor: "#969EC2",
                  width: 0.7,
                  boxShadow: 3,
                }}
              >
                <h3>{entry[1]}</h3>
                {/* <button onClick={editEntry}>EDIT</button> */}
                {/* </section> */}
              </Box>
            ))}
            {/* </section> */}
          </Stack>
        )}
      </Box>

      {/* <Stack spacing={3} justifyContent="center" alignItems="center">
        {props.remainingEntries.map((trigger) => (
          <TriggerPresent
            key={trigger.id}
            id={trigger.id}
            name={trigger.name}
            addEntryCallback={addTriggerEntryAPI}
          />
        ))} */}
      {/* </section> */}
      {/* </Stack>
      <section>
        <h2>Completed:</h2>
        {Object.entries(props.completedEntries).map((entry) => (
          <section>
            <h3>{entry[1]}</h3>
            <button onClick={editEntry}>EDIT</button>
          </section>
        ))}
      </section> */}
    </div>
  );
};

export default TriggerEntries;

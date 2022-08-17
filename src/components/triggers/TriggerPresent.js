import React from "react";
// import { useLocation } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

const TriggerPresent = (props) => {
  const [present, setPresent] = useState("");

  const id = props.id;
  const name = props.name;
  // const user = props.user_id;

  // const location = useLocation();
  // const data = location.state;
  // console.log(data);
  // get list of symptoms from api

  const inputHandler = (event) => {
    const entered = event.target.value;
    setPresent(entered);
  };

  const handleSubmission = (event) => {
    const postData = {
      trigger_id: id,
      occurred: present, // fix later
    };
    event.preventDefault();
    // console.log("here 1");
    props.addEntryCallback(postData);
  };

  const triggerAbsent = () => {
    const postData = {
      trigger_id: id,
      occurred: false, // fix later
    };
    // event.preventDefault();
    // console.log("here 1");
    props.addEntryCallback(postData);
  };

  const triggerPresent = () => {
    const postData = {
      trigger_id: id,
      occurred: true, // fix later
    };
    // event.preventDefault();
    // console.log("here 1");
    props.addEntryCallback(postData);
  };

  //
  return (
    <Box
      sx={{
        border: 2,
        borderRadius: "16px",
        // m: "20px",
        m: "1vw",
        p: "1.5vw",
        // p: "20px",
        width: 0.7,
        boxShadow: 3,
      }}
    >
      <label>{name}</label>
      <h> </h>

      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button variant="outlined" onClick={triggerAbsent}>
          Absent
        </Button>
        <Button variant="outlined" onClick={triggerPresent}>
          Present
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default TriggerPresent;

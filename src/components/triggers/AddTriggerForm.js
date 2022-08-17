import React from "react";
// import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/system";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import IconButton from "@mui/material/IconButton";

const AddTriggerForm = (props) => {
  // const location = useLocation();
  // const data = location.state;
  // console.log(data);

  const [enteredTriggerText, setEnteredTriggerText] = useState("");

  // for symptom text input:
  // const symptomInputHandler = (enteredText) => {

  //   setEnteredSymptomText(enteredText);
  //   //store enteredText as state so it can be given to addSymptomHandler function
  // };

  const triggerInputHandler = (event) => {
    const enteredText = event.target.value;
    setEnteredTriggerText(enteredText);
  };

  const handleTriggerSubmission = (event) => {
    const postData = {
      name: enteredTriggerText,
      rating_type: "int", // fix later
      user_id: 5, // fix later
    };

    event.preventDefault();
    props.addTriggerCallback(postData);
  };

  const toggleAddTrigger = () => {
    props.toggleAddTriggerCallback();
  };

  return (
    <Box
      sx={{
        borderRadius: "16px",
        p: "3vw",
        boxShadow: 3,
      }}
    >
      <IconButton
        aria-label="lists"
        size="smalll"
        onClick={toggleAddTrigger}
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 2000,
        }}
      >
        <DisabledByDefaultOutlinedIcon fontSize="small" />
      </IconButton>
      <form onSubmit={handleTriggerSubmission}>
        <label>Enter a Trigger</label>
        <input
          name="name"
          type="text"
          value={enteredTriggerText}
          onChange={triggerInputHandler}
        />
        <input type="submit" />
      </form>
    </Box>
  );
};

export default AddTriggerForm;

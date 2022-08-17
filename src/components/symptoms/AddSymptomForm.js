import React from "react";
// import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/system";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import IconButton from "@mui/material/IconButton";

const defaultForm = "";

const AddSymptomForm = (props) => {
  // const location = useLocation();
  // const data = location.state;
  // console.log(data);

  const [enteredSymptomText, setEnteredSymptomText] = useState(defaultForm);

  // for symptom text input:
  // const symptomInputHandler = (enteredText) => {

  //   setEnteredSymptomText(enteredText);
  //   //store enteredText as state so it can be given to addSymptomHandler function
  // };

  const symptomInputHandler = (event) => {
    const enteredText = event.target.value;
    setEnteredSymptomText(enteredText);
  };

  const handleSymptomSubmission = (event) => {
    event.preventDefault();
    const postData = {
      name: enteredSymptomText,
      rating_type: "int", // fix later
      user_id: 5, // fix later
    };

    props.addSymptomCallback(postData);
  };

  const toggleAddSymptom = () => {
    props.toggleAddSymptomCallback();
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
        onClick={toggleAddSymptom}
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 2000,
        }}
      >
        <DisabledByDefaultOutlinedIcon fontSize="small" />
      </IconButton>
      <form onSubmit={handleSymptomSubmission}>
        <label> Enter a Symptom </label>
        <h> </h>
        <input
          name="name"
          type="text"
          value={enteredSymptomText}
          onChange={symptomInputHandler}
        />
        <input type="submit" />
      </form>
    </Box>
  );
};

export default AddSymptomForm;

import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const AddSymptomForm = (props) => {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  const [enteredSymptomText, setEnteredSymptomText] = useState("");

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
    const postData = {
      name: enteredSymptomText,
      rating_type: "int", // fix later
      user_id: 5, // fix later
    };

    event.preventDefault();
    props.addSymptomCallback(postData);
  };

  return (
    <form onSubmit={handleSymptomSubmission}>
      <label>Enter a Symptom</label>
      <input
        name="name"
        type="text"
        value={enteredSymptomText}
        onChange={symptomInputHandler}
      />
      <input type="submit" />
    </form>
  );
};

export default AddSymptomForm;

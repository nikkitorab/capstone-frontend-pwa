import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

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

  return (
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
  );
};

export default AddTriggerForm;

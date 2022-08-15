import React from "react";
// import { useLocation } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";

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
  //
  return (
    <div>
      {/* <h1>{name}</h1>
      <button onClick={handleRatingSubmission}>
        change this to be radio button
      </button> */}

      <form onSubmit={handleSubmission}>
        <label>{name}</label>
        <input
          name="name"
          type="text"
          value={present}
          onChange={inputHandler}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default TriggerPresent;

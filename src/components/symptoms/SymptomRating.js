import React from "react";
// import { useLocation } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";

const SymptomRating = (props) => {
  const [rating, setRating] = useState("");

  const id = props.id;
  const name = props.name;
  // const user = props.user_id;

  // const location = useLocation();
  // const data = location.state;
  // console.log(data);
  // get list of symptoms from api

  const ratingInputHandler = (event) => {
    const enteredRating = event.target.value;
    setRating(enteredRating);
  };

  const handleRatingSubmission = (event) => {
    const postData = {
      symptom_id: id,
      rating: rating, // fix later
    };
    event.preventDefault();
    console.log("here 1");
    props.addEntryCallback(postData);
  };
  //
  return (
    <div>
      {/* <h1>{name}</h1>
      <button onClick={handleRatingSubmission}>
        change this to be radio button
      </button> */}

      <form onSubmit={handleRatingSubmission}>
        <label>{name}</label>
        <input
          name="name"
          type="text"
          value={rating}
          onChange={ratingInputHandler}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default SymptomRating;

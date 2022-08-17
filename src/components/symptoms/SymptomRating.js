import React from "react";
// import { useLocation } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";

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

  const handleChange = (event, rating) => {
    console.log(`rating: ${rating}`);
    const postData = {
      symptom_id: id,
      rating: rating, // fix later
    };
    event.preventDefault();
    // console.log("here 1");
    props.addEntryCallback(postData);
  };

  const xButton = () => {
    const postData = {
      symptom_id: id,
      rating: 0, // fix later
    };
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
      {/* <h1>{name}</h1>
      <button onClick={handleRatingSubmission}>
        change this to be radio button
      </button> */}
      <FormControl>
        <FormLabel>{name}</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-form-control-label-placement"
          name="position"
          defaultValue="1"
          onChange={handleChange}
        >
          <IconButton aria-label="delete" onClick={xButton}>
            <DisabledByDefaultOutlinedIcon />
          </IconButton>
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="1"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="2"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label="3"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="4"
            control={<Radio />}
            label="4"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="5"
            control={<Radio />}
            label="5"
            labelPlacement="bottom"
          />
          {/* <FormControlLabel
            value="6"
            control={<Radio />}
            label="6"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="7"
            control={<Radio />}
            label="7"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="8"
            control={<Radio />}
            label="8"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="9"
            control={<Radio />}
            label="9"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="10"
            control={<Radio />}
            label="10"
            labelPlacement="bottom"
          /> */}
        </RadioGroup>
      </FormControl>

      {/* <form onSubmit={handleRatingSubmission}>
        <label>{name}</label>
        <input
          name="name"
          type="text"
          value={rating}
          onChange={ratingInputHandler}
        />
        <input type="submit" />
      </form> */}
      {/* </div> */}
    </Box>
  );
};

export default SymptomRating;

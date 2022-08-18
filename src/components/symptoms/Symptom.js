import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

const Symptom = (props) => {
  const [entries, setEntries] = useState([]);

  const name = props.name;
  const id = props.id;

  useEffect(() => {
    getSymptomEntriesFromAPI();
  }, []);

  //************************** SYMPTOM ENTRIES **************************************** */

  const getSymptomEntriesFromAPI = () => {
    axios
      .get(`http://localhost:3000/symptom-entries/symptoms/${id}`)
      .then((response) => {
        setEntries(response.data);
      })
      .catch((error) => {
        console.log("cant get ur entries :/ ");
      });
  };

  // API - DELETE
  const deleteOneEntry = (entry_id) => {
    axios
      .delete(`http://localhost:3000/symptom-entries/${entry_id}`)
      .then((response) => {
        const updatedEntries = setEntries.filter(
          (entry) => entry.id !== entry_id
        );
        setEntries(updatedEntries);
      })
      .catch((error) => {
        console.log("Unable to delete");
      });
  };

  const deleteSymptomEntries = () => {
    for (const entry of entries) {
      deleteOneEntry(entry.id);
    }
  };

  const deleteSymptom = () => {
    // deleteSymptomEntries();
    console.log(id);
    props.deleteSymptomCallback(id);
    setEntries([]);
  };

  // const deleteSymptomEntries = () => {
  //   props.deleteSymptomEntriesCallback(id);
  // };

  return (
    <div>
      <h> {name} </h>
      <Button
        onClick={deleteSymptom}
        size="large"
        variant="contained"
        sx={{
          color: "#383B49",
          backgroundColor: "#BBC5F2",
          borderColor: "#C7D4F0",
          justifyContent: "flex-end",

          // position: "fixed",
          // top: 0,
          // right: 0,
          // zIndex: 2000,
        }}
      >
        DELETE
      </Button>
      {/* <Button variant="outlined" onClick={deleteSymptom}>
        DELETE
      </Button> */}
    </div>
  );
};

export default Symptom;

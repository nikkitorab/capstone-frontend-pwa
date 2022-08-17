import React from "react";
import Symptom from "./Symptom";
// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddSymptomForm from "./AddSymptomForm";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";

const SymptomsList = (props) => {
  const [symptomsData, setSymptomsData] = useState([]);
  // const location = useLocation();
  // const data = location.state;
  // console.log(data);

  //props:
  // const symptomEntries = props.symptomEntries

  // const [enteredSymptomText, setEnteredSymptomText] = useState("");
  //state for symptoms
  // const [symptomsData, setSymptomsData] = useState([]);

  useEffect(() => {
    getSymptomsFromAPI();
  }, []);

  // API - GET
  const getSymptomsFromAPI = () => {
    axios
      .get("http://localhost:3000/symptoms")
      .then((response) => {
        setSymptomsData(response.data);
      })
      .catch((error) => {
        console.log("cant get ur symptoms :/ ");
      });
  };

  const addNewSymptom = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3000/symptoms", data)
      .then((response) => {
        getSymptomsFromAPI();
        // setSymptomsData(response.data);
      })
      .catch((error) => {
        console.log("COULDN'T MAKE A new symptom ");
      });
  };

  // API - DELETE
  const deleteSymptom = (id) => {
    // delete all entries associated with the symptom --> deleteEntries
    axios
      .delete(`http://localhost:3000/symptoms/${id}`)
      .then((response) => {
        const updatedSymptoms = symptomsData.filter(
          (symptom) => symptom.id !== id
        );
        setSymptomsData(updatedSymptoms);
      })
      .catch((error) => {
        console.log("Unable to delete");
      });
  };

  const symptoms = symptomsData.map((symptom) => (
    <Box
      sx={{
        border: 2,
        borderRadius: "16px",
        p: "1.5vw",
        // p: "20px",
        width: 0.5,
        boxShadow: 3,
      }}
    >
      <Symptom
        key={symptom.id}
        id={symptom.id}
        name={symptom.name}
        deleteSymptomCallback={deleteSymptom}
      />
    </Box>
  ));

  return (
    <div>
      <h1> Your Symptoms:</h1>

      <Stack
        spacing={2.5}
        justifyContent="center"
        alignItems="center"
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          height: "95vh",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        {symptoms}
      </Stack>
    </div>
  );
};

export default SymptomsList;

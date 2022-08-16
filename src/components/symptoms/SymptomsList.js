import React from "react";
import Symptom from "./Symptom";
// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddSymptomForm from "./AddSymptomForm";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";

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
        // m: "20px",
        m: "1vw",
        p: "1.5vw",
        // p: "20px",
        width: 0.7,
        boxShadow: 3,
      }}
    >
      <Symptom
        key={symptom.id}
        id={symptom.id}
        name={symptom.name}
        // entries={props.symptomEntries}
        deleteSymptomCallback={deleteSymptom}
        // deleteSympEntriesCallback={props.deleteSympEntriesCallback}
      />
    </Box>
  ));

  // // API - POST
  // const addNewSymptom = (data) => {
  //   console.log(data);
  //   axios
  //     .post("http://localhost:3000/symptoms", data)
  //     .then((response) => {
  //       getSymptomsFromAPI();
  //     })
  //     .catch((error) => {
  //       console.log("COULDN'T MAKE A new symptom ");
  //     });
  // };

  // const symptomsData = props.symptomsData
  // const addSymptom = (data) => {
  //   props.addSymptomCallback(data);
  //   getSymptomsFromAPI();
  //   // const newData = props.getSymptomsCallback();
  // };

  return (
    <div>
      <h1> SymptomsList!!</h1>
      <section>
        <AddSymptomForm addSymptomCallback={addNewSymptom} />
      </section>
      {/* <section>{symptoms}</section> */}

      <Stack spacing={2.5} justifyContent="center" alignItems="center">
        {symptoms}
      </Stack>
    </div>
  );
};

export default SymptomsList;

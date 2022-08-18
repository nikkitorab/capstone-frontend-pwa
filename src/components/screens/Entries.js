import React from "react";
// import ToggleButton from "react-bootstrap/ToggleButton";
import "./Lists.css";

import { useState, useEffect } from "react";
import axios from "axios";

import SymptomEntries from "../symptoms/SymptomEntries";
import TriggerEntries from "../triggers/TriggerEntries";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import { useLocation } from "react-router-dom";

const Entries = (props) => {
  const location = useLocation();
  const data = location.state;

  const [selectedEntries, setSelectedEntries] = useState(data.selection); // default

  const [triggersButton, setTriggersButton] = useState("");
  const [symptomsButton, setSymptomsButton] = useState("");

  const [remainingSymptomEntries, setRemainingSymptomEntries] = useState([]);

  const [completedSymptomEntries, setCompletedSymptomEntries] = useState([]);

  const [remainingTriggerEntries, setRemainingTriggerEntries] = useState([]);

  const [completedTriggerEntries, setCompletedTriggerEntries] = useState([]);

  // console.log(`****** PROPS: ${props.selection}`)
  const theme = createTheme({
    indicator: {
      backgroundColor: "#ECFFE8",
    },
    palette: {
      primary: {
        light: "#969EC2",
        main: "#383B49",
        dark: "#FFC0CB",
        contrastText: "#fff",
      },
      secondary: {
        light: "#D4E2ED",
        main: "#C7D4F0",
        dark: "#BBC5F2",
        contrastText: "#000",
      },
    },
  });

  useEffect(() => {
    getButtonColor();
    getCompletedTriggerEntries();
    getCompletedSymptomEntries();
    // getRemainingSymptomEntries();
  }, []);

  const getButtonColor = () => {
    if (selectedEntries === "TriggerEntries") {
      setTriggersButton("selected");
      setSymptomsButton("notSelected");
    } else {
      setTriggersButton("notSelected");
      setSymptomsButton("selected");
    }
  };

  const getCompletedSymptomEntries = () => {
    axios
      .get("http://localhost:3000/completed/symptoms")
      .then((response) => {
        setCompletedSymptomEntries(response.data);

        const remaining = [];

        for (const symptom of data.symptomsData) {
          const id = symptom.id.toString();
          if (!response.data[id]) {
            console.log("*********");
            remaining.push(symptom);
          }
        }
        setRemainingSymptomEntries(remaining);
      })
      .catch((error) => {
        console.log("cant get ur symptoms :/ ");
      });
  };

  const getCompletedTriggerEntries = () => {
    axios
      .get("http://localhost:3000/completed/triggers")
      .then((response) => {
        setCompletedTriggerEntries(response.data);

        const remaining = [];

        console.log(`******** data.triggersData: ${data.triggersData}`);

        for (const trigger of data.triggersData) {
          const id = trigger.id.toString();
          if (!response.data[id]) {
            console.log("*********");
            remaining.push(trigger);
          }
        }
        setRemainingTriggerEntries(remaining);
      })
      .catch((error) => {
        console.log("cant get ur trigger entries :/ ");
      });
  };

  const addSymptomEntryAPI = (data) => {
    const symptomID = data.symptom_id;
    let symptomName = "";
    for (const symptom of remainingSymptomEntries) {
      const id = symptom.id;
      if (symptomID == id) {
        symptomName = symptom.name;
        break;
      }
    }
    // console.log(`iiiiid: ${symptomID}`);
    axios
      .post("http://localhost:3000/symptom-entries", data)
      .then((response) => {
        // getCompletedSymptomEntries();
        // console.log("!!!!!!!!!!!!!!!!!!!!!");

        const completed = { ...completedSymptomEntries };
        // const remaining = { ...remainingSymptomEntries };

        completed[symptomID] = symptomName;
        // const s = JSON.stringify(completed);

        // console.log(`******* COMPLETED: ${s}`);
        setCompletedSymptomEntries(completed);
        // const ss = JSON.stringify(completedSymptomEntries);
        // console.log(`******* STATE: ${ss}`);

        // const remaining = [];
        const remaining = remainingSymptomEntries.filter(
          (symptom) => symptom.symptom_id != symptomID
        );
        setRemainingSymptomEntries(remaining);
      })
      .catch((error) => {
        console.log("COULDN'T MAKE A new symptom entry");
      });

    // const relatedData = { symptomEntryID };

    // add related entries
  };

  const selectSymptomEntries = () => {
    setSelectedEntries("SymptomEntries");
    setSymptomsButton("selected");
    setTriggersButton("notSelected");
  };

  const selectTriggerEntries = () => {
    setSelectedEntries("TriggerEntries");
    setTriggersButton("selected");
    setSymptomsButton("notSelected");
  };

  const handleChange = (event, newValue) => {
    // console.log(`newValue ${newValue}`);
    setSelectedEntries(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="100%" alignItems="center">
        <AppBar
          maxWidth="sm"
          color="secondary"
          position="sticky"
          sx={{
            // border: 2,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            // m: "3vw",
            p: "1vw",
            width: 1,
            boxShadow: 3,
          }}
        >
          <Stack
            spacing={10}
            alignItems="center"
            // alignItems="center"
            direction="row"
          >
            {/* <Container maxWidth="sm"> */}
            <ToggleButtonGroup
              value={selectedEntries}
              exclusive
              size="large"
              onChange={handleChange}
              color="primary"
              aria-label="list selection"

              // textAlign="center"
            >
              <ToggleButton value="TriggerEntries" aria-label="Triggers">
                Trigger Entries
                {/* <FormatAlignLeftIcon /> */}
              </ToggleButton>

              <ToggleButton value="SymptomEntries" aria-label="Symptoms">
                Symptom Entries
                {/* <FormatAlignCenterIcon /> */}
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          {/* </Container> */}
        </AppBar>

        <Box
          sx={{
            borderRadius: "16px",
            justifyContent: "center",
            p: "3vw",
            width: 1,
            boxShadow: 3,
          }}
        >
          {selectedEntries === "TriggerEntries" && (
            <TriggerEntries
              remainingEntries={remainingTriggerEntries}
              completedEntries={completedTriggerEntries}
            ></TriggerEntries>
          )}
          {selectedEntries === "SymptomEntries" && (
            <SymptomEntries
              remainingEntries={remainingSymptomEntries}
              completedEntries={completedSymptomEntries}
              addEntryCallback={addSymptomEntryAPI}
            ></SymptomEntries>
          )}
        </Box>
        {/* </section> */}
        {/* </Stack> */}
      </Container>
    </ThemeProvider>
  );
};

export default Entries;

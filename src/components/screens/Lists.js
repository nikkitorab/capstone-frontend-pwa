import React from "react";
// import ToggleButton from "react-bootstrap/ToggleButton";
import "./Lists.css";

import { useState, useEffect } from "react";

import SymptomsList from "../symptoms/SymptomsList";
import TriggersList from "../triggers/TriggersList";
import Stack from "@mui/material/Stack";

import { useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// import white from "@mui/material/colors/white";

const Lists = (props) => {
  const [selectedList, setSelectedList] = useState("SymptomsList"); // default
  //BUTTON CLASS FOR COLORS:
  const [symptomsButton, setSymptomsButton] = useState("selected");
  const [triggersButton, setTriggersButton] = useState("notSelected");

  //props:
  // const symptomEntries = props.symptomEntries
  // dont forget about props.deleteSymptomEntriesCallback

  // const deleteSymptomEntriesCallback={deleteSymptomEntries}

  const location = useLocation();
  const data = location.state;
  // console.log(data);

  const theme = createTheme({
    indicator: {
      backgroundColor: "green",
    },
    palette: {
      primary: {
        light: "#60ac5d",
        main: "#2e7d32",
        dark: "#004f04",
        contrastText: "#fff",
      },
      secondary: {
        light: "#cfff95",
        main: "#9ccc65",
        dark: "#6b9b37",
        contrastText: "#000",
      },
    },
  });

  const selectSymptomsList = () => {
    setSelectedList("SymptomsList");
    setSymptomsButton("selected");
    setTriggersButton("notSelected");
  };

  const selectTriggersList = () => {
    setSelectedList("TriggersList");
    setTriggersButton("selected");
    setSymptomsButton("notSelected");
  };

  // const handleChange = (event) => {
  //   setSelectedList(event.value);
  //   // const str = JSON.stringify(event);
  //   Object.keys(event).forEach((prop) => console.log(`*** ${prop}`));
  //   console.log(`event: ${event.toString()}`);
  //   console.log(`value: ${event.target}`);
  // };
  const handleChange = (event, newValue) => {
    // console.log(`newValue ${newValue}`);
    setSelectedList(newValue);
    // if (newValue == 0) {
    //   setSelectedList("SymptomsList");
    // } else {
    //   setSelectedList("TriggersList");
    // }
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
              value={selectedList}
              exclusive
              size="large"
              onChange={handleChange}
              color="primary"
              aria-label="list selection"

              // textAlign="center"
            >
              <ToggleButton value="SymptomsList" aria-label="Symptoms">
                Symptoms
                {/* <FormatAlignLeftIcon /> */}
              </ToggleButton>

              <ToggleButton value="TriggersList" aria-label="Triggers">
                Triggers
                {/* <FormatAlignCenterIcon /> */}
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          {/* </Container> */}
        </AppBar>

        <Box
          sx={{
            // border: 2,
            borderRadius: "16px",
            // m: "20px",
            // alignItems: "center",
            justifyContent: "center",
            // m: "4vw",
            p: "3vw",
            // p: "20px",
            width: 1,
            boxShadow: 3,
          }}
        >
          {selectedList === "SymptomsList" && (
            <SymptomsList
              symptomsData={data.symptomsData}
              // getSymptomsCallback={props.getSymptomsCallback}
              // addSymptomCallback={props.addSymptomCallback}
              // deleteSymptomCallback={props.deleteSymptomCallback}

              // entries={props.symptomEntries}
              // deleteSympEntriesCallback={props.deleteSympEntriesCallback}
            ></SymptomsList>
          )}
          {selectedList === "TriggersList" && (
            <TriggersList
              triggersData={data.triggersData}
              // getTriggersCallback={props.getTriggersCallback}
              // addTriggerCallback={props.addNewTriggerCallback}
              // deleteTriggerCallback={props.deleteTriggerCallback}
            ></TriggersList>
          )}
        </Box>
        {/* </section> */}
        {/* </Stack> */}
      </Container>
    </ThemeProvider>
  );
};

export default Lists;

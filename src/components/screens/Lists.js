import React from "react";
// import ToggleButton from "react-bootstrap/ToggleButton";
import "./Lists.css";

import { useState, useEffect } from "react";

import SymptomsList from "../symptoms/SymptomsList";
import TriggersList from "../triggers/TriggersList";
import Stack from "@mui/material/Stack";

import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Lists = (props) => {
  const [selectedList, setSelectedList] = useState("SymptomsList"); // default
  //BUTTON CLASS FOR COLORS:
  const [symptomsButton, setSymptomsButton] = useState("selected");
  const [triggersButton, setTriggersButton] = useState("notSelected");

  const location = useLocation();
  const data = location.state;

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
            bgcolor="secondary.dark"
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

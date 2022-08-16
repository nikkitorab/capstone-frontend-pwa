import React from "react";
// import ToggleButton from "react-bootstrap/ToggleButton";
import "./Lists.css";

import { useState, useEffect } from "react";

import SymptomsList from "../symptoms/SymptomsList";
import TriggersList from "../triggers/TriggersList";

import { useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

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
    if (newValue == 0) {
      setSelectedList("SymptomsList");
    } else {
      setSelectedList("TriggersList");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="100%">
        {/* <div> */}
        {/* <Box sx={{ width: "100%" }} > */}
        <Box sx={{ borderBottom: 2, borderColor: "divider", width: "100%" }}>
          <AppBar color="secondary" position="static">
            <Tabs
              value={selectedList}
              onChange={handleChange}
              // textColor="inherit"
              // indicatorColor="secondary"
              aria-label="full width tabs"
              centered
              variant="fullWidth"
            >
              <Tab selectedList="SymptomsList" label="Symptoms" />
              <Divider orientation="vertical" />
              <Tab selectedList="TriggersList" label="Triggers" />
            </Tabs>
            {/* <button className={symptomsButton} onClick={selectSymptomsList}>
          Symptoms
        </button>
        <button className={triggersButton} onClick={selectTriggersList}>
          Triggers
        </button> */}
          </AppBar>
        </Box>
        <section>
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
        </section>
      </Container>
    </ThemeProvider>
  );
};

export default Lists;
